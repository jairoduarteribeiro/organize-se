---
status: completed
title: CTABlock Layout Centering
type: frontend
complexity: low
dependencies:
  - task_01
---

# Task 02: CTABlock Layout Centering

## Overview
Centers the countdown timer and checkout button inside the `PainQualifier` dark card section. The CTABlock wrapper receives flexbox centering classes so both the 4-column timer grid and the CTA button align to the horizontal midpoint at every breakpoint. This is a style-only change scoped to a single component.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- The wrapper `<div>` that contains `<CTABlock />` inside `PainQualifier.tsx` MUST have `flex flex-col items-center text-center` (or equivalent centering utilities) applied
- The centering MUST be visible at all four target viewports: 320px, 375px, 768px, and 1280px
- No other CTABlock instances (in `HeroSection`, `PriceBlock`, `FinalCTA`) MUST be modified unless a visual review during implementation reveals they also benefit — in that case, note it in the commit message
- `next lint` MUST exit 0 after changes
</requirements>

## Subtasks
- [x] 2.1 Locate the wrapper `<div>` containing `<CTABlock />` inside the dark card section of `PainQualifier.tsx`
- [x] 2.2 Add centering Tailwind classes (`items-center`, `text-center`, or equivalent) to that wrapper
- [x] 2.3 Visually verify centering at 375px and 1280px using Playwright's `page.setViewportSize`
- [x] 2.4 Write Playwright assertion for F3 in `e2e/landing-page-v1.pw.ts`

## Implementation Details
See TechSpec "Impact Analysis" row for `PainQualifier.tsx` — the change is adding `flex flex-col items-center text-center` to the CTABlock wrapper div inside the dark CTA section. No structural changes to the component tree are needed.

The qualifying copy paragraph (the "Se você leu essa lista..." sentence) sits outside the CTABlock wrapper; only the wrapper containing the countdown + button needs centering.

### Relevant Files
- `app/components/landing/PainQualifier.tsx` — the only file modified in this task; the dark card `<div>` that wraps `<CTABlock />` receives centering classes

### Dependent Files
- `app/components/landing/CTABlock.tsx` — consumed unchanged; its internal layout is not modified here

### Related ADRs
- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — this task is Layer 2; depends on Layer 1 (typography) being established

## Deliverables
- `app/components/landing/PainQualifier.tsx` with centering classes on the CTABlock wrapper
- Playwright assertion for F3 added to `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- `next lint` exits 0 **(REQUIRED)**

## Tests
- Unit tests:
  - (Not applicable — style-only change with no logic)
- Integration tests:
  - [x] F3 — Locate `<CTABlock>` inside PainQualifier; assert its container element has computed `text-align: center` or `justify-content: center`
  - [x] F3 — At 375px viewport: the countdown timer grid and CTA button are horizontally centered (midpoint X position ≈ viewport width / 2, within ±5px tolerance)
  - [x] F3 — At 1280px viewport: same centering assertion holds
  - [x] Regression — Existing horizontal overflow assertions at all 4 viewports still pass
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `next lint` exits 0
- Countdown timer and checkout button are visually centered inside PainQualifier at all four target viewports
