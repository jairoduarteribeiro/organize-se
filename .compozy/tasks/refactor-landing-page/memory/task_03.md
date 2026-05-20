# Task Memory: task_03.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Rewrite the shared landing `GuaranteeSeal` as a yellow circular stamp badge and add the Lucide Instagram icon to the BioSection handle.
- Add Playwright coverage for F4 seal requirements and F8 icon DOM order, then validate lint and the landing E2E suite before tracking/commit.

## Important Decisions
- Keep the task scoped to `GuaranteeSeal.tsx`, `BioSection.tsx`, and `e2e/landing-page-v1.pw.ts`; `PriceBlock` and `FinalCTA` consume the shared seal without direct edits.
- Because the installed Lucide package has no named `Instagram` export, define the component locally with `createLucideIcon` instead of changing dependency versions for this presentational task.

## Learnings
- `lucide-react` is already installed in `package.json`, satisfying the task_01 dependency.
- Baseline not-finished signal: `GuaranteeSeal.tsx` is still rectangular (`rounded-lg`) and contains `text-emerald-300`; BioSection handle has no SVG icon.
- The installed `lucide-react@1.16.0` does not export a brand `Instagram` icon; use its `createLucideIcon` export to define a local `Instagram` component while preserving the required JSX and Lucide props.

## Files / Surfaces
- `app/components/landing/GuaranteeSeal.tsx`
- `app/components/landing/BioSection.tsx`
- `e2e/landing-page-v1.pw.ts`
- `__tests__/landing-components.test.tsx`

## Errors / Corrections
- Initial `import { Instagram } from "lucide-react"` passed ESLint but failed the Next build because the package has no such named export; replaced it with a local Lucide icon created via `createLucideIcon`.
- Full coverage run exposed two stale unit expectations for the previous `"7 dias de garantia"` seal text; updated them to assert the new accessible stamp contract.

## Ready for Next Run
- Task 03 implementation and validation are complete; remaining workflow step is commit if not already created.
- Verification evidence: `bun run lint` exit 0; `bun run test:coverage` exit 0 with 51 tests passed and 98% statement coverage; `bun run test:e2e` exit 0 with 34 tests passed.
