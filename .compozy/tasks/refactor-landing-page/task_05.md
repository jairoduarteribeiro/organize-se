---
status: completed
title: Mobile Responsive Fixes
type: frontend
complexity: medium
dependencies:
  - task_01
  - task_02
  - task_03
  - task_04
---

# Task 05: Mobile Responsive Fixes

## Overview
Resolves the two highest-severity mobile UX bugs on the page. In `HeroSection.tsx`, the heading JSX is moved above the image block in DOM order and `flex-col-reverse` is applied at the `md:` breakpoint so desktop visual order is preserved — making the workshop title always visible to mobile visitors without z-index fragility. In `CTABlock.tsx`, the countdown label spans receive smaller type-size classes so the `"segundos"` label and all others fit within their grid columns on 320px viewports. This is the final layer; after this task completes, the full Playwright suite and Lighthouse check are run.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `HeroSection.tsx` MUST render the heading/subheading `<div>` **above** the image `<div>` in DOM source order
- The outer `<section>` in `HeroSection.tsx` MUST use `flex-col` on mobile and `md:flex-col-reverse` on desktop to restore the image-above-heading visual order for larger viewports
- At 375px viewport, the `<h1>` bounding box `top` value MUST be less than the hero image bounding box `top` value (heading appears above image in the rendered layout)
- `CTABlock.tsx` countdown label spans MUST receive responsive text-size classes (e.g., `text-[10px] sm:text-xs`) so all four labels fit within their grid columns at 320px
- Countdown grid columns MUST use `min-w-0` (or equivalent) to prevent overflow at 320px
- At 320px viewport, no element inside the countdown grid MUST have `scrollWidth > clientWidth`
- `next lint` MUST exit 0 after changes
- Full Playwright suite (`e2e/landing-page-v1.pw.ts`) MUST pass at all four viewports after this task
- Lighthouse accessibility score MUST remain ≥ 90 (no regression)
</requirements>

## Subtasks
- [x] 5.1 Reorder `HeroSection.tsx` JSX — move heading/subheading block above the image carousel block in source order
- [x] 5.2 Change the outer section's flex direction to `flex-col md:flex-col-reverse` and verify desktop visual order is unchanged
- [x] 5.3 Add responsive label text-size classes to countdown label spans in `CTABlock.tsx`; add `min-w-0` to countdown grid columns
- [x] 5.4 Run Playwright at 320px and 375px viewports to verify both fixes; run full suite at all 4 viewports
- [x] 5.5 Run Lighthouse accessibility check and confirm ≥ 90 score
- [x] 5.6 Write Playwright assertions for F6 (mobile hero) and F7 (countdown overflow) in `e2e/landing-page-v1.pw.ts`

## Implementation Details
See TechSpec "Development Sequencing — Layer 5" and "ADR-005 Implementation Notes" for the exact DOM reorder approach and the simplified `<section>` structure. The image carousel currently renders three `<Image>` variants (mobile/tablet/desktop) inside a `<div>` — this entire block moves below the heading block in DOM order. The `flex-col-reverse` is applied only to the outer `<section>` wrapper.

For the countdown fix, see TechSpec "Impact Analysis — CTABlock.tsx" row: `text-[10px] sm:text-xs` on label spans and `min-w-0` on the column containers prevent overflow on 320px. Do not change the 4-column grid structure itself.

### Relevant Files
- `app/components/landing/HeroSection.tsx` — JSX reordered; outer section flex direction changed; currently the image div appears before the heading div in source order
- `app/components/landing/CTABlock.tsx` — countdown label spans receive smaller responsive text classes; grid column containers receive `min-w-0`
- `e2e/landing-page-v1.pw.ts` — final Playwright assertions for F6 and F7 added; full-suite regression run performed

### Dependent Files
- (No downstream components consume HeroSection or CTABlock internals — changes are self-contained)

### Related ADRs
- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — this task is Layer 5; all previous layers must be complete before this task begins
- [ADR-005: DOM reorder to fix mobile hero title visibility](adrs/adr-005.md) — defines the exact DOM reorder decision, `flex-col-reverse` rationale, and the alternatives rejected (z-index, duplicate nodes)

## Deliverables
- `app/components/landing/HeroSection.tsx` with heading DOM above image block and `flex-col md:flex-col-reverse` on outer section
- `app/components/landing/CTABlock.tsx` with responsive label classes and `min-w-0` on grid columns
- Playwright assertions for F6 and F7 added to `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- Full Playwright suite passing at 320px, 375px, 768px, 1280px **(REQUIRED)**
- Lighthouse accessibility ≥ 90 confirmed **(REQUIRED)**
- `next lint` exits 0 **(REQUIRED)**

## Tests
- Unit tests:
  - (Not applicable — responsive layout changes with no logic)
- Integration tests:
  - [x] F6 — At 375px viewport: `h1` element bounding box `top` < hero image element bounding box `top` (heading renders above image)
  - [x] F6 — At 768px viewport: hero image is visually above the heading (desktop order preserved by `flex-col-reverse`)
  - [x] F7 — At 320px viewport: no element inside the countdown grid has `scrollWidth > clientWidth`
  - [x] F7 — At 320px viewport: all four countdown labels ("dias", "horas", "minutos", "segundos") are present in the DOM and visible (not clipped)
  - [x] Regression — Full Playwright suite passes at all 4 viewports (320px, 375px, 768px, 1280px)
  - [x] Regression — Lighthouse accessibility score ≥ 90 (existing `e2e/lighthouse-performance.pw.ts` check)
  - [x] Regression — Axe audit still reports no critical violations
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `next lint` exits 0
- Mobile visitors at 375px see the "Workshop ORGANIZE-$E" heading above the hero image without scrolling
- All countdown labels are fully visible at 320px with no horizontal clipping
- Full Playwright suite green at all four target viewports
- Lighthouse accessibility score ≥ 90 (no regression)
