import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Bebas_Neue: () => ({ variable: "mock-font-display" }),
  Inter: () => ({ variable: "mock-font-body" }),
}));

import { metadata } from "@/app/layout";

describe("root metadata", () => {
  it("exports a non-empty workshop title", () => {
    expect(metadata.title).toBe("Workshop ORGANIZE-$E");
  });

  it("exports a concise Portuguese description", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.description?.length).toBeLessThan(160);
  });

  it("keeps Open Graph title aligned with the document title", () => {
    expect(metadata.openGraph?.title).toBe(metadata.title);
  });

  it("uses a local hero image for Open Graph sharing", () => {
    const images = metadata.openGraph?.images;

    expect(Array.isArray(images)).toBe(true);
    expect(images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.stringMatching(/^\/images\//),
        }),
      ]),
    );
  });
});
