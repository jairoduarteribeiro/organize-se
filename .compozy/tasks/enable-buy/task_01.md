---
status: completed
title: Post-Event Recording Checkout CTA
type: frontend
complexity: medium
dependencies: []
---

# Task 01: Post-Event Recording Checkout CTA

## Overview
Replace the expired landing-page CTA branch with a recording-focused Kiwify checkout path. This removes the post-event waitlist dead end while preserving the existing checkout URL, date-state mechanism, styling, and accessibility expectations.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `CTABlock` MUST render a Kiwify checkout link after `EVENT_UTC` expires instead of rendering `WaitlistForm`
- The post-event CTA label MUST clearly communicate recording access using Brazilian Portuguese copy such as "Quero acessar a gravação"
- The post-event CTA area MUST show a concise message that the live workshop has passed and the recording is available for immediate access for a limited time
- The post-event branch MUST NOT render countdown markup, countdown urgency, an email textbox, or the waitlist submit button as the primary action
- The checkout link MUST keep using `KIWIFY_URL` with `target="_blank"` and `rel="noopener noreferrer"`
- The CTA MUST keep the existing purchase-focused visual treatment, `animate-scale-pulse` behavior, and at least a 48px touch target
- The implementation MUST keep `EVENT_UTC` and `useCountdown` as the only date-state mechanism and MUST NOT add a fake recording deadline constant
- Existing `WaitlistForm` and `submitWaitlistEmail` coverage MUST remain valid unless those dormant files are explicitly removed later
</requirements>

## Subtasks
- [x] 1.1 Replace the expired `CTABlock` waitlist branch with a recording availability message and Kiwify checkout CTA
- [x] 1.2 Preserve the pre-event countdown branch, pre-event CTA behavior, external link attributes, animation class, and touch target
- [x] 1.3 Update unit tests that currently expect post-event waitlist mode to expect the recording checkout state
- [x] 1.4 Update affected Playwright post-event assertions so the page verifies checkout access after the event timestamp
- [x] 1.5 Confirm dormant waitlist component and action tests still cover the unused waitlist surface
- [x] 1.6 Run the focused unit and browser tests for CTA behavior and fix any lint or test regressions introduced by this task

## Implementation Details
See TechSpec "Implementation Design", "Integration Points", and "Testing Approach" for the intended component contract and test expectations. The work is localized to the existing `CTABlock` state boundary; do not introduce new APIs, route handlers, checkout abstractions, storage, environment variables, packages, or deadline constants.

### Relevant Files
- `app/components/landing/CTABlock.tsx` — owns the pre-event/post-event switch and currently renders `WaitlistForm` after expiration
- `app/hooks/useCountdown.ts` — supplies the `isExpired` state used by `CTABlock`; should remain the only date-state mechanism
- `app/lib/constants.ts` — defines `EVENT_UTC` and `KIWIFY_URL`; the checkout link must keep using these constants
- `__tests__/cta-block.test.tsx` — unit coverage for pre-event CTA behavior and current post-event waitlist assertions
- `e2e/landing-page-v1.pw.ts` — contains post-event Playwright tests that currently expect waitlist mode
- `e2e/cta-block.pw.ts` — browser fixture coverage for CTA sizing and countdown behavior that may need label alignment if shared expectations change

### Dependent Files
- `app/components/landing/WaitlistForm.tsx` — no longer primary post-event UX but remains dormant component coverage
- `app/actions/waitlist.ts` — no longer primary post-event action but remains dormant Server Action coverage
- `app/components/landing/HeroSection.tsx` — embeds `CTABlock`, so post-event behavior changes in the hero CTA area
- `app/components/landing/PriceBlock.tsx` — embeds `CTABlock`, so post-event behavior changes in the price CTA area
- `app/components/landing/FinalCTA.tsx` — embeds `CTABlock`, so post-event behavior changes in the final CTA area
- `app/components/landing/PainQualifier.tsx` — embeds `CTABlock`, so post-event behavior changes there even though copy changes are deferred to task_02
- `__tests__/waitlist-form.test.tsx` — should continue passing as dormant component coverage
- `__tests__/waitlist-action.test.ts` — should continue passing as dormant action coverage
- `e2e/waitlist-form.pw.ts` — should continue passing if the standalone waitlist fixture remains unchanged

### Related ADRs
- [ADR-001: Post-Event Checkout Conversion](adrs/adr-001.md) — establishes checkout conversion as the post-event primary action
- [ADR-002: Localized Post-Event CTA Implementation](adrs/adr-002.md) — constrains implementation to `CTABlock`, existing constants, and plain Kiwify checkout links

## Deliverables
- `CTABlock` renders a recording-focused Kiwify CTA after the event timestamp instead of `WaitlistForm`
- Post-event CTA copy clearly says the buyer is accessing the recording, not reserving a live seat
- Pre-event countdown and checkout behavior remains unchanged
- Updated `__tests__/cta-block.test.tsx` coverage for pre-event and post-event states **(REQUIRED)**
- Updated affected Playwright post-event assertions in `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- Dormant waitlist unit/action tests still pass or are intentionally adjusted only if the dormant surface changes **(REQUIRED)**
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for post-event checkout behavior **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `CTABlock` before `EVENT_UTC` renders countdown digits, the Brasília date label, and the existing live-workshop Kiwify CTA
  - [x] `CTABlock` after `EVENT_UTC` does not render `aria-label="Contagem regressiva para o workshop"`
  - [x] `CTABlock` after `EVENT_UTC` renders a link named with "gravação" that points to `KIWIFY_URL`
  - [x] Post-event checkout link has `target="_blank"`, `rel="noopener noreferrer"`, `animate-scale-pulse`, `hover:animate-none`, and computed min-height >= 48px
  - [x] Post-event state does not render the waitlist email textbox labeled "email para lista de espera" or the "entrar na lista" submit button
  - [x] `WaitlistForm` and `submitWaitlistEmail` tests still pass as dormant coverage
- Integration tests:
  - [x] Opening the page after advancing time past `EVENT_UTC` shows the recording checkout CTA as a visible primary action
  - [x] The post-event recording CTA points to `KIWIFY_URL` and keeps `target="_blank"` plus `rel="noopener noreferrer"`
  - [x] The post-event page does not expose the primary waitlist email textbox or waitlist submit flow in the CTA areas
  - [x] Mobile viewport at 375px keeps the post-event CTA visible, tappable, and at least 48px tall without horizontal overflow
  - [x] No external Kiwify purchase flow is automated
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `bun run lint` exits 0
- A post-event visitor can click directly to the Kiwify checkout without submitting an email
- The post-event CTA clearly communicates recording access in Brazilian Portuguese
- No countdown or primary waitlist form appears after the event timestamp
- No new checkout provider, API endpoint, payment handling, dependency, environment variable, or unsupported recording deadline is introduced
