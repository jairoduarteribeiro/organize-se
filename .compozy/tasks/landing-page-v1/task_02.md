---
status: completed
title: CSS Animation Utilities
type: frontend
complexity: low
dependencies: []
---

# Task 02: CSS Animation Utilities

## Overview
Extends `app/globals.css` with the custom `@keyframes` and utility classes required by all animated elements on the page: the `pulse-glow` CTA animation, the `fade-in` entrance, and `stagger-N` delay variants. Also adds the `prefers-reduced-motion` suppression block and the Safari `<details>` disclosure-marker fix per ADR-005.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `@keyframes pulse-glow` MUST be defined in `globals.css` and exposed as a Tailwind `animate-pulse-glow` utility
- `@keyframes fade-in` MUST produce an opacity 0→1 and translateY 1rem→0 entrance
- Stagger delay variants (`delay-100` through at least `delay-500`) MUST be available for checklist item staggering
- `@media (prefers-reduced-motion: reduce)` MUST suppress all transitions and animations site-wide
- Safari `<details>` marker MUST be hidden via `summary { list-style: none }` and `summary::-webkit-details-marker { display: none }`
- Changes MUST be additive — no existing Tailwind base or variable declarations may be removed
</requirements>

## Subtasks
- [x] 2.1 Add `@keyframes pulse-glow` and register it as a Tailwind animation utility
- [x] 2.2 Add `@keyframes fade-in` for section entrance animations
- [x] 2.3 Add `stagger-N` delay variant utilities (100ms increments up to 500ms)
- [x] 2.4 Add `@media (prefers-reduced-motion: reduce)` block that suppresses all animation/transition
- [x] 2.5 Add Safari `<details>` disclosure-marker suppression rules
- [x] 2.6 Verify no existing CSS variables or Tailwind directives were removed or overwritten

## Implementation Details
See TechSpec "Known Risks" for the Safari `<details>` marker detail, and ADR-004 "Implementation Notes" for the base + visible class pattern (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`). The `pulse-glow` keyframe should produce a subtle box-shadow or scale pulse that draws attention to the CTA buttons without being distracting.

### Relevant Files
- `app/globals.css` — the only file modified in this task

### Dependent Files
- `app/components/landing/CTABlock.tsx` — will apply `animate-pulse-glow` (task_04)
- `app/components/landing/Deliverables.tsx` — will use stagger delay variants (task_07)
- `app/components/landing/FaqAccordion.tsx` — relies on `details[open]` CSS and Safari fix (task_03)

### Related ADRs
- [ADR-004: CSS Keyframes + IntersectionObserver](../adrs/adr-004.md) — specifies the animation approach and `prefers-reduced-motion` requirement
- [ADR-005: Native `<details>/<summary>` for FAQ Accordion](../adrs/adr-005.md) — specifies the Safari marker fix

## Deliverables
- Updated `app/globals.css` with all keyframes, utilities, reduced-motion block, and Safari fix
- Visual smoke test confirming `animate-pulse-glow` class applies correctly in browser
- Unit/integration tests verifying CSS additions **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `globals.css` contains the string `pulse-glow` (keyframe definition present)
  - [x] `globals.css` contains `prefers-reduced-motion` media query
  - [x] `globals.css` contains `-webkit-details-marker` suppression rule
  - [x] `globals.css` contains `fade-in` keyframe definition
- Integration tests:
  - [x] Dev server starts without CSS compilation errors after changes
  - [x] An element with class `animate-pulse-glow` receives a computed `animation-name` value in the browser (Playwright assertion)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `globals.css` compiles without Tailwind/PostCSS errors
- No existing dark-mode variables or Tailwind base directives were overwritten
- `prefers-reduced-motion` block suppresses the `pulse-glow` animation when the OS setting is enabled
