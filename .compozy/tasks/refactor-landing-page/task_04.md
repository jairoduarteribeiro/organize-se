---
status: completed
title: Scale-Pulse Button Animation
type: frontend
complexity: low
dependencies:
  - task_01
---

# Task 04: Scale-Pulse Button Animation

## Overview
Replaces the existing `pulse-glow` animation on checkout buttons with a new `scale-pulse` keyframe that continuously cycles `scale(1) → scale(1.03) → scale(1)` to draw the visitor's eye. The old keyframe is removed from `app/globals.css` (it is used only in `CTABlock.tsx`) and the new one is registered in `@theme inline`. The button class in `CTABlock.tsx` is updated from `animate-pulse-glow` to `animate-scale-pulse hover:animate-none`.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `app/globals.css` MUST define a new `@keyframes scale-pulse` block with `0%, 100% { transform: scale(1); }` and `50% { transform: scale(1.03); }`
- `app/globals.css` MUST register `--animate-scale-pulse: scale-pulse 2s ease-in-out infinite` inside `@theme inline`
- The `pulse-glow` `@keyframes` block and `--animate-pulse-glow` variable MUST be removed from `app/globals.css` (confirmed used only in `CTABlock.tsx`)
- `CTABlock.tsx` checkout button MUST replace the `animate-pulse-glow` class with `animate-scale-pulse hover:animate-none`
- The animation MUST use `transform: scale()` only — no `width`, `height`, or `box-shadow` changes — to keep it GPU-composited with no layout shift
- `prefers-reduced-motion` handling already present in `globals.css` MUST remain intact and cover the new animation
- `next lint` MUST exit 0 after changes
</requirements>

## Subtasks
- [x] 4.1 Search the codebase for all usages of `animate-pulse-glow` to confirm it appears only in `CTABlock.tsx`
- [x] 4.2 Remove `@keyframes pulse-glow` and `--animate-pulse-glow` from `app/globals.css`
- [x] 4.3 Add `@keyframes scale-pulse` and `--animate-scale-pulse` to `app/globals.css` inside `@theme inline`
- [x] 4.4 Replace `animate-pulse-glow` with `animate-scale-pulse hover:animate-none` on the checkout button in `CTABlock.tsx`
- [x] 4.5 Write a Playwright assertion for F5 in `e2e/landing-page-v1.pw.ts`

## Implementation Details
See TechSpec "CSS theme extension" section and "ADR-004 Implementation Notes" for the exact keyframe values and `@theme` variable format. The `hover:animate-none` class pauses the animation on hover so the hover transform state takes over naturally without jitter.

Confirm via grep that `animate-pulse-glow` has no other consumers before deleting the keyframe. If another file uses it, note the discrepancy and ask before proceeding.

### Relevant Files
- `app/globals.css` — receives the new keyframe and `@theme` variable; existing `pulse-glow` keyframe removed
- `app/components/landing/CTABlock.tsx` — the checkout button class is updated; no structural changes

### Dependent Files
- (None — animation is self-contained in these two files)

### Related ADRs
- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — this task is Layer 4; depends on Layer 1 `@theme inline` being in place
- [ADR-004: Replace pulse-glow with scale-pulse animation](adrs/adr-004.md) — defines the exact keyframe values, rationale, and the `hover:animate-none` requirement

## Deliverables
- `app/globals.css` with `scale-pulse` keyframe and `--animate-scale-pulse` in `@theme inline`; `pulse-glow` keyframe removed
- `app/components/landing/CTABlock.tsx` with `animate-scale-pulse hover:animate-none` on the checkout button
- Playwright assertion for F5 added to `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- `next lint` exits 0 **(REQUIRED)**

## Tests
- Unit tests:
  - (Not applicable — CSS-only change with no logic)
- Integration tests:
  - [x] F5 — The checkout button element has computed `animation-name` equal to `scale-pulse`
  - [x] F5 — The checkout button element does NOT have `animation-name` equal to `pulse-glow` (old animation removed)
  - [x] Regression — Existing countdown and waitlist mode switch tests still pass
  - [x] Regression — `prefers-reduced-motion` media query still disables all animations (CSS `animation: none` override confirmed)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `next lint` exits 0
- Checkout button visibly scales from 100% to ~103% and back on an idle loop
- No `pulse-glow` class or keyframe remains anywhere in the codebase (verified by grep)
- Animation pauses or transitions cleanly on button hover
