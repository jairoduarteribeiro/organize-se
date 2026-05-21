---
status: completed
title: Copy production image assets to `public/images/`
type: chore
complexity: low
dependencies: []
---

# Task 1: Copy production image assets to `public/images/`

## Overview

Copy the four finalized production images from `fotos/` into `public/images/` so the Next.js static file server can serve them. The `sobre-rafa.JPG` file must be renamed to `sobre-rafa.jpg` (lowercase extension) at copy time to avoid case-sensitivity failures on Linux CI. This task is a prerequisite for task_03 and task_04; no code can reference the new files until they are in place.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST copy `fotos/new-hero1.png`, `fotos/new-hero2.png`, `fotos/new-hero3.png` into `public/images/` retaining their filenames.
- MUST copy `fotos/sobre-rafa.JPG` into `public/images/sobre-rafa.jpg` with the extension lowercased.
- MUST NOT overwrite or delete the existing `hero1.png`, `hero2.png`, `hero3.png`, or `rafa.png` files (they may still be referenced by other tests or cached deploys during the transition PR).
- MUST verify that all four destination files are readable and non-zero bytes after the copy.
</requirements>

## Subtasks

- [x] 1.1 Copy the three `new-hero*.png` files from `fotos/` to `public/images/` with filenames unchanged.
- [x] 1.2 Copy `fotos/sobre-rafa.JPG` to `public/images/sobre-rafa.jpg` with the extension lowercased.
- [x] 1.3 Confirm the four new files exist in `public/images/` and are non-zero bytes.

## Implementation Details

Shell copy commands are the only change. No source files are modified. The destination directory `public/images/` already exists.

See TechSpec "Impact Analysis" row for `/public/images/` and the "Known Risks" section for the case-sensitivity rationale.

### Relevant Files

- `fotos/new-hero1.png` — source for the new desktop hero image
- `fotos/new-hero2.png` — source for the new tablet hero image
- `fotos/new-hero3.png` — source for the new mobile hero image
- `fotos/sobre-rafa.JPG` — source for the updated bio photo (uppercase extension must be lowercased)
- `public/images/` — destination directory; already exists and is served by Next.js static file handler

### Dependent Files

- `app/components/landing/HeroSection.tsx` — will reference `new-hero{1,2,3}.png` in task_03
- `app/components/landing/BioSection.tsx` — will reference `sobre-rafa.jpg` in task_04

### Related ADRs

- [ADR-002: Delivery Scope — Single PR](adrs/adr-002.md) — asset copy is part of the single-PR batch

## Deliverables

- `public/images/new-hero1.png` present and non-zero
- `public/images/new-hero2.png` present and non-zero
- `public/images/new-hero3.png` present and non-zero
- `public/images/sobre-rafa.jpg` present and non-zero (lowercase `.jpg`)
- Integration tests verifying file presence **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — no logic changes; file-presence assertions serve as the verification layer.
- Integration tests:
  - [x] `public/images/new-hero1.png` exists and `stat` reports size > 0 bytes
  - [x] `public/images/new-hero2.png` exists and `stat` reports size > 0 bytes
  - [x] `public/images/new-hero3.png` exists and `stat` reports size > 0 bytes
  - [x] `public/images/sobre-rafa.jpg` exists and `stat` reports size > 0 bytes (lowercase extension confirmed)
  - [x] `public/images/sobre-rafa.JPG` does NOT exist (uppercase variant absent to prevent ambiguity)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- All four destination files exist in `public/images/` with correct lowercase names.
- File sizes match the originals in `fotos/` (no truncation during copy).
- No existing files in `public/images/` are removed or overwritten.
- All tests passing.
