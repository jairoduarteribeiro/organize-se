import { act } from "react";
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

    return createElement("img", {
      ...imageProps,
      "data-priority": priority ? "true" : undefined,
    });
  },
}));

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  callback: ObserverCallback;
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
  unobserve = vi.fn();

  constructor(callback: ObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [
        {
          isIntersecting,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }
}

describe("static landing Server Components", () => {
  afterEach(() => {
    cleanup();
    Reflect.deleteProperty(window, "IntersectionObserver");
    MockIntersectionObserver.instances = [];
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

  it("GuaranteeSeal renders the circular stamp copy and accessible label", () => {
    const { container } = render(<GuaranteeSeal />);

    const seal = container.querySelector(
      '[aria-label="7 dias de garantia — satisfação garantida ou seu dinheiro de volta"]',
    );

    expect(seal).toBeTruthy();
    expect(screen.getByText("7 DIAS")).toBeTruthy();
    expect(screen.getByText("GARANTIA")).toBeTruthy();
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

  it("Deliverables starts with hidden checklist items before in-view fires", () => {
    window.IntersectionObserver = MockIntersectionObserver;

    render(<Deliverables />);

    const items = screen.getAllByTestId("deliverable-item");

    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(item.className).toContain("opacity-0");
      expect(item.className).toContain("translate-y-4");
      expect(item.className).not.toContain("is-visible");
    }
  });

  it("Deliverables checklist items become visible after IntersectionObserver fires", () => {
    window.IntersectionObserver = MockIntersectionObserver;

    render(<Deliverables />);

    act(() => {
      MockIntersectionObserver.instances[1]?.trigger(true);
    });

    for (const item of screen.getAllByTestId("deliverable-item")) {
      expect(item.className).toContain("is-visible");
      expect(item.className).toContain("opacity-100");
      expect(item.className).toContain("translate-y-0");
    }
  });

  it("Deliverables checklist items have distinct stagger delay classes", () => {
    render(<Deliverables />);

    const delayClasses = screen
      .getAllByTestId("deliverable-item")
      .map((item) => Array.from(item.classList).find((className) => /^delay-\d+$/.test(className)));

    expect(delayClasses).toEqual(["delay-100", "delay-200", "delay-300", "delay-400"]);
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

  it("HeroSection marks the first rendered hero image as priority", () => {
    render(<HeroSection />);

    const heroImages = screen.getAllByRole("img");

    expect(heroImages[0].getAttribute("data-priority")).toBe("true");
  });

  it('PriceBlock renders the "R$ 47" price', () => {
    render(<PriceBlock />);

    expect(screen.getByText("R$ 47")).toBeTruthy();
  });

  it("FinalCTA renders the shared guarantee seal", () => {
    render(<FinalCTA />);

    expect(
      screen.getByLabelText(
        "7 dias de garantia — satisfação garantida ou seu dinheiro de volta",
      ),
    ).toBeTruthy();
    expect(screen.getByText("7 DIAS")).toBeTruthy();
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
