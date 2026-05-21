---
status: completed
title: Rewrite `Testimonials` as Embla auto-advancing carousel
type: frontend
complexity: medium
dependencies:
  - task_02
---

# Task 7: Rewrite `Testimonials` as Embla auto-advancing carousel

## Overview

Replace the static 4-column testimonial grid in `Testimonials.tsx` with an Embla Carousel instance that auto-advances every 10 seconds, loops continuously, shows left/right navigation arrows on desktop, and supports swipe on mobile. The exported function name and the `page.tsx` import remain unchanged — only the internal rendering logic is rewritten in-place (see ADR-004).

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST import `useEmblaCarousel` from `embla-carousel-react` (installed in task_02).
- MUST initialize the carousel with `{ loop: true }` to enable continuous looping.
- MUST implement auto-advance via a `useEffect` that calls `emblaApi.scrollNext()` every 10 000ms and clears the interval on unmount.
- MUST render left/right navigation arrow buttons that are visible on `md` breakpoints and above and hidden on mobile (swipe only on mobile).
- MUST vertically center testimonial images within each slide so all photos feel balanced regardless of aspect ratio.
- MUST retain the `"use client"` directive (already present in the file).
- MUST NOT change the exported function name `Testimonials`.
- MUST NOT modify `app/page.tsx` — the import stays as-is (see ADR-004).
- MUST NOT introduce reset-on-interaction behavior for the auto-advance timer (out of scope per PRD).
- The `testimonials` array shape (`{ src, alt, width, height }`) MUST be preserved.
</requirements>

## Subtasks

- [x] 7.1 Remove the static grid markup and the `useInView` scroll-animation setup.
- [x] 7.2 Add the `useEmblaCarousel({ loop: true })` hook and wire the ref to the scroll container.
- [x] 7.3 Implement the `useEffect` auto-advance interval (10 000ms, cleared on unmount).
- [x] 7.4 Build the slide list, rendering each testimonial image vertically centered within its slide.
- [x] 7.5 Add desktop-only navigation arrow buttons (`prev` / `next`) that call `emblaApi.scrollPrev()` / `emblaApi.scrollNext()`.
- [x] 7.6 Verify carousel loops, auto-advances, and responds to swipe at 375px.

## Implementation Details

`Testimonials.tsx` is rewritten in-place. The existing `testimonials` data array remains. The static `<div className="grid ...">` wrapper and all child image elements are replaced with the Embla container/viewport/track/slide structure. The `useInView` import and animation classes are removed as they are no longer needed once Embla controls the container.

See TechSpec "Core Interfaces — Embla Carousel integration" for the exact hook usage and `useEffect` pattern. See ADR-001 for the library selection rationale and ADR-004 for the in-place rewrite decision.

### Relevant Files

- `app/components/landing/Testimonials.tsx` — fully rewritten in this task
- `node_modules/embla-carousel-react/` — new dependency (installed in task_02)
- `public/images/testimonials/IMG_6269.jpg` — testimonial image 1
- `public/images/testimonials/IMG_6270.jpg` — testimonial image 2
- `public/images/testimonials/IMG_6271.jpg` — testimonial image 3
- `public/images/testimonials/IMG_6272.jpg` — testimonial image 4

### Dependent Files

- `app/page.tsx` — imports `Testimonials`; must remain unchanged (ADR-004 contract)
- `e2e/second-fixes.pw.ts` — will assert F7: Embla viewport visible, slide index advances after 11s wait, swipe gesture advances slide at 375px (task_08)

### Related ADRs

- [ADR-001: Testimonials Carousel Library](adrs/adr-001.md) — selects Embla; rules out Swiper.js and custom hooks
- [ADR-004: Testimonials Component File Strategy](adrs/adr-004.md) — requires in-place rewrite; prohibits new component file or `page.tsx` changes

## Deliverables

- `app/components/landing/Testimonials.tsx` rewritten with Embla carousel, auto-advance, loop, desktop arrows, and mobile swipe
- `page.tsx` import unchanged
- Playwright assertions for F7 in task_08 pass green **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — presentational carousel rewrite; Playwright E2E is the verification layer.
- Integration tests (covered in task_08's `e2e/second-fixes.pw.ts`):
  - [x] At 1280px: the Embla viewport element is present in the DOM and visible
  - [x] At 1280px: wait 11 seconds; assert the active slide index has advanced from the initial index (auto-advance fires)
  - [x] At 375px: perform a swipe-left gesture; assert the slide index advances (swipe navigation works)
  - [x] At 375px: desktop navigation arrows are not visible (hidden on mobile)
  - [x] At 1280px: desktop navigation arrows are visible and clickable
  - [x] At all viewports: no horizontal page overflow introduced by the carousel
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- Carousel auto-advances every 10s ± 1s.
- Carousel loops continuously (wraps from last to first slide).
- Swipe left/right navigates slides at 375px.
- Left/right arrows appear at 1280px and are hidden at 375px.
- Testimonial images are vertically centered within their slides.
- `page.tsx` import is unchanged.
- All tests passing.
