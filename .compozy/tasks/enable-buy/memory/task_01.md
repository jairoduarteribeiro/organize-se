# Task Memory: task_01.md

## Objective Snapshot
Replace post-event `WaitlistForm` branch in `CTABlock` with recording-focused Kiwify checkout CTA. Update unit tests and Playwright assertions to match new post-event state.

## Important Decisions
- Post-event CTA label: "Quero acessar a gravação" (Brazilian Portuguese)
- Post-event message: "O workshop ao vivo já aconteceu. A gravação está disponível por tempo limitado. Garanta seu acesso agora."
- Keep pre-event countdown + Kiwify CTA exactly as-is
- WaitlistForm remains dormant — import removed from CTABlock but component/action/tests untouched
- `e2e/cta-block.pw.ts` and `e2e/waitlist-form.pw.ts` are standalone HTML fixtures — no changes needed

## Learnings
- `landing-components.test.tsx` test for HeroSection CTA needed `Date.now()` mock because real Date.now() is post-event
- Coverage include pattern covers all `app/components/landing/**/*.tsx` — CTABlock is tracked
- `e2e/waitlist-form.pw.ts` is a standalone HTML fixture, not coupled to CTABlock — remains valid dormant coverage

## Files / Surfaces
- `app/components/landing/CTABlock.tsx` — modified (post-event branch replaced, WaitlistForm import removed)
- `__tests__/cta-block.test.tsx` — modified (3 post-event tests updated/added)
- `__tests__/landing-components.test.tsx` — modified (Date.now mock + vi.restoreAllMocks added)
- `e2e/landing-page-v1.pw.ts` — modified (2 post-event tests replaced with recording CTA assertions)
- `e2e/cta-block.pw.ts` — standalone HTML fixture, unchanged
- `e2e/waitlist-form.pw.ts` — standalone HTML fixture, unchanged
- `__tests__/waitlist-form.test.tsx` — dormant, unchanged
- `__tests__/waitlist-action.test.ts` — dormant, unchanged
- `app/components/landing/WaitlistForm.tsx` — dormant, unchanged
- `app/actions/waitlist.ts` — dormant, unchanged

## Errors / Corrections
- N/A — all tests pass, lint passes, coverage >= 80%

## Ready for Next Run
Task complete. All requirements met:
- [x] CTABlock renders recording Kiwify CTA post-event instead of WaitlistForm
- [x] Post-event CTA label clearly says "Quero acessar a gravação"
- [x] Pre-event countdown and CTA behavior preserved
- [x] No countdown, waitlist textbox, or waitlist button post-event
- [x] Checkout link has target="_blank", rel="noopener noreferrer", animate-scale-pulse, 48px min-height
- [x] Uses existing EVENT_UTC, KIWIFY_URL constants — no new constants
- [x] All 60 tests pass, lint exits 0, coverage 92.5%
- [x] Dormant waitlist tests still pass
