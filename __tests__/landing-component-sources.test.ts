import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const componentFiles = [
  "PainQualifier.tsx",
  "Testimonials.tsx",
  "BioSection.tsx",
  "GuaranteeSeal.tsx",
  "FaqAccordion.tsx",
  "Deliverables.tsx",
];

describe("static landing component source constraints", () => {
  it('keeps all task 03 components free of "use client" directives', () => {
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
});
