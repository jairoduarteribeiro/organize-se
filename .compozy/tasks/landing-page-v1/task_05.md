---
status: completed
title: WaitlistForm & Server Action
type: backend
complexity: medium
dependencies:
  - task_04
---

# Task 05: WaitlistForm & Server Action

## Overview
Implements the Phase 1 email capture surface: a `submitWaitlistEmail` Server Action that validates and logs submitted emails to stdout, and a `WaitlistForm` client component that calls the action via `useActionState`. Replaces the inline stub in `CTABlock.tsx` (task_04) with a real import of `WaitlistForm`.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `app/actions/waitlist.ts` MUST carry the `"use server"` directive
- The Server Action MUST validate the email field using a basic regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) — no external library required per TechSpec
- On valid email, the action MUST log `[waitlist] email=<value>` to stdout and return `{ success: true }`
- On invalid email, the action MUST return `{ success: false, error: "Email inválido." }` (Portuguese per PRD language requirement)
- `WaitlistForm.tsx` MUST carry the `"use client"` directive and call the action with `useActionState`
- `WaitlistForm.tsx` MUST display the error message when `state.error` is present
- `WaitlistForm.tsx` MUST display a success confirmation message in Portuguese when `state.success` is `true`
- `CTABlock.tsx` MUST be updated to import `WaitlistForm` from its file and remove the inline stub
- The form input MUST have a minimum touch target height of 48px and a visible label or `aria-label`
</requirements>

## Subtasks
- [x] 5.1 Create `app/actions/` directory and implement `waitlist.ts` with `"use server"`, email validation, stdout log, and typed return value
- [x] 5.2 Create `WaitlistForm.tsx` in `app/components/landing/` with `"use client"`, `useActionState`, email input, submit button, and state feedback UI
- [x] 5.3 Update `CTABlock.tsx` to import `WaitlistForm` and remove the placeholder stub
- [x] 5.4 Write unit tests for the Server Action (valid email, invalid email, edge-case formats) and WaitlistForm (success state, error state rendering)

## Implementation Details
See TechSpec "API Endpoints" table and "Implementation Design" section for the exact `WaitlistActionResult` type and `submitWaitlistEmail` signature. See ADR-003 "Implementation Notes" for the Phase 2 upgrade path — structure the action so the `console.log` line is the only thing that changes in Phase 2. Portuguese copy for success/error messages must match the page's Brazilian Portuguese tone.

### Relevant Files
- `app/components/landing/CTABlock.tsx` — stub replaced with real `WaitlistForm` import (task_04 output)
- `app/hooks/useCountdown.ts` — no change needed; referenced for context of how CTABlock works

### Dependent Files
- `app/components/landing/CTABlock.tsx` — modified to import real `WaitlistForm`
- `app/page.tsx` — indirectly: CTABlock is composed into the page in task_06

### Related ADRs
- [ADR-003: Next.js Server Action for Waitlist Email Capture](../adrs/adr-003.md) — defines Phase 1 log-only approach and Phase 2 upgrade path

## Deliverables
- `app/actions/waitlist.ts` with `submitWaitlistEmail` Server Action
- `app/components/landing/WaitlistForm.tsx` with `useActionState` integration
- Updated `app/components/landing/CTABlock.tsx` (stub removed, real import added)
- Unit tests for Server Action and WaitlistForm with ≥80% coverage **(REQUIRED)**
- Integration tests for form submission flow **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `submitWaitlistEmail` with `email=teste@email.com` returns `{ success: true }`
  - [x] `submitWaitlistEmail` with `email=not-an-email` returns `{ success: false, error: "Email inválido." }`
  - [x] `submitWaitlistEmail` with `email=` (empty string) returns `{ success: false, error: "Email inválido." }`
  - [x] `submitWaitlistEmail` with `email=a@b.c` (minimal valid) returns `{ success: true }`
  - [x] `WaitlistForm` renders an email input and submit button
  - [x] `WaitlistForm` displays the error message text when rendered with an error state
  - [x] `WaitlistForm` displays a success message in Portuguese when rendered with `success: true` state
- Integration tests:
  - [x] Fill `WaitlistForm` email input with `teste@email.com`, submit, assert success message appears (Playwright)
  - [x] Fill `WaitlistForm` email input with `invalido`, submit, assert error message "Email inválido." appears (Playwright)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Server Action validates email and logs `[waitlist] email=<value>` to stdout for valid submissions
- `CTABlock.tsx` no longer contains the inline stub comment
- WaitlistForm meets 48px touch target height requirement on mobile
- All Portuguese copy matches the page's tone
