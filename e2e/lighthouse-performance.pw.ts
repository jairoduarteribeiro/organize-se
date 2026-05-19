import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

type LighthouseResult = {
  audits: {
    "largest-contentful-paint": { numericValue: number };
    "cumulative-layout-shift": { numericValue: number };
  };
  categories: {
    accessibility: { score: number };
    performance: { score: number };
  };
};

test.describe("task 10 Lighthouse mobile performance gate", () => {
  test("meets mobile Lighthouse performance, accessibility, LCP, and CLS targets", async ({
    baseURL,
  }) => {
    test.setTimeout(120_000);

    const outputPath = join(mkdtempSync(join(tmpdir(), "organize-se-lighthouse-")), "report.json");

    execFileSync(
      "bunx",
      [
        "lighthouse",
        baseURL ?? "http://localhost:3000",
        "--output=json",
        `--output-path=${outputPath}`,
        "--chrome-flags=--headless=new --no-sandbox",
        "--emulated-form-factor=mobile",
        "--screenEmulation.mobile=true",
        "--screenEmulation.width=360",
        "--screenEmulation.height=640",
        "--screenEmulation.deviceScaleFactor=3",
        "--throttling-method=devtools",
        "--throttling.cpuSlowdownMultiplier=4",
        "--throttling.rttMs=300",
        "--throttling.throughputKbps=750",
        "--only-categories=performance,accessibility",
        "--quiet",
      ],
      { stdio: "pipe" },
    );

    const result = JSON.parse(readFileSync(outputPath, "utf8")) as LighthouseResult;
    const performance = Math.round(result.categories.performance.score * 100);
    const accessibility = Math.round(result.categories.accessibility.score * 100);
    const lcpMs = result.audits["largest-contentful-paint"].numericValue;
    const cls = result.audits["cumulative-layout-shift"].numericValue;

    expect(performance, `Performance score: ${performance}`).toBeGreaterThanOrEqual(85);
    expect(accessibility, `Accessibility score: ${accessibility}`).toBeGreaterThanOrEqual(90);
    expect(lcpMs, `LCP: ${Math.round(lcpMs)}ms`).toBeLessThan(2500);
    expect(cls, `CLS: ${cls}`).toBeLessThan(0.1);
  });
});
