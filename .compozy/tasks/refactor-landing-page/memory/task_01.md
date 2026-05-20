# Task Memory: task_01.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Establish typography foundation for the landing page: install `lucide-react`, load Bebas Neue/Inter through `next/font/google`, expose Tailwind font utilities, normalize visible brand casing, and add E2E assertions for brand/font behavior.

## Important Decisions
- Followed ADR-002/task spec over the PRD's older `<link>` wording and used `next/font/google` variables on `<html>`.
- Treated `bun run lint` (`eslint`) as the valid lint gate because `bunx next lint` is not supported by this Next 16 app and exits with "Invalid project directory ... /lint".

## Learnings
- `document.fonts.check("1em Bebas Neue")`, `document.fonts.check("1em Inter")`, and computed `h1` font-family all pass under the production Playwright server with the `next/font/google` setup.
- Running `next build` concurrently with Playwright's configured webServer causes Next's build lock to fail the Playwright startup. Run them sequentially.

## Files / Surfaces
- Source: `app/layout.tsx`, `app/globals.css`, landing section components with headings/brand text.
- Tests: `e2e/landing-page-v1.pw.ts`, `__tests__/metadata.test.ts`, `__tests__/globalsCss.test.ts`, `__tests__/page-composition.ssr.test.tsx`.
- Dependencies: `package.json`, `bun.lock`.

## Errors / Corrections
- First Playwright attempt failed only because a standalone `next build` was running in parallel with Playwright's webServer build. Re-ran Playwright after the standalone build completed and it passed.
- Broader `bun run test` initially failed because existing unit tests expected the old font/casing contract and imported `next/font/google` without a Vitest mock. Updated those tests to the new task contract.

## Ready for Next Run
- Task 01 implementation and verification are ready for tracking update and commit.
