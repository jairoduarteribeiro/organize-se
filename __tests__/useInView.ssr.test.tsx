// @vitest-environment node

import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { useInView } from "@/app/hooks/useInView";

function ServerRenderedHookProbe() {
  const ref = createRef<Element>();
  const inView = useInView(ref);

  return <span>{String(inView)}</span>;
}

describe("useInView SSR fallback", () => {
  it("returns false without a window object", () => {
    expect(renderToString(<ServerRenderedHookProbe />)).toContain("false");
  });
});
