---
status: completed
title: Static Server Component Sections
type: frontend
complexity: high
dependencies:
  - task_01
---

# Task 03: Static Server Component Sections

## Overview
Implements the six content sections that contain no client-side interactivity and can be pure Server Components: `PainQualifier`, `Testimonials`, `BioSection`, `GuaranteeSeal`, `FaqAccordion`, and `Deliverables`. These sections account for the bulk of the page's trust-building and conversion copy and must be fully accessible and responsive.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- All six components MUST be pure Server Components — no `"use client"` directive
- Copy content MUST be sourced from `content.docx` (7 pain points for PainQualifier, 5 FAQ items for FaqAccordion, deliverables list, bio text)
- All `<Image>` components MUST include a descriptive non-empty `alt` attribute (accessibility requirement)
- `FaqAccordion` MUST use native `<details>/<summary>` per ADR-005; no React state or external library
- `GuaranteeSeal` MUST be a reusable standalone component (no layout assumptions) so it can be composed in `PriceBlock` and `FinalCTA` in task_06
- `Testimonials` section MUST display all 4 testimonial images from `public/images/testimonials/`; images MUST be rendered via `next/image`
- `BioSection` MUST use `INSTAGRAM_URL` from `app/lib/constants.ts` for the Instagram link
- All components MUST have no horizontal overflow at any viewport width (375px, 768px, 1280px)
- Color contrast for all text MUST meet ≥ 4.5:1 ratio (WCAG AA)
</requirements>

## Subtasks
- [x] 3.1 Create `app/components/landing/` directory and implement `PainQualifier.tsx` with 7 emoji-prefixed pain points and closing CTA redirect link
- [x] 3.2 Implement `Testimonials.tsx` rendering 4 testimonial images in a responsive grid using `next/image`
- [x] 3.3 Implement `BioSection.tsx` with `rafa.png` (via `next/image`), bio text, and `INSTAGRAM_URL` link
- [x] 3.4 Implement `GuaranteeSeal.tsx` as a visually prominent badge with bright contrasting colors (gold/vibrant green on dark background) per PRD Feature 8
- [x] 3.5 Implement `FaqAccordion.tsx` with 5 `<details>/<summary>` items, chevron rotation, and `max-height` CSS transition per ADR-005
- [x] 3.6 Implement `Deliverables.tsx` with event logistics (date, time, platform) and 4-item checklist (structure only; animation wiring is task_07)
- [x] 3.7 Write accessibility and rendering tests for each component

## Implementation Details
See TechSpec "Component Overview" for the file paths and PRD Features 2–5, 6, 8, 9 for section-specific content requirements. Read `content.docx` for the actual copy (pain points, FAQ questions and answers, bio text, deliverables list). The `GuaranteeSeal` will be imported by both `PriceBlock` and `FinalCTA` in task_06 — keep its interface prop-free or accept only optional className.

### Relevant Files
- `app/lib/constants.ts` — `INSTAGRAM_URL` used in `BioSection.tsx`
- `public/images/rafa.png` — bio photo
- `public/images/testimonials/IMG_6269.jpg` through `IMG_6272.jpg` — testimonial images
- `content.docx` — source of all copy (pain points, FAQ, bio, deliverables)
- `app/globals.css` — `details[open]` animation rules and Safari marker fix (task_02)

### Dependent Files
- `app/components/landing/GuaranteeSeal.tsx` — imported by `PriceBlock.tsx` and `FinalCTA.tsx` (task_06)
- `app/components/landing/Deliverables.tsx` — `useInView` wired in task_07
- `app/page.tsx` — all six components composed here in task_06

### Related ADRs
- [ADR-001: Classic Brazilian Infoproduct Page Structure](../adrs/adr-001.md) — defines section ordering and placement rationale
- [ADR-005: Native `<details>/<summary>` for FAQ Accordion](../adrs/adr-005.md) — specifies accordion implementation constraints

## Deliverables
- `app/components/landing/PainQualifier.tsx`
- `app/components/landing/Testimonials.tsx`
- `app/components/landing/BioSection.tsx`
- `app/components/landing/GuaranteeSeal.tsx`
- `app/components/landing/FaqAccordion.tsx`
- `app/components/landing/Deliverables.tsx`
- Unit and accessibility tests with ≥80% coverage **(REQUIRED)**
- Integration tests for FAQ accordion behavior **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `PainQualifier` renders exactly 7 list items
  - [x] `Testimonials` renders 4 `<img>` elements with non-empty `alt` attributes
  - [x] `BioSection` renders an anchor whose `href` equals `INSTAGRAM_URL`
  - [x] `GuaranteeSeal` renders text containing "7 dias de garantia"
  - [x] `FaqAccordion` renders 5 `<details>` elements
  - [x] `Deliverables` renders a list with exactly 4 checklist items
  - [x] All components render without throwing in a Node.js SSR environment (no window/document access)
- Integration tests:
  - [x] `FaqAccordion`: first `<summary>` is keyboard-focusable; pressing Enter opens its `<details>` (Playwright)
  - [x] `FaqAccordion`: `<details>` gains `open` attribute after clicking the first `<summary>` (Playwright)
  - [x] All images on the page have non-empty `alt` attributes (Playwright `axe` scan or attribute assertion)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- All six components render in SSR without errors
- FAQ accordion opens/closes with keyboard at 375px viewport
- No `<img>` element has an empty or missing `alt` attribute
- `GuaranteeSeal` is visually distinct (bright color) against the page's black/white palette
