---
status: completed
title: Fix `CTABlock` — CTA button hover state
type: frontend
complexity: low
dependencies: []
---

# Task 5: Fix `CTABlock` — CTA button hover state

## Overview

Enhance the "Garantir meu ingresso" button in `CTABlock.tsx` with a clear hover feedback state so visitors get immediate visual confirmation that the button is interactive. The change is a Tailwind class swap — no logic, no new hooks, and no new dependencies.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST replace `transition-colors` with `transition-all duration-150` on the CTA button element.
- MUST add `hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-300/30` to the button's class list.
- MUST NOT remove the existing pulse animation (`scale-pulse` or equivalent) that was added in a prior commit.
- MUST NOT change the button's text, `href`, or any non-class attribute.
- The hover transition MUST respond within 150ms (enforced by `duration-150`).
</requirements>

## Subtasks

- [x] 5.1 Locate the CTA button element in `CTABlock.tsx`.
- [x] 5.2 Replace `transition-colors` with `transition-all duration-150`.
- [x] 5.3 Append `hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-300/30` to the button's class string.
- [x] 5.4 Confirm the pulse animation is still present and the hover state is visually distinct.

## Implementation Details

The change targets the primary CTA `<a>` or `<button>` element inside `app/components/landing/CTABlock.tsx`. The existing class list includes `transition-colors`; this is replaced. The hover classes are appended. No other elements in the file are touched.

See TechSpec "Impact Analysis" row for `CTABlock.tsx`.

### Relevant Files

- `app/components/landing/CTABlock.tsx` — only file modified in this task

### Dependent Files

- `e2e/second-fixes.pw.ts` — will hover the CTA button and assert that the computed `transform` includes `matrix` (scale applied) in task_08

### Related ADRs

- [ADR-002: Delivery Scope — Single PR](adrs/adr-002.md) — this change is part of the single-PR UI batch

## Deliverables

- `app/components/landing/CTABlock.tsx` updated with `transition-all duration-150` and hover classes
- Playwright hover assertion for F6 in task_08 passes green **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — presentational Tailwind class change; Playwright E2E is the verification layer.
- Integration tests (covered in task_08's `e2e/second-fixes.pw.ts`):
  - [ ] Hover the CTA button at 1280px; assert the computed `transform` style includes `matrix` (confirming `scale-[1.02]` applied)
  - [ ] CTA button is still visible and not overflowing its container after hover classes are applied
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- Hovering the button produces a visible scale and shadow change within 150ms.
- The existing pulse animation is unaffected.
- Button text, `href`, and accessible label are unchanged.
- All tests passing.
