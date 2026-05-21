---
status: completed
title: Fix `HeroSection` — image swap, mobile layout, headline copy
type: frontend
complexity: low
dependencies:
    - task_01
---

# Task 3: Fix `HeroSection` — image swap, mobile layout, headline copy

## Overview

Apply three additive changes to `HeroSection.tsx`: swap the three hero image sources to the new production files, fix the mobile layout so the image renders above the headline on all breakpoints, and update the `<h1>` text to the revised positioning copy. All changes are confined to a single file and require no new components or dependencies.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST update the three `<Image src>` values to `new-hero3.png` (mobile), `new-hero2.png` (tablet), `new-hero1.png` (desktop) — matching the existing responsive breakpoint assignments.
- MUST change the section's flex-direction class from `flex-col md:flex-col-reverse` to `flex-col-reverse` so the image renders above the headline on all breakpoints, including mobile (see ADR-006).
- MUST replace the `<h1>` text with: `"ORGANIZE-$E: Plano Prático para Organizar seu dinheiro e fazer ele sobrar em 30 dias."`
- MUST NOT modify the DOM structure, child elements, `CTABlock` rendering, or any other props beyond `src` and the flex class.
- SHOULD verify the images render without broken-image placeholders at all three breakpoints after the swap.
</requirements>

## Subtasks

- [ ] 3.1 Update the `heroImages` (or equivalent) src values to reference `new-hero{1,2,3}.png`.
- [ ] 3.2 Change `flex-col md:flex-col-reverse` to `flex-col-reverse` on the `<section>` element.
- [ ] 3.3 Replace the `<h1>` inner text with the revised headline copy from F5.
- [ ] 3.4 Visually confirm the hero renders correctly at 375px, 768px, and 1280px (no broken images, image above headline).

## Implementation Details

All changes are in `app/components/landing/HeroSection.tsx`. The three image sources currently read `hero1.png`, `hero2.png`, `hero3.png` — each maps to a `<Image>` element targeting a specific breakpoint. The `<section>` element has the flex direction class. The `<h1>` element contains the current headline string.

See TechSpec "Impact Analysis" row for `HeroSection.tsx` and ADR-006 for the `flex-col-reverse` rationale.

### Relevant Files

- `app/components/landing/HeroSection.tsx` — only file modified in this task
- `public/images/new-hero1.png` — desktop image (must exist; provided by task_01)
- `public/images/new-hero2.png` — tablet image (must exist; provided by task_01)
- `public/images/new-hero3.png` — mobile image (must exist; provided by task_01)

### Dependent Files

- `e2e/second-fixes.pw.ts` — will assert F3 image srcs include `new-hero`, F4 image `boundingBox().y` < h1 `boundingBox().y` at 375px, and F5 `h1` text contains `"Plano Prático"` (task_08)

### Related ADRs

- [ADR-006: Mobile Hero Layout Correction](adrs/adr-006.md) — defines the `flex-col-reverse` approach and rules out DOM restructure

## Deliverables

- `app/components/landing/HeroSection.tsx` updated with new image srcs, flex-direction fix, and revised headline
- Playwright assertions for F3, F4, and F5 in task_08 pass green **(REQUIRED)**

## Tests

- Unit tests:
  - [ ] Not applicable — presentational change; Playwright E2E is the verification layer.
- Integration tests (covered in task_08's `e2e/second-fixes.pw.ts`):
  - [ ] At 1280px: `<img>` elements in HeroSection have `src` attributes containing `new-hero`
  - [ ] At 375px: hero images container `boundingBox().y` is less than the `<h1>` element's `boundingBox().y` (image visually above headline)
  - [ ] At 375px, 768px, and 1280px: `<h1>` inner text contains the string `"Plano Prático"`
  - [ ] At all three viewports: no broken-image network responses (HTTP 200 for hero image URLs)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All three hero image srcs reference `new-hero*.png` files.
- Hero image renders above the `<h1>` at 375px viewport.
- `<h1>` text matches the F5 copy exactly.
- No broken images at any breakpoint.
- All tests passing.
