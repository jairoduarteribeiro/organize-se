import { render, screen, within } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { BioSection } from "@/app/components/landing/BioSection";
import { Deliverables } from "@/app/components/landing/Deliverables";
import { FaqAccordion } from "@/app/components/landing/FaqAccordion";
import { GuaranteeSeal } from "@/app/components/landing/GuaranteeSeal";
import { PainQualifier } from "@/app/components/landing/PainQualifier";
import { Testimonials } from "@/app/components/landing/Testimonials";
import { INSTAGRAM_URL } from "@/app/lib/constants";

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

  it("renders every component without empty image alt attributes", () => {
    render(
      <>
        <PainQualifier />
        <Testimonials />
        <BioSection />
        <GuaranteeSeal />
        <FaqAccordion />
        <Deliverables />
      </>,
    );

    for (const image of screen.getAllByRole("img")) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
    }
  });
});
