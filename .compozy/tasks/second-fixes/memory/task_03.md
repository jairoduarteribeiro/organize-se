# Task Memory: task_03.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Apply task_03's scoped `HeroSection.tsx` changes: hero image source swap, all-breakpoint image-first flex direction, and F5 headline copy.

## Important Decisions
- Keep the change string-only/class-only in `HeroSection.tsx`; do not alter DOM structure, CTA rendering, or image props beyond `src`.

## Learnings
- `public/images/new-hero1.png`, `new-hero2.png`, and `new-hero3.png` exist before implementation, satisfying the task_01 dependency.
- Local Next image optimization can stall for larger new hero images when Chromium requests AVIF/WebP; direct public image URLs return 200, and rendered checks pass when PNG is negotiated.
- Existing full Playwright suite is blocked by the pending BioSection Lucide key warning from task_04; HeroSection-specific Playwright assertions pass after updating the stale mobile expectation.

## Files / Surfaces
- `app/components/landing/HeroSection.tsx`
- `__tests__/page-composition.ssr.test.tsx`
- `e2e/landing-page-v1.pw.ts`

## Errors / Corrections
- Updated stale tests that still expected the old hero headline or old mobile title-first layout.

## Ready for Next Run
- Do not mark task_03 completed or auto-commit until the full verification gate is clean. Current blocker is the unrelated BioSection key warning surfaced by `bun run test:e2e`.
