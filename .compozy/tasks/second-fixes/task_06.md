---
status: completed
title: Fix `PriceBlock` — price centering
type: frontend
complexity: low
dependencies: []
---

# Task 6: Fix `PriceBlock` — price centering

## Overview

Add `text-center` to the price card wrapper `<div>` in `PriceBlock.tsx` so that the `R$ 47` value and all surrounding price context (label, payment note, `GuaranteeSeal`) are horizontally centered on every screen size. This is a single class addition with no structural changes.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST add `text-center` to the `<div>` that carries the classes `rounded-lg border border-white/15 bg-white/10` (the price card wrapper).
- MUST NOT add `text-center` to a child element or to the outer section — the class must be on the card wrapper so all descendants inherit centering.
- MUST NOT change the `CTABlock` link inside the card; it already uses `justify-center` and centering the wrapper does not affect its alignment.
- MUST NOT alter any other layout classes on the card or its children.
</requirements>

## Subtasks

- [x] 6.1 Locate the price card wrapper `<div>` in `PriceBlock.tsx`.
- [x] 6.2 Append `text-center` to the card wrapper's class string.
- [x] 6.3 Visually verify `R$ 47` is horizontally centered at 375px, 768px, and 1280px.

## Implementation Details

The change is a single class addition to one `<div>` in `app/components/landing/PriceBlock.tsx`. The target element has the class signature `rounded-lg border border-white/15 bg-white/10`. No child elements are modified.

See TechSpec "Technical Considerations — `text-center` on the price card wrapper" for the rationale on targeting the wrapper rather than the `<p>` element.

### Relevant Files

- `app/components/landing/PriceBlock.tsx` — only file modified in this task

### Dependent Files

- `e2e/second-fixes.pw.ts` — will assert that the `R$ 47` paragraph's horizontal midpoint aligns with the card's midpoint (±4px tolerance) in task_08

### Related ADRs

- [ADR-002: Delivery Scope — Single PR](adrs/adr-002.md) — this change is part of the single-PR UI batch

## Deliverables

- `app/components/landing/PriceBlock.tsx` updated with `text-center` on the price card wrapper
- Playwright centering assertion for F9 in task_08 passes green **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — single Tailwind class addition; Playwright E2E is the verification layer.
- Integration tests (covered in task_08's `e2e/second-fixes.pw.ts`):
  - [x] At 375px: `R$ 47` paragraph horizontal midpoint (`left + width/2`) aligns with the price card's horizontal midpoint within ±4px tolerance
  - [x] At 768px: same centering assertion holds
  - [x] At 1280px: same centering assertion holds
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- `R$ 47` is visually centered within the price card at all three test breakpoints.
- No layout shift or overflow introduced on any viewport.
- All tests passing.
