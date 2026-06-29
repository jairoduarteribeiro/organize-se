# PRD: Enable Post-Event Recording Purchase (enable-buy)

## Overview

The ORGANIZE-$E sales page currently switches to a waitlist form after the live workshop date. That behavior blocks motivated visitors who arrive after the event and want to buy access to the recording.

This feature adapts the post-event sales experience so visitors can buy the workshop recording through the existing Kiwify checkout. The page should make the offer clear: the live workshop has passed, but the recording is available for immediate access for a limited time.

The feature is for late visitors who already have buying intent and for Rafaela's team, which is currently handling avoidable questions from people asking whether they can still purchase the workshop.

## Goals

- Replace the post-event waitlist call to action with a checkout path for the workshop recording.
- Make it clear near the primary CTA that buyers get access to the recording, not a live seat.
- Keep the R$ 47 offer and reinforce the existing 7-day guarantee.
- Reduce inbound questions about whether the recording is available.
- Preserve the existing sales-page structure instead of rewriting the full page.

## User Stories

### Primary Persona: Late Buyer With Purchase Intent

- As a visitor who missed the live workshop, I want to see that the recording is available so that I can decide without messaging Rafaela first.
- As a ready buyer, I want a visible checkout button so that I can purchase the recording immediately.
- As a buyer who missed the live event, I want the CTA copy to clearly mention the recording so that I do not think I am buying a live seat.
- As a cautious buyer, I want the guarantee to remain visible so that I feel safe buying after the event.

### Secondary Persona: Rafaela's Team

- As the seller, I want the page to answer recording-access questions so that fewer people ask manually through direct messages.
- As the seller, I want to keep using the existing checkout offer so that I can monetize post-event demand quickly.

## Core Features

### 1. Post-Event Recording CTA

After the workshop date, the sales page must show a Kiwify checkout CTA instead of the email waitlist form.

The CTA should communicate access to the recording, using copy such as "Acessar a gravação" or "Quero acessar a gravação." It should remain visually prominent and retain the purchase-focused styling of the original checkout CTA.

### 2. Recording Availability Message

The post-event CTA area must replace countdown urgency with a concise message that the recording is available for immediate access for a limited time.

The message should avoid implying that the buyer will attend a future live workshop. It should set the right expectation: this purchase gives access to the recorded workshop.

### 3. Price and Guarantee Continuity

The offer remains R$ 47. The page should keep the existing 7-day guarantee visible near major purchase moments, especially the final CTA.

The product value framing should remain stable: the buyer receives the practical workshop content, workbook/spreadsheet value where already promised, and a clear plan for organizing finances.

### 4. Minimal Copy Alignment

The MVP should adjust the most visible CTA-adjacent text so the page no longer creates confusion after the event. It should not rewrite the entire sales page.

Priority copy areas:

- Hero CTA block
- Price block CTA area
- Final CTA area
- FAQ items that mention live attendance or recording access, if needed for clarity

### 5. Waitlist Deprioritization

The waitlist form is no longer the primary post-event action while the recording offer is active. A future waitlist path can be reconsidered later, but it is not part of this MVP.

## User Experience

1. Visitor arrives after the live workshop date.
2. The page communicates that the live workshop has passed and the recording is available.
3. Visitor sees the recording CTA instead of an email waitlist form.
4. Visitor clicks through to the Kiwify checkout.
5. Visitor buys the R$ 47 offer and receives access through the normal checkout flow.
6. If the visitor has concerns, the guarantee and FAQ reduce purchase friction.

UX requirements:

- CTA text must fit mobile layouts without wrapping awkwardly.
- The CTA must remain easy to tap on mobile.
- The page must not show a countdown for an event that has already passed.
- The page must not ask for a waitlist email as the primary post-event action.
- Copy must be Brazilian Portuguese and direct.

## High-Level Technical Constraints

- The checkout must use the existing Kiwify purchase path.
- The product is still sold externally through Kiwify; the landing page should not process payment itself.
- The existing sales-page performance and accessibility expectations remain in force.
- The page must preserve the existing mobile-first conversion flow.

## Non-Goals

- No full sales-page rewrite for a permanently evergreen product.
- No new checkout provider.
- No member area, login, or payment processing on the landing page.
- No new waitlist or email marketing integration.
- No A/B testing setup.
- No new analytics dashboard.
- No new pricing experiment.
- No promise of a future live cohort in the MVP.

## Phased Rollout Plan

### MVP (Phase 1)

- Replace post-event waitlist form with Kiwify checkout CTA.
- Change CTA copy to focus on recording access.
- Replace countdown messaging with "recording available for limited time" urgency.
- Keep R$ 47 and reinforce guarantee.
- Adjust only high-visibility copy that would otherwise confuse visitors.

Success criteria:

- A post-event visitor can immediately understand that the recording is available.
- A post-event visitor can click the checkout CTA without submitting an email.
- Rafaela receives fewer direct questions asking whether the recording can be purchased.

### Phase 2

- Refresh more page copy for an evergreen replay offer if recording sales continue.
- Add stronger replay-specific objection handling in FAQ.
- Consider a secondary waitlist path for future live editions.

### Phase 3

- Evaluate whether to split live-edition and replay-offer pages.
- Add tracking or reporting if post-event sales become a recurring campaign.

## Success Metrics

- Primary: reduction in manual questions about whether the recording is available.
- Secondary: clicks from the post-event CTA to Kiwify checkout.
- Secondary: Kiwify sales of the R$ 47 recording offer.
- Quality: no visible post-event waitlist form in the primary CTA areas.
- Quality: no CTA copy that implies the buyer is purchasing a live seat after the event date.

## Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Visitors think they are buying live access | Higher refund risk or support questions | Make CTA-adjacent copy explicitly say "gravação" |
| "Limited time" feels vague | Reduced trust | Use restrained urgency and avoid unsupported scarcity claims |
| Removing waitlist reduces future-edition leads | Fewer leads for a next cohort | Revisit a secondary waitlist in Phase 2 |
| Existing page sections still mention live format | Some residual confusion | Adjust the most visible text in MVP and defer full rewrite only if needed |

## Architecture Decision Records

- [ADR-001: Post-Event Checkout Conversion](adrs/adr-001.md) — Chose checkout conversion as the post-event primary action instead of waitlist capture or a full replay-page rewrite.

## Open Questions

1. What exact deadline, if any, should support the "limited time" message?
2. Does the Kiwify product copy already promise access to the recording after purchase?
3. Should FAQ copy explicitly state how long the recording remains available?
