import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { label: "mobile", width: 375, height: 812 },
  { label: "desktop", width: 1280, height: 800 },
] as const;

function getFaviconLinks(page: Page) {
  return page.locator('head link[rel="icon"], head link[rel="shortcut icon"]');
}

function getPulseCta(page: Page) {
  return page.locator("a.animate-scale-pulse");
}

async function expectBox(locator: Locator, label: string) {
  const box = await locator.boundingBox();

  expect(box, `${label} bounding box should be available`).not.toBeNull();

  return box!;
}

test.describe("third fixes landing page batch", () => {
  test("T1 emits no console errors on a desktop cold load", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const errors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(message.text());
      }
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(errors, "No console errors on cold load").toHaveLength(0);
  });

  test("T2 emits exactly one favicon link in the desktop head", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(getFaviconLinks(page)).toHaveCount(1);
  });

  for (const viewport of viewports) {
    test(`T3 keeps the animated CTA inside parent width minus 8px at ${viewport.label} ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      const ctas = getPulseCta(page);
      const ctaCount = await ctas.count();

      expect(ctaCount, "page should render animated CTA links").toBeGreaterThan(0);

      for (let index = 0; index < ctaCount; index += 1) {
        const cta = ctas.nth(index);
        const parent = cta.locator("xpath=..");

        await expect(cta).toBeVisible();

        const ctaBox = await expectBox(cta, `animated CTA ${index + 1}`);
        const parentBox = await expectBox(parent, `animated CTA ${index + 1} parent`);

        expect(
          ctaBox.width,
          `animated CTA ${index + 1} width should be at most parent width minus the 8px px-1 clearance`,
        ).toBeLessThanOrEqual(parentBox.width - 8);
      }
    });
  }

  test("T4 renders the updated first-person bio text on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.getByText("Tenho 32 anos, sou nordestina")).toBeVisible();
  });

  test("T5 sets the desktop document language to pt-BR", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const lang = await page.evaluate(() => document.documentElement.lang);

    expect(lang).toBe("pt-BR");
  });
});
