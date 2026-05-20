# Task Memory: task_01.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Task 01 scaffold complete after verification: shared constants, countdown hook, in-view hook, image copies, and hook/constant tests.

## Important Decisions
- Added Vitest + React Testing Library via Bun because the repository had no unit-test runner and Task 01 explicitly requires hook tests and coverage.
- Kept `useCountdown` interval updates asynchronous only; ESLint React rules reject synchronous `setState` inside the effect body.
- Used Vite native `resolve.tsconfigPaths: true` in `vitest.config.mts` instead of `vite-tsconfig-paths` to avoid the Vitest 4 deprecation notice.

## Learnings
- Countdown tests must pass stable `Date` objects into `useCountdown`; constructing `new Date(...)` inside `renderHook` churns the effect dependency and can hang the runner.

## Files / Surfaces
- Added `app/lib/constants.ts`, `app/hooks/useCountdown.ts`, `app/hooks/useInView.ts`.
- Added unit tests under `__tests__/` and Vitest config/scripts/dependencies.
- Copied 8 source images into `public/images/` and `public/images/testimonials/` without deleting originals.
- Updated `eslint.config.mjs` to ignore generated `coverage/**`.

## Errors / Corrections
- Initial countdown test run hung due unstable target `Date` objects in tests; corrected tests to use stable constants.
- Initial lint failed on synchronous `setState` in `useCountdown` effect; removed the immediate effect update.

## Ready for Next Run
- Verified `bun run test:coverage`, `bunx tsc --noEmit`, `bun run lint`, `bun run build`, and explicit asset-presence checks pass after implementation.
