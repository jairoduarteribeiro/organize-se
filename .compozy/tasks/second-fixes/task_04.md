---
status: completed
title: Fix `BioSection` — Instagram gradient + key fix, remove blockquote, bio photo
type: frontend
complexity: low
dependencies:
  - task_01
---

# Task 4: Fix `BioSection` — Instagram gradient + key fix, remove blockquote, bio photo

## Overview

Apply four changes to `BioSection.tsx`: replace the Lucide `<Instagram>` component with a hand-authored inline `<svg>` that carries the official brand gradient (simultaneously resolving the React key-prop warning), delete the "Eu acredito…" blockquote, and update the profile photo src to `sobre-rafa.jpg`. All changes are additive or removal edits within a single file.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST remove the `createLucideIcon`-based Instagram import and replace the `<Instagram>` component with the inline `<svg>` defined in TechSpec "Core Interfaces — Instagram inline SVG" section. The SVG MUST use `stroke="url(#ig-gradient)"` and include a `<linearGradient id="ig-gradient">` in `<defs>` with stops `#E1306C` (0%) and `#833AB4` (100%).
- MUST NOT add any new `lucide-react` imports or other icon library imports.
- MUST delete the `<blockquote>` JSX element containing the "Eu acredito que toda mulher…" text in its entirety (no replacement content).
- MUST update the `<Image src>` for the bio photo from `rafa.png` (or its current value) to `sobre-rafa.jpg` (lowercase extension).
- MUST NOT change the surrounding layout, grid classes, or any other props in `BioSection`.
- The `key`-prop React warning for the Instagram icon MUST be eliminated as a side-effect of replacing `createLucideIcon` (see TechSpec "Technical Considerations — F1 resolved by F2").
</requirements>

## Subtasks

- [x] 4.1 Remove the `createLucideIcon` Instagram import and replace the `<Instagram>` JSX with the inline `<svg>` from TechSpec.
- [x] 4.2 Delete the `<blockquote>` block containing the "Eu acredito…" text.
- [x] 4.3 Update the bio photo `<Image src>` to `sobre-rafa.jpg`.
- [x] 4.4 Confirm no React key-prop warning appears in the browser console after the change.

## Implementation Details

All changes are in `app/components/landing/BioSection.tsx`. The file is a `"use client"` component and currently imports from `lucide-react` for the Instagram icon. The blockquote is a standalone JSX element in the bio content area. The bio photo `<Image>` has its `src` pointing to the current `rafa.png` path.

See TechSpec "Core Interfaces" for the exact inline SVG markup and ADR-005 for the gradient technique rationale. See TechSpec "Technical Considerations — F1 resolved by F2" for the atomic nature of these two features.

### Relevant Files

- `app/components/landing/BioSection.tsx` — only file modified in this task
- `public/images/sobre-rafa.jpg` — new bio photo (must exist; provided by task_01)

### Dependent Files

- `e2e/second-fixes.pw.ts` — will assert F1 (zero key-prop warnings), F2 (SVG contains `linearGradient` with `id="ig-gradient"`), F8 (zero `<blockquote>` elements in BioSection), and F10 (bio image src includes `sobre-rafa`) in task_08

### Related ADRs

- [ADR-005: Instagram Icon Gradient Technique](adrs/adr-005.md) — specifies inline SVG with `<linearGradient>` as the chosen approach; supersedes ADR-003
- [ADR-003: Instagram Icon Color Treatment](adrs/adr-003.md) — superseded; kept for historical context

## Deliverables

- `app/components/landing/BioSection.tsx` updated: inline SVG with brand gradient, blockquote removed, bio photo src updated
- Zero `Each child in a list should have a unique "key" prop` warnings in the browser console
- Playwright assertions for F1, F2, F8, and F10 in task_08 pass green **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — presentational changes; Playwright E2E is the verification layer.
- Integration tests (covered in task_08's `e2e/second-fixes.pw.ts`):
  - [x] Browser console captures zero messages matching the `"key"` warning pattern during page load
  - [x] BioSection `<svg>` contains a child `<linearGradient>` element with `id="ig-gradient"`
  - [x] BioSection contains zero `<blockquote>` elements
  - [x] BioSection `<img>` `src` attribute contains the string `sobre-rafa`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- Instagram icon renders with the pink-to-purple gradient in Chrome, Firefox, and Safari.
- No React key-prop warnings in the browser console.
- "Eu acredito…" blockquote is absent from the rendered DOM.
- Bio photo displays `sobre-rafa.jpg` without broken-image placeholder.
- All tests passing.
