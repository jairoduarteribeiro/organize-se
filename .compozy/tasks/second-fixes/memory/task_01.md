# Task Memory: task_01.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Copy four production assets from `fotos/` to `public/images/`, lowercasing `sobre-rafa.JPG` to `sobre-rafa.jpg`, and verify file presence/size without deleting or overwriting legacy `hero*.png` / `rafa.png`.

## Important Decisions
- Use a focused Vitest integration test for filesystem assertions because task_01 requires test coverage but has no application logic changes.

## Learnings
- Baseline before implementation: the four destination files were absent from `public/images/`; source assets and legacy public images were present.
- On the local case-insensitive filesystem, `stat public/images/sobre-rafa.JPG` resolves to `sobre-rafa.jpg`; exact absence of the uppercase variant must be checked via `readdir`/directory entries.

## Files / Surfaces
- `public/images/` asset directory.
- `__tests__/production-assets.test.ts`.
- `.compozy/tasks/second-fixes/task_01.md` and `_tasks.md` tracking.

## Errors / Corrections
- Corrected the uppercase-variant test from a naive `stat` rejection to exact directory-entry inspection.
- `bun test` failed because it bypasses the repo's Vitest config and runs browser tests without `document/window`; use `bun run test` for the declared unit suite.

## Ready for Next Run
- Task tracking marks task_01 complete after clean asset-size checks, focused integration test, lint, coverage, full Vitest suite via `bun run test`, and build.
