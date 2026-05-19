"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export type InViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useInView(
  ref: RefObject<Element | null>,
  options: InViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false);
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    once = true,
  } = options;

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      ref.current === null
    ) {
      return;
    }

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setInView(true);

        if (once) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [once, ref, rootMargin, threshold]);

  return inView;
}
