import { expect, test } from "@playwright/test";

const waitlistFormBrowserFixture = `
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      padding: 24px;
      background: #18181b;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
    }

    form {
      width: 100%;
      max-width: 520px;
      border: 1px solid rgb(255 255 255 / 0.16);
      border-radius: 8px;
      padding: 16px;
      background: rgb(255 255 255 / 0.1);
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    @media (min-width: 640px) {
      .row {
        flex-direction: row;
      }
    }

    label {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }

    input,
    button {
      min-height: 48px;
      border-radius: 6px;
      font-size: 16px;
    }

    input {
      width: 100%;
      border: 1px solid rgb(255 255 255 / 0.2);
      padding: 12px 16px;
      color: #18181b;
      font-weight: 600;
    }

    button {
      border: 0;
      padding: 12px 20px;
      background: #fde047;
      color: #18181b;
      font-weight: 900;
      text-transform: uppercase;
    }

    .message {
      margin-top: 12px;
      font-size: 14px;
      font-weight: 700;
    }

    .error {
      color: #fecaca;
    }

    .success {
      color: #a7f3d0;
    }
  </style>

  <form aria-describedby="waitlist-form-message" novalidate>
    <div class="row">
      <div>
        <label for="waitlist-email">Email para lista de espera</label>
        <input
          aria-label="Email para lista de espera"
          id="waitlist-email"
          inputmode="email"
          name="email"
          placeholder="Seu melhor email"
          required
          type="email"
        />
      </div>
      <button type="submit">Entrar na lista</button>
    </div>
    <p aria-live="polite" class="message" id="waitlist-form-message"></p>
  </form>

  <script>
    const form = document.querySelector("form");
    const message = document.querySelector("#waitlist-form-message");
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = new FormData(form).get("email").trim();

      if (!emailPattern.test(email)) {
        message.textContent = "Email inválido.";
        message.className = "message error";
        message.setAttribute("role", "alert");
        return;
      }

      message.textContent =
        "Pronto, você entrou na lista de espera. Avisaremos quando a próxima turma abrir.";
      message.className = "message success";
      message.removeAttribute("role");
    });
  </script>
`;

test.describe("WaitlistForm submission flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.setContent(waitlistFormBrowserFixture);
  });

  test("shows a success message after submitting a valid email", async ({ page }) => {
    await page.getByRole("textbox", { name: /email para lista de espera/i }).fill("teste@email.com");
    await page.getByRole("button", { name: /entrar na lista/i }).click();

    await expect(page.getByText(/você entrou na lista de espera/i)).toBeVisible();
  });

  test('shows "Email inválido." after submitting an invalid email', async ({ page }) => {
    await page.getByRole("textbox", { name: /email para lista de espera/i }).fill("invalido");
    await page.getByRole("button", { name: /entrar na lista/i }).click();

    await expect(page.getByRole("alert")).toHaveText("Email inválido.");
  });
});
