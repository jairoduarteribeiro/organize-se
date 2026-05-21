---
status: completed
title: Fix lang attribute and OG image URL in app/layout.tsx
type: bugfix
complexity: low
dependencies: []
---

# Fix lang attribute and OG image URL in app/layout.tsx

## Overview

Two single-line edits to `app/layout.tsx`: change the `<html>` element's `lang` attribute from `"en"` to `"pt-BR"` (eliminating the React hydration mismatch) and update the Open Graph image URL from `/images/hero1.png` to `/images/new-hero1.png` (switching to current hero photography). Both edits are in the same file and can be applied in one pass.

<critical>
- Read the PRD and TechSpec before starting
- Reference TechSpec 'Core Interfaces' and 'Development Sequencing' §Build Order steps 3–4
- Focus on WHAT: two line edits only — no other metadata, no new imports, no layout restructuring
- Keep changes minimal; the surrounding metadata block and font configuration are untouched
- Tests required: E2E assertions for `lang` and favicon are in task_05
</critical>

<requirements>
1. `app/layout.tsx` line 48 MUST change from `lang="en"` to `lang="pt-BR"`.
2. The OG image URL at `app/layout.tsx` line 32 MUST change from `"/images/hero1.png"` to `"/images/new-hero1.png"`.
3. No other lines in `app/layout.tsx` MUST be modified.
4. `new-hero1.png` MUST already exist in `public/images/` before this task is considered complete (confirmed present at 1 243 542 bytes per TechSpec Integration Points).
5. The build MUST produce zero TypeScript or ESLint errors after the change.
</requirements>

## Subtasks

- [x] Edit `app/layout.tsx` line 48: `lang="en"` → `lang="pt-BR"`
- [x] Edit `app/layout.tsx` line 32: `"/images/hero1.png"` → `"/images/new-hero1.png"`
- [x] Confirm `public/images/new-hero1.png` exists
- [x] Run `bun run build` (or `bun run lint`) to verify zero type/lint errors
- [x] Verify no other lines were inadvertently modified

## Implementation Details

Both edits are in `app/layout.tsx`:

- **Line 48** (inside `RootLayout`): `<html lang="en" ...>` → `<html lang="pt-BR" ...>`
- **Line 32** (inside `metadata.openGraph.images`): `url: "/images/hero1.png"` → `url: "/images/new-hero1.png"`

`pt-BR` is chosen over `pt-PT` per ADR-002: the workshop targets Brazilian users, so Brazilian Portuguese is the semantically correct locale even though the server previously emitted `pt-PT`. See TechSpec 'Key Decisions' §lang attribute locale.

### Relevant Files

- `app/layout.tsx` — only file modified; lines 32 and 48

### Dependent Files

- `public/images/new-hero1.png` — must exist; referenced by the updated OG image URL (read-only from this task's perspective)
- `e2e/` (task_05) — E2E test will assert `document.documentElement.lang === 'pt-BR'` and zero console errors

### Related ADRs

- [ADR-002: Portuguese Locale for html lang Attribute](adrs/adr-002.md) — justifies `pt-BR` over `pt-PT`

## Deliverables

- `app/layout.tsx` with `lang="pt-BR"` and OG image pointing to `new-hero1.png`
- Zero lint or type errors

## Tests

### Unit Tests

No unit tests — both changes are static string literals with no logic branches.

### Integration Tests

- Verify `app/layout.tsx` line 48 contains `lang="pt-BR"` with a grep check
- Verify `app/layout.tsx` line 32 contains `new-hero1.png` with a grep check
- E2E assertion (task_05): `document.documentElement.lang === 'pt-BR'` on a full page load
- E2E assertion (task_05): zero `console.error` messages on a cold page load (hydration mismatch eliminated)

## Success Criteria

- `app/layout.tsx` contains `lang="pt-BR"` (not `lang="en"` or `lang="pt-PT"`)
- `app/layout.tsx` references `/images/new-hero1.png` in the OG metadata
- Zero TypeScript/ESLint errors in the project
- All existing Playwright tests continue to pass
