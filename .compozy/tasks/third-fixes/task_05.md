---
status: completed
title: Add E2E assertions for third-fixes changes
type: test
complexity: medium
dependencies: [task_01, task_02, task_03, task_04]
---

# Add E2E assertions for third-fixes changes

## Overview

Creates a new Playwright test file `e2e/third-fixes.pw.ts` that covers all five verifiable outcomes of the third-fixes batch: console error absence (hydration fix), favicon presence in `<head>`, CTA bounding box not clipped, bio text match, and `lang` attribute value. These assertions cannot be written before the source changes in task_01–task_04 are in place.

<critical>
- Read the PRD and TechSpec before starting
- Reference TechSpec 'Testing Approach' §Integration Tests for the exact five assertion requirements
- Focus on WHAT: new test file only — do not modify existing test files unless an existing assertion directly conflicts
- Tests must be specific: name the exact text, attribute value, or measurement being asserted (no vague "happy path" descriptions)
- Coverage target: 100% of the five listed acceptance criteria must have a corresponding test
</critical>

<requirements>
1. A new file `e2e/third-fixes.pw.ts` MUST be created following the naming and import conventions of `e2e/second-fixes.pw.ts`.
2. The test file MUST include a `page.on('console', ...)` listener that fails the test if any `console.error` message is emitted on a cold load of `/`.
3. The test file MUST assert that `<link rel="icon">` (or `<link rel="shortcut icon">`) is present in `<head>` — Next.js emits this automatically when `app/favicon.ico` exists.
4. The test file MUST assert that the CTA `<a>` element with `animate-scale-pulse` is visible and its bounding box width is strictly less than its parent container's bounding box width (accounting for `px-1`, i.e. at most parent width minus 8 px).
5. The test file MUST assert that `page.getByText("Tenho 32 anos, sou nordestina")` is visible on the page.
6. The test file MUST assert that `document.documentElement.lang === 'pt-BR'` via `page.evaluate`.
7. All five assertions MUST be tested at the `desktop` viewport (1280×800) at minimum; viewport-sensitive assertions (CTA bounding box) MUST also run at `mobile` (375×812).
8. The test file MUST NOT break any existing test in `e2e/`.
</requirements>

## Subtasks

- [x] Read `e2e/second-fixes.pw.ts` to understand naming conventions, helper function patterns, and import style
- [x] Create `e2e/third-fixes.pw.ts` with the five assertion groups
- [x] Implement console error listener asserting zero `error`-type messages on cold `/` load
- [x] Implement favicon `<link>` assertion via `page.locator('link[rel="icon"]')` or equivalent
- [x] Implement CTA bounding box assertion (visible, width < parent − 8 px) at mobile and desktop
- [x] Implement bio text assertion: `page.getByText("Tenho 32 anos, sou nordestina")` is visible
- [x] Implement lang attribute assertion via `page.evaluate(() => document.documentElement.lang)`
- [x] Run the full Playwright suite and confirm all tests pass

## Implementation Details

New file: `e2e/third-fixes.pw.ts`

Follow the conventions in `e2e/second-fixes.pw.ts`:
- Import `{ expect, test }` from `"@playwright/test"`
- Use the shared `viewports` array (`mobile: 375×812`, `desktop: 1280×800`)
- Define helper locators using `page.locator(...)` or `page.getByRole(...)`

**Console error test** — attach listener before navigation:
```ts
const errors: string[] = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
await page.goto('/');
expect(errors, 'No console errors on cold load').toHaveLength(0);
```

**Favicon test** — Next.js App Router auto-injects the link tag:
```ts
await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
```

**CTA bounding box test** — check width clearance:
```ts
const cta = page.locator('a.animate-scale-pulse');
const ctaBox = await cta.boundingBox();
const parentBox = await cta.locator('xpath=..').boundingBox();
expect(ctaBox!.width).toBeLessThan(parentBox!.width);
```

**Bio text test**:
```ts
await expect(page.getByText('Tenho 32 anos, sou nordestina')).toBeVisible();
```

**Lang attribute test**:
```ts
const lang = await page.evaluate(() => document.documentElement.lang);
expect(lang).toBe('pt-BR');
```

### Relevant Files

- `e2e/second-fixes.pw.ts` — reference for conventions and helper patterns
- `e2e/cta-block.pw.ts` — existing CTA tests; must not conflict with new bounding box assertion

### Dependent Files

- `app/favicon.ico` (task_01) — must be the brand icon for favicon assertion to pass
- `app/layout.tsx` (task_02) — must have `lang="pt-BR"` for lang assertion to pass; must have no hydration error for console assertion to pass
- `app/components/landing/CTABlock.tsx` (task_03) — must have `px-1` for bounding box assertion to pass
- `app/components/landing/BioSection.tsx` (task_04) — must have first-person copy for bio text assertion to pass

### Related ADRs

- [ADR-001: Targeted Bug-Fix Batch Scope](adrs/adr-001.md) — no visual regression snapshots required for this batch
- [ADR-002: Portuguese Locale for html lang Attribute](adrs/adr-002.md) — drives the `pt-BR` value in the lang assertion
- [ADR-003: CTA Button Pulse Visibility Fix Strategy](adrs/adr-003.md) — drives the bounding box < parent width assertion

## Deliverables

- `e2e/third-fixes.pw.ts` with all five assertion groups
- Full Playwright suite passing (zero failures, zero skips)
- Test coverage: 100% of the five third-fixes acceptance criteria covered

## Tests

### Unit Tests

No unit tests — this task produces test code, not application code.

### Integration Tests

- **Console error assertion**: cold load of `/` emits zero `console.error` messages
- **Favicon assertion**: `<link rel="icon">` present in `<head>` (count === 1)
- **CTA bounding box at mobile (375 px)**: `a.animate-scale-pulse` bounding box width < parent bounding box width
- **CTA bounding box at desktop (1280 px)**: `a.animate-scale-pulse` bounding box width < parent bounding box width
- **Bio text assertion**: `page.getByText("Tenho 32 anos, sou nordestina")` is visible
- **Lang attribute assertion**: `document.documentElement.lang === 'pt-BR'`
- **Regression guard**: all existing tests in `e2e/` pass without modification

## Success Criteria

- `e2e/third-fixes.pw.ts` exists and contains all five assertion groups
- `npx playwright test e2e/third-fixes.pw.ts` exits 0 with all tests passing
- Full `npx playwright test` suite exits 0 (no regressions)
- Test coverage >= 80% of all five third-fixes acceptance criteria (target: 100%)
