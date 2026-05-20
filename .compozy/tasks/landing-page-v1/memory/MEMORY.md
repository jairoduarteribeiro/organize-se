# Workflow Memory

Keep only durable, cross-task context here. Do not duplicate facts that are obvious from the repository, PRD documents, or git history.

## Current State

## Shared Decisions

## Shared Learnings
- Playwright tests in this repo should avoid server-rendering imported TSX components directly inside the Playwright runner; its transform can produce non-React element objects. Use real Next routes or static browser fixtures for browser behavior, and keep React component rendering assertions in Vitest.
- Use the repo's Vitest commands (`bun run test`, `bun run test:coverage`, or `bunx vitest`) for React tests. `bun test` bypasses the configured jsdom/Vitest environment.
- `playwright.config.ts` now starts/reuses `bun run build && bun run start` at `http://localhost:3000`, so real-route Playwright and Lighthouse checks exercise production output rather than dev-server performance.
- For date-sensitive real-route Playwright tests, install a controllable `Date.now()` with `page.addInitScript`, wait for the pre-event route to hydrate, then advance the browser timestamp. Setting the post-event timestamp before hydration causes server/client mismatch output because SSR still uses the real clock.
- Next.js 16 image `quality` props are constrained by `next.config.ts` `images.qualities`; add any intended quality values there or Next will choose the closest allowed value.

## Open Risks

## Handoffs
