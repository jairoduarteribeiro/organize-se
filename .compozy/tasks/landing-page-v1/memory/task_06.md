# Task Memory: task_06.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Implement the remaining CTA-bearing landing sections (`HeroSection`, `PriceBlock`, `FinalCTA`), replace the starter home page with the ADR-001 composition, and add task-required unit/integration coverage.
- Current state: implementation, validation, and self-review are complete; task tracking is being updated.

## Important Decisions
- Keep `HeroSection`, `PriceBlock`, `FinalCTA`, and `app/page.tsx` as Server Components; they import the existing client `CTABlock` directly, matching the App Router server/client boundary.
- Use real Next route Playwright tests for task 06 integration assertions instead of static HTML fixtures, because this task verifies composed page behavior at `http://localhost:3000`.

## Learnings
- Next.js 16 local docs mark `priority` on `next/image` as deprecated in favor of `preload`, but task 06 explicitly requires `priority`; implementation should preserve `priority` on the first hero image.
- Focused tests initially failed because Testing Library renders accumulated across cases; `landing-components.test.tsx` now uses `afterEach(cleanup)`.

## Files / Surfaces
- Touched: `app/components/landing/HeroSection.tsx`, `PriceBlock.tsx`, `FinalCTA.tsx`, `app/page.tsx`, `__tests__/landing-components.test.tsx`, `__tests__/landing-component-sources.test.ts`, `__tests__/page-composition.ssr.test.tsx`, `e2e/page-composition.pw.ts`, and `playwright.config.ts`.

## Errors / Corrections
- Corrected SSR order test to match the Bio section eyebrow instead of "Rafaela Ribeiro", because the name appears earlier in hero image alt text.
- Playwright surfaced a React hydration mismatch in `CTABlock` countdown seconds during composed page load; added `suppressHydrationWarning` to countdown value spans because the countdown is expected to differ by the second between SSR and hydration.

## Ready for Next Run
- Final task 06 verification after all source/tracking changes: `bun run lint` exit 0; `bun run test` 12 files/41 tests passed; `bun run test:coverage` 94.11% statements, 84.84% branches, 93.75% functions, 94.11% lines; `bun run test:e2e` 12 tests passed with no page runtime errors; `bun run build` compiled, type-checked, and generated static pages successfully.
