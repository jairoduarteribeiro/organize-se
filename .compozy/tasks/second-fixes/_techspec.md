# TechSpec: Second Fixes — Landing Page Polish & Feature Pass

## Executive Summary

All 10 changes in this batch are pure UI modifications to 4 existing component files (`HeroSection`, `BioSection`, `Testimonials`, `CTABlock`/`PriceBlock`) plus one image asset copy step. The only new dependency is `embla-carousel-react` (~10 KB gzipped) required for the testimonials carousel. The primary trade-off is that Embla converts a static section to a client-side interactive component; the payoff is native swipe, auto-advance, and looping with no custom event-handling code. The remaining 9 features are single-file, additive edits with no new dependencies.

F1 (React key-prop warning) is resolved as a side-effect of F2: replacing `createLucideIcon` with an inline `<svg>` eliminates the Lucide internal path-array rendering that triggers the warning. These two features are implemented as one atomic change.

---

## System Architecture

### Component Overview

| Component | File | PRD Features |
|-----------|------|-------------|
| `HeroSection` | `app/components/landing/HeroSection.tsx` | F3, F4, F5 |
| `BioSection` | `app/components/landing/BioSection.tsx` | F1+F2 (atomic), F8, F10 |
| `Testimonials` | `app/components/landing/Testimonials.tsx` | F7 |
| `CTABlock` | `app/components/landing/CTABlock.tsx` | F6 |
| `PriceBlock` | `app/components/landing/PriceBlock.tsx` | F9 |
| `/public/images/` | Static assets | F3 (new-hero*.png), F10 (sobre-rafa.jpg) |

No new components are introduced. No inter-component data flow changes. The exported function names and the `page.tsx` import list are unchanged.

---

## Implementation Design

### Core Interfaces

**Embla Carousel integration (`Testimonials.tsx`)**

```typescript
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

useEffect(() => {
  if (!emblaApi) return;
  const id = setInterval(() => emblaApi.scrollNext(), 10_000);
  return () => clearInterval(id);
}, [emblaApi]);
```

**Instagram inline SVG with brand gradient (`BioSection.tsx`)**

```tsx
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="url(#ig-gradient)"
  strokeWidth={1.75}
  strokeLinecap="round"
  strokeLinejoin="round"
  width={18}
  height={18}
  aria-hidden="true"
>
  <defs>
    <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#E1306C" />
      <stop offset="100%" stopColor="#833AB4" />
    </linearGradient>
  </defs>
  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
</svg>
```

### Data Models

No new data structures. The `testimonials` array in `Testimonials.tsx` retains its existing shape:

```typescript
type Testimonial = { src: string; alt: string; width: number; height: number };
```

### API Endpoints

Not applicable — no API surface changes.

---

## Integration Points

- **`embla-carousel-react`**: Install as a production dependency via `bun add embla-carousel-react`. Used only in `Testimonials.tsx`. No authentication. The `useEmblaCarousel` hook is a named import; `loop: true` is passed as the init option to enable continuous looping.

---

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|---------------------|-----------------|
| `HeroSection.tsx` | Modified | Image srcs, flex direction, headline text. Low risk — additive changes. | Update `heroImages` srcs to `new-hero*.png`; change section class `flex-col md:flex-col-reverse` → `flex-col-reverse`; update `h1` text |
| `BioSection.tsx` | Modified | Inline SVG replaces `createLucideIcon`; blockquote removed; bio photo updated. Low risk. | Remove `createLucideIcon` import, replace `<Instagram>` with inline `<svg>`, delete `<blockquote>` JSX, update `<Image src>` |
| `Testimonials.tsx` | Modified | Full rewrite of rendering logic. Medium risk — new dependency. | Install `embla-carousel-react`; replace static grid with Embla carousel markup and auto-advance `useEffect` |
| `CTABlock.tsx` | Modified | Hover state enhancement. Low risk — additive Tailwind classes only. | Replace `transition-colors` with `transition-all duration-150`; add `hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-300/30` |
| `PriceBlock.tsx` | Modified | Add centering to price card. Low risk. | Add `text-center` to the card wrapper `<div>` (the `rounded-lg border border-white/15 bg-white/10` element) |
| `/public/images/` | New assets | 4 new files. Risk: case-sensitivity on Linux CI for `.JPG` extension. | Copy `fotos/new-hero{1,2,3}.png` and `fotos/sobre-rafa.JPG` → `public/images/`; rename to `sobre-rafa.jpg` (lowercase extension) |

---

## Testing Approach

### Unit Tests

No new unit tests. All changes are presentational — no logic changes to hooks, server actions, or utilities.

### Playwright E2E Tests

New file: `e2e/second-fixes.pw.ts`. Viewports: 375px (mobile), 768px (tablet), 1280px (desktop).

| Feature | Assertion |
|---------|-----------|
| F1 key prop | `page.on('console', ...)` — assert zero messages matching `"key"` warning pattern |
| F2 gradient | BioSection `<svg>` contains a `linearGradient` element with `id="ig-gradient"` |
| F3 image swap | `<img>` srcs in HeroSection include `new-hero` |
| F4 mobile layout | At 375px: hero images container `boundingBox().y` < h1 `boundingBox().y` |
| F5 headline | `h1` inner text contains `"Plano Prático"` |
| F6 hover state | Hover CTA button; assert computed `transform` includes `matrix` (scale applied) |
| F7 carousel | Embla viewport element is visible; wait 11 s and assert the selected slide index has advanced; swipe gesture advances slide at 375px |
| F8 blockquote removed | BioSection has 0 `<blockquote>` elements |
| F9 price centering | `R$ 47` paragraph's `left + width/2` aligns with PriceBlock card midpoint (±4px tolerance) |
| F10 bio photo | BioSection `<img>` `src` attribute includes `sobre-rafa` |

---

## Development Sequencing

### Build Order

1. **Copy assets to `/public/images/`** — copy `fotos/new-hero{1,2,3}.png` and rename `fotos/sobre-rafa.JPG` → `public/images/sobre-rafa.jpg`. No code dependencies; must complete before steps 3 and 4 so dev server serves the files.
2. **Install `embla-carousel-react`** — `bun add embla-carousel-react`. No code dependencies; must complete before step 7.
3. **Fix `HeroSection`** (F3, F4, F5) — depends on step 1 (image files must exist before src attributes are updated to avoid broken images in dev). Independent of BioSection and Testimonials.
4. **Fix `BioSection`** (F1+F2 combined, F8, F10) — depends on step 1 (`sobre-rafa.jpg` must exist). Independent of HeroSection.
5. **Fix `CTABlock`** (F6 hover state) — no dependencies. Can be done in parallel with steps 3 and 4.
6. **Fix `PriceBlock`** (F9 centering) — no dependencies. Can be done in parallel with steps 3–5.
7. **Rewrite `Testimonials`** (F7 carousel) — depends on step 2 (`embla-carousel-react` must be installed before imports compile).
8. **Write Playwright tests** (`e2e/second-fixes.pw.ts`) — depends on steps 3–7 being complete so all assertions have targets.

Steps 3–6 are parallelisable. Step 7 is gated on step 2.

### Technical Dependencies

- `embla-carousel-react` package installation (step 2) must precede `Testimonials.tsx` rewrite (step 7).
- New image files in `public/images/` (step 1) must precede `HeroSection` and `BioSection` src updates (steps 3, 4) to avoid 404s during development.

---

## Monitoring and Observability

Not applicable — landing page UI changes only. No new metrics, logs, or alerts are required.

---

## Technical Considerations

### Key Decisions

**F1 resolved by F2 (atomic implementation)**
The `key`-prop warning traces to `createLucideIcon`'s internal rendering of the Instagram icon's SVG path array as React children without stable keys. Replacing the component with an inline `<svg>` (F2) removes the `createLucideIcon` call entirely. The two features share a single code change in `BioSection.tsx`.

**`flex-col-reverse` on all breakpoints (F4, ADR-006)**
Changing `flex-col md:flex-col-reverse` to `flex-col-reverse` (no breakpoint prefix) on the `HeroSection` section element extends the pre-existing desktop image-first behavior to mobile. One class removed, zero child-element changes.

**`text-center` on the price card wrapper (F9)**
Targeting the card `<div>` rather than just the `R$ 47` `<p>` centers all elements within the card consistently — label, price, payment note, and `GuaranteeSeal`. The `CTABlock` link inside the card already uses `justify-center`; centering the wrapper does not affect its alignment.

### Known Risks

| Risk | Mitigation |
|------|-----------|
| `sobre-rafa.JPG` uppercase extension fails on Linux CI | Rename to `sobre-rafa.jpg` at copy time; ensure `<Image src>` reference uses lowercase |
| Embla `scrollNext()` called after component unmount | `useEffect` cleanup returns `clearInterval(id)` — timer is cancelled on unmount |
| New hero images have different aspect ratios | `HeroSection` uses `object-cover` with constrained dimensions (`h-[42vh]` mobile, `h-auto` tablet/desktop) — images self-adapt; verify visually post-swap |
| SVG `linearGradient` `id` collision | Icon appears once per page; no collision. If the icon is ever reused on a page with multiple instances, the gradient `id` must be made unique (e.g., via `useId()`) |
| Carousel auto-advance timer not reset after manual navigation | Acceptable UX per PRD; reset-on-interaction is out of scope for a 4-slide carousel |

---

## Architecture Decision Records

- [ADR-001: Testimonials Carousel Library](adrs/adr-001.md) — Use Embla Carousel: lightweight, zero-dep, built-in swipe
- [ADR-002: Delivery Scope — Single PR](adrs/adr-002.md) — All 10 changes in one PR; UI-only, contained blast radius
- [ADR-003: Instagram Icon Color Treatment](adrs/adr-003.md) — Superseded by ADR-005
- [ADR-004: Testimonials Component File Strategy](adrs/adr-004.md) — Rewrite `Testimonials.tsx` in-place; no `page.tsx` changes needed
- [ADR-005: Instagram Icon Gradient Technique](adrs/adr-005.md) — Inline `<svg>` with `<linearGradient>` for cross-browser correctness
- [ADR-006: Mobile Hero Layout Correction](adrs/adr-006.md) — Extend `flex-col-reverse` to all breakpoints; no DOM restructure
