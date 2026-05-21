import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { label: "mobile", width: 375, height: 812 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1280, height: 800 },
] as const;

function getHeroSection(page: Page) {
  return page.locator('section[aria-labelledby="hero-title"]');
}

function getHeroTitle(page: Page) {
  return getHeroSection(page).getByRole("heading", { level: 1 });
}

function getHeroImagesContainer(page: Page) {
  return getHeroSection(page).locator("xpath=./div[2]");
}

function getBioSection(page: Page) {
  return page.locator('section[aria-labelledby="bio-title"]');
}

function getPriceSection(page: Page) {
  return page.locator('section[aria-labelledby="price-title"]');
}

function getPriceText(page: Page) {
  return getPriceSection(page).getByText("R$ 47", { exact: true });
}

function getPriceCard(page: Page) {
  return getPriceText(page).locator(
    "xpath=ancestor::div[contains(@class, 'rounded-lg') and contains(@class, 'bg-white/10')][1]",
  );
}

function getTestimonialsCarousel(page: Page) {
  return page.getByTestId("testimonials-carousel");
}

async function getSelectedSlideIndex(carousel: Locator) {
  const selectedIndex = await carousel.getAttribute("data-selected-index");

  expect(selectedIndex, "carousel should expose the selected slide index").not.toBeNull();

  return Number(selectedIndex);
}

async function expectBox(locator: Locator, label: string) {
  const box = await locator.boundingBox();

  expect(box, `${label} bounding box should be available`).not.toBeNull();

  return box!;
}

async function expectPriceCentered(page: Page) {
  const priceText = getPriceText(page);
  const priceCard = getPriceCard(page);

  await expect(priceText).toBeVisible();
  await expect(priceCard).toBeVisible();

  const priceBox = await expectBox(priceText, "price text");
  const cardBox = await expectBox(priceCard, "price card");
  const priceMidpoint = priceBox.x + priceBox.width / 2;
  const cardMidpoint = cardBox.x + cardBox.width / 2;

  expect(
    Math.abs(priceMidpoint - cardMidpoint),
    "R$ 47 midpoint should align with the price card midpoint within 4px",
  ).toBeLessThanOrEqual(4);
}

test.describe("second fixes landing page batch", () => {
  test("F1 captures no key-prop console warnings during page load", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const keyPropWarnings: string[] = [];

    page.on("console", (message) => {
      const text = message.text();

      if (/key.*prop/i.test(text)) {
        keyPropWarnings.push(text);
      }
    });

    await page.goto("/");
    await expect(getBioSection(page)).toBeVisible();

    expect(keyPropWarnings).toEqual([]);
  });

  test("F2 renders the Instagram SVG gradient in BioSection", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(getBioSection(page).locator("svg linearGradient#ig-gradient")).toHaveCount(
      1,
    );
  });

  test("F3 uses the new hero image sources", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const heroImages = getHeroSection(page).locator("img");
    await expect(heroImages).toHaveCount(3);

    const imageSources = await heroImages.evaluateAll((images) =>
      images.map((image) => image.getAttribute("src") ?? ""),
    );

    expect(imageSources.every((src) => src.includes("new-hero"))).toBe(true);
  });

  test("F4 renders the hero images above the headline at 375px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const imagesContainer = getHeroImagesContainer(page);
    const heroTitle = getHeroTitle(page);

    await expect(imagesContainer).toBeVisible();
    await expect(heroTitle).toBeVisible();

    const imagesBox = await expectBox(imagesContainer, "hero images container");
    const titleBox = await expectBox(heroTitle, "hero title");

    expect(imagesBox.y).toBeLessThan(titleBox.y);
  });

  for (const viewport of viewports) {
    test(`F5 renders the updated headline at ${viewport.label} ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      await expect(getHeroTitle(page)).toContainText("Plano Prático");
    });
  }

  test("F6 applies a scale transform when the CTA is hovered", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const cta = page.getByRole("link", { name: /quero garantir meu ingresso/i }).first();

    await expect(cta).toBeVisible();
    const ctaBox = await expectBox(cta, "CTA button");
    await page.mouse.move(ctaBox.x + ctaBox.width / 2, ctaBox.y + ctaBox.height / 2);

    await expect
      .poll(() => cta.evaluate((element) => getComputedStyle(element).transform))
      .toContain("matrix");
  });

  test("F7 shows the carousel and auto-advances after 11 seconds", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const carousel = getTestimonialsCarousel(page);

    await expect(carousel).toBeVisible();
    await carousel.scrollIntoViewIfNeeded();

    const initialIndex = await getSelectedSlideIndex(carousel);

    await page.waitForTimeout(11_000);

    const advancedIndex = await getSelectedSlideIndex(carousel);

    expect(advancedIndex).not.toBe(initialIndex);
  });

  test("F7 supports swipe navigation at 375px", async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: "http://localhost:3000",
      hasTouch: true,
      isMobile: true,
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();

    try {
      await page.goto("/");

      const carousel = getTestimonialsCarousel(page);

      await expect(carousel).toBeVisible();
      await carousel.scrollIntoViewIfNeeded();

      const initialIndex = await getSelectedSlideIndex(carousel);
      const box = await expectBox(carousel, "testimonials carousel");
      const startX = box.x + box.width * 0.85;
      const endX = box.x + box.width * 0.15;
      const y = box.y + box.height / 2;
      const client = await context.newCDPSession(page);

      await client.send("Input.dispatchTouchEvent", {
        touchPoints: [{ x: startX, y }],
        type: "touchStart",
      });

      for (let step = 1; step <= 8; step += 1) {
        const x = startX + ((endX - startX) * step) / 8;

        await client.send("Input.dispatchTouchEvent", {
          touchPoints: [{ x, y }],
          type: "touchMove",
        });
      }

      await client.send("Input.dispatchTouchEvent", {
        touchPoints: [],
        type: "touchEnd",
      });

      await expect
        .poll(() => getSelectedSlideIndex(carousel))
        .not.toBe(initialIndex);
    } finally {
      await context.close();
    }
  });

  test("F8 removes BioSection blockquotes and F10 uses the updated bio photo", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const bioSection = getBioSection(page);

    await expect(bioSection).toBeVisible();
    await expect(bioSection.locator("blockquote")).toHaveCount(0);
    await expect(bioSection.locator("img")).toHaveAttribute("src", /sobre-rafa/);
  });

  for (const viewport of viewports) {
    test(`F9 centers the price inside its card at ${viewport.label} ${viewport.width}px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      await expectPriceCentered(page);
    });
  }
});
