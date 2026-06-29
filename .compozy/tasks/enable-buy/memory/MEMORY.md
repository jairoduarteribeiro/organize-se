# Workflow Memory

Keep only durable, cross-task context here. Do not duplicate facts that are obvious from the repository, PRD documents, or git history.

## Current State
- Task 01 complete: CTABlock post-event branch now renders recording checkout CTA instead of WaitlistForm
- Task 02 complete: Replay Offer Copy Alignment (hero, price, final CTA, FAQ adjustments)

## Shared Decisions
- WaitlistForm remains as dormant component/action — NOT removed; existing tests stay valid
- No fake RECORDING_AVAILABLE_UNTIL constant introduced — `EVENT_UTC` + `useCountdown` remain sole date mechanism
- `e2e/cta-block.pw.ts` and `e2e/waitlist-form.pw.ts` are standalone HTML fixtures (not React) — not affected by CTABlock changes

## Shared Learnings
- Tests rendering parent components that embed CTABlock (HeroSection, PriceBlock, FinalCTA) need `vi.spyOn(Date, "now")` to mock pre-event time, otherwise they run in post-event mode after June 28, 2026
- Tests for components that render CTABlock must use specific regex/selectors to avoid matching CTABlock post-event copy ("Garanta seu acesso agora", "gravação está disponível") when asserting surrounding component copy — use `getAllByText` or context-bound queries

## Open Risks
- Residual live-event copy remains in Deliverables.tsx ("Momento Q&A" answer mentions "ao vivo", logistics say "Online e ao vivo pelo Google Meet") — not in MVP scope but may cause confusion for post-event visitors who read that section
- `layout.tsx` metadata may mention live workshop — verify in later phase if post-event sales continue

## Handoffs
