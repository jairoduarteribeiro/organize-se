---
status: completed
title: Component Redesigns
type: frontend
complexity: medium
dependencies:
  - task_01
---

# Task 03: Component Redesigns

## Overview
Two independent presentational rewrites in Layer 3 of the concern-layered strategy. `GuaranteeSeal.tsx` is rebuilt from a rectangular text block into a circular stamp badge using yellow colors and an accessible `aria-label`. `BioSection.tsx` gains a monochrome `<Instagram />` icon from `lucide-react` next to the handle text. Both changes are purely additive or structural — no business logic or data flow is touched.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- `GuaranteeSeal.tsx` MUST render as a circular element (`rounded-full`, `aspect-square`) with a dashed or double border in `yellow-300` on a `zinc-950` background
- The seal MUST display `"7 DIAS"` in large Bebas Neue (`font-display` class) and `"GARANTIA"` as a secondary label inside the circle
- The seal MUST include `aria-label="7 dias de garantia — satisfação garantida ou seu dinheiro de volta"` on its root element
- No `emerald` color class (e.g., `emerald-300`, `text-emerald-*`, `border-emerald-*`) MUST remain anywhere inside `GuaranteeSeal.tsx` after the rewrite
- The seal MUST render correctly (no clipping, no overflow) at 320px viewport width — use `min-w-[160px] min-h-[160px]` or equivalent
- `BioSection.tsx` MUST render `<Instagram size={18} strokeWidth={1.75} aria-hidden="true" />` immediately before the `@rafaelaribeirofinancas` text inside the handle button
- `lucide-react` must already be installed (dependency on task_01) before this task begins
- `next lint` MUST exit 0 after all changes
</requirements>

## Subtasks
- [x] 3.1 Rewrite `GuaranteeSeal.tsx` DOM from rectangular block to circular stamp badge — outer ring, `"7 DIAS"` in display font, `"GARANTIA"` label, supporting copy, `aria-label`, no emerald colors
- [x] 3.2 Verify the rewritten seal at 320px, 375px, 768px, and 1280px (no clipping, no overflow, aspect ratio maintained)
- [x] 3.3 Import `{ Instagram }` from `lucide-react` in `BioSection.tsx` and insert the icon with correct props before the handle text
- [x] 3.4 Run `next lint` and fix any ESLint errors
- [x] 3.5 Write Playwright assertions for F4 (seal) and F8 (icon) in `e2e/landing-page-v1.pw.ts`

## Implementation Details
See TechSpec "Core Interfaces — GuaranteeSeal component interface" section for the DOM structure hint and props contract. The seal is used in two places (`PriceBlock` and `FinalCTA`) — both will automatically pick up the rewrite since `GuaranteeSeal` is the single shared component. See TechSpec "Integration Points — lucide-react" for the exact import and usage pattern.

The circular shape requires `rounded-full` + `aspect-square` on a fixed-size container. The dashed border can be achieved with Tailwind's `border-dashed` or a double-border technique using a pseudo-element or nested rings. See TechSpec "Known Risks" for the 320px minimum-size guidance.

### Relevant Files
- `app/components/landing/GuaranteeSeal.tsx` — full DOM rewrite; currently renders a rectangular text block with `emerald-300` headline
- `app/components/landing/BioSection.tsx` — additive change; Instagram icon inserted before handle text in the existing button element
- `app/components/landing/PriceBlock.tsx` — read-only reference; confirms `<GuaranteeSeal />` usage location (not modified)
- `app/components/landing/FinalCTA.tsx` — read-only reference; confirms second `<GuaranteeSeal />` usage (not modified)
- `e2e/landing-page-v1.pw.ts` — receives new describe blocks for F4 and F8

### Dependent Files
- `app/components/landing/PriceBlock.tsx` — renders `<GuaranteeSeal />`; benefits automatically from the rewrite with no code change
- `app/components/landing/FinalCTA.tsx` — same as above

### Related ADRs
- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — this task is Layer 3; depends on Layer 1 font variables being available
- [ADR-003: Install lucide-react for Instagram icon](adrs/adr-003.md) — defines the exact `<Instagram />` usage pattern and `aria-hidden` requirement

## Deliverables
- `app/components/landing/GuaranteeSeal.tsx` rewritten as circular stamp badge with `aria-label`
- `app/components/landing/BioSection.tsx` with `<Instagram />` icon inside the handle button
- Playwright assertions for F4 and F8 added to `e2e/landing-page-v1.pw.ts` **(REQUIRED)**
- `next lint` exits 0 **(REQUIRED)**

## Tests
- Unit tests:
  - (Not applicable — presentational component rewrites with no logic changes)
- Integration tests:
  - [x] F4 — The seal's root element has `border-radius` ≥ 50% (circular shape confirmed)
  - [x] F4 — `aria-label` attribute is present and non-empty on the seal root element
  - [x] F4 — No element inside the seal contains any CSS class matching `emerald` (case-insensitive)
  - [x] F4 — At 320px viewport: seal element `scrollWidth` does not exceed its `clientWidth` (no overflow/clipping)
  - [x] F8 — An SVG element with `aria-hidden="true"` exists inside the Instagram handle button in BioSection
  - [x] F8 — The SVG renders before the `@rafaelaribeirofinancas` text node (correct DOM order)
  - [x] Regression — Accessibility audit (Axe) still reports ≥ 90 score
  - [x] Regression — Existing horizontal overflow assertions pass at all 4 viewports
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- `next lint` exits 0
- GuaranteeSeal renders as a circular yellow badge in both PriceBlock and FinalCTA
- No `emerald` color class present anywhere inside `GuaranteeSeal.tsx`
- Instagram icon visible to the left of the handle text in BioSection at all viewports
