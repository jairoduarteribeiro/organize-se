---
status: completed
title: Typography Foundation
type: frontend
complexity: medium
dependencies: []
---

# Task 01: Typography Foundation

## Overview
Establishes the visual and typographic foundation that every subsequent layer depends on. Installs `lucide-react`, loads Bebas Neue and Inter via `next/font/google`, wires the CSS variables into `app/globals.css`, applies the display font to all headings, and normalizes the brand name to `"ORGANIZE-$E"` (full uppercase) across every component that renders it. No other task may run until this one is complete.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `lucide-react` MUST be installed as a production dependency via `bun add lucide-react` before any other file is modified
- `app/layout.tsx` MUST import `Bebas_Neue` and `Inter` from `next/font/google` and expose them as CSS variables `--font-display` and `--font-body` applied to `<html>`
- `app/globals.css` `@theme inline` block MUST register `--font-sans: var(--font-body), Arial, Helvetica, sans-serif` and `--font-display: var(--font-display), Arial, Helvetica, sans-serif`
- Every instance of `"Organize-$e"` or `"organize-$e"` — in component JSX strings, `<title>`, metadata descriptions, and any constants — MUST be replaced with `"ORGANIZE-$E"`
- All `h1`, `h2`, `h3` elements and explicit section-title elements MUST receive the `font-display` (or `font-[family-name:--font-display]`) Tailwind class; body copy, labels, and buttons continue using the default `font-sans`
- `next lint` MUST exit 0 after all changes in this task
- Playwright smoke test (`e2e/landing-page-v1.pw.ts`) MUST still pass
</requirements>

## Subtasks
- [x] 1.1 Run `bun add lucide-react` to install the icon library
- [x] 1.2 Update `app/layout.tsx` — import both fonts from `next/font/google`, apply their variable classes to `<html>`, and update `metadata.title` / `metadata.description` to use `"ORGANIZE-$E"` casing
- [x] 1.3 Update `app/globals.css` — add `--font-display` and `--font-body` to `@theme inline`; set `--font-sans` to `var(--font-body)` fallback stack
- [x] 1.4 Replace all `"Organize-$e"` / `"organize-$e"` string literals across all section components and any shared constants
- [x] 1.5 Apply the display font Tailwind class to all `h1`–`h3` and section-title elements across affected components
- [x] 1.6 Run `next lint` and fix any ESLint errors introduced
- [x] 1.7 Run the Playwright smoke test and confirm it still passes; write new Playwright assertions for F1 (brand casing) and F2 (font loading) in `e2e/landing-page-v1.pw.ts`

## Implementation Details
See TechSpec "Font variable contract" and "CSS theme extension" sections for exact import signatures, CSS variable names, and the `@theme inline` block structure. The `Bebas_Neue` import requires `weight: "400"` since Bebas Neue ships only in one weight. Tailwind v4 consumes CSS custom properties registered in `@theme inline` automatically — no `tailwind.config` change needed.

### Relevant Files
- `app/layout.tsx` — receives font imports and `<html>` className; also contains `metadata` with brand name to update
- `app/globals.css` — receives `@theme inline` additions for `--font-sans` and `--font-display`
- `app/components/landing/HeroSection.tsx` — contains `"Organize-$e"` in h1 text; h1 needs display font class
- `app/components/landing/CTABlock.tsx` — may contain brand name references; button text uses body font
- `app/components/landing/GuaranteeSeal.tsx` — may contain brand name references
- `app/components/landing/BioSection.tsx` — section title needs display font class
- `app/components/landing/PainQualifier.tsx` — section title needs display font class
- `app/components/landing/Deliverables.tsx` — section title needs display font class
- `app/components/landing/FaqAccordion.tsx` — section title needs display font class
- `app/components/landing/PriceBlock.tsx` — section title needs display font class; may contain brand name
- `app/components/landing/FinalCTA.tsx` — section title needs display font class
- `app/components/landing/Testimonials.tsx` — section title needs display font class
- `e2e/landing-page-v1.pw.ts` — existing Playwright suite; new describe blocks added here

### Dependent Files
- `app/components/landing/CTABlock.tsx` — affected by task_04 (animation); needs display font class applied here first
- `app/components/landing/GuaranteeSeal.tsx` — fully rewritten in task_03; display font class will be part of that rewrite
- `app/components/landing/BioSection.tsx` — icon added in task_03; display font class applied here
- `app/components/landing/PainQualifier.tsx` — centering added in task_02; display font class applied here
- `app/components/landing/HeroSection.tsx` — DOM reordered in task_05; display font class applied here

### Related ADRs
- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — this task is Layer 1; all other layers depend on its completion
- [ADR-002: next/font/google for Bebas Neue and Inter loading](adrs/adr-002.md) — defines exact import pattern and CSS variable names
- [ADR-003: Install lucide-react for Instagram icon](adrs/adr-003.md) — `bun add lucide-react` is performed in this task as the first step

## Deliverables
- `app/layout.tsx` updated with `next/font/google` imports and CSS variable classes on `<html>`
- `app/globals.css` updated with `--font-display` / `--font-body` in `@theme inline`
- All `"Organize-$e"` / `"organize-$e"` strings replaced with `"ORGANIZE-$E"` across the codebase
- Display font class applied to all `h1`–`h3` and section titles across all 11 components
- `lucide-react` present in `package.json` and `bun.lock`
- Playwright tests for F1 (brand casing) and F2 (font loading) added to `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- `next lint` exits 0 **(REQUIRED)**

## Tests
- Unit tests:
  - (Not applicable — this task makes no changes to business logic or hooks)
- Integration tests:
  - [x] F1 — All text nodes containing "organize" (case-insensitive regex) on the rendered page equal `"ORGANIZE-$E"`; no mixed-case variants remain
  - [x] F2 — `document.fonts.check("1em Bebas Neue")` returns `true` after page load
  - [x] F2 — `document.fonts.check("1em Inter")` returns `true` after page load
  - [x] F2 — Computed `font-family` of the page's first `h1` contains `"Bebas Neue"`
  - [x] Regression — Existing smoke test assertions (h1 visibility, CTA link, no console errors) still pass
  - [x] Regression — Accessibility audit still returns ≥ 90 score
- Test coverage target: >=80% (E2E coverage of F1 + F2 feature surface)
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `next lint` exits 0
- No `"Organize-$e"` or `"organize-$e"` string present anywhere in the repository (verified by grep)
- All section headings visually render in Bebas Neue on desktop and mobile
- `lucide-react` is present in `package.json`
