# Task Memory: task_05.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement Layer 5 mobile fixes for `HeroSection` DOM/visual order and `CTABlock` countdown label overflow, then add F6/F7 Playwright assertions and run lint, E2E, and accessibility validation.

## Important Decisions
- Use `bun run lint` as the lint gate because shared memory records that Next 16 in this repo does not support `next lint`.
- Keep the countdown grid at four columns and use smaller base typography below 360px (`text-[8px] min-[360px]:text-[10px] sm:text-xs`) because `segundos` does not fit at 320px with 10px text in the current column width.

## Learnings
- Baseline before edits: `HeroSection` still rendered the image block before `#hero-title`; `CTABlock` countdown columns lacked `min-w-0`; label spans used `text-[0.68rem]`; `e2e/landing-page-v1.pw.ts` did not yet contain F6/F7-specific assertions.

## Files / Surfaces
- Planned surfaces: `app/components/landing/HeroSection.tsx`, `app/components/landing/CTABlock.tsx`, `e2e/landing-page-v1.pw.ts`.
- Touched implementation surfaces: `HeroSection.tsx`, `CTABlock.tsx`, `e2e/landing-page-v1.pw.ts`.
- Touched tracking/memory surfaces: `.compozy/tasks/refactor-landing-page/task_05.md`, `_tasks.md`, `memory/task_05.md`.

## Errors / Corrections
- First focused Playwright run passed the hero order assertions but F7 still found `minutos` and `segundos` overflow at 320px. Correction: keep `text-[10px] sm:text-xs`, reduce base countdown padding to `px-1 sm:px-2`, and remove base label tracking until `sm:`.
- Second focused Playwright run narrowed F7 overflow to `segundos` by 3px, so the base countdown unit padding was reduced to `px-0` with `sm:px-2` restoring larger-viewport spacing.
- Third focused Playwright run still showed `segundos` needing 57px in a 50px cell at 320px, so the label uses `text-[8px]` below 360px, `min-[360px]:text-[10px]`, and `sm:text-xs`.

## Ready for Next Run
- Verification passed after edits: focused F6/F7 Playwright checks 3/3, full `e2e/landing-page-v1.pw.ts` 24/24, Lighthouse performance/accessibility gate 1/1, `bun run lint` exit 0, `bun run test:coverage` 51/51 with 98% statements and 83.67% branches.
