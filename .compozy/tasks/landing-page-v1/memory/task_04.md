# Task Memory: task_04.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement `CTABlock` as the client-only countdown and CTA switch for task 04.
- Required states: pre-event countdown plus Kiwify link; post-event waitlist stub with countdown hidden.

## Important Decisions
- Keep browser integration tests as static Playwright fixtures for task 04 behavior. Shared memory notes that Playwright should not server-render imported TSX directly.
- `CTABlock` uses a local temporary `WaitlistForm` stub in the same file so task 05 can replace the stub with the real import.

## Learnings
- Baseline before edits: `app/components/landing/CTABlock.tsx` does not exist; existing coverage targets constants, hooks, globals, and task 03 static sections.
- `bun test` runs Bun's test runner and does not load the repo Vitest/jsdom config; use `bunx vitest` or package scripts for React component tests.
- Final verification after implementation: lint exit 0; Vitest 26 tests passed; Playwright 5 tests passed; coverage 92.18% statements/lines, 83.33% branches, 92% functions; `next build` completed with TypeScript.

## Files / Surfaces
- Added `app/components/landing/CTABlock.tsx`.
- Added `__tests__/cta-block.test.tsx`.
- Added `e2e/cta-block.pw.ts`.

## Errors / Corrections
- Corrected the first unit test to expect three repeated `00` values instead of querying a unique `00`.
- Removed generated `test-results/` metadata after Playwright verification.

## Ready for Next Run
