---
status: pending
title: Project Scaffold & Asset Setup
type: chore
complexity: medium
dependencies: []
---

# Task 01: Project Scaffold & Asset Setup

## Overview
Creates the foundational layer that all other tasks depend on: shared TypeScript constants, two custom hooks (`useCountdown` and `useInView`), and image assets moved into the correct `public/images/` location. No other landing page task can start until this scaffold is in place.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `app/lib/constants.ts` MUST export `EVENT_UTC`, `KIWIFY_URL`, and `INSTAGRAM_URL` as the single source of truth for these values across the app
- `EVENT_UTC` MUST be anchored to `2026-06-28T13:00:00Z` (June 28 10:00 BRT = UTC−3) per ADR-002
- `app/hooks/useCountdown.ts` MUST return `{ days, hours, minutes, seconds, isExpired }` and clear its interval on unmount
- `app/hooks/useInView.ts` MUST guard against `typeof window === 'undefined'` (SSR safety) and unobserve after first trigger by default (`once: true`)
- All 8 image assets MUST be copied to `public/images/` (hero images into root, testimonials into `public/images/testimonials/`) preserving original filenames
- No original files in `fotos/` or `depoimentos/` should be deleted — copy only
</requirements>

## Subtasks
- [ ] 1.1 Create `app/lib/` directory and `constants.ts` with all three exported constants
- [ ] 1.2 Create `app/hooks/` directory and implement `useCountdown.ts` per TechSpec Core Interfaces
- [ ] 1.3 Implement `useInView.ts` per TechSpec Core Interfaces with SSR guard and `once` option
- [ ] 1.4 Create `public/images/` and `public/images/testimonials/` directories
- [ ] 1.5 Copy `fotos/hero1.png`, `fotos/hero2.png`, `fotos/hero3.png`, `fotos/rafa.png` into `public/images/`
- [ ] 1.6 Copy `depoimentos/IMG_6269.jpg` through `IMG_6272.jpg` into `public/images/testimonials/`
- [ ] 1.7 Write unit tests for `useCountdown` (active countdown, expired state, cleanup) and `useInView` (inView toggle, SSR fallback)

## Implementation Details
See TechSpec "Core Interfaces" section for exact TypeScript signatures of `useCountdown` and `useInView`, and "Data Models" section for the three constants. The `useCountdown` hook drives the entire post-event state switch — correctness of `isExpired` is critical.

### Relevant Files
- `fotos/hero1.png`, `fotos/hero2.png`, `fotos/hero3.png` — source hero images to copy (1.5–1.7 MB each)
- `fotos/rafa.png` — source bio photo to copy
- `depoimentos/IMG_6269.jpg` through `IMG_6272.jpg` — source testimonial images to copy
- `app/globals.css` — already exists; no changes needed in this task

### Dependent Files
- `app/hooks/useCountdown.ts` — consumed by task_04 (CTABlock)
- `app/hooks/useInView.ts` — consumed by task_07 (Scroll Animations)
- `app/lib/constants.ts` — consumed by task_03 (BioSection uses INSTAGRAM_URL), task_04 (EVENT_UTC, KIWIFY_URL), task_06 (HeroSection, PriceBlock, FinalCTA)
- `public/images/` — consumed by task_03 (Testimonials, BioSection) and task_06 (HeroSection)

### Related ADRs
- [ADR-002: Client-Side Countdown Timer](../adrs/adr-002.md) — defines the `EVENT_UTC` constant value and `useCountdown` contract
- [ADR-004: CSS Keyframes + IntersectionObserver](../adrs/adr-004.md) — defines the `useInView` contract and SSR guard requirement

## Deliverables
- `app/lib/constants.ts` with `EVENT_UTC`, `KIWIFY_URL`, `INSTAGRAM_URL`
- `app/hooks/useCountdown.ts` returning `CountdownTime`
- `app/hooks/useInView.ts` returning `boolean`
- `public/images/` populated with all 8 assets
- Unit tests for both hooks with ≥80% coverage **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `useCountdown` with a future target returns non-expired state with positive `days`/`hours`/`minutes`/`seconds`
  - [ ] `useCountdown` with a past target (`new Date(0)`) immediately returns `isExpired: true`
  - [ ] `useCountdown` clears its interval when the component unmounts (no memory leak)
  - [ ] `useInView` returns `false` initially and `true` after the IntersectionObserver fires with `isIntersecting: true`
  - [ ] `useInView` returns `false` (not undefined/error) when called in an SSR context (`window` unavailable)
  - [ ] `useInView` with `once: true` unobserves the element after the first `inView` trigger
- Integration tests:
  - [ ] `EVENT_UTC` resolves to a `Date` object; `.toISOString()` equals `'2026-06-28T13:00:00.000Z'`
  - [ ] `KIWIFY_URL` starts with `https://pay.kiwify.com.br/`
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `public/images/` contains all 8 asset files
- `constants.ts` exports all three constants with correct values
- Both hooks compile without TypeScript errors under `strict` mode
