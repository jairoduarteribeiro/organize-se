import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.pw.ts",
  timeout: 30_000,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "bun run dev",
    reuseExistingServer: true,
    url: "http://localhost:3000",
  },
});
