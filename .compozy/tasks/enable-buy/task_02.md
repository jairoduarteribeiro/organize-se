---
status: completed
title: Replay Offer Copy Alignment
type: frontend
complexity: medium
dependencies:
  - task_01
---

# Task 02: Replay Offer Copy Alignment

## Overview
Align high-visibility landing-page copy with the new post-event recording purchase path. This reduces buyer confusion by removing live-seat language near major CTA moments while preserving the existing sales-page structure, R$ 47 price, and 7-day guarantee.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Hero CTA-adjacent copy MUST avoid presenting the offer as only a future live seat after the event has passed
- Price block copy MUST preserve the R$ 47 offer, workbook/spreadsheet value where already promised, and 7-day guarantee visibility
- Final CTA copy MUST avoid "vaga" or other live-seat wording that conflicts with recording access
- FAQ copy MUST clarify recording availability and guarantee without promising a new live cohort or unsupported access deadline
- Copy MUST remain Brazilian Portuguese, direct, and consistent with the existing page structure
- The task MUST adjust only high-visibility copy required by the MVP and MUST NOT rewrite the full page as a permanent evergreen replay offer
- The task MUST NOT add a `RECORDING_AVAILABLE_UNTIL` constant, fake deadline, new analytics, A/B testing, or new waitlist path
- CTA text and nearby copy MUST fit mobile layouts without awkward wrapping or horizontal overflow
</requirements>

## Subtasks
- [x] 2.1 Update hero eyebrow/supporting copy so it signals recording access without implying a future live-only purchase
- [x] 2.2 Update price block offer copy so R$ 47, Kiwify payment, recording access, and guarantee expectations remain clear
- [x] 2.3 Update final CTA copy so the purchase moment references access to the workshop recording instead of a live seat
- [x] 2.4 Update FAQ answers that mention live attendance, the event date, or recording access so they reduce post-event confusion
- [x] 2.5 Update component tests or source assertions that depend on the changed copy
- [x] 2.6 Update affected Playwright copy, accessibility, mobile overflow, and CTA selector assertions
- [x] 2.7 Run the focused test suite for static landing components and browser landing behavior

## Implementation Details
See TechSpec "Impact Analysis", "Development Sequencing", and "Known Risks" for the constrained copy surface. This task depends on task_01 so static copy can match the implemented recording CTA behavior without adding broader offer-state plumbing.

### Relevant Files
- `app/components/landing/HeroSection.tsx` — current eyebrow says "Workshop online e ao vivo" directly above the primary CTA
- `app/components/landing/PriceBlock.tsx` — current copy mentions "Inscrição", "orientação ao vivo", and access after registration near the R$ 47 offer
- `app/components/landing/FinalCTA.tsx` — current copy says "Garanta sua vaga" near the final CTA
- `app/components/landing/FaqAccordion.tsx` — FAQ items mention live attendance, recording, event date, and guarantee
- `__tests__/landing-components.test.tsx` — component rendering tests may need assertions for replay-safe copy, FAQ count, price, and guarantee
- `__tests__/landing-components.ssr.test.tsx` — SSR smoke coverage must continue passing for static landing components
- `__tests__/landing-component-sources.test.ts` — source constraints should remain valid for Server Component boundaries and overflow clipping
- `e2e/landing-page-v1.pw.ts` — browser suite covers conversion path, mobile overflow, accessibility, guarantee, and CTA behavior
- `e2e/page-composition.pw.ts` — smoke coverage for page load and visible Kiwify CTA URL may be affected by CTA accessible-name updates

### Dependent Files
- `app/components/landing/CTABlock.tsx` — task_01 recording CTA copy is the anchor for surrounding copy decisions
- `app/components/landing/PainQualifier.tsx` — embeds `CTABlock`; copy is not a priority PRD area but its layout must remain compatible with the updated CTA
- `app/components/landing/Deliverables.tsx` — may contain residual live/date copy; only adjust if the post-event confusion risk is directly visible and within MVP scope
- `app/layout.tsx` — metadata may mention live workshop; do not broaden scope unless tests or visible requirements require it
- `app/page.tsx` — composition order should remain unchanged
- `app/components/landing/GuaranteeSeal.tsx` — guarantee component should remain visible and unchanged unless copy alignment requires a test update

### Related ADRs
- [ADR-001: Post-Event Checkout Conversion](adrs/adr-001.md) — requires recording purchase clarity while preserving existing price, checkout, and page structure
- [ADR-002: Localized Post-Event CTA Implementation](adrs/adr-002.md) — limits copy changes to high-visibility CTA-adjacent areas and rejects broader offer-state plumbing

## Deliverables
- Hero CTA-adjacent copy no longer conflicts with a post-event recording purchase
- Price block preserves R$ 47, Kiwify payment expectation, recording access framing, and guarantee visibility
- Final CTA copy removes live-seat wording and aligns with recording access
- FAQ copy clarifies recording availability, event status, and 7-day guarantee without unsupported scarcity claims
- Component tests updated for replay-safe copy expectations **(REQUIRED)**
- Playwright assertions updated for changed CTA/copy behavior, mobile overflow, accessibility, and checkout URL checks **(REQUIRED)**
- Unit tests with 80%+ coverage **(REQUIRED)**
- Integration tests for replay-aligned landing copy **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `HeroSection` renders CTA-adjacent copy containing recording/replay access language and still renders the Kiwify CTA
  - [ ] `PriceBlock` renders "R$ 47" and copy that references access to the recording rather than only live orientation
  - [ ] `FinalCTA` does not render "vaga" in the final purchase copy and still renders `GuaranteeSeal`
  - [ ] `FaqAccordion` still renders exactly 5 `details` elements and includes an answer that states the recording is available for access
  - [ ] Static landing components still render without browser globals in SSR tests
  - [ ] Source constraint tests still confirm non-interactive landing sections remain Server Components
- Integration tests:
  - [ ] Landing page conversion path finds a visible Kiwify CTA using the updated checkout-access copy and exact `KIWIFY_URL`
  - [ ] Mobile viewport at 320px or 375px has no horizontal scrollbar after updated CTA/copy strings render
  - [ ] Accessibility audit remains at score >=90 with no serious or critical blocking violations
  - [ ] Guarantee seals remain visible, circular, accessible, and near purchase moments
  - [ ] Post-event browser state contains no visible CTA copy implying purchase of a live seat after June 28, 2026
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `bun run lint` exits 0
- Major purchase moments tell visitors they are buying access to the recording, not a live seat
- R$ 47 price and 7-day guarantee remain visible near purchase decisions
- Page structure, component ownership, and mobile-first conversion flow remain intact
- No unsupported deadline, new waitlist flow, analytics dashboard, checkout provider, or full evergreen page rewrite is introduced
