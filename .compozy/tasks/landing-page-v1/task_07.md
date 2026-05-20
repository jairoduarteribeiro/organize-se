---
status: completed
title: Scroll Animations
type: frontend
complexity: medium
dependencies:
  - task_02
  - task_06
---

# Task 07: Scroll Animations

## Overview
Wires the `useInView` hook to the `Deliverables` checklist and key section headings so elements animate into view as the visitor scrolls. This task also applies the `animate-pulse-glow` class to the `CTABlock` Kiwify button if not already present, ensuring the pulse animation is active in all three CTA locations.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `useInView` MUST be applied to the `Deliverables` checklist so each item stagger-reveals on scroll (using delay variants from task_02)
- Section headings across at least `PainQualifier`, `Testimonials`, `Deliverables`, and `BioSection` MUST fade-slide in using `useInView`
- Animated elements MUST start in the hidden state (`opacity-0 translate-y-4`) and transition to visible (`opacity-100 translate-y-0`) when `inView` is `true`
- All animations MUST be suppressed when `prefers-reduced-motion: reduce` is set (handled by the global CSS from task_02 — no per-component duplication needed)
- Components that use `useInView` MUST become `"use client"` components — this changes their Server Component status; update the component file accordingly
- The `animate-pulse-glow` class on the Kiwify `<a>` button in `CTABlock.tsx` MUST already be present from task_04; confirm it is; if missing, add it here
- No new npm packages may be introduced — animations are CSS-only per ADR-004
</requirements>

## Subtasks
- [x] 7.1 Add `"use client"` directive and `useInView` wiring to `Deliverables.tsx`; apply stagger delay classes to each checklist item
- [x] 7.2 Add `"use client"` directive and `useInView` wiring to `PainQualifier.tsx` section heading fade-in
- [x] 7.3 Add `"use client"` directive and `useInView` wiring to `Testimonials.tsx` and `BioSection.tsx` headings
- [x] 7.4 Verify `CTABlock.tsx` applies `animate-pulse-glow` to the Kiwify button; add if missing
- [x] 7.5 Confirm `prefers-reduced-motion` suppression works end-to-end for all animated elements
- [x] 7.6 Write tests verifying `is-visible` class toggling and reduced-motion behavior

## Implementation Details
See ADR-004 "Implementation Notes" for the exact CSS class pattern (`opacity-0 translate-y-4 transition-all duration-500` → `opacity-100 translate-y-0`) and the `rootMargin: '0px 0px -50px 0px'` default. See TechSpec Development Sequencing step 7. Note: converting `Deliverables.tsx`, `PainQualifier.tsx`, `Testimonials.tsx`, and `BioSection.tsx` to `"use client"` is required for `useInView` — this is expected and documented in the TechSpec. The `useInView` hook already guards against SSR (`typeof window === 'undefined'`), so the transition from Server to Client Component is safe.

### Relevant Files
- `app/hooks/useInView.ts` — hook consumed by all animated components
- `app/globals.css` — `fade-in` keyframe, stagger delay variants, `prefers-reduced-motion` block (task_02)
- `app/components/landing/Deliverables.tsx` — primary animation target (checklist stagger)
- `app/components/landing/PainQualifier.tsx` — heading fade-in target
- `app/components/landing/Testimonials.tsx` — heading fade-in target
- `app/components/landing/BioSection.tsx` — heading fade-in target
- `app/components/landing/CTABlock.tsx` — verify `animate-pulse-glow` is present

### Dependent Files
- `app/components/landing/Deliverables.tsx` — now `"use client"` (affects SSR rendering)
- `app/components/landing/PainQualifier.tsx` — now `"use client"`
- `app/components/landing/Testimonials.tsx` — now `"use client"`
- `app/components/landing/BioSection.tsx` — now `"use client"`

### Related ADRs
- [ADR-004: CSS Keyframes + IntersectionObserver](../adrs/adr-004.md) — full rationale for the zero-dependency animation approach and the `useInView` contract

## Deliverables
- Updated `Deliverables.tsx` with `"use client"` and stagger `useInView` animation
- Updated `PainQualifier.tsx`, `Testimonials.tsx`, `BioSection.tsx` with heading fade-in
- Verified (or updated) `CTABlock.tsx` with `animate-pulse-glow` on Kiwify button
- Unit and integration tests with ≥80% coverage **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `Deliverables` starts with checklist items having `opacity-0` class before `inView` fires
  - [x] `Deliverables` checklist items receive `opacity-100` class after `useInView` returns `true` (mock IntersectionObserver)
  - [x] Each of the 4 checklist items has a distinct `animationDelay` or `delay-N` Tailwind class applied
  - [x] `CTABlock` Kiwify button has the `animate-pulse-glow` class in its rendered className
- Integration tests:
  - [x] Scroll to `Deliverables` section in Playwright; assert at least one checklist item gains `opacity-100` class (Playwright)
  - [x] With `prefers-reduced-motion: reduce` media emulation, no `animation` property is active on animated elements (Playwright CSS assertion)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Deliverables checklist items stagger-animate into view on scroll
- Section headings in PainQualifier, Testimonials, and BioSection fade-in on scroll
- `prefers-reduced-motion` suppresses all animations without layout shift
- No new npm dependencies introduced
