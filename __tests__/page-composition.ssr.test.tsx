// @vitest-environment node

import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

describe("landing page composition SSR behavior", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-27T13:00:00.000Z").getTime(),
    );
  });

  it("renders an h1 element", () => {
    const html = renderToString(<Home />);

    expect(html).toContain("<h1");
  });

  it("renders exactly one h1 element", () => {
    const html = renderToString(<Home />);
    const h1Matches = html.match(/<h1[\s>]/g) ?? [];

    expect(h1Matches).toHaveLength(1);
  });

  it("renders the landing sections in ADR-001 order", () => {
    const html = renderToString(<Home />);
    const orderedSignals = [
      "Organize-$e: transforme sua relação",
      "Para quem é este workshop",
      "Depoimentos",
      "O que você vai encontrar",
      "Quem vai te guiar nesta jornada",
      "R$ 47",
      "Perguntas frequentes",
      "Última chamada",
    ];

    const indexes = orderedSignals.map((signal) => html.indexOf(signal));

    expect(indexes.every((index) => index >= 0)).toBe(true);
    expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
  });
});
