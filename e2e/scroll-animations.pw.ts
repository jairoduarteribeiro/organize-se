import { expect, test } from "@playwright/test";

test.describe("task 07 scroll animations", () => {
  test("Deliverables checklist items reveal when scrolled into view", async ({ page }) => {
    await page.goto("/");

    const firstDeliverable = page.getByTestId("deliverable-item").first();

    await expect(firstDeliverable).toHaveClass(/opacity-0/);

    await firstDeliverable.scrollIntoViewIfNeeded();

    await expect(firstDeliverable).toHaveClass(/opacity-100/);
    await expect(firstDeliverable).toHaveClass(/is-visible/);
  });

  test("reduced motion suppresses active CSS animations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const cta = page.getByRole("link", { name: /quero garantir meu ingresso/i }).first();
    const firstDeliverable = page.getByTestId("deliverable-item").first();

    await expect(cta).toBeVisible();

    const motionStyles = await Promise.all([
      cta.evaluate((element) => getComputedStyle(element).animationName),
      cta.evaluate((element) => getComputedStyle(element).transitionDuration),
      firstDeliverable.evaluate((element) => getComputedStyle(element).transitionDuration),
    ]);

    expect(motionStyles).toEqual(["none", "0s", "0s"]);
  });
});
