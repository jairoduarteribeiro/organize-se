import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { createElement } from "react";

import { BioSection } from "@/app/components/landing/BioSection";
import { Deliverables } from "@/app/components/landing/Deliverables";
import { FaqAccordion } from "@/app/components/landing/FaqAccordion";
import { FinalCTA } from "@/app/components/landing/FinalCTA";
import { GuaranteeSeal } from "@/app/components/landing/GuaranteeSeal";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { PainQualifier } from "@/app/components/landing/PainQualifier";
import { PriceBlock } from "@/app/components/landing/PriceBlock";
import { Testimonials } from "@/app/components/landing/Testimonials";
import { INSTAGRAM_URL, KIWIFY_URL } from "@/app/lib/constants";

vi.mock("next/image", () => ({
  default(props: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) {
    const { fill, priority, ...imageProps } = props;

    void fill;
    void priority;

    return createElement("img", imageProps);
  },
}));

describe("static landing Server Components", () => {
  afterEach(() => {
    cleanup();
  });

  it("PainQualifier renders exactly 7 pain point list items", () => {
    render(<PainQualifier />);

    const list = screen.getByRole("list", {
      name: "Situações financeiras comuns",
    });

    expect(within(list).getAllByRole("listitem")).toHaveLength(7);
  });

  it("Testimonials renders 4 images with non-empty alt attributes", () => {
    render(<Testimonials />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(4);
    for (const image of images) {
      expect(image.hasAttribute("alt")).toBe(true);
      expect(image.getAttribute("alt")?.trim()).not.toBe("");
    }
  });

  it("BioSection renders the Instagram link from constants", () => {
    render(<BioSection />);

    expect(screen.getByRole("link", { name: "@rafaelaribeirofinancas" }).getAttribute("href")).toBe(
      INSTAGRAM_URL,
    );
  });

  it('GuaranteeSeal renders text containing "7 dias de garantia"', () => {
    render(<GuaranteeSeal />);

    expect(screen.getByText(/7 dias de garantia/i)).toBeTruthy();
  });

  it("FaqAccordion renders exactly 5 details elements", () => {
    const { container } = render(<FaqAccordion />);

    expect(container.querySelectorAll("details")).toHaveLength(5);
  });

  it("Deliverables renders exactly 4 checklist items", () => {
    render(<Deliverables />);

    const list = screen.getByRole("list", {
      name: "Entregáveis do workshop",
    });

    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
  });

  it("HeroSection renders an image with non-empty alt text and a Kiwify CTA", () => {
    render(<HeroSection />);

    const heroImages = screen.getAllByRole("img");
    const heroCta = screen.getByRole("link", {
      name: /quero garantir meu ingresso/i,
    });

    expect(heroImages.length).toBeGreaterThan(0);
    expect(heroImages[0].getAttribute("alt")?.trim()).toBeTruthy();
    expect(heroCta.getAttribute("href")).toContain("kiwify.com.br");
    expect(heroCta.getAttribute("href")).toBe(KIWIFY_URL);
  });

  it('PriceBlock renders the "R$ 47" price', () => {
    render(<PriceBlock />);

    expect(screen.getByText("R$ 47")).toBeTruthy();
  });

  it('FinalCTA renders guarantee copy containing "garantia"', () => {
    render(<FinalCTA />);

    expect(screen.getByText("7 dias de garantia")).toBeTruthy();
  });

  it("renders every component without empty image alt attributes", () => {
    render(
      <>
        <HeroSection />
        <PainQualifier />
        <Testimonials />
        <BioSection />
        <GuaranteeSeal />
        <FaqAccordion />
        <Deliverables />
        <PriceBlock />
        <FinalCTA />
      </>,
    );

    for (const image of screen.getAllByRole("img")) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
    }
  });
});
