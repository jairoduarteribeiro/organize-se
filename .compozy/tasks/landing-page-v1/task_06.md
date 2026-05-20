---
status: completed
title: Page Composition & CTA Sections
type: frontend
complexity: high
dependencies:
  - task_03
  - task_04
  - task_05
---

# Task 06: Page Composition & CTA Sections

## Overview
Implements the three remaining section components that embed `<CTABlock>` (`HeroSection`, `PriceBlock`, `FinalCTA`) and replaces the Next.js template in `app/page.tsx` with the fully composed landing page. This task is the integration point where all sections come together into the ADR-001 8-section layout.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `HeroSection.tsx` MUST render responsive hero images via `next/image` with the `priority` prop on the first image to avoid LCP penalty
- Hero images MUST use a `srcset`/`sizes` prop covering 3 breakpoints (mobile ≤ 640px, tablet ≤ 1024px, desktop > 1024px) per PRD technical constraints
- `HeroSection.tsx` MUST contain the workshop `<h1>` headline and one `<CTABlock />` below the image (no text overlay on the image per PRD Feature 1)
- `PriceBlock.tsx` MUST display the R$ 47 price, one `<CTABlock />`, and one `<GuaranteeSeal />`
- `FinalCTA.tsx` MUST contain one `<GuaranteeSeal />` and one `<CTABlock />` — it is the last conversion touchpoint before the footer
- `app/page.tsx` MUST be a Server Component (no `"use client"`) that imports and composes all 9 sections in the ADR-001 order
- The page MUST have exactly one `<h1>` element (the workshop headline in `HeroSection`)
- All section components that embed `<CTABlock>` are Server Components that import a Client Component — this is valid in Next.js App Router and requires no special directive on the parent
- No horizontal scroll at any of the three test viewports (375px, 768px, 1280px)
- Font size for body text MUST be ≥ 16px throughout
</requirements>

## Subtasks
- [x] 6.1 Implement `HeroSection.tsx`: responsive `<Image>` with `priority`, `sizes`, and `srcset`; workshop `<h1>`; `<CTABlock />`; no text over image
- [x] 6.2 Implement `PriceBlock.tsx`: R$ 47 price display, `<CTABlock />`, `<GuaranteeSeal />`
- [x] 6.3 Implement `FinalCTA.tsx`: `<GuaranteeSeal />` and `<CTABlock />`
- [x] 6.4 Replace `app/page.tsx` with the Server Component orchestrator composing all 9 sections in ADR-001 order
- [x] 6.5 Verify a single `<h1>` exists on the rendered page and the Kiwify CTA link is functional

## Implementation Details
See TechSpec "Component Overview" for the full import tree, "Data flow" for the Server-to-Client composition pattern, and TechSpec "Impact Analysis" for the `app/page.tsx` change description. The ADR-001 section order is: Hero → PainQualifier → Testimonials → Deliverables → BioSection → PriceBlock (with GuaranteeSeal) → FaqAccordion → FinalCTA. Hero images are large (1.5–1.7 MB) — the `priority` and `sizes` props on `<Image>` are the primary LCP mitigation.

### Relevant Files
- `app/components/landing/CTABlock.tsx` — embedded in HeroSection, PriceBlock, FinalCTA
- `app/components/landing/GuaranteeSeal.tsx` — embedded in PriceBlock and FinalCTA (task_03 output)
- `app/components/landing/PainQualifier.tsx` — composed into page.tsx (task_03 output)
- `app/components/landing/Testimonials.tsx` — composed into page.tsx (task_03 output)
- `app/components/landing/Deliverables.tsx` — composed into page.tsx (task_03 output)
- `app/components/landing/BioSection.tsx` — composed into page.tsx (task_03 output)
- `app/components/landing/FaqAccordion.tsx` — composed into page.tsx (task_03 output)
- `app/lib/constants.ts` — KIWIFY_URL used in CTABlock
- `public/images/hero1.png`, `hero2.png`, `hero3.png` — served via next/image

### Dependent Files
- `app/page.tsx` — the file being replaced; currently contains the Next.js starter template
- `app/layout.tsx` — metadata update target for task_08 (no changes needed in this task)
- `app/components/landing/Deliverables.tsx` — `useInView` hook wired in task_07

### Related ADRs
- [ADR-001: Classic Brazilian Infoproduct Page Structure](../adrs/adr-001.md) — defines the section order and multi-CTA placement rationale

## Deliverables
- `app/components/landing/HeroSection.tsx`
- `app/components/landing/PriceBlock.tsx`
- `app/components/landing/FinalCTA.tsx`
- Updated `app/page.tsx` (starter template fully replaced)
- Unit and integration tests with ≥80% coverage **(REQUIRED)**

## Tests
- Unit tests:
  - [x] `app/page.tsx` renders an `<h1>` element (SSR render assertion)
  - [x] `HeroSection` renders an `<img>` with a non-empty `alt` attribute
  - [x] `HeroSection` renders an `<a>` (via CTABlock) whose `href` contains the Kiwify domain
  - [x] `PriceBlock` renders text containing "R$ 47"
  - [x] `FinalCTA` renders a `<GuaranteeSeal>` child (contains "garantia" text)
  - [x] `app/page.tsx` contains exactly one `<h1>` element in its rendered HTML
- Integration tests:
  - [x] Page loads at `http://localhost:3000` without JS console errors (Playwright)
  - [x] Kiwify CTA `<a>` is visible and has `href` equal to `KIWIFY_URL` (Playwright)
  - [x] No horizontal scrollbar at viewport 375×812 (Playwright)
  - [x] No horizontal scrollbar at viewport 768×1024 (Playwright)
  - [x] No horizontal scrollbar at viewport 1280×800 (Playwright)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Page renders all 9 sections in correct ADR-001 order
- Exactly one `<h1>` on the page
- Kiwify CTA visible and correct at all three viewport sizes
- Hero image loads with `priority` prop set (no LCP-deferring lazy load)
- No horizontal scroll at 375px, 768px, or 1280px viewports
