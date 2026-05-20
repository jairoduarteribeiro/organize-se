# PRD: ORGANIZE-$E Landing Page Visual Refactor

## Overview

The ORGANIZE-$E workshop sales page needs a round of targeted visual and UX improvements to close consistency gaps, fix mobile usability bugs, and elevate the page's design to match the Moving Girls reference aesthetic. The page already converts but has visible rough edges: a mobile title overlap, an oversized system font that lacks personality, a text-based guarantee that looks like a disclaimer instead of a trust signal, and CTA buttons that don't draw the eye as strongly as they should.

This refactor addresses 8 discrete changes across typography, layout, component design, interaction, and responsive behavior — without altering any copy, pricing, or marketing structure.

**Who it is for:** Rafaela Ribeiro's workshop prospects visiting the sales page on any device.

**Why it is valuable:** Each fix directly removes friction or distrust from the conversion path. The mobile title bug actively hides the product name from mobile visitors (a majority of traffic). The font change reinforces brand authority. The seal converts a block of fine print into a visible trust signal.

---

## Goals

- All 8 visual and UX requirements from `prompt.md` are implemented and verifiable via Playwright
- The page passes Lighthouse accessibility score ≥ 90 (no regression from current score)
- The page renders correctly at 320px, 375px, 768px, and 1280px viewport widths
- No ESLint errors introduced
- Checkout buttons draw the visitor's eye more effectively through a scale animation

---

## User Stories

**As a mobile visitor**, I want to see the workshop name "ORGANIZE-$E" in the hero section so that I immediately know what page I am on — without having to scroll past a photo.

**As a first-time visitor**, I want to see a visually distinct guarantee badge so that I trust the purchase is risk-free without having to read a paragraph.

**As a visitor on any device**, I want the countdown timer and checkout button to be centered and visually balanced after the qualifying copy, so the CTA feels intentional and confident.

**As a visitor**, I want the checkout button to pulse with a scale animation so it subtly draws my attention even if I haven't yet scrolled to it.

**As a visitor on a small phone (320–375px)**, I want the countdown timer labels to be fully visible so that I can read the remaining time without horizontal overflow.

**As a prospect reading the bio section**, I want to see the Instagram icon next to Rafaela's handle so that I immediately recognize it as a social link and can verify her credibility.

---

## Core Features

### F1 — Global Brand Name Casing

**What:** Every instance of "Organize-$e" or "organize-$e" across all page sections is replaced with "ORGANIZE-$E" (full uppercase).

**Why:** The dollar sign ($) in the brand name reads best visually when all surrounding letters are uppercase. Mixed case breaks the typographic rhythm of the mark.

**Scope:** All section components and any constants or strings that render the name.

---

### F2 — Typography: Bebas Neue (display) + Inter (body)

**What:** Replace the current system font stack with two Google Fonts:
- **Bebas Neue** — applied to all headings (`h1`–`h3`), section titles, and large display text
- **Inter** — applied to body copy, labels, buttons, and supporting text

**Why:** The current stack (Arial/Helvetica) reads as generic. Moving Girls, the reference brand, uses a condensed display font for headings that creates authority and visual contrast. Bebas Neue is the closest free equivalent to Druk (the original choice) and is widely recognized in the financial/empowerment niche.

**Behavior:** Both fonts loaded via Google Fonts `<link>` in the document `<head>` with `display=swap`. Font families applied via CSS custom properties for maintainability.

---

### F3 — CTABlock Layout: Center-aligned below qualifying copy

**What:** The CTABlock component (countdown timer + checkout button) that appears after the "Se você leu essa lista e pensou..." qualifying sentence in PainQualifier renders with centered alignment — both the grid of timer units and the button.

**Why:** The current left-aligned layout creates visual tension against the centered section title above it. Centering the CTA block reinforces the action hierarchy and makes the button feel like a natural conclusion to the copy.

**Scope:** The CTABlock instance within PainQualifier specifically; other CTABlock instances remain as-is unless they also benefit from centering (to be verified visually during implementation).

---

### F4 — Guarantee Seal: Circular stamp badge in yellow

**What:** Replace the current rectangular text block in `GuaranteeSeal.tsx` with a circular stamp-style badge. The badge features:
- Outer ring with dashed or double border in yellow (`yellow-300`)
- Large "7 DIAS" in the center using Bebas Neue
- "GARANTIA" as a label inside the circle
- "Satisfação garantida ou seu dinheiro de volta" as supporting copy below or within the badge
- Dark background (`zinc-950`) with yellow text and border — no green (`emerald-300`) anywhere

**Why:** A circular stamp communicates a formal, recognized guarantee at a glance — matching the "money-back guarantee" visual language that prospects already associate with risk-free purchases. The current rectangular text block reads like terms-and-conditions copy rather than a trust signal.

---

### F5 — Checkout Button Animation: Scale pulse

**What:** All checkout buttons gain a `scale` grow/shrink CSS animation that continuously cycles while idle. The button smoothly scales from 100% to ~103% and back, drawing the eye without being distracting.

**Why:** The existing `pulse-glow` animation (opacity/shadow) is subtle. A scale pulse is more perceptible on the peripheral vision and reinforces urgency without requiring copy changes.

**Behavior:** The animation runs on an infinite loop with easing. On hover, the scale animation pauses or transitions into the hover state for natural feel.

---

### F6 — Mobile Hero Fix: Workshop title always visible

**What:** On viewport widths below 768px, the "Workshop ORGANIZE-$E" heading in `HeroSection` is visible and not covered by the hero image. The layout ensures the text appears above or alongside the image with sufficient contrast.

**Why:** On mobile, the current layout stacks the hero image on top of the heading text, hiding the product name from the majority of visitors who browse on phones. This is the highest-severity UX bug on the page.

**Scope:** `HeroSection.tsx` responsive layout; mobile-specific image sizing or z-index adjustments.

---

### F7 — Countdown Timer Mobile Fix: No label overflow

**What:** On viewport widths below 400px, the "segundos" label (and all other countdown labels) fit within their column without overflowing or being clipped. Labels wrap, truncate gracefully, or use abbreviations at small sizes.

**Why:** The 4-column countdown grid has fixed-width columns that clip the "segundos" label on 320px devices, creating a broken UI appearance right above the checkout button.

**Scope:** `CTABlock.tsx` countdown grid responsive styles.

---

### F8 — Instagram Button: B&W Instagram icon

**What:** The Instagram profile button in `BioSection.tsx` displays an Instagram icon (SVG) to the left of the "@rafaelaribeirofinancas" text. The icon renders in black and white (monochrome) — not the Instagram brand gradient.

**Why:** The icon provides immediate visual recognition that the link goes to Instagram. B&W keeps it consistent with the dark/monochromatic palette of the section and avoids introducing the Instagram brand color gradient into the design system.

**Implementation note:** Use Lucide React's `Instagram` icon if available; otherwise inline a monochrome SVG.

---

## User Experience

### Primary flow (desktop)

1. Visitor lands on page → sees hero with Bebas Neue headline "Workshop ORGANIZE-$E" prominently styled
2. Scrolls through pain points → sees CTABlock centered below qualifying copy, countdown visible, button pulsing
3. Reads deliverables and testimonials → arrives at PriceBlock with circular yellow guarantee seal
4. Checks bio section → sees Rafaela's Instagram link with recognizable icon
5. Reaches FinalCTA → same centered CTABlock, same yellow seal, checkout button pulsing

### Primary flow (mobile, 375px)

1. Visitor lands → hero heading "Workshop ORGANIZE-$E" visible above or overlaid on image, not hidden
2. Scrolls to pain qualifier → CTABlock centered, all 4 countdown labels (including "segundos") fully visible
3. Sees yellow circular guarantee badge → immediately registers as trust signal
4. Taps pulsing checkout button → navigates to Kiwify payment

### Accessibility

- All font changes must maintain existing WCAG AA contrast ratios (yellow on zinc-950 is compliant)
- The circular seal must include an appropriate `aria-label`
- The Instagram icon must have `aria-hidden="true"` since the button text already describes the destination

---

## High-Level Technical Constraints

- All changes must stay within the existing Next.js + Tailwind CSS v4 stack
- No new npm dependencies may be introduced unless Lucide React is not already installed
- Fonts must be loaded via Google Fonts CDN (not self-hosted) — the project does not have a font asset pipeline
- All changes must pass ESLint with zero errors
- Playwright test suite must continue to pass after each layer

---

## Non-Goals (Out of Scope)

- Changes to any marketing copy, pricing, or CTA text
- Redesign of any section layout beyond the specified CTABlock centering
- A/B testing infrastructure or analytics events
- Dark/light mode toggle
- New sections or features not present in the current page
- Performance optimization beyond what the font swap naturally provides
- Any change to the WaitlistForm fallback behavior

---

## Phased Rollout Plan

### Layer 1 — Typography (MVP foundation)

- Load Bebas Neue + Inter via Google Fonts in `app/layout.tsx`
- Apply display font to all `h1`–`h3` and section titles
- Apply body font to copy, labels, and buttons
- Normalize "ORGANIZE-$E" casing across all components
- **Success criteria:** All section headings render in Bebas Neue on desktop and mobile; no ESLint errors; Playwright smoke test passes

### Layer 2 — Layout

- Center CTABlock in PainQualifier
- **Success criteria:** Countdown and button are horizontally centered at all breakpoints

### Layer 3 — Component redesigns

- Rewrite `GuaranteeSeal.tsx` as circular stamp badge in yellow
- Add Instagram icon to BioSection button
- **Success criteria:** Seal renders as circular badge; no green color anywhere in the seal; icon visible in button

### Layer 4 — Animations

- Add scale grow/shrink animation to checkout buttons
- **Success criteria:** Button visibly pulses with scale on idle; animation pauses or blends correctly on hover

### Layer 5 — Mobile fixes

- Fix HeroSection title visibility on mobile
- Fix countdown "segundos" label overflow on 320px
- **Success criteria:** Playwright mobile viewport tests pass; no text clipped or hidden

---

## Success Metrics

- **Zero mobile title overlap**: Playwright screenshot at 375px confirms heading is visible in HeroSection
- **Zero countdown overflow**: Playwright screenshot at 320px confirms all 4 labels render without clipping
- **Lighthouse accessibility ≥ 90**: No regression from current score
- **ESLint clean**: `next lint` exits 0
- **Visual consistency**: All "ORGANIZE-$E" instances are uppercase across the full page DOM

---

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Bebas Neue only supports uppercase — body font fallback needed for mixed-case headings | Medium | Use Inter for any heading that contains mixed-case or non-Latin characters |
| Circular seal with CSS border-radius may clip content at certain viewport widths | Low | Set explicit min-width/min-height and test at 320px |
| Scale animation causes layout shift on slower devices | Low | Use `transform: scale()` (GPU composited) not `width`/`height` |
| Google Fonts CDN blocked in some regions | Low | `font-display: swap` ensures system font renders immediately as fallback |

---

## Architecture Decision Records

- [ADR-001: Layered-by-concern implementation strategy](adrs/adr-001.md) — Implement 8 changes across 5 sequential concern layers for clean diffs and early regression detection

---

## Open Questions

- Should the scale pulse animation on checkout buttons also be applied to CTABlock instances inside HeroSection, PriceBlock, and FinalCTA, or only in PainQualifier? (Assumed: all instances, consistent UX)
- Should Bebas Neue be applied to the countdown timer numerals, or should Inter be used for better readability of tabular digits? (Assumed: Inter with `font-variant-numeric: tabular-nums` for timer, Bebas Neue for section headings only)
