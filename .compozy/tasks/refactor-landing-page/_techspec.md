# TechSpec: ORGANIZE-$E Landing Page Visual Refactor

## Executive Summary

This TechSpec covers the implementation of 8 visual and UX changes on the ORGANIZE-$E workshop landing page, grouped into 5 sequential concern layers as established by ADR-001. The changes span `app/globals.css`, `app/layout.tsx`, and 5 of the 11 existing landing components. No new pages, routes, or server-side logic are introduced.

The primary architectural trade-off is **delivery speed vs. isolation**: grouping changes by concern (typography → layout → components → animation → mobile) produces clean, reviewable diffs and enables Playwright regression checks after each layer, at the cost of context-switching across files rather than working file by file.

---

## System Architecture

### Component Overview

The landing page is a single-route Next.js app (`app/page.tsx`) that composes 8 section components. All state is confined to client components; the server renders the static shell. Only the components listed below are affected by this refactor.

| Component | File | Boundary |
|-----------|------|----------|
| Root layout | `app/layout.tsx` | Loads fonts via `next/font/google`; applies CSS variable classes to `<html>` |
| Global CSS | `app/globals.css` | Defines `@theme`, custom keyframes, and utility classes |
| `HeroSection` | `app/components/landing/HeroSection.tsx` | Server component; DOM reorder for mobile title fix (F6) |
| `CTABlock` | `app/components/landing/CTABlock.tsx` | Client component; countdown + checkout button with new animation (F5, F7) |
| `GuaranteeSeal` | `app/components/landing/GuaranteeSeal.tsx` | Server component; full rewrite to circular stamp badge (F4) |
| `BioSection` | `app/components/landing/BioSection.tsx` | Client component; Instagram icon added (F8) |
| `PainQualifier` | `app/components/landing/PainQualifier.tsx` | Client component; CTABlock instance centered (F3) |

**Unaffected components:** `Testimonials`, `Deliverables`, `FaqAccordion`, `FinalCTA`, `PriceBlock`, `WaitlistForm`.

**Data flow:** No change. All components remain stateless or use existing hooks (`useCountdown`, `useInView`).

**External interactions:** Google Fonts removed as a runtime CDN dependency (fonts self-hosted via `next/font/google`). Kiwify checkout URL and Instagram URL unchanged.

---

## Implementation Design

### Core Interfaces

#### Font variable contract (`app/layout.tsx`)

```ts
import { Bebas_Neue, Inter } from "next/font/google";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Applied to <html> as className:
// `${displayFont.variable} ${bodyFont.variable}`
```

#### CSS theme extension (`app/globals.css`)

```css
@theme inline {
  --font-sans:    var(--font-body),    Arial, Helvetica, sans-serif;
  --font-display: var(--font-display), Arial, Helvetica, sans-serif;

  --animate-scale-pulse: scale-pulse 2s ease-in-out infinite;
}

@keyframes scale-pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.03); }
}
```

#### GuaranteeSeal component interface (unchanged props, new DOM structure)

```tsx
// GuaranteeSeal.tsx — accepts optional className, renders circular badge
interface GuaranteeSealProps {
  className?: string;
}

export function GuaranteeSeal({ className }: GuaranteeSealProps) {
  return (
    <div aria-label="7 dias de garantia — satisfação garantida ou seu dinheiro de volta"
         className={clsx("relative flex flex-col items-center", className)}>
      {/* Outer ring → inner ring → "7 DIAS" + "GARANTIA" labels */}
    </div>
  );
}
```

### Data Models

No new data models. The refactor is purely presentational. `constants.ts`, `useCountdown`, `useInView`, and the waitlist server action are unchanged.

### API Endpoints

Not applicable. No new or modified API routes.

---

## Integration Points

**`next/font/google`**: Fetches Bebas Neue and Inter at build time from Google Fonts and self-hosts them under `.next/static/media/`. At runtime, no external CDN request is made. No authentication required.

**`lucide-react`**: Installed as a production dependency (`bun add lucide-react`). Used only in `BioSection.tsx` for the `<Instagram />` icon. Tree-shaken at build time — only the Instagram SVG is included in the output bundle.

---

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|----------------------|-----------------|
| `app/layout.tsx` | Modified | Add `next/font/google` imports and apply variable classes to `<html>`. Low risk — additive change. | Import fonts, add `className` to `<html>` |
| `app/globals.css` | Modified | Add `--font-display`/`--font-body` to `@theme`; add `scale-pulse` keyframe; remove `pulse-glow` keyframe. Medium risk — `pulse-glow` used in `CTABlock`. | Update `@theme`, swap keyframes |
| `HeroSection.tsx` | Modified | DOM reorder: heading JSX moved above image block; `flex-col-reverse` added at `md:` breakpoint. Medium risk — layout regression possible on desktop. | Reorder JSX, add responsive flex direction |
| `CTABlock.tsx` | Modified | Replace `animate-pulse-glow` with `animate-scale-pulse`; add `hover:animate-none`; fix countdown grid for 320px (F7). Low risk — style-only change. | Update class names, add `text-xs sm:text-sm` to labels |
| `GuaranteeSeal.tsx` | Modified | Full DOM rewrite from rectangular block to circular stamp badge. Medium risk — used in `PriceBlock` and `FinalCTA`. | Rewrite component; verify at all breakpoints |
| `BioSection.tsx` | Modified | Add `<Instagram />` icon from `lucide-react` inside the handle button. Low risk — additive only. | Import icon, add to JSX |
| `PainQualifier.tsx` | Modified | Add `text-center` / `items-center` to the CTABlock wrapper. Low risk — style-only. | Add centering classes to wrapper div |
| All section components | Modified | Replace `"Organize-$e"` / `"organize-$e"` string instances with `"ORGANIZE-$E"`. Low risk — text-only. | String replacement across all affected files |
| `e2e/landing-page-v1.pw.ts` | Modified | Add `describe` blocks for each of the 8 features. Low risk — additive. | Extend test file |

---

## Testing Approach

### Unit Tests

Not applicable for this refactor. All changes are presentational (CSS, JSX structure, static string replacement). No business logic is modified.

### Integration / E2E Tests (Playwright)

All new tests added to `e2e/landing-page-v1.pw.ts` as new `describe` blocks. The existing page fixture and `webServer` config are reused.

**F1 — Brand casing:**
- Assert all text nodes matching "organize" (case-insensitive) on the page equal `"ORGANIZE-$E"`.

**F2 — Typography:**
- Assert `document.fonts.check("1em Bebas Neue")` returns `true`.
- Assert `document.fonts.check("1em Inter")` returns `true`.
- Assert computed `font-family` of `h1` contains `"Bebas Neue"`.

**F3 — CTABlock centering:**
- Locate the CTABlock inside `PainQualifier`; assert `text-align: center` or `justify-content: center` on its container.

**F4 — Guarantee Seal:**
- Assert the seal element has `border-radius` approaching `50%` (circular).
- Assert `aria-label` is present and non-empty on the seal.
- Assert no `emerald` color class appears inside the seal DOM.

**F5 — Scale animation:**
- Assert the checkout button has `animation-name` equal to `scale-pulse`.

**F6 — Mobile hero:**
- At 375px viewport: assert the `<h1>` bounding box `top` value is less than the hero image bounding box `top` value (title renders above image).

**F7 — Countdown overflow:**
- At 320px viewport: assert no element inside the countdown grid has `scrollWidth > clientWidth` (no overflow).

**F8 — Instagram icon:**
- Assert an SVG element with `aria-hidden="true"` exists inside the Instagram button in BioSection.

**Regression:**
- Axe accessibility audit must still report ≥ 90 score (existing assertion).
- Horizontal overflow check at 320px, 375px, 768px, 1280px (existing assertion extended).

---

## Development Sequencing

### Build Order

1. **Layer 1 — Typography** (no dependencies)
   - `bun add lucide-react`
   - Update `app/layout.tsx`: import `Bebas_Neue` + `Inter` from `next/font/google`, apply variable classes to `<html>`.
   - Update `app/globals.css`: add `--font-display` and `--font-body` to `@theme inline`; set `--font-sans` to `var(--font-body)`.
   - Replace `"Organize-$e"` / `"organize-$e"` with `"ORGANIZE-$E"` in all section components and `metadata` in `layout.tsx`.
   - Apply `font-display` class to all `h1`–`h3` headings and section title elements.
   - Run `next lint` and Playwright smoke test.

2. **Layer 2 — Layout** (depends on step 1: font context established)
   - `PainQualifier.tsx`: add `flex flex-col items-center text-center` to the CTABlock wrapper div (the dark CTA section inside the component).
   - Run Playwright at all 4 viewports.

3. **Layer 3 — Component redesigns** (depends on step 1)
   - `GuaranteeSeal.tsx`: rewrite DOM as circular stamp badge. Use `rounded-full`, double/dashed border in `yellow-300`, `aspect-square`, `font-display` for "7 DIAS" and "GARANTIA". Remove all `emerald` color classes. Add `aria-label`.
   - `BioSection.tsx`: import `{ Instagram } from "lucide-react"`, insert `<Instagram size={18} strokeWidth={1.75} aria-hidden="true" />` before the handle text inside the button.
   - Run `next lint` and Playwright seal + icon tests.

4. **Layer 4 — Animation** (depends on step 1: `globals.css` `@theme` already updated)
   - `globals.css`: remove `pulse-glow` keyframe and `--animate-pulse-glow` variable; add `scale-pulse` keyframe and `--animate-scale-pulse` variable.
   - `CTABlock.tsx`: replace `animate-pulse-glow` with `animate-scale-pulse hover:animate-none`.
   - Run Playwright animation assertion.

5. **Layer 5 — Mobile fixes** (depends on steps 1–4 complete)
   - `HeroSection.tsx`: move heading/subheading JSX above the image carousel `<div>`; change outer section `flex-col` to `flex-col md:flex-col-reverse` to restore desktop visual order.
   - `CTABlock.tsx`: add `text-[10px] sm:text-xs` to countdown label spans; ensure grid uses `min-w-0` on columns.
   - Run Playwright at 320px and 375px viewports; run full E2E suite.

### Technical Dependencies

- `lucide-react` must be installed (step 1) before `BioSection.tsx` is modified (step 3).
- `globals.css` `@theme` update (step 1) must precede the animation change (step 4) since `--animate-scale-pulse` is declared there.
- All 5 layers must complete before the final Playwright full-suite run and Lighthouse accessibility check.

---

## Monitoring and Observability

Not applicable. This is a static marketing page with no server-side logic, metrics collection, or alerting. The Lighthouse CI check (`e2e/lighthouse-performance.pw.ts`) serves as the post-deploy quality gate.

---

## Technical Considerations

### Key Decisions

**Font loading via `next/font/google`**
- Decision: self-hosted at build time via the Next.js font API.
- Rationale: eliminates CDN round-trip and render-blocking risk; identical visual output.
- Trade-off: slight divergence from PRD's literal `<link>` wording.
- Alternative rejected: Google Fonts `<link>` tags (CDN dependency, render-blocking).

**Scale-pulse replaces pulse-glow**
- Decision: new `scale-pulse` keyframe replaces the existing `pulse-glow`.
- Rationale: semantic clarity; single `transform` value avoids compositing conflicts.
- Trade-off: requires updating one usage in `CTABlock.tsx`.
- Alternative rejected: mutating `pulse-glow` in place (misleading name).

**DOM reorder for mobile hero**
- Decision: heading JSX moved above image in DOM; `flex-col-reverse` on desktop restores visual order.
- Rationale: single DOM node, no z-index fragility, correct accessibility semantics.
- Alternative rejected: absolute positioning (fragile height coupling with image carousel).

**lucide-react installation**
- Decision: add `lucide-react` as a production dependency.
- Rationale: PRD explicitly permits it; tree-shakeable; consistent icon API.
- Alternative rejected: inline SVG (opaque, no type safety).

### Known Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Bebas Neue renders blank for lowercase glyphs | Low | Apply `font-display` only to uppercase-safe headings; use `font-body` (Inter) for mixed-case text |
| `flex-col-reverse` on `HeroSection` breaks an edge breakpoint | Low | Test at 320, 375, 768, 1280px in Playwright; adjust breakpoint if needed |
| Circular seal clips content at 320px | Low | Set explicit `min-w-[160px] min-h-[160px]` and `aspect-square`; test at 320px |
| `hover:animate-none` removes animation jitter mid-hover on Safari | Low | Acceptable UX trade-off; scale returns to 1.0 on hover via hover transform |
| `next/font/google` download fails during `next build` (CI no network) | Low | Add fonts to `.next` cache in CI; or fall back to system font via `display: swap` |

---

## Architecture Decision Records

- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — Implement 8 changes across 5 sequential concern layers for clean diffs and early regression detection
- [ADR-002: next/font/google for Bebas Neue and Inter loading](adrs/adr-002.md) — Self-host fonts at build time via Next.js font API instead of Google Fonts CDN link tags
- [ADR-003: Install lucide-react for Instagram icon](adrs/adr-003.md) — Add lucide-react dependency to use the tree-shakeable `<Instagram />` component in BioSection
- [ADR-004: Replace pulse-glow with scale-pulse animation](adrs/adr-004.md) — Define a new scale-only keyframe and replace the existing pulse-glow on checkout buttons
- [ADR-005: DOM reorder to fix mobile hero title visibility](adrs/adr-005.md) — Move heading above image in DOM and use flex-col-reverse on desktop to restore visual order
