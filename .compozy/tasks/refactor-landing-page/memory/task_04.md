# Task Memory: task_04.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Replace the checkout CTA's old `pulse-glow` animation with a scale-only `scale-pulse` animation, add Playwright F5 coverage, verify lint/e2e, then update tracking and commit.

## Important Decisions
- Treat `e2e/cta-block.pw.ts` as a stale test fixture reference rather than a live production consumer; update it with the animation rename so code grep no longer finds `animate-pulse-glow`.

## Learnings
- Pre-change grep found live `pulse-glow` definitions in `app/globals.css`, live class usage in `app/components/landing/CTABlock.tsx`, and a stale fixture class in `e2e/cta-block.pw.ts`.
- Post-change grep across `app`, `e2e`, and `__tests__` finds old animation strings only in negative assertions; no old class, CSS variable, or keyframe remains.
- Verification passed with `bun run lint`, `bun run test:coverage`, targeted Playwright for `landing-page-v1`/`cta-block`, and full `bun run test:e2e`.

## Files / Surfaces
- Touched: `app/globals.css`, `app/components/landing/CTABlock.tsx`, `e2e/landing-page-v1.pw.ts`, `e2e/cta-block.pw.ts`, `__tests__/cta-block.test.tsx`, `__tests__/globalsCss.test.ts`, task tracking files.

## Errors / Corrections
- `bun run test:coverage` initially failed because unit tests still asserted `animate-pulse-glow` and the old CSS token/keyframe; corrected those assertions to the new `scale-pulse` contract.
- `bunx next lint` is not a valid lint gate in this Next 16 repo; the command treats `lint` as a project directory. Use `bun run lint` / `eslint` for the repo lint gate.

## Ready for Next Run
- Task implementation and verification are complete; only tracking/commit closeout remains if this file is read mid-run.
