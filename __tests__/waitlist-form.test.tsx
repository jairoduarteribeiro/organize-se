import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { WaitlistForm } from "@/app/components/landing/WaitlistForm";

describe("WaitlistForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders an email input and submit button with 48px touch targets", () => {
    render(<WaitlistForm />);

    const input = screen.getByRole("textbox", {
      name: /email para lista de espera/i,
    });
    const button = screen.getByRole("button", {
      name: /entrar na lista/i,
    });

    expect(input.getAttribute("type")).toBe("email");
    expect(input.getAttribute("name")).toBe("email");
    expect(parseFloat(getComputedStyle(input).minHeight)).toBeGreaterThanOrEqual(48);
    expect(parseFloat(getComputedStyle(button).minHeight)).toBeGreaterThanOrEqual(48);
  });

  it("displays the error message when rendered with an error state", () => {
    render(<WaitlistForm initialState={{ success: false, error: "Email inválido." }} />);

    expect(screen.getByRole("alert").textContent).toBe("Email inválido.");
  });

  it("displays a Portuguese success confirmation when rendered with success state", () => {
    render(<WaitlistForm initialState={{ success: true }} />);

    expect(screen.getByText(/você entrou na lista de espera/i)).toBeTruthy();
    expect(screen.getByText(/próxima turma abrir/i)).toBeTruthy();
  });
});
