import { expect, test } from "@playwright/test";

const task03BrowserFixture = `
  <main>
    <img src="/images/testimonials/IMG_6269.jpg" alt="Depoimento de aluna sobre o método de organização financeira da Rafaela.">
    <img src="/images/testimonials/IMG_6270.jpg" alt="Captura de conversa com feedback positivo sobre orientação financeira.">
    <img src="/images/testimonials/IMG_6271.jpg" alt="Depoimento em mensagem destacando resultado com finanças organizadas.">
    <img src="/images/testimonials/IMG_6272.jpg" alt="Feedback de aluna sobre clareza e confiança após acompanhamento financeiro.">
    <img src="/images/rafa.png" alt="Rafaela Ribeiro, educadora financeira do Workshop Organize-se.">
    <section aria-labelledby="faq-title">
      <h2 id="faq-title">Suas dúvidas podem ser respondidas aqui.</h2>
      <details>
        <summary>🧭 O que é o evento e o que vou aprender?</summary>
        <p>O Workshop Organize-$e é um evento online e prático.</p>
      </details>
      <details>
        <summary>🎥 O evento terá gravação?</summary>
        <p>Sim! Você terá acesso à gravação por 6 meses.</p>
      </details>
      <details>
        <summary>⏰ E se eu não puder participar ao vivo?</summary>
        <p>Não tem problema! A gravação ficará disponível.</p>
      </details>
      <details>
        <summary>📅 Quando será o evento?</summary>
        <p>Acontecerá no dia 28 de Junho.</p>
      </details>
      <details>
        <summary>💸 Tem garantia?</summary>
        <p>Sim! Você tem 7 dias de garantia.</p>
      </details>
    </section>
  </main>
`;

test.describe("task 03 static landing sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(task03BrowserFixture);
  });

  test("first FAQ summary is keyboard-focusable and Enter opens its details", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const firstSummary = page.locator("summary").first();
    const firstDetails = page.locator("details").first();

    await firstSummary.focus();
    await expect(firstSummary).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(firstDetails).toHaveAttribute("open", "");
  });

  test("clicking the first FAQ summary opens its details element", async ({ page }) => {
    const firstDetails = page.locator("details").first();

    await page.locator("summary").first().click();

    await expect(firstDetails).toHaveAttribute("open", "");
  });

  test("all images have non-empty alt attributes", async ({ page }) => {
    const images = page.locator("img");
    const imageCount = await images.count();

    await expect(images).toHaveCount(5);

    for (let index = 0; index < imageCount; index += 1) {
      await expect(images.nth(index)).toHaveAttribute("alt", /.+/);
    }
  });
});
