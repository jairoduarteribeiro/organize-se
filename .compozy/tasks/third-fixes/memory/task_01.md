# Task Memory: task_01.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot

- Promote the brand favicon from `fotos/favicon.ico` into `app/favicon.ico`, then remove the root `fotos/` directory in that exact order.

## Important Decisions

- Scope is limited to the binary favicon replacement, `fotos/` directory removal, and task tracking/memory updates; no metadata or public image cleanup belongs in this task.

## Learnings

- Pre-change grep found tracked `__tests__/production-assets.test.ts` references to `fotos/new-hero1.png`, `fotos/new-hero2.png`, `fotos/new-hero3.png`, and `fotos/sobre-rafa.JPG`; deleting `fotos/` without changing that test would leave a failing source reference.

## Files / Surfaces

- Planned surfaces: `app/favicon.ico`, `fotos/`, task tracking files, and this task memory file.

## Errors / Corrections

- Blocked before favicon copy/deletion because task requirements conflict with current tracked test references: validation expects no TS/JS `fotos/` references, while scope forbids modifying any other file.

## Ready for Next Run

- Resolve whether `__tests__/production-assets.test.ts` may be updated/removed before rerunning the mandatory promote-then-delete sequence.
