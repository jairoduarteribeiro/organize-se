---
status: completed
title: CTABlock Client Component
type: frontend
complexity: medium
dependencies:
  - task_01
  - task_02
---

# Task 04: CTABlock Client Component

## Overview
Implements `CTABlock.tsx` as the single `"use client"` component responsible for the countdown timer display and the pre/post-event CTA switch. Before the event it shows the live countdown and a Kiwify checkout button; after `EVENT_UTC` it hides the timer and renders a `<WaitlistForm />` stub (replaced by the real form in task_05).

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `CTABlock.tsx` MUST carry the `"use client"` directive — it is the only CTA component that does so
- The countdown display MUST show days, hours, minutes, and seconds; MUST include a "horário de Brasília" label per PRD Risk mitigation
- When `isExpired` is `false`, the component MUST render a Kiwify `<a>` button using `KIWIFY_URL` with `target="_blank"` and `rel="noopener noreferrer"`
- When `isExpired` is `true`, the countdown display MUST be hidden and a `<WaitlistForm />` stub MUST be rendered in place of the Kiwify button
- The Kiwify CTA button MUST have the `animate-pulse-glow` class from task_02
- The Kiwify CTA button MUST have a minimum touch target height of 48px (PRD mobile UX requirement)
- `useCountdown(EVENT_UTC)` MUST be the sole source of `isExpired` — no additional date comparisons
- The component MUST accept no required props (it reads `EVENT_UTC` from constants internally)
</requirements>

## Subtasks
- [x] 4.1 Create `app/components/landing/CTABlock.tsx` with `"use client"` directive
- [x] 4.2 Wire `useCountdown(EVENT_UTC)` and render the countdown display with "horário de Brasília" label
- [x] 4.3 Implement the Kiwify `<a>` button with `animate-pulse-glow` and 48px minimum height
- [x] 4.4 Implement the `isExpired` branch: hide countdown, render inline `<WaitlistForm />` stub (a placeholder `<div>` with a TODO comment)
- [x] 4.5 Write unit tests covering both the pre-event and post-event render states

## Implementation Details
See TechSpec "Core Interfaces" for the `useCountdown` return type and "Data Models" for constant paths. See TechSpec "Data flow" step 2 for how the `isExpired` flag drives the CTA switch. The stub for `WaitlistForm` is intentionally temporary — task_05 will replace it with a real import. Keep the stub minimal (a single `<div>` or comment placeholder) so task_05's diff is clean.

### Relevant Files
- `app/hooks/useCountdown.ts` — core hook consumed by this component
- `app/lib/constants.ts` — `EVENT_UTC` and `KIWIFY_URL`
- `app/globals.css` — `animate-pulse-glow` keyframe (task_02)

### Dependent Files
- `app/components/landing/CTABlock.tsx` — modified in task_05 to replace the WaitlistForm stub
- `app/components/landing/HeroSection.tsx` — embeds `<CTABlock />` (task_06)
- `app/components/landing/PriceBlock.tsx` — embeds `<CTABlock />` (task_06)
- `app/components/landing/FinalCTA.tsx` — embeds `<CTABlock />` (task_06)

### Related ADRs
- [ADR-002: Client-Side Countdown Timer](../adrs/adr-002.md) — full rationale for client-side approach, flash risk acknowledgement, and UTC timestamp anchor

## Deliverables
- `app/components/landing/CTABlock.tsx` with countdown display and dual-state CTA
- Unit tests for pre-event and post-event render states with ≥80% coverage **(REQUIRED)**

## Tests
- Unit tests:
  - [x] When rendered with a future `EVENT_UTC`, countdown digits are visible and the Kiwify `<a>` button is present
  - [x] When rendered with a past `EVENT_UTC` (mocked `Date.now()`), countdown is hidden and the `WaitlistForm` stub is rendered
  - [x] Kiwify `<a>` button `href` equals `KIWIFY_URL` constant value
  - [x] Kiwify `<a>` button has `target="_blank"` attribute
  - [x] Kiwify `<a>` button has computed height ≥ 48px (rendered via jsdom or Playwright)
  - [x] The "horário de Brasília" label text is present in the DOM when countdown is visible
- Integration tests:
  - [x] At viewport 375px, Kiwify button renders without horizontal overflow (Playwright)
  - [x] Countdown digits update every second when running in the browser (Playwright: wait 1100ms, assert digits changed)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `isExpired: false` state renders countdown + Kiwify button with pulse animation
- `isExpired: true` state renders WaitlistForm stub with no countdown visible
- Component compiles without TypeScript errors and carries no unused imports
