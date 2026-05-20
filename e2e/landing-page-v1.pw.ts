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

type PainQualifierCenteredElement = "countdown" | "cta";

declare global {
  interface Window {
    __TEST_NOW__?: number;
  }
}

const responsiveViewports = [
  { label: "small mobile", width: 320, height: 568 },
  { label: "iPhone 14", width: 375, height: 812 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1280, height: 800 },
] as const;

const painQualifierCenteringViewports = [
  { label: "mobile", width: 375, height: 812 },
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

function getPainQualifier(page: Page) {
  return page.locator('section[aria-labelledby="pain-qualifier-title"]');
}

function getPainQualifierCountdown(page: Page) {
  return getPainQualifier(page).getByLabel("Contagem regressiva para o workshop");
}

function getPainQualifierCta(page: Page) {
  return getPainQualifier(page).getByRole("link", {
    name: /quero garantir meu ingresso/i,
  });
}

function getPainQualifierCtaWrapper(page: Page) {
  return getPainQualifierCountdown(page).locator("xpath=../..");
}

function getGuaranteeSeals(page: Page) {
  return page.locator(
    '[aria-label="7 dias de garantia — satisfação garantida ou seu dinheiro de volta"]',
  );
}

function getInstagramHandleButton(page: Page) {
  return page.getByRole("link", { name: /@rafaelaribeirofinancas/i });
}

function getCheckoutButtons(page: Page) {
  return page.getByRole("link", { name: /quero garantir meu ingresso/i });
}

function getHeroSection(page: Page) {
  return page.locator('section[aria-labelledby="hero-title"]');
}

function getHeroTitle(page: Page) {
  return getHeroSection(page).getByRole("heading", { level: 1 });
}

function getHeroMobileImage(page: Page) {
  return getHeroSection(page).locator('img[alt*="celular"]');
}

function getHeroTabletImage(page: Page) {
  return getHeroSection(page).locator('img[alt*="tablets"]');
}

async function expectElementToBeCenteredAtViewportMidpoint(
  page: Page,
  selectorName: PainQualifierCenteredElement,
) {
  const target =
    selectorName === "countdown"
      ? getPainQualifierCountdown(page)
      : getPainQualifierCta(page);
  const box = await target.boundingBox();

  expect(box, `${selectorName} bounding box should be available`).not.toBeNull();

  const viewport = page.viewportSize();
  expect(viewport, "viewport size should be available").not.toBeNull();

  const elementCenterX = box!.x + box!.width / 2;
  const viewportCenterX = viewport!.width / 2;

  expect(
    Math.abs(elementCenterX - viewportCenterX),
    `${selectorName} should be centered within 5px of the viewport midpoint`,
  ).toBeLessThanOrEqual(5);
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

  test("renders the brand with the required uppercase casing", async ({ page }) => {
    await page.goto("/");

    const brandMatches = await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const matches: string[] = [];
      let node = walker.nextNode();

      while (node) {
        const text = node.textContent ?? "";
        const brandOccurrences = text.match(/organize-\$e/gi) ?? [];

        matches.push(...brandOccurrences);
        node = walker.nextNode();
      }

      return matches;
    });

    expect(brandMatches.length).toBeGreaterThan(0);
    expect(brandMatches.every((match) => match === "ORGANIZE-$E")).toBe(true);
  });

  test("loads display and body fonts and applies Bebas Neue to the first h1", async ({
    page,
  }) => {
    await page.goto("/");

    await page.evaluate(() => document.fonts.ready);

    const fontChecks = await page.evaluate(() => ({
      bebasNeue: document.fonts.check("1em Bebas Neue"),
      inter: document.fonts.check("1em Inter"),
      h1FontFamily: getComputedStyle(document.querySelector("h1")!).fontFamily,
    }));

    expect(fontChecks.bebasNeue).toBe(true);
    expect(fontChecks.inter).toBe(true);
    expect(fontChecks.h1FontFamily).toContain("Bebas Neue");
  });

  test("centers the CTABlock container inside PainQualifier", async ({ page }) => {
    await page.goto("/");

    const ctaWrapperStyles = await getPainQualifierCtaWrapper(page).evaluate(
      (element) => {
        const styles = getComputedStyle(element);

        return {
          alignItems: styles.alignItems,
          display: styles.display,
          flexDirection: styles.flexDirection,
          textAlign: styles.textAlign,
        };
      },
    );

    expect(ctaWrapperStyles.display).toBe("flex");
    expect(ctaWrapperStyles.flexDirection).toBe("column");
    expect(ctaWrapperStyles.alignItems).toBe("center");
    expect(ctaWrapperStyles.textAlign).toBe("center");
  });

  for (const viewport of painQualifierCenteringViewports) {
    test(`centers the PainQualifier countdown and CTA at ${viewport.label} ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      await expectElementToBeCenteredAtViewportMidpoint(page, "countdown");
      await expectElementToBeCenteredAtViewportMidpoint(page, "cta");
    });
  }

  test("renders yellow circular guarantee seals with accessible labels and no emerald classes", async ({
    page,
  }) => {
    await page.goto("/");

    const seals = getGuaranteeSeals(page);
    await expect(seals).toHaveCount(2);

    const sealResults = await seals.evaluateAll((elements) =>
      elements.map((element) => {
        const styles = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        const radius = styles.borderTopLeftRadius;
        const classNames = [element, ...Array.from(element.querySelectorAll("*"))]
          .map((node) => node.getAttribute("class") ?? "")
          .join(" ");

        return {
          ariaLabel: element.getAttribute("aria-label"),
          borderRadius: radius.endsWith("%")
            ? (parseFloat(radius) / 100) * Math.min(box.width, box.height)
            : parseFloat(radius),
          classNames,
          height: box.height,
          width: box.width,
        };
      }),
    );

    for (const result of sealResults) {
      expect(result.ariaLabel?.trim().length ?? 0).toBeGreaterThan(0);
      expect(result.borderRadius).toBeGreaterThanOrEqual(
        Math.min(result.width, result.height) / 2,
      );
      expect(result.classNames).not.toMatch(/emerald/i);
    }
  });

  for (const viewport of responsiveViewports) {
    test(`keeps guarantee seals circular without clipping at ${viewport.label} ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const sealResults = await getGuaranteeSeals(page).evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();

          return {
            clientHeight: element.clientHeight,
            clientWidth: element.clientWidth,
            height: box.height,
            scrollHeight: element.scrollHeight,
            scrollWidth: element.scrollWidth,
            width: box.width,
          };
        }),
      );

      expect(sealResults.length).toBe(2);

      for (const result of sealResults) {
        expect(result.scrollWidth).toBeLessThanOrEqual(result.clientWidth);
        expect(result.scrollHeight).toBeLessThanOrEqual(result.clientHeight);
        expect(Math.abs(result.width - result.height)).toBeLessThanOrEqual(1);
      }
    });
  }

  test("renders the Instagram icon before the BioSection handle text", async ({
    page,
  }) => {
    await page.goto("/");

    const handleButton = getInstagramHandleButton(page);
    await expect(handleButton.locator('svg[aria-hidden="true"]')).toHaveCount(1);

    const iconPrecedesText = await handleButton.evaluate((element) => {
      const icon = element.querySelector('svg[aria-hidden="true"]');
      const handleTextNode = Array.from(element.childNodes).find(
        (node) =>
          node.nodeType === Node.TEXT_NODE &&
          node.textContent?.includes("@rafaelaribeirofinancas"),
      );

      return Boolean(
        icon &&
          handleTextNode &&
          (icon.compareDocumentPosition(handleTextNode) &
            Node.DOCUMENT_POSITION_FOLLOWING),
      );
    });

    expect(iconPrecedesText).toBe(true);
  });

  test("animates checkout buttons with the scale pulse keyframe", async ({
    page,
  }) => {
    await page.goto("/");

    const checkoutButtons = getCheckoutButtons(page);
    await expect(checkoutButtons.first()).toBeVisible();

    const animationNames = await checkoutButtons.evaluateAll((buttons) =>
      buttons.map((button) => getComputedStyle(button).animationName),
    );

    expect(animationNames.length).toBeGreaterThan(0);
    expect(animationNames.every((name) => name === "scale-pulse")).toBe(true);
    expect(animationNames).not.toContain("pulse-glow");
  });

  test("disables checkout button animation when reduced motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const checkoutButtons = getCheckoutButtons(page);
    await expect(checkoutButtons.first()).toBeVisible();

    const animationNames = await checkoutButtons.evaluateAll((buttons) =>
      buttons.map((button) => getComputedStyle(button).animationName),
    );

    expect(animationNames.length).toBeGreaterThan(0);
    expect(animationNames.every((name) => name === "none")).toBe(true);
  });

  test("renders the hero title above the image on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const heroTitle = getHeroTitle(page);
    const heroImage = getHeroMobileImage(page);

    await expect(heroTitle).toBeVisible();
    await expect(heroImage).toBeVisible();

    const titleBox = await heroTitle.boundingBox();
    const imageBox = await heroImage.boundingBox();

    expect(titleBox, "hero title bounding box should be available").not.toBeNull();
    expect(imageBox, "hero mobile image bounding box should be available").not.toBeNull();
    expect(titleBox!.y).toBeLessThan(imageBox!.y);
  });

  test("keeps the hero image above the title at tablet and larger viewports", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const heroTitle = getHeroTitle(page);
    const heroImage = getHeroTabletImage(page);

    await expect(heroTitle).toBeVisible();
    await expect(heroImage).toBeVisible();

    const titleBox = await heroTitle.boundingBox();
    const imageBox = await heroImage.boundingBox();

    expect(titleBox, "hero title bounding box should be available").not.toBeNull();
    expect(imageBox, "hero tablet image bounding box should be available").not.toBeNull();
    expect(imageBox!.y).toBeLessThan(titleBox!.y);
  });

  test("keeps countdown labels visible without grid overflow at 320px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    const countdownGrids = page.getByLabel("Contagem regressiva para o workshop");
    await expect(countdownGrids.first()).toBeVisible();

    const gridResults = await countdownGrids.evaluateAll((grids) =>
      grids.map((grid) => {
        const labels = ["dias", "horas", "minutos", "segundos"];
        const elements = Array.from(grid.querySelectorAll("*"));
        const overflowingElements = elements
          .filter((element) => element.scrollWidth > element.clientWidth)
          .map((element) => ({
            className: element.getAttribute("class"),
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            text: element.textContent?.trim(),
          }));
        const labelVisibility = labels.map((label) => {
          const element = Array.from(grid.querySelectorAll("span")).find(
            (span) => span.textContent?.trim().toLowerCase() === label,
          );
          const box = element?.getBoundingClientRect();
          const styles = element ? getComputedStyle(element) : null;

          return {
            label,
            visible: Boolean(
              box &&
                box.width > 0 &&
                box.height > 0 &&
                styles?.visibility !== "hidden" &&
                styles?.display !== "none",
            ),
          };
        });

        return {
          overflowingElements,
          labelVisibility,
        };
      }),
    );

    expect(gridResults.length).toBeGreaterThan(0);

    for (const result of gridResults) {
      expect(result.overflowingElements).toEqual([]);
      expect(result.labelVisibility).toEqual([
        { label: "dias", visible: true },
        { label: "horas", visible: true },
        { label: "minutos", visible: true },
        { label: "segundos", visible: true },
      ]);
    }
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
