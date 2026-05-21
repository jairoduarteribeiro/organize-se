import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const componentFiles = [
  "HeroSection.tsx",
  "PainQualifier.tsx",
  "Testimonials.tsx",
  "BioSection.tsx",
  "GuaranteeSeal.tsx",
  "FaqAccordion.tsx",
  "Deliverables.tsx",
  "PriceBlock.tsx",
  "FinalCTA.tsx",
];

const scrollAnimationClientComponents = [
  "PainQualifier.tsx",
  "BioSection.tsx",
  "Deliverables.tsx",
];

const interactiveClientComponents = [
  ...scrollAnimationClientComponents,
  "Testimonials.tsx",
];

describe("static landing component source constraints", () => {
  it('keeps non-interactive landing Server Components free of "use client" directives', () => {
    for (const file of componentFiles.filter(
      (file) => !interactiveClientComponents.includes(file),
    )) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );

      expect(source).not.toContain('"use client"');
      expect(source).not.toContain("'use client'");
    }
  });

  it('marks interactive sections with "use client"', () => {
    for (const file of interactiveClientComponents) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );

      expect(source.startsWith('"use client";')).toBe(true);
    }
  });

  it("keeps scroll-animation sections wired to useInView", () => {
    for (const file of scrollAnimationClientComponents) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );

      expect(source).toContain("useInView");
    }
  });

  it("keeps Testimonials wired to Embla carousel", () => {
    const source = readFileSync(
      join(process.cwd(), "app/components/landing/Testimonials.tsx"),
      "utf8",
    );

    expect(source).toContain('useEmblaCarousel({ loop: true })');
    expect(source).toContain("emblaApi.scrollNext();");
    expect(source).toContain("10_000");
    expect(source).not.toContain("useInView");
  });

  it("keeps section components clipped against horizontal overflow", () => {
    for (const file of componentFiles.filter((file) => file !== "GuaranteeSeal.tsx")) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );

      expect(source).toContain("overflow-x-clip");
    }
  });

  it("keeps the first hero image marked priority with responsive sizes", () => {
    const source = readFileSync(
      join(process.cwd(), "app/components/landing/HeroSection.tsx"),
      "utf8",
    );

    expect(source).toContain("priority: true");
    expect(source.match(/priority: true/g) ?? []).toHaveLength(1);
    expect(source).toContain('sizes="(max-width: 640px) 50vw, (max-width: 1024px) 100vw, 1280px"');
    expect(source).toContain('fetchPriority={image.priority ? "high" : "auto"}');
    expect(source).toContain('loading={image.priority ? undefined : "lazy"}');
  });

  it("keeps landing Image components protected against layout shift", () => {
    const imageComponentFiles = ["HeroSection.tsx", "Testimonials.tsx", "BioSection.tsx"];

    for (const file of imageComponentFiles) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );
      const imageBlocks = source.match(/<Image[\s\S]*?\/>/g) ?? [];

      expect(imageBlocks.length, `${file} should render at least one Image`).toBeGreaterThan(0);

      for (const imageBlock of imageBlocks) {
        const hasExplicitDimensions =
          /\bwidth=/.test(imageBlock) && /\bheight=/.test(imageBlock);
        const usesFill = /\bfill\b/.test(imageBlock);

        expect(
          hasExplicitDimensions || usesFill,
          `${file} has an Image without width/height or fill: ${imageBlock}`,
        ).toBe(true);
      }
    }
  });

  it('keeps app/page.tsx as a Server Component without "use client"', () => {
    const source = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");

    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("'use client'");
  });
});
