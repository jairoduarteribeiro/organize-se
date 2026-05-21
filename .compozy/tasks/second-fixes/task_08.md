---
status: completed
title: Write Playwright E2E tests for second-fixes batch
type: test
complexity: medium
dependencies:
  - task_03
  - task_04
  - task_05
  - task_06
  - task_07
---

# Task 8: Write Playwright E2E tests for second-fixes batch

## Overview

Create `e2e/second-fixes.pw.ts` with Playwright assertions that verify all 10 PRD features (F1–F10) across three viewports: 375px (mobile), 768px (tablet), and 1280px (desktop). This task has no implementation work — it exists solely to validate the changes from tasks 03–07 using the existing Playwright configuration and test patterns already established in the `e2e/` directory.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST create the file at `e2e/second-fixes.pw.ts`.
- MUST follow the existing test file conventions in `e2e/` (imports, fixture usage, `test.describe` grouping, viewport setup).
- MUST cover all 10 assertions listed in TechSpec "Testing Approach — Playwright E2E Tests".
- F1 MUST use `page.on('console', ...)` to intercept console messages and assert zero messages matching the `"key"` warning pattern during page load.
- F4 MUST compare `boundingBox().y` of the hero images container vs. the `<h1>` element at 375px; images container `y` MUST be less than `h1` `y`.
- F7 MUST wait 11 000ms after page load and assert the Embla selected slide index has changed; MUST also perform a swipe gesture at 375px and assert slide navigation.
- F9 MUST compute `left + width/2` for the `R$ 47` paragraph and for the price card wrapper and assert they are within ±4px.
- MUST NOT introduce arbitrary `page.waitForTimeout` calls beyond what is needed for F7's 11s auto-advance assertion.
- SHOULD reuse the `goto` and viewport helpers already used in `e2e/landing-page-v1.pw.ts` to stay consistent with the project's test conventions.
</requirements>

## Subtasks

- [x] 8.1 Scaffold `e2e/second-fixes.pw.ts` with the standard imports and `test.describe` block, following existing `e2e/` conventions.
- [x] 8.2 Implement assertions for F1 (key-prop console warning) and F2 (SVG gradient element).
- [x] 8.3 Implement assertions for F3 (hero image srcs), F4 (mobile image-above-headline), and F5 (headline copy).
- [x] 8.4 Implement assertion for F6 (CTA hover scale transform).
- [x] 8.5 Implement assertions for F7 (carousel visible, auto-advance after 11s, swipe at 375px).
- [x] 8.6 Implement assertions for F8 (no blockquote), F9 (price centering), and F10 (bio photo src).
- [x] 8.7 Run the full test suite and confirm all assertions pass green.

## Implementation Details

New file only: `e2e/second-fixes.pw.ts`. No existing test files are modified. Viewport switching uses the same pattern as `e2e/landing-page-v1.pw.ts`. The 11s wait in F7 is the only intentional `waitForTimeout` — all other assertions use locators and auto-waiting.

See TechSpec "Testing Approach — Playwright E2E Tests" table for the precise assertion per feature.

### Relevant Files

- `e2e/landing-page-v1.pw.ts` — reference for project test conventions (577 lines; viewport switching, console capture, bounding box patterns)
- `e2e/page-composition.pw.ts` — reference for viewport overflow and URL assertions
- `playwright.config.ts` (or equivalent) — confirm base URL and default browser targets

### Dependent Files

- `app/components/landing/HeroSection.tsx` — target for F3, F4, F5 assertions
- `app/components/landing/BioSection.tsx` — target for F1, F2, F8, F10 assertions
- `app/components/landing/CTABlock.tsx` — target for F6 assertion
- `app/components/landing/PriceBlock.tsx` — target for F9 assertion
- `app/components/landing/Testimonials.tsx` — target for F7 assertions

### Related ADRs

- [ADR-002: Delivery Scope — Single PR](adrs/adr-002.md) — specifies Playwright as the end-to-end validation mechanism for the full batch

## Deliverables

- `e2e/second-fixes.pw.ts` with 10 feature assertions across 375px, 768px, and 1280px viewports
- All assertions pass green in CI **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — this task IS the test layer.
- Integration tests (the assertions in `e2e/second-fixes.pw.ts` themselves):
  - [x] **F1**: `page.on('console', ...)` captures zero console messages matching `/key.*prop/i` during page load at 1280px
  - [x] **F2**: BioSection `<svg>` contains a descendant `<linearGradient>` with `id="ig-gradient"` at 1280px
  - [x] **F3**: At 1280px, `<img>` elements inside HeroSection have `src` attributes containing the string `new-hero`
  - [x] **F4**: At 375px, hero images container `boundingBox().y` is strictly less than `<h1>` `boundingBox().y`
  - [x] **F5**: At 375px, 768px, and 1280px, `<h1>` inner text contains `"Plano Prático"`
  - [x] **F6**: At 1280px, hover the CTA button; assert computed `transform` value contains `matrix` (scale applied)
  - [x] **F7a**: At 1280px, the Embla carousel viewport element is visible immediately after page load
  - [x] **F7b**: At 1280px, wait 11 000ms; assert selected slide index differs from initial index
  - [x] **F7c**: At 375px, perform a pointer swipe-left gesture; assert active slide index advances
  - [x] **F8**: At 1280px, BioSection contains zero `<blockquote>` elements
  - [x] **F9**: At 375px, 768px, and 1280px, `R$ 47` paragraph midpoint aligns with price card midpoint within ±4px
  - [x] **F10**: At 1280px, BioSection `<img>` `src` attribute contains the string `sobre-rafa`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- `e2e/second-fixes.pw.ts` exits 0 with all 10 feature assertions green.
- No test relies on arbitrary timeouts beyond the F7 11s auto-advance wait.
- Test file follows existing `e2e/` conventions (no new dependencies or config changes needed).
- All tests passing.
