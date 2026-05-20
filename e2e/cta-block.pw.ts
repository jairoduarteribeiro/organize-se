import { expect, test } from "@playwright/test";

const ctaBlockBrowserFixture = `
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    .cta-block {
      width: 100%;
      overflow-x: clip;
      padding: 20px;
      background: #18181b;
    }

    .countdown {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      text-align: center;
    }

    .countdown-item {
      min-width: 0;
      border: 1px solid rgb(255 255 255 / 0.16);
      border-radius: 8px;
      padding: 12px 8px;
      color: white;
    }

    .countdown-value {
      display: block;
      font-size: 24px;
      font-weight: 900;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .countdown-label {
      display: block;
      margin-top: 8px;
      color: rgb(255 255 255 / 0.75);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .kiwify-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 48px;
      margin-top: 20px;
      border-radius: 6px;
      background: #fde047;
      color: #18181b;
      font-weight: 900;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
    }
  </style>
  <div class="cta-block">
    <div aria-label="Contagem regressiva para o workshop" class="countdown">
      <div class="countdown-item">
        <span class="countdown-value" data-unit="days">00</span>
        <span class="countdown-label">dias</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value" data-unit="hours">00</span>
        <span class="countdown-label">horas</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value" data-unit="minutes">00</span>
        <span class="countdown-label">minutos</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value" data-testid="seconds" data-unit="seconds">00</span>
        <span class="countdown-label">segundos</span>
      </div>
    </div>
    <p>28 de junho, 10h, horário de Brasília</p>
    <a class="kiwify-button animate-scale-pulse hover:animate-none" href="https://pay.kiwify.com.br/3qkvzij" target="_blank" rel="noopener noreferrer">
      Quero garantir meu ingresso
    </a>
  </div>
  <script>
    const target = new Date("2026-06-28T13:00:00Z").getTime();
    const units = {
      days: 86400000,
      hours: 3600000,
      minutes: 60000,
      seconds: 1000,
    };

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function renderCountdown() {
      let remaining = Math.max(target - Date.now(), 0);
      const days = Math.floor(remaining / units.days);
      remaining %= units.days;
      const hours = Math.floor(remaining / units.hours);
      remaining %= units.hours;
      const minutes = Math.floor(remaining / units.minutes);
      remaining %= units.minutes;
      const seconds = Math.floor(remaining / units.seconds);

      document.querySelector('[data-unit="days"]').textContent = pad(days);
      document.querySelector('[data-unit="hours"]').textContent = pad(hours);
      document.querySelector('[data-unit="minutes"]').textContent = pad(minutes);
      document.querySelector('[data-unit="seconds"]').textContent = pad(seconds);
    }

    renderCountdown();
    window.setInterval(renderCountdown, 1000);
  </script>
`;

test.describe("task 04 CTA block browser behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.setContent(ctaBlockBrowserFixture);
  });

  test("Kiwify button renders at 375px without horizontal overflow", async ({ page }) => {
    const button = page.getByRole("link", { name: /quero garantir meu ingresso/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("target", "_blank");
    await expect(button).toHaveCSS("min-height", "48px");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });

  test("countdown digits update every second in the browser", async ({ page }) => {
    const seconds = page.getByTestId("seconds");
    const before = await seconds.textContent();

    await page.waitForTimeout(1100);

    await expect(seconds).not.toHaveText(before ?? "");
  });
});
