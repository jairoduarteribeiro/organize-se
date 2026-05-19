import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const globalsCss = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

describe("globals.css animation utilities", () => {
  it("defines the pulse-glow animation and Tailwind utility token", () => {
    expect(globalsCss).toContain("--animate-pulse-glow:");
    expect(globalsCss).toContain("@keyframes pulse-glow");
    expect(globalsCss).toContain("box-shadow");
  });

  it("defines the fade-in keyframe with opacity and vertical entrance", () => {
    expect(globalsCss).toContain("@keyframes fade-in");
    expect(globalsCss).toContain("opacity: 0");
    expect(globalsCss).toContain("transform: translateY(1rem)");
    expect(globalsCss).toContain("opacity: 1");
    expect(globalsCss).toContain("transform: translateY(0)");
  });

  it("defines stagger and delay utilities from 100ms through 500ms", () => {
    for (let step = 1; step <= 5; step += 1) {
      const delay = step * 100;

      expect(globalsCss).toContain(`.stagger-${step}`);
      expect(globalsCss).toContain(`.delay-${delay}`);
      expect(globalsCss).toContain(`animation-delay: ${delay}ms`);
      expect(globalsCss).toContain(`transition-delay: ${delay}ms`);
    }
  });

  it("suppresses motion and Safari details markers", () => {
    expect(globalsCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(globalsCss).toContain("animation: none !important");
    expect(globalsCss).toContain("transition: none !important");
    expect(globalsCss).toContain("summary {");
    expect(globalsCss).toContain("list-style: none");
    expect(globalsCss).toContain("summary::-webkit-details-marker");
    expect(globalsCss).toContain("display: none");
  });

  it("preserves existing Tailwind import, theme variables, and dark-mode variables", () => {
    expect(globalsCss).toContain('@import "tailwindcss";');
    expect(globalsCss).toContain("--color-background: var(--background)");
    expect(globalsCss).toContain("--color-foreground: var(--foreground)");
    expect(globalsCss).toContain("--font-sans: var(--font-geist-sans)");
    expect(globalsCss).toContain("--font-mono: var(--font-geist-mono)");
    expect(globalsCss).toContain("@media (prefers-color-scheme: dark)");
    expect(globalsCss).toContain("--background: #0a0a0a");
    expect(globalsCss).toContain("--foreground: #ededed");
  });
});
