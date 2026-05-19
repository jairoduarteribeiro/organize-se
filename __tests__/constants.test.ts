import { describe, expect, it } from "vitest";

import { EVENT_UTC, KIWIFY_URL } from "@/app/lib/constants";

describe("landing page constants", () => {
  it("anchors the event date to the expected UTC instant", () => {
    expect(EVENT_UTC).toBeInstanceOf(Date);
    expect(EVENT_UTC.toISOString()).toBe("2026-06-28T13:00:00.000Z");
  });

  it("uses a Kiwify checkout URL", () => {
    expect(KIWIFY_URL).toMatch(/^https:\/\/pay\.kiwify\.com\.br\//);
  });
});
