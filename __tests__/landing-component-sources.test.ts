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

describe("static landing component source constraints", () => {
  it('keeps landing Server Components free of "use client" directives', () => {
    for (const file of componentFiles) {
      const source = readFileSync(
        join(process.cwd(), "app/components/landing", file),
        "utf8",
      );

      expect(source).not.toContain('"use client"');
      expect(source).not.toContain("'use client'");
    }
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
    expect(source).toContain('sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"');
  });

  it('keeps app/page.tsx as a Server Component without "use client"', () => {
    const source = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");

    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("'use client'");
  });
});
