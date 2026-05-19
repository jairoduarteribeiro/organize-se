# TechSpec: ORGANIZE-$E Sales Landing Page (landing-page-v1)

## Executive Summary

The landing page is a Next.js App Router single-page site built on the existing codebase (Next.js 16.2.6, React 19, TypeScript 5, Tailwind CSS v4). `app/page.tsx` is a thin Server Component that composes 10 section components housed in `app/components/landing/`. Only two components require `"use client"`: `CTABlock` (countdown timer + post-event state switch) and `WaitlistForm` (Server Action caller for email capture). All other sections remain Server Components, keeping the client bundle minimal.

The primary trade-off of the client-side countdown approach is a sub-second flash risk on extremely slow connections where Kiwify CTAs render before the timer hydrates — acceptable given the page's mobile-first audience and the operational simplicity it affords over server-side date checks or manual Vercel redeployments.

---

## System Architecture

### Component Overview

```
app/
  page.tsx                    ← Server Component orchestrator (metadata + section composition)
  layout.tsx                  ← Root layout (Geist fonts, global metadata)
  globals.css                 ← Tailwind base + custom keyframes (pulse-glow, fade-in, stagger)
  actions/
    waitlist.ts               ← Server Action: receive and log waitlist emails
  hooks/
    useCountdown.ts           ← useCountdown(target: Date) → CountdownTime
    useInView.ts              ← useInView(ref, options?) → boolean
  components/
    landing/
      HeroSection.tsx         ← Responsive hero images + headline + <CTABlock>
      PainQualifier.tsx       ← 7 pain-point list with closing CTA redirect
      Testimonials.tsx        ← 4 testimonial image cards (responsive grid)
      Deliverables.tsx        ← Event logistics + 4-item checklist (scroll-animated)
      BioSection.tsx          ← Rafaela photo + bio + Instagram link
      PriceBlock.tsx          ← Price display + <CTABlock> + <GuaranteeSeal>
      GuaranteeSeal.tsx       ← Reusable badge/seal component
      FaqAccordion.tsx        ← 5 FAQ items using <details>/<summary>
      FinalCTA.tsx            ← Last conversion block: <GuaranteeSeal> + <CTABlock>
      CTABlock.tsx            ← "use client" — countdown timer + CTA button or WaitlistForm
      WaitlistForm.tsx        ← "use client" — email input + Server Action caller

public/
  images/
    hero1.png, hero2.png, hero3.png   ← Hero images (1.5–1.7 MB each, optimized by next/image)
    rafa.png                          ← Rafaela's bio photo
    testimonials/
      IMG_6269.jpg ... IMG_6272.jpg   ← Testimonial screenshots
```

**Data flow:**
1. Server renders `app/page.tsx`, composing all section Server Components into the HTML stream.
2. `CTABlock` hydrates on the client; `useCountdown(EVENT_UTC)` ticks every second. When `isExpired` flips to `true`, the button swaps to `<WaitlistForm />` and the timer display hides.
3. Multiple `CTABlock` instances (in `HeroSection`, `PriceBlock`, `FinalCTA`) each run their own `useCountdown` hook — all share the same UTC constant, so they expire simultaneously.
4. `WaitlistForm` calls the `submitWaitlistEmail` Server Action on submit. The action validates the email and logs it server-side.

---

## Implementation Design

### Core Interfaces

```typescript
// app/hooks/useCountdown.ts
type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

export function useCountdown(target: Date): CountdownTime;

// app/actions/waitlist.ts
type WaitlistActionResult = {
  success: boolean;
  error?: string;
};

export async function submitWaitlistEmail(
  prevState: WaitlistActionResult,
  formData: FormData
): Promise<WaitlistActionResult>;

// app/hooks/useInView.ts
type InViewOptions = {
  threshold?: number;       // default: 0.15
  rootMargin?: string;      // default: '0px 0px -50px 0px'
  once?: boolean;           // default: true — unobserve after first trigger
};

export function useInView(
  ref: React.RefObject<Element>,
  options?: InViewOptions
): boolean;
```

### Data Models

```typescript
// Shared constant (app/lib/constants.ts)
export const EVENT_UTC = new Date('2026-06-28T13:00:00Z'); // June 28 10:00 BRT (UTC-3)
export const KIWIFY_URL = 'https://pay.kiwify.com.br/3qkvzij';
export const INSTAGRAM_URL = 'https://www.instagram.com/rafaelaribeirofinancas';
```

**No database or persistent storage** — waitlist emails are logged to Vercel Function stdout in Phase 1. Phase 2 replaces the `console.log` line with an email service API call; no schema migration needed.

### API Endpoints

The only backend surface is a single Next.js Server Action:

| Surface | Type | Path | Description |
|---------|------|------|-------------|
| `submitWaitlistEmail` | Server Action | `app/actions/waitlist.ts` | Validates email format; logs to stdout in Phase 1 |

**Input:** `FormData` with field `email: string`  
**Output:** `{ success: true }` or `{ success: false, error: "Email inválido." }`  
**Validation:** Basic regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) — no external library required.

---

## Integration Points

### Kiwify Checkout

- **Purpose:** External payment and registration processor
- **Integration type:** Outbound link only — `<a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer">`
- **No auth required.** No backend integration. The link is a constant in `app/lib/constants.ts`.
- **Error handling:** Not applicable — the page has no control over Kiwify's availability.

### Next.js Image Optimization (Vercel)

- **Purpose:** Serve WebP/AVIF at the correct breakpoint with lazy loading
- **Integration:** `next/image` with `sizes` prop specifying the 3 breakpoints; hero images use `priority` to avoid LCP penalty.
- **Configuration:** `next.config.ts` requires no additional `remotePatterns` — all images are local in `public/images/`.

---

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|---------------------|-----------------|
| `app/page.tsx` | Modified | Current starter content replaced entirely | Replace file contents; low risk |
| `app/globals.css` | Modified | Add `@keyframes pulse-glow`, `fade-in`, `stagger` and base animation utilities | Additive change; no existing styles affected |
| `app/layout.tsx` | Modified | Update metadata (title, description, OG tags for the workshop) | Additive; low risk |
| `next.config.ts` | Modified | No changes required (local images only) | None |
| `public/` | New | Add `images/` directory with hero, bio, and testimonial assets | Ensure assets are in place before build |
| `app/actions/` | New | New directory and `waitlist.ts` Server Action | New; no conflict |
| `app/hooks/` | New | New directory with `useCountdown.ts` and `useInView.ts` | New; no conflict |
| `app/components/landing/` | New | 11 new component files | New; no conflict |
| `app/lib/constants.ts` | New | Shared constants (event date, URLs) | New; no conflict |

---

## Testing Approach

### Playwright Tests

All tests run via the `playwright-cli` skill against `http://localhost:3000`.

**Navigation and content:**
- Page loads without JS errors
- `<h1>` is present and non-empty
- Kiwify CTA button is visible and `href` equals the Kiwify URL
- Kiwify link has `target="_blank"`
- FAQ accordion: click first `<summary>`, assert its `<details>` has the `open` attribute

**Responsiveness:**
- Viewport 375×812 (iPhone 14): no horizontal scrollbar; hero image visible; CTA button has height ≥ 48px
- Viewport 768×1024 (tablet): no horizontal scrollbar
- Viewport 1280×800 (desktop): no horizontal scrollbar

**Accessibility:**
- Run `axe-playwright` or Lighthouse accessibility audit; assert score ≥ 90
- All `<img>` elements have non-empty `alt` attributes

**Post-event state (mock):**
- Override `Date.now()` to return a timestamp after `EVENT_UTC`; assert Kiwify button is not visible and waitlist form input is visible

**Waitlist form:**
- Fill email input with `teste@email.com`; submit; assert success message appears

### Lighthouse Audit

Run via Playwright after all content is in place:
- Mobile preset (emulated Moto G4, throttled 3G)
- Performance score ≥ 85
- Accessibility score ≥ 90
- LCP < 2.5s
- CLS < 0.1

---

## Development Sequencing

### Build Order

1. **Project scaffold** — create `app/lib/constants.ts`, `app/hooks/useCountdown.ts`, `app/hooks/useInView.ts`, and copy image assets to `public/images/`. No dependencies.
2. **globals.css animation utilities** — add `@keyframes pulse-glow`, `fade-in`, `stagger-N` delay variants, and `prefers-reduced-motion` suppression rule. Depends on step 1.
3. **Static Server Component sections** — implement `HeroSection` (images + headline placeholder, no CTA yet), `PainQualifier`, `Testimonials`, `Deliverables`, `BioSection`, `GuaranteeSeal`, `FaqAccordion`. Depends on steps 1–2.
4. **`CTABlock` client component** — wire `useCountdown` to render the countdown display and Kiwify button; post-event branch renders a placeholder `<WaitlistForm />` stub. Depends on step 1.
5. **`WaitlistForm` + Server Action** — implement `app/actions/waitlist.ts` and the `WaitlistForm` client component. Replace the stub from step 4. Depends on step 1.
6. **Compose `app/page.tsx`** — wire all sections together; insert `CTABlock` into `HeroSection`, `PriceBlock`, `FinalCTA`. Depends on steps 3–5.
7. **Scroll animations** — apply `useInView` to `Deliverables` checklist items and section headings; apply `animate-pulse-glow` to CTA buttons. Depends on steps 2–6.
8. **Metadata + layout** — update `app/layout.tsx` with workshop title, description, and OG image. Depends on step 6.
9. **Playwright test suite** — write and run all tests from the Testing Approach section. Depends on steps 6–8.
10. **Lighthouse audit + tuning** — run Lighthouse mobile; iterate on image `sizes`, lazy loading, and font loading until targets are met. Depends on step 9.

### Technical Dependencies

- Image assets (`hero1.png`, `hero2.png`, `hero3.png`, `rafa.png`, `IMG_6269–6272.jpg`) must be in `public/images/` before step 3. These already exist at the project root in `fotos/` and `depoimentos/` — copy or move before building.
- Vercel deployment is assumed (required for Server Actions). Confirm before step 8.

---

## Monitoring and Observability

**Phase 1 (pre-Phase 2 email integration):**
- Waitlist email submissions are logged to Vercel Function stdout as `[waitlist] email=<value>`. Rafaela's team must check Vercel logs to retrieve submissions.
- Kiwify purchase tracking is handled entirely by Kiwify's native dashboard — no instrumentation required on this page.

**Performance:**
- Lighthouse CLI run as part of the Playwright test suite on every deploy. Failing the ≥ 85 performance or ≥ 90 accessibility thresholds blocks ship.

---

## Technical Considerations

### Key Decisions

| Decision | Choice | Rationale | Trade-off |
|----------|--------|-----------|-----------|
| Post-event state detection | Client-side `useCountdown` | No redeploy required; automatic at exact UTC timestamp | Sub-second CTA flash risk on very slow connections |
| Animation library | None — CSS + IntersectionObserver | Zero bundle overhead; all required patterns achievable | Manual stagger delays; no spring physics |
| FAQ accordion | `<details>/<summary>` | Zero JS; native keyboard navigation; Server Component | All items can be open simultaneously |
| Waitlist backend | Server Action (log-only) | Ships before external service is decided; trivial Phase 2 upgrade | Emails not auto-delivered to Rafaela in Phase 1 |
| Image delivery | `next/image` with `srcset` | Automatic WebP/AVIF; no pre-conversion step; Vercel edge CDN | Requires Vercel (or compatible image optimization service) |

### Known Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Hero images degrade LCP beyond 2.5s | High | Use `priority` prop on the first hero `<Image>`; set explicit `sizes` matching CSS breakpoints; avoid `width: 100%` without `sizes` |
| Countdown timer shows wrong time for visitors outside BRT | Medium | Anchor to `EVENT_UTC` (UTC-3 fixed offset); display "horário de Brasília" label next to timer |
| Testimonial images too small or blurry | Medium | Display at minimum 320px width in card format; inspect `IMG_6269–6272.jpg` quality before committing |
| Vercel log retention expires before Phase 2 | Medium | Document risk to Rafaela; schedule Phase 2 email integration before Phase 1 launch if possible |
| `<details>/<summary>` marker not suppressed in Safari | Low | Add `summary { list-style: none }` and `summary::-webkit-details-marker { display: none }` to globals.css |

---

## Architecture Decision Records

- [ADR-001: Classic Brazilian Infoproduct Page Structure](adrs/adr-001.md) — Chose the proven 8-section Brazilian infoproduct layout over minimalist or story-first alternatives.
- [ADR-002: Client-Side Countdown Timer for Post-Event State Detection](adrs/adr-002.md) — Client-side `useCountdown` hook drives the pre/post-event CTA switch without a redeploy.
- [ADR-003: Next.js Server Action for Waitlist Email Capture (Phase 1 Log-Only)](adrs/adr-003.md) — Server Action logs emails to stdout in Phase 1; Phase 2 swaps in the email service API call.
- [ADR-004: CSS Keyframes + IntersectionObserver for Scroll Animations](adrs/adr-004.md) — Zero-dependency scroll animations via a custom `useInView` hook and CSS transitions.
- [ADR-005: Native `<details>/<summary>` for FAQ Accordion](adrs/adr-005.md) — Native HTML accordion with CSS animation; no JavaScript or external library required.
