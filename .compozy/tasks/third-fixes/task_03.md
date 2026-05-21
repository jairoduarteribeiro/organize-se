---
status: completed
title: Remove overflow-x-clip from CTABlock wrapper
type: bugfix
complexity: low
dependencies: []
---

# Remove overflow-x-clip from CTABlock wrapper

## Overview

Removes `overflow-x-clip` from the outer `<div>` in `CTABlock.tsx` and adds `px-1` in its place. The existing `animate-scale-pulse` animation scales the button to 1.03×, but because the button is `w-full`, the horizontal expansion was immediately clipped by the parent's `overflow-x-clip`, making the pulse imperceptible. Adding `px-1` (4 px per side) gives the button edges room to breathe during the scale without introducing a horizontal scrollbar on any viewport.

<critical>
- Read the PRD and TechSpec before starting
- Reference TechSpec 'Core Interfaces' CTABlock wrapper snippet and 'Key Decisions' §overflow-x-clip removal strategy
- Focus on WHAT: one class removed, one class added on line 33 — no structural changes to the countdown grid or button
- `prefers-reduced-motion` suppression in `globals.css` is not touched
- Tests required: E2E assertion for visible CTA bounding box is in task_05
</critical>

<requirements>
1. The outer `<div>` in `CTABlock.tsx` at line 33 MUST change from `className="w-full overflow-x-clip"` to `className="w-full px-1"`.
2. No other class names on any element in `CTABlock.tsx` MUST be modified.
3. The countdown grid, button `<a>`, and `WaitlistForm` fallback MUST remain structurally unchanged.
4. The build MUST produce zero TypeScript or ESLint errors after the change.
5. The animation MUST remain suppressed when `prefers-reduced-motion: reduce` is active (no change needed — this is handled in `globals.css`).
</requirements>

## Subtasks

- [x] Edit `CTABlock.tsx` line 33: remove `overflow-x-clip`, add `px-1`
- [x] Verify no other lines in the file were changed
- [x] Run lint to confirm zero errors
- [x] Manually verify the pulse animation is visible at 375 px and 1280 px viewport widths in a browser

## Implementation Details

Single edit in `app/components/landing/CTABlock.tsx` line 33:

```
Before: <div className="w-full overflow-x-clip">
After:  <div className="w-full px-1">
```

`px-1` adds 4 px horizontal padding on each side. At the button's maximum width (`w-full` inside a full-bleed container), this gives 4 px of clearance for the 1.03× scale expansion on each edge. See TechSpec 'Key Decisions' §overflow-x-clip removal strategy and ADR-003.

### Relevant Files

- `app/components/landing/CTABlock.tsx` — only file modified; line 33

### Dependent Files

- `app/globals.css` — defines `@keyframes scale-pulse` and the `prefers-reduced-motion` guard; read-only from this task's perspective
- `e2e/cta-block.pw.ts` — existing E2E tests for the CTA; must still pass after this change
- `e2e/` (task_05) — will add a bounding-box assertion confirming no clipping

### Related ADRs

- [ADR-003: CTA Button Pulse Visibility Fix Strategy](adrs/adr-003.md) — justifies `overflow-x-clip` removal + `px-1` over alternatives

## Deliverables

- `app/components/landing/CTABlock.tsx` with `overflow-x-clip` removed and `px-1` in its place
- Zero lint or type errors
- Existing `e2e/cta-block.pw.ts` tests passing

## Tests

### Unit Tests

No unit tests — this is a CSS class change with no logic branches.

### Integration Tests

- Verify `CTABlock.tsx` line 33 no longer contains `overflow-x-clip`: `grep "overflow-x-clip" app/components/landing/CTABlock.tsx` should return empty
- Verify `CTABlock.tsx` line 33 contains `px-1`
- E2E assertion (task_05): CTA `<a>` element with `animate-scale-pulse` is visible and its bounding box width is ≤ parent width minus 8 px (accounting for 4 px `px-1` on each side)
- Existing `e2e/cta-block.pw.ts` suite passes without modification

## Success Criteria

- `overflow-x-clip` is absent from `CTABlock.tsx`
- `px-1` is present on the outer wrapper div
- CTA button pulse animation is visually unclipped at 375 px, 768 px, and 1280 px viewports
- All existing Playwright tests continue to pass
