# Task Memory: task_05.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Create `e2e/third-fixes.pw.ts` only, covering console error absence, favicon link presence, CTA pulse clearance, bio text visibility, and `html` lang value.

## Important Decisions
- Keep implementation scope to the new E2E test file. Do not repair dependency task tracking or source changes inside this task.

## Learnings
- `e2e/third-fixes.pw.ts` was absent before implementation.
- `e2e/second-fixes.pw.ts` uses `@playwright/test`, local viewport arrays, helper locator functions, and bounding-box helper assertions.
- Dependency tracking is inconsistent for task 01: `_tasks.md` and `task_01.md` still mark it pending, `app/favicon.ico` is 25,931 bytes, and `fotos/favicon.ico` remains present at 4,286 bytes. The task 05 favicon requirement only asserts a generated head link, not brand binary content.
- The landing page renders four `a.animate-scale-pulse` CTA links, so the CTA clearance test asserts every matching link.
- Targeted and full Playwright suites pass with the new test file.

## Files / Surfaces
- `e2e/third-fixes.pw.ts` (new)
- `.compozy/tasks/third-fixes/task_05.md` (tracking)
- `.compozy/tasks/third-fixes/_tasks.md` (tracking)

## Errors / Corrections
- First targeted Playwright run failed because `a.animate-scale-pulse` resolves to four landing-page CTA links. Corrected the test to assert all matching animated CTA links instead of assuming a single strict locator.
- Second targeted run failed by sub-pixel animation drift while measuring transformed bounding boxes. The CTA clearance test now enables `prefers-reduced-motion: reduce` before navigation so the existing app CSS disables animation and the box measurement verifies the static `px-1` clearance deterministically.

## Ready for Next Run
- Task 05 implementation and verification are complete. Remaining observed inconsistency is outside this task: task 01 tracking/source state still appears pending.
