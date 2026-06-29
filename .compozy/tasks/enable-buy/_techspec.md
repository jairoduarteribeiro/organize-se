# TechSpec: Enable Post-Event Recording Purchase

## Executive Summary

The implementation will replace the post-event waitlist branch in `CTABlock` with a recording-focused Kiwify checkout CTA. The design keeps the existing Next.js App Router page structure, the existing `EVENT_UTC` and `KIWIFY_URL` constants, and the current plain external checkout link.

The primary trade-off is narrowness over full offer-state modeling. This avoids new APIs, storage, checkout abstractions, and page-level state plumbing, but requires a focused copy pass in high-visibility components to remove confusing live-event language.

## System Architecture

### Component Overview

- `app/page.tsx`: remains the Server Component composition shell for the landing page.
- `app/components/landing/CTABlock.tsx`: owns the client-side pre-event/post-event switch through `useCountdown(EVENT_UTC)`.
- `app/hooks/useCountdown.ts`: remains the only date-state mechanism.
- `app/lib/constants.ts`: remains the source for `EVENT_UTC` and `KIWIFY_URL`.
- `HeroSection`, `PriceBlock`, `FinalCTA`, `FaqAccordion`: receive static copy adjustments only where post-event live-seat language conflicts with recording purchase.
- Kiwify: remains the external checkout destination.

## Implementation Design

### Core Interfaces

The primary behavior contract is the CTA offer state derived from the existing countdown result.

```go
type RecordingOfferCTA struct {
	IsPostEvent bool
	Href        string
	Label       string
	Message     string
}
```

Implementation remains TypeScript/React. The struct above documents the component contract: when `IsPostEvent` is true, render recording copy and link to `KIWIFY_URL`; when false, render countdown and the existing live-workshop CTA.

### Data Models

No database schema, durable storage, or API request/response models are needed.

Existing constants:

- `EVENT_UTC`: event cutoff timestamp.
- `KIWIFY_URL`: external checkout URL.

No `RECORDING_AVAILABLE_UNTIL` constant will be added until the business has a real deadline.

### API Endpoints

No new API endpoints, route handlers, or Server Actions are required.

The existing `app/actions/waitlist.ts` can remain dormant. The MVP changes the primary post-event UX, not the existence of the waitlist component.

## Integration Points

- Kiwify checkout: use the existing external URL from `KIWIFY_URL`.
- Link behavior: preserve `target="_blank"` and `rel="noopener noreferrer"`.
- Error handling: no internal checkout errors are handled because payment remains outside the app.
- Retries: not applicable.

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|---------------------|-----------------|
| `CTABlock.tsx` | modified | Replaces expired waitlist branch with recording purchase CTA. Medium UX risk if copy implies live access. | Render post-event message, Kiwify link, no countdown. |
| `HeroSection.tsx` | modified | Current eyebrow says live workshop. Low risk. | Adjust high-visibility post-event copy. |
| `PriceBlock.tsx` | modified | Current copy mentions live orientation and registration. Medium risk. | Align offer copy with recording access while keeping R$ 47 and guarantee. |
| `FinalCTA.tsx` | modified | Current copy says "vaga". Medium risk. | Change to recording access language. |
| `FaqAccordion.tsx` | modified | Date/live attendance answers can confuse post-event buyers. Medium risk. | Clarify recording availability and guarantee. |
| `WaitlistForm.tsx` / `waitlist.ts` | unchanged | No longer primary post-event action. Low risk. | Keep existing unit coverage unless later removed. |
| Tests | modified | Current post-event assertions expect waitlist mode. High regression risk. | Update Vitest and affected Playwright cases. |

## Testing Approach

### Unit Tests

- Update `__tests__/cta-block.test.tsx`.
- Pre-event: keep countdown, Brasília date label, and existing Kiwify CTA assertions.
- Post-event: assert no countdown, no waitlist textbox/button, visible recording CTA, exact `KIWIFY_URL`, `target`, `rel`, animation class, and minimum 48px touch height.
- Keep `waitlist-form.test.tsx` and `waitlist-action.test.ts` as dormant component/action coverage.

### Integration Tests

- Update `e2e/landing-page-v1.pw.ts` post-event tests.
- Replace "switches to waitlist mode" with "shows recording checkout after event timestamp."
- Replace waitlist submission flow with assertions that the Kiwify CTA is visible and primary.
- Preserve mobile overflow, accessibility, reduced-motion, guarantee, and CTA URL checks.
- No external Kiwify purchase flow should be automated.

## Development Sequencing

### Build Order

1. Update `CTABlock` post-event branch - no dependencies.
2. Update CTA-adjacent copy in `HeroSection`, `PriceBlock`, `FinalCTA`, and `FaqAccordion` - depends on step 1 so copy matches the rendered post-event CTA.
3. Update unit tests for `CTABlock` - depends on steps 1 and 2.
4. Update affected Playwright post-event tests - depends on step 3's expected behavior.
5. Run `bun run lint`, `bun run test`, and the affected Playwright suite - depends on steps 1-4.

### Technical Dependencies

- Existing Kiwify checkout URL must remain valid.
- No new infrastructure, packages, environment variables, or lockfile changes are required.
- No fake recording availability deadline should be introduced.

## Monitoring and Observability

No new telemetry will be added in the MVP.

Operational checks:

- Kiwify CTA click path remains visible and points to `KIWIFY_URL`.
- Kiwify sales and checkout clicks can be reviewed outside the app if available.
- Support question volume about recording availability is tracked manually by Rafaela's team.

## Technical Considerations

### Key Decisions

- Decision: keep offer-state rendering inside `CTABlock`.
  Rationale: the component already owns countdown expiration behavior.
  Trade-off: less reusable than a shared offer model, but lower churn.
  Alternatives rejected: shared offer config and page-level state.

- Decision: keep checkout as an external Kiwify link.
  Rationale: the PRD does not require payment processing or internal tracking.
  Trade-off: no first-party click tracking in the MVP.
  Alternatives rejected: redirect route, checkout service abstraction.

- Decision: use focused test updates.
  Rationale: the behavior change is narrow and covered by existing CTA/e2e tests.
  Trade-off: no full landing test rewrite.
  Alternatives rejected: unit-only testing and full e2e refresh.

### Known Risks

- Residual live-event copy may confuse buyers. Mitigation: update the CTA-adjacent sections listed in the PRD.
- "Limited time" can sound unsupported. Mitigation: use restrained copy without a deadline.
- Hydration timing can briefly render pre-event markup if date mocking is inconsistent. Mitigation: keep deterministic tests around `Date.now()` and `EVENT_UTC`.

## Architecture Decision Records

- [ADR-001: Post-Event Checkout Conversion](adrs/adr-001.md) - Chose checkout conversion as the post-event primary action instead of waitlist capture or a full replay-page rewrite.
- [ADR-002: Localized Post-Event CTA Implementation](adrs/adr-002.md) - Chose a narrow `CTABlock` implementation with existing constants and plain Kiwify checkout.
