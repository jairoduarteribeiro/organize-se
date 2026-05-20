# Task Memory: task_09.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement the task 09 Playwright suite against the real Next route at `http://localhost:3000`, covering navigation/content, responsiveness, accessibility, post-event state, and waitlist submission.

## Important Decisions
- Use the existing `playwright.config.ts` location (`e2e/**/*.pw.ts`) for task 09 specs.
- Extend real-route Playwright coverage instead of relying on the earlier static browser fixtures from prior tasks.
- Route the PainQualifier closing CTA through `CTABlock` so it follows the same post-event waitlist switch as the hero, price, and final CTAs.

## Learnings
- Pre-change `npx playwright test` ran 14 existing tests successfully, but the suite did not yet include a task 09 accessibility audit or real-route post-event/waitlist submission assertions.
- The post-event Playwright tests should install a controllable `Date.now()` via `page.addInitScript`, wait for the pre-event CTA to hydrate, then advance the mocked timestamp. Advancing before hydration triggers React mismatch output because the server render still uses the real date.
- `axe-playwright` is now the task 09 accessibility runner, with results scored from passed/violating/incomplete axe rules and serious/critical violations treated as blocking.

## Files / Surfaces
- `playwright.config.ts`
- `e2e/`
- `app/components/landing/PainQualifier.tsx`
- `app/components/landing/HeroSection.tsx`
- `app/components/landing/CTABlock.tsx`
- `app/components/landing/WaitlistForm.tsx`
- `app/components/landing/FaqAccordion.tsx`
- `app/lib/constants.ts`
- `package.json`
- `bun.lock`

## Errors / Corrections
- First task 09 Playwright run found one remaining Kiwify CTA after `Date.now()` was mocked past `EVENT_UTC`; it came from `PainQualifier`, which had a direct `KIWIFY_URL` link instead of `CTABlock`.
- A hero image warning cleanup briefly removed `priority: true` from the first hero image; Vitest source constraints caught it, and the first image priority contract was restored.

## Ready for Next Run
- Task 09 implementation and verification are complete. Fresh evidence: `bun run lint` exit 0, `bun run test` 49 passed, `bun run test:coverage` statements 97.97% / branches 81.39%, `bun run build` exit 0, and `npx playwright test` 21 passed.
