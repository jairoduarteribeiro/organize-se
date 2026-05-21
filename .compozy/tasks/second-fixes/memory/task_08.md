# Task Memory: task_08.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Create `e2e/second-fixes.pw.ts` only, covering F1-F10 per the tech spec across 375, 768, and 1280px viewports.
- Pre-change signal: `e2e/second-fixes.pw.ts` is absent.

## Important Decisions
- Use existing landing-page E2E locator patterns (`section[aria-labelledby=...]`, viewport loops, console capture) and stable `data-testid` hooks from task_07 for carousel assertions.
- Use raw mouse movement for the CTA hover assertion because the resting pulse animation prevents Playwright's stability-gated `locator.hover()` from completing.
- Use a 375px touch-enabled Chromium context with CDP `Input.dispatchTouchEvent` for the carousel swipe assertion so the test exercises a real touch swipe rather than a desktop mouse drag.

## Learnings
- `_tasks.md` currently still marks task_03 pending even though `HeroSection.tsx` contains the expected F3-F5 implementation; do not treat the tracking row as the runtime source of truth for these tests.
- Verification evidence: `bun run lint` exited 0; `bun run test` exited 0 with 14 files/58 tests passed; `bun run test:coverage` exited 0 with 92.5% statements, 81.13% branches, 87.5% functions, 92.43% lines; `bun run test:e2e` exited 0 with 53 tests passed.

## Files / Surfaces
- Created `e2e/second-fixes.pw.ts`.
- Updated tracking/memory files under `.compozy/tasks/second-fixes/`.

## Errors / Corrections
- Focused E2E run showed two test interaction issues: normal `locator.hover()` waits for the continuously pulsing CTA to become stable, and carousel swipe must scroll the carousel into view before using pointer coordinates. Correct tests with forced hover and explicit `scrollIntoViewIfNeeded()`, no extra fixed waits.
- Forced hover did not activate CSS hover state; raw mouse movement over the button box did.
- Mouse drag still did not move Embla in the mobile assertion; CDP touch events in a touch-enabled context did.

## Ready for Next Run
- Task implementation and verification completed; only commit/final handoff remains if the run resumes here.
