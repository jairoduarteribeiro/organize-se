import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCountdown } from "@/app/hooks/useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-06-27T13:00:00.000Z").getTime(),
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("returns a non-expired countdown for a future target", () => {
    const target = new Date("2026-06-28T15:30:45.000Z");
    const { result, unmount } = renderHook(() => useCountdown(target));

    expect(result.current).toEqual({
      days: 1,
      hours: 2,
      minutes: 30,
      seconds: 45,
      isExpired: false,
    });
    unmount();
  });

  it("returns an expired state for a past target", () => {
    const target = new Date(0);
    const { result, unmount } = renderHook(() => useCountdown(target));

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    });
    unmount();
  });

  it("clears its interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    const target = new Date("2026-06-28T13:00:00.000Z");
    const { unmount } = renderHook(() => useCountdown(target));

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
