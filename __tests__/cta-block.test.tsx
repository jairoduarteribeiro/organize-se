import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CTABlock } from "@/app/components/landing/CTABlock";
import { KIWIFY_URL } from "@/app/lib/constants";

describe("CTABlock", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders countdown digits, Brasília label, and Kiwify CTA before the event", () => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-27T13:00:00.000Z").getTime(),
    );

    render(<CTABlock />);

    const countdown = screen.getByLabelText("Contagem regressiva para o workshop");
    expect(within(countdown).getByText("01")).toBeTruthy();
    expect(within(countdown).getAllByText("00")).toHaveLength(3);
    expect(screen.getByText(/horário de Brasília/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /quero garantir meu ingresso/i })).toBeTruthy();
  });

  it("renders the Kiwify button with the required URL, attributes, animation, and touch height", () => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-27T13:00:00.000Z").getTime(),
    );

    render(<CTABlock />);

    const link = screen.getByRole("link", {
      name: /quero garantir meu ingresso/i,
    });

    expect(link.getAttribute("href")).toBe(KIWIFY_URL);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.className).toContain("animate-scale-pulse");
    expect(link.className).toContain("hover:animate-none");
    expect(link.className).not.toContain("animate-pulse-glow");
    expect(parseFloat(getComputedStyle(link).minHeight)).toBeGreaterThanOrEqual(48);
  });

  it("hides the countdown and renders the recording checkout link after the event", () => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-28T13:00:01.000Z").getTime(),
    );

    render(<CTABlock />);

    expect(screen.queryByLabelText("Contagem regressiva para o workshop")).toBeNull();
    expect(screen.queryByRole("link", { name: /quero garantir meu ingresso/i })).toBeNull();
    expect(screen.getByRole("link", { name: /gravação/i })).toBeTruthy();
    expect(screen.getByText(/workshop ao vivo já aconteceu/i)).toBeTruthy();
  });

  it("renders the post-event recording link with the required URL, attributes, animation, and touch height", () => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-28T13:00:01.000Z").getTime(),
    );

    render(<CTABlock />);

    const link = screen.getByRole("link", {
      name: /quero acessar a gravação/i,
    });

    expect(link.getAttribute("href")).toBe(KIWIFY_URL);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.className).toContain("animate-scale-pulse");
    expect(link.className).toContain("hover:animate-none");
    expect(parseFloat(getComputedStyle(link).minHeight)).toBeGreaterThanOrEqual(48);
  });

  it("does not render waitlist email textbox or submit button after the event", () => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-28T13:00:01.000Z").getTime(),
    );

    render(<CTABlock />);

    expect(
      screen.queryByRole("textbox", { name: /email para lista de espera/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /entrar na lista/i }),
    ).toBeNull();
  });
});
