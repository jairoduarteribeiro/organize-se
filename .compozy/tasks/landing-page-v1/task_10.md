---
status: pending
title: Lighthouse Audit & Performance Tuning
type: chore
complexity: medium
dependencies:
  - task_09
---

# Task 10: Lighthouse Audit & Performance Tuning

## Overview
Runs the Lighthouse mobile audit and iterates on image sizing, font loading, and lazy-loading configuration until all four performance targets are met: Performance ≥ 85, LCP < 2.5s, CLS < 0.1, and Accessibility ≥ 90. This is the final quality gate before the page is considered ship-ready.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Lighthouse MUST be run on the mobile preset (emulated Moto G4, throttled 3G) per TechSpec Testing Approach
- Mobile Lighthouse Performance score MUST reach ≥ 85 before this task is marked complete
- LCP MUST be < 2.5s — the first hero image (`hero1.png`) is the primary LCP element and MUST use `priority` prop in `next/image`
- CLS MUST be < 0.1 — all images MUST have explicit `width` and `height` props (or `fill` with a sized container) to prevent layout shift
- Accessibility score MUST remain ≥ 90 (already verified in task_09; confirm it does not regress after any tuning changes)
- If Performance score is below 85 after the first run, the following MUST be investigated in order: (1) hero image `sizes` prop accuracy, (2) font preloading, (3) non-priority images using `loading="lazy"`, (4) unused CSS
- No changes to visual design or copy may be introduced as part of performance tuning
</requirements>

## Subtasks
- [ ] 10.1 Run Lighthouse mobile audit against `http://localhost:3000` (or staging URL) and record baseline scores
- [ ] 10.2 If Performance < 85: audit the Lighthouse waterfall; identify the top bottleneck (hero image size, render-blocking resource, or font swap flash)
- [ ] 10.3 Fix identified bottlenecks (correct `sizes` prop on hero `<Image>`, add `font-display: swap` if missing, verify `priority` is set only on the first hero image)
- [ ] 10.4 If CLS > 0.1: ensure all `<Image>` components have explicit `width`/`height` or use the `fill` prop with a sized wrapper
- [ ] 10.5 Re-run Lighthouse until all four targets are met; record final scores
- [ ] 10.6 Confirm Accessibility score has not regressed below 90

## Implementation Details
See TechSpec "Known Risks" row "Hero images degrade LCP beyond 2.5s" for the primary mitigation: `priority` prop on the first hero `<Image>`, explicit `sizes` matching CSS breakpoints, avoiding `width: 100%` without `sizes`. See TechSpec "Monitoring and Observability" for the Lighthouse-as-CI-gate policy. The `next/image` component already handles WebP conversion and srcset generation on Vercel — no manual image conversion is required. If running locally without Vercel's image CDN, use `next dev` which routes through the Next.js built-in image optimizer.

### Relevant Files
- `app/components/landing/HeroSection.tsx` — primary LCP element; `priority` and `sizes` props
- `app/components/landing/Testimonials.tsx` — secondary images; must have `width`/`height` for CLS
- `app/components/landing/BioSection.tsx` — `rafa.png`; must have `width`/`height` for CLS
- `app/layout.tsx` — font loading strategy (Geist via `next/font/google`)
- `next.config.ts` — image optimization config; no `remotePatterns` needed for local images

### Dependent Files
- Any component file where a `sizes` or `width`/`height` prop needs correction

### Related ADRs
- [ADR-001: Classic Brazilian Infoproduct Page Structure](../adrs/adr-001.md) — acknowledges page length risk and scroll animation as mitigation
- [ADR-002: Client-Side Countdown Timer](../adrs/adr-002.md) — client JS overhead is minimal; not expected to impact Performance score

## Deliverables
- Documented Lighthouse scores (baseline and final) in a comment or task note
- All image components verified to have CLS-safe sizing
- Lighthouse mobile Performance ≥ 85, Accessibility ≥ 90, LCP < 2.5s, CLS < 0.1 **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `HeroSection` renders the first `<Image>` with `priority` prop set to `true`
  - [ ] All `<Image>` components across the page have either explicit `width`/`height` props or use `fill` with a sized wrapper (static code check)
- Integration tests:
  - [ ] Lighthouse mobile Performance score ≥ 85 (Playwright + Lighthouse CLI)
  - [ ] Lighthouse mobile Accessibility score ≥ 90 (Playwright + Lighthouse CLI)
  - [ ] LCP < 2.5s on mobile preset (Lighthouse audit)
  - [ ] CLS < 0.1 on mobile preset (Lighthouse audit)
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Lighthouse mobile Performance ≥ 85
- Lighthouse mobile Accessibility ≥ 90
- LCP < 2.5s
- CLS < 0.1
- Page is confirmed ship-ready for the June 21, 2026 milestone
