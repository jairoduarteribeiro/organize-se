import { expect, test, type Page } from "@playwright/test";
import { getAxeResults, injectAxe } from "axe-playwright";

import { EVENT_UTC, KIWIFY_URL } from "../app/lib/constants";

type AxeViolation = {
  id: string;
  impact: "minor" | "moderate" | "serious" | "critical" | null;
  help: string;
  nodes: Array<{
    target: string[];
  }>;
};

declare global {
  interface Window {
    __TEST_NOW__?: number;
  }
}

const responsiveViewports = [
  { label: "iPhone 14", width: 375, height: 812 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1280, height: 800 },
] as const;

const postEventTimestamp = EVENT_UTC.getTime() + 1000;

function installRuntimeErrorCapture(page: Page) {
  const runtimeErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  return runtimeErrors;
}

async function installControllableDateNow(page: Page) {
  await page.addInitScript(() => {
    const realDateNow = Date.now.bind(Date);

    Date.now = () =>
      typeof window.__TEST_NOW__ === "number" ? window.__TEST_NOW__ : realDateNow();
  });
}

async function advanceToPostEvent(page: Page) {
  await page.evaluate((timestamp) => {
    window.__TEST_NOW__ = timestamp;
  }, postEventTimestamp);
}

async function openPageThenAdvanceToPostEvent(page: Page) {
  await installControllableDateNow(page);
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /quero garantir meu ingresso/i }).first(),
  ).toBeVisible();
  await advanceToPostEvent(page);
}

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
}

function summarizeAxeViolations(violations: AxeViolation[]) {
  return violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.flatMap((node) => node.target),
  }));
}

test.describe("landing-page-v1 task 09 Playwright suite", () => {
  test("loads content without runtime errors and exposes the expected conversion path", async ({
    page,
  }) => {
    const runtimeErrors = installRuntimeErrorCapture(page);

    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).not.toHaveText("");

    const cta = page
      .getByRole("link", { name: /quero garantir meu ingresso/i })
      .first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", KIWIFY_URL);
    await expect(cta).toHaveAttribute("target", "_blank");

    const firstFaqDetails = page.locator("details").first();
    await page.locator("summary").first().click();
    await expect(firstFaqDetails).toHaveAttribute("open", "");

    await page.waitForTimeout(250);
    expect(runtimeErrors).toEqual([]);
  });

  for (const viewport of responsiveViewports) {
    test(`has no horizontal scrollbar at ${viewport.label} ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      await expect(await hasHorizontalOverflow(page)).toBe(false);

      if (viewport.width === 375) {
        await expect(page.locator('img[alt*="celular"]')).toBeVisible();

        const cta = page
          .getByRole("link", { name: /quero garantir meu ingresso/i })
          .first();
        const box = await cta.boundingBox();

        expect(box?.height ?? 0).toBeGreaterThanOrEqual(48);
      }
    });
  }

  test("passes accessibility audit and all images expose non-empty alt text", async ({
    page,
  }) => {
    await page.goto("/");
    await injectAxe(page);

    const results = await getAxeResults(page, undefined, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa"],
      },
    });
    const totalRules =
      results.passes.length + results.violations.length + results.incomplete.length;
    const accessibilityScore =
      totalRules === 0 ? 100 : Math.round((results.passes.length / totalRules) * 100);
    const violations = results.violations as AxeViolation[];
    const blockingViolations = violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );

    expect(
      accessibilityScore,
      JSON.stringify(summarizeAxeViolations(violations), null, 2),
    ).toBeGreaterThanOrEqual(90);
    expect(
      blockingViolations,
      JSON.stringify(summarizeAxeViolations(blockingViolations), null, 2),
    ).toEqual([]);

    const imageAltTexts = await page.locator("img").evaluateAll((images) =>
      images.map((image) => image.getAttribute("alt")?.trim() ?? ""),
    );

    expect(imageAltTexts.length).toBeGreaterThan(0);
    expect(imageAltTexts.every((alt) => alt.length > 0)).toBe(true);
  });

  test("switches to waitlist mode after the event timestamp", async ({ page }) => {
    await openPageThenAdvanceToPostEvent(page);

    await expect(
      page.getByRole("link", { name: /quero garantir meu ingresso/i }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("textbox", { name: /email para lista de espera/i }).first(),
    ).toBeVisible();
  });

  test("submits the post-event waitlist form successfully", async ({ page }) => {
    await openPageThenAdvanceToPostEvent(page);

    await page
      .getByRole("textbox", { name: /email para lista de espera/i })
      .first()
      .fill("teste@email.com");
    await page.getByRole("button", { name: /entrar na lista/i }).first().click();

    await expect(page.getByText(/você entrou na lista de espera/i).first()).toBeVisible();
  });
});
