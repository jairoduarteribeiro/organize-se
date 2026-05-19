// @vitest-environment node

import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BioSection } from "@/app/components/landing/BioSection";
import { Deliverables } from "@/app/components/landing/Deliverables";
import { FaqAccordion } from "@/app/components/landing/FaqAccordion";
import { GuaranteeSeal } from "@/app/components/landing/GuaranteeSeal";
import { PainQualifier } from "@/app/components/landing/PainQualifier";
import { Testimonials } from "@/app/components/landing/Testimonials";

describe("static landing component SSR behavior", () => {
  it("renders all task 03 components in Node.js without browser globals", () => {
    const html = renderToString(
      <>
        <PainQualifier />
        <Testimonials />
        <BioSection />
        <GuaranteeSeal />
        <FaqAccordion />
        <Deliverables />
      </>,
    );

    expect(html).toContain("Para quem é este workshop");
    expect(html).toContain("7 dias de garantia");
    expect(html).toContain("Suas dúvidas podem ser respondidas aqui");
  });
});
