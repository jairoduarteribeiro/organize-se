---
status: completed
title: Install `embla-carousel-react` dependency
type: chore
complexity: low
dependencies: []
---

# Task 2: Install `embla-carousel-react` dependency

## Overview

Add `embla-carousel-react` as a production dependency via Bun so that `Testimonials.tsx` can import `useEmblaCarousel` in task_07. This is a pure dependency installation with no source file changes. It must complete before task_07 begins, or the TypeScript compiler will fail on the missing import.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- MUST install `embla-carousel-react` using `bun add embla-carousel-react` so that `package.json` and `bun.lock` are updated together.
- MUST NOT edit `package.json` or `bun.lock` by hand.
- MUST verify the package resolves correctly by confirming it appears in `package.json` dependencies after installation.
- SHOULD confirm the bundle size impact is acceptable (~10 KB gzipped per ADR-001).
</requirements>

## Subtasks

- [x] 2.1 Run `bun add embla-carousel-react` from the project root.
- [x] 2.2 Confirm `embla-carousel-react` appears in `package.json` under `dependencies`.
- [x] 2.3 Confirm `bun.lock` was updated (no manual edits).

## Implementation Details

Single shell command. `package.json` and `bun.lock` are the only modified files. No component files are touched in this task.

See TechSpec "Integration Points" section for the exact install command and import pattern used in task_07.

### Relevant Files

- `package.json` — receives the new dependency entry
- `bun.lock` — lockfile updated automatically by Bun

### Dependent Files

- `app/components/landing/Testimonials.tsx` — will `import useEmblaCarousel from 'embla-carousel-react'` in task_07

### Related ADRs

- [ADR-001: Testimonials Carousel Library](adrs/adr-001.md) — justifies Embla as the chosen library and confirms ~10 KB bundle size

## Deliverables

- `embla-carousel-react` present in `package.json` `dependencies`
- `bun.lock` updated consistently with `package.json`
- Integration test confirming package resolves **(REQUIRED)**

## Tests

- Unit tests:
  - [x] Not applicable — dependency installation has no testable logic.
- Integration tests:
  - [x] `package.json` contains `"embla-carousel-react"` under `dependencies` after installation
  - [x] `node_modules/embla-carousel-react/` directory exists and is non-empty
  - [x] `bun.lock` contains an entry for `embla-carousel-react`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria

- `bun add embla-carousel-react` exits 0.
- `embla-carousel-react` is importable by TypeScript without type errors.
- `package.json` and `bun.lock` are consistent (no drift).
- All tests passing.
