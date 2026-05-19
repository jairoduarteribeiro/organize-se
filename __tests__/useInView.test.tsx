import { act, renderHook } from "@testing-library/react";
import type { RefObject } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useInView } from "@/app/hooks/useInView";

type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  callback: ObserverCallback;
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
  unobserve = vi.fn();

  constructor(callback: ObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [
        {
          isIntersecting,
        } as IntersectionObserverEntry,
      ],
      this,
    );
  }
}

function createElementRef(): RefObject<Element> {
  const element = document.createElement("div");

  return {
    current: element,
  };
}

describe("useInView", () => {
  afterEach(() => {
    Reflect.deleteProperty(window, "IntersectionObserver");
    MockIntersectionObserver.instances = [];
  });

  it("returns false initially and true after intersecting", () => {
    window.IntersectionObserver = MockIntersectionObserver;
    const ref = createElementRef();
    const { result } = renderHook(() => useInView(ref));

    expect(result.current).toBe(false);

    act(() => {
      MockIntersectionObserver.instances[0]?.trigger(true);
    });

    expect(result.current).toBe(true);
  });

  it("unobserves after the first trigger by default", () => {
    window.IntersectionObserver = MockIntersectionObserver;
    const ref = createElementRef();

    renderHook(() => useInView(ref));
    act(() => {
      MockIntersectionObserver.instances[0]?.trigger(true);
    });

    expect(MockIntersectionObserver.instances[0]?.unobserve).toHaveBeenCalledWith(
      ref.current,
    );
  });
});
