import { expect, test } from "@playwright/test";

import { KIWIFY_URL } from "../app/lib/constants";

const viewports = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

test.describe("task 06 composed landing page", () => {
  test("page loads without JavaScript console errors", async ({ page }) => {
    const runtimeErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        runtimeErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      runtimeErrors.push(error.message);
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForTimeout(250);

    expect(runtimeErrors).toEqual([]);
  });

  test("visible Kiwify CTA has the exact configured URL", async ({ page }) => {
    await page.goto("/");

    const cta = page
      .getByRole("link", { name: /quero garantir meu ingresso/i })
      .first();

    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", KIWIFY_URL);
  });

  for (const viewport of viewports) {
    test(`has no horizontal scrollbar at ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );

      expect(hasHorizontalOverflow).toBe(false);
    });
  }
});
