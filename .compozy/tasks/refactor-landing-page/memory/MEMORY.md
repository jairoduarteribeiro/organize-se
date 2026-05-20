# Workflow Memory

Keep only durable, cross-task context here. Do not duplicate facts that are obvious from the repository, PRD documents, or git history.

## Current State

## Shared Decisions

## Shared Learnings
- Do not run standalone `next build` at the same time as Playwright's configured webServer; Next 16 uses a build lock and the Playwright startup build will fail.
- Do not run `bun run lint` in parallel with Playwright; Playwright may recreate `test-results/` while ESLint is scanning, causing an ENOENT failure unrelated to source code.
- `lucide-react@1.16.0` in this repo does not export a brand `Instagram` icon; use `createLucideIcon` when an Instagram-shaped Lucide component is needed.
- Next 16 in this repo does not support `next lint`; `bunx next lint` treats `lint` as a project directory. Use `bun run lint` / `eslint` as the lint gate.

## Open Risks

## Handoffs
