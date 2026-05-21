# PRD: Second Fixes — Landing Page Polish & Feature Pass

## Overview

A focused batch of 10 UI improvements to the ORGANIZE-$E Workshop landing page. The changes address a React console error, three layout/alignment bugs, two content updates (copy + photos), two visual enhancements (icon branding + button animation), and one new interactive feature (testimonials carousel). All changes are UI-only, delivered as a single PR and validated with Playwright.

---

## Goals

1. Eliminate the `missing key prop` React warning in `BioSection` to keep the console clean for developers and avoid future lint failures.
2. Correct mobile layout bugs (hero image overlap, testimonial alignment, price centering) so the page renders correctly across all breakpoints.
3. Replace placeholder hero and bio images with the final production assets.
4. Update the hero headline to reflect the workshop's revised positioning.
5. Increase CTA button engagement through animation and hover feedback.
6. Transform the static testimonial grid into an accessible, auto-advancing carousel to surface social proof more dynamically.
7. Apply the official Instagram brand gradient to the icon for visual accuracy.
8. Remove the "Eu acredito…" blockquote from the bio section per content decision.

---

## User Stories

- **As a visitor on mobile**, I see the hero image above the headline (not overlapping it) so the page hierarchy is immediately clear.
- **As a visitor on any device**, I see the `R$ 47` price centered so the value is visually prominent and easy to scan.
- **As a visitor**, I see the updated hero headline that communicates the practical, 30-day money-organizing promise.
- **As a visitor**, I see new, production-quality hero images that match the final brand direction.
- **As a visitor**, I see Rafaela's updated profile photo in the bio section.
- **As a visitor**, I see testimonials cycle automatically every 10 seconds so I don't have to scroll to see social proof.
- **As a visitor on desktop**, I can click left/right arrows to browse testimonials at my own pace.
- **As a visitor on mobile**, I can swipe left/right through testimonials naturally.
- **As a visitor**, I notice the CTA button pulsing, drawing my eye to the primary action.
- **As a visitor**, I see a clear hover state on the CTA button that confirms it is interactive.
- **As a visitor**, I see the Instagram icon in the correct brand gradient, reinforcing Rafaela's professional identity.

---

## Core Features

### F1 — React Key Prop Fix
Assign a unique `key` prop to each child element rendered in a list inside `BioSection` (specifically around the Instagram link and surrounding siblings) to resolve the `Each child in a list should have a unique "key" prop` warning.

### F2 — Instagram Icon Brand Gradient
Apply the official Instagram gradient (`#E1306C` pink → `#833AB4` purple) to the Instagram icon in `BioSection`. The gradient must render correctly in both light and dark contexts.

### F3 — Hero Image Swap
Replace the current three hero images (`hero1.png`, `hero2.png`, `hero3.png`) with `new-hero1.png`, `new-hero2.png`, and `new-hero3.png` at the same breakpoints (mobile / tablet / desktop).

### F4 — Mobile Hero Layout Fix
On mobile breakpoints, the hero image must appear **above** the headline, not below or overlapping it. The layout order must be: image → headline → CTA button.

### F5 — Hero Headline Copy Update
Change the hero headline from:
> "ORGANIZE-$E: transforme sua relação com o dinheiro em 30 dias."

To:
> "ORGANIZE-$E: Plano Prático para Organizar seu dinheiro e fazer ele sobrar em 30 dias."

### F6 — CTA Button Animation & Hover
- **Pulse**: The "Garantir meu ingresso" button should have a continuous, subtle scale-pulse animation at rest to draw the eye.
- **Hover**: On hover, the button must provide a clear visual feedback state (e.g., brightness increase, scale up, shadow deepening) that confirms interactivity.

### F7 — Testimonials Carousel
Replace the static 4-column testimonial grid with an Embla Carousel instance:
- Auto-advances every **10 seconds**.
- On desktop: left/right navigation arrows are visible.
- On mobile: swipe left/right to navigate.
- Testimonial images are **vertically centered** within each slide (no top-aligned gaps beneath shorter images).
- The carousel loops continuously.

### F8 — Remove "Eu acredito…" Phrase
Delete the blockquote containing *"Eu acredito que toda mulher pode ser dona do seu dinheiro…"* from `BioSection`. No replacement content needed.

### F9 — Price Block Centering
Center the `R$ 47` value and any surrounding price context within `PriceBlock` so the price is visually anchored at the section midpoint on all screen sizes.

### F10 — Bio Photo Swap
Replace `/images/rafa.png` in `BioSection` with `sobre-rafa.JPG`.

---

## User Experience

### Layout & Hierarchy
- Mobile visitors land on the hero image first, then read the headline — consistent with standard above-the-fold patterns.
- The `R$ 47` price occupies the horizontal center of its section on all breakpoints.

### Animation & Interaction
- The pulse animation on the CTA button is low-frequency (not aggressive) — it draws the eye without feeling spammy.
- Hover states respond within 150ms so the button feels immediately reactive.
- The carousel auto-advance is long enough (10s) that visitors can read each testimonial before it changes.

### Testimonials
- Navigation arrows appear on `md` and above; hidden on mobile (swipe only).
- Image alignment is centered vertically so all testimonial photos feel balanced regardless of image aspect ratio.

### Bio Section
- After removing the "Eu acredito…" blockquote, the section flows directly from Rafaela's descriptive copy to the Instagram link, keeping the section concise.
- The updated photo (`sobre-rafa.JPG`) replaces the current placeholder without any layout changes.

---

## Non-Goals

- No changes to page copy outside of the hero headline and bio section blockquote.
- No new sections or structural page changes.
- No backend, API, or data-layer changes.
- No changes to `FaqAccordion`, `Deliverables`, `GuaranteeSeal`, `WaitlistForm`, or `FinalCTA`.
- No A/B testing or feature flags.
- No animation library additions beyond Embla Carousel.

---

## Phased Rollout Plan

**Phase 1 (this PR — all 10 items)**
Deliver all changes in one PR, validated end-to-end with Playwright across mobile (375px), tablet (768px), and desktop (1280px) viewports.

No further phases planned for this batch.

---

## Success Metrics

| Metric | Target |
|--------|--------|
| React console warnings | 0 key-prop warnings in browser console |
| Mobile hero layout | Hero image renders above headline at 375px |
| Price centering | `R$ 47` horizontally centered at all breakpoints |
| Carousel auto-advance | Slides advance every 10s ± 1s |
| Carousel swipe | Touch drag advances/retreats slide on mobile |
| Playwright test pass | All navigation and responsiveness checks green |

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Embla Carousel bundle size increase | Embla is ~10 KB gzipped; acceptable for a landing page |
| New hero images have different aspect ratios than originals | Verify `object-fit` / `aspect-ratio` constraints after swap; adjust if needed |
| SVG gradient on Lucide icon renders incorrectly in Safari | Test in Safari; fall back to flat brand purple `#833AB4` if gradient is unsupported |
| Pulse animation causes layout shift | Implement with `transform: scale()` only (not `width`/`height`) to avoid reflow |
| `sobre-rafa.JPG` filename has uppercase extension | Verify Next.js Image import is case-sensitive and matches the actual file on disk |

---

## Architecture Decision Records

| # | Title | Summary |
|---|-------|---------|
| [ADR-001](adrs/adr-001.md) | Testimonials Carousel Library | Use Embla Carousel: lightweight, zero-dep, built-in swipe |
| [ADR-002](adrs/adr-002.md) | Delivery Scope — Single PR | All 10 changes in one PR; UI-only, contained blast radius |
| [ADR-003](adrs/adr-003.md) | Instagram Icon Color Treatment | CSS gradient mask on SVG; no extra asset files |

---

## Open Questions

- None. All requirements are specified; images are available in `/fotos/`.
