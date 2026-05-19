# PRD: ORGANIZE-$E Sales Landing Page (landing-page-v1)

## Overview

The ORGANIZE-$E landing page is a single-page sales site that converts cold traffic into paid registrations for the Workshop Organize-$e — a live, 3-hour online financial organization workshop led by Rafaela Ribeiro.

**Problem it solves:** Rafaela has no dedicated sales surface. Without a landing page, traffic from social media and bio links has nowhere to convert — potential students cannot register and pay without one.

**Who it is for:** Brazilian women who feel unable to control their finances and are looking for a practical, affordable first step. They browse on mobile, are skeptical of generic financial content, and need social proof plus a risk-free guarantee before buying.

**Why it is valuable:** A single purchase (R$ 47) on a well-structured landing page generates revenue for each workshop edition. The page is the entire revenue pipeline for this product.

---

## Goals

- **Primary:** Drive purchases through the Kiwify checkout (`https://pay.kiwify.com.br/3qkvzij`) at R$ 47 per registration
- **Secondary:** Build a waitlist for future editions after June 28, 2026
- **Success metric — conversion rate:** ≥ 3% of unique visitors complete the Kiwify purchase (industry average for Brazilian infoproducts is 1–3%; 3% is the target floor)
- **Success metric — mobile performance:** Lighthouse performance score ≥ 85 on mobile; LCP < 2.5s
- **Success metric — accessibility:** Lighthouse accessibility score ≥ 90
- **Milestone:** Page live and converting before June 21, 2026 (one week before the event)

---

## User Stories

### Primary Persona: "A Organizada que Ainda Não Começou"
Brazilian woman, 25–40 years old, income-earner, has tried budgeting before but never maintained it. Browses Instagram and clicked a bio link on her phone.

- As a visitor arriving from social media, I want to immediately understand what the workshop offers so that I can decide if it's worth my R$ 47 in under 30 seconds.
- As a skeptical buyer, I want to see real testimonials from women like me so that I believe the method actually works.
- As a mobile user, I want to buy in as few taps as possible so that I don't drop off during checkout.
- As a buyer with doubts, I want answers to common questions (recording availability, guarantee) without having to contact anyone.
- As a woman on a tight budget, I want the guarantee to be clearly visible so that I feel safe taking the risk.

### Secondary Persona: "A Curiosa Atrasada"
Visitor who arrives after June 28; missed the live event.

- As a late visitor, I want to know if there's a next edition so that I don't just leave the page.
- As an interested non-buyer, I want to leave my email so that I'm notified when the next workshop opens.

---

## Core Features

### 1. Hero Section
Displays responsive full-width images (`hero1.png`, `hero2.png`, `hero3.png`) selected by viewport width, with no text overlay. Immediately below the image, shows the workshop headline and a primary CTA button linking to Kiwify checkout. CTA button must be animated (pulse or glow) to draw attention.

**Behavior:** The hero is the first thing seen on load. No text is placed over the image per design requirements.

### 2. Pain Qualifier Block — "Para Quem É Este Workshop"
A visually scannable list of 7 pain points (from content.docx) each preceded by an emoji. Each item reads as a specific situation the visitor recognizes in herself. A closing statement ("Se você leu essa lista e pensou 'é exatamente o meu caso'…") leads into a CTA button.

**Purpose:** Qualifies the visitor and creates emotional recognition before social proof.

### 3. Testimonials Section
Displays the 4 testimonial images (`IMG_6269.jpg`, `IMG_6270.jpg`, `IMG_6271.jpg`, `IMG_6272.jpg`) in a responsive grid or carousel. Each is shown as a card or screenshot. Section heading introduces context ("O que estão dizendo").

**Placement:** After the pain qualifier — catches visitors at peak emotional receptivity.

### 4. Workshop Deliverables — "O Que Você Vai Encontrar"
Presents the event logistics (date, time, platform) and the 4 deliverables (practical classes, exclusive spreadsheet, live Q&A, 30-day plan) as a visual checklist with animated reveal on scroll. Followed by price display and CTA.

### 5. Countdown Timer
A live countdown clock showing days, hours, minutes, and seconds remaining until June 28, 2026 at 10:00 BRT. Displayed near every CTA button (below the headline in the hero, in the price block, near the guarantee seal).

**Post-event behavior:** After June 28, the timer disappears and CTAs switch to the waitlist form.

### 6. Bio Section — "Quem Vai Te Guiar"
Displays `rafa.png` alongside Rafaela Ribeiro's biography text. Includes her credentials (Administração, Finanças Pessoais), her story (Nordestina, living in Portugal 4+ years), and her mission statement in a pull-quote. Instagram handle `@rafaelaribeirofinancas` is shown as a clickable link.

### 7. Price Block + Primary CTA
Shows the price (R$ 47) anchored visually against the workshop's perceived value. CTA button ("Quero Garantir Meu Ingresso") links to Kiwify. Animated CTA button (pulse animation). The countdown timer appears here as well.

### 8. 7-Day Guarantee Seal
A visually prominent badge/seal — bright contrasting colors (gold or vibrant green on black background) against the page's black/white palette. Text: "7 dias de garantia — satisfação garantida ou seu dinheiro de volta." Placed immediately above the final CTA button.

**Visual treatment:** Must stand out distinctly from the rest of the page. Large, badge-styled, impossible to miss.

### 9. FAQ Section
Accordion-style answers to the 5 FAQ items from content.docx: event description, recording availability, missed live session, event date/time, guarantee. Each question expands on click/tap.

### 10. Final CTA
A final CTA button below the FAQ, above the footer. Includes the guarantee seal reminder and the Kiwify link. The last opportunity to convert before the visitor leaves.

### 11. Post-Event Waitlist State
After June 28, the page transitions to a "waitlist mode":
- Countdown timer is hidden
- Kiwify CTA buttons are replaced with an email capture form ("Entrar na lista de espera")
- Page headline updates to indicate the edition has passed and a new one is coming
- Submitted emails are collected (integration TBD — see Open Questions)

### 12. Scroll Animations
Elements animate into view as the visitor scrolls: section headings fade/slide in, checklist items stagger-reveal, CTA buttons pulse. Animations respect `prefers-reduced-motion`.

---

## User Experience

### Key Personas
- **Primary:** Mobile-first Brazilian woman, cold traffic from Instagram bio link, high skepticism, low financial literacy confidence
- **Secondary:** Post-event visitor who missed the live workshop

### Primary Flow (Pre-Event)
1. Visitor taps Instagram bio link on phone
2. Hero images load instantly (no text overlay); headline and CTA visible above the fold on mobile
3. Countdown timer visible within first scroll — creates urgency
4. Pain qualifier: visitor scans bullet list, recognizes herself
5. Testimonials: photos validate that real women bought and benefited
6. Deliverables + Price: visitor understands what they get for R$ 47
7. Bio: Rafaela's story and authority build final trust
8. Guarantee seal: risk is removed
9. FAQ: objections cleared
10. Final CTA: visitor clicks through to Kiwify, completes purchase

### Primary Flow (Post-Event)
1. Visitor arrives; page shows "edition ended" state
2. Waitlist form is visible; visitor submits email
3. Rafaela's team is notified for next edition outreach

### Mobile-First UX Requirements
- Font sizes ≥ 16px for body text
- Touch targets ≥ 48px height for all buttons
- Images served in WebP format with appropriate `srcset` for 3 breakpoints
- Sticky or floating CTA button on mobile (optional enhancement)
- No horizontal scroll at any viewport width

### Accessibility
- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for all text
- Testimonial images described via `alt` or visually hidden captions
- Animated elements respect `prefers-reduced-motion`
- FAQ accordion keyboard-navigable

---

## High-Level Technical Constraints

- **Framework:** Next.js (App Router) — already installed
- **Styling:** Tailwind CSS v4 — already configured
- **Checkout:** Kiwify link `https://pay.kiwify.com.br/3qkvzij` — external, no backend integration needed
- **Images:** Hero images available as PNG (~1.5–1.7 MB each); must be optimized before serving
- **Testing:** Playwright CLI — end-to-end navigation, responsiveness, and accessibility tests required before ship
- **Language:** Portuguese (Brazilian) — all copy and UI text
- **Hosting:** Vercel (assumed, given Next.js setup — confirm before deploy)
- **Waitlist email collection:** Requires a form submission endpoint (see Open Questions)

---

## Non-Goals (Out of Scope)

- No user accounts, login, or member area
- No payment processing on this page — Kiwify handles all transactions
- No blog, multi-page navigation, or additional content routes
- No A/B testing infrastructure (single design, single copy)
- No analytics dashboard — event tracking via Kiwify's native analytics only
- No video content embedded on the page (hero uses static images per requirements)
- No multilingual support — Portuguese only
- No dark/light mode toggle — design is intentionally black/white
- Post-event recording sales page (separate future initiative)

---

## Phased Rollout Plan

### MVP (Phase 1) — Must ship before June 21, 2026
Core sections live and working:
- Hero with responsive images and headline
- Pain qualifier block
- Testimonials grid
- Deliverables checklist
- Bio section (Rafaela + `rafa.png`)
- Price block with animated CTA → Kiwify
- 7-day guarantee seal
- FAQ accordion
- Countdown timer
- Scroll animations
- Post-event waitlist state (hidden until June 28)

**Success criteria to proceed:** Page passes Playwright navigation tests, Lighthouse mobile performance ≥ 85, Lighthouse accessibility ≥ 90, and Kiwify checkout link functional.

### Phase 2 — After first workshop edition (July 2026)
- Waitlist form integrated with an email service (Mailchimp, Kit, or Rafaela's provider)
- Real testimonials from June 28 attendees added to the page
- Copy and price updated for next workshop edition

### Phase 3 — Ongoing iterations
- A/B test headline and CTA copy variations
- Add video testimonials if collected
- Explore retargeting pixel integration (Meta Pixel)

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Conversion rate (unique visitors → Kiwify purchase) | ≥ 3% | Kiwify dashboard |
| Mobile Lighthouse performance | ≥ 85 | Playwright / Lighthouse CLI |
| Mobile Lighthouse accessibility | ≥ 90 | Playwright / Lighthouse CLI |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Post-event waitlist signups | ≥ 50 emails | Email provider |
| FAQ interaction rate | > 20% of sessions engage accordion | (Future: analytics) |

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hero images too large, causing slow mobile loads | High | High | Serve WebP with `srcset`; use Next.js `<Image>` component for automatic optimization |
| Countdown timer shows wrong time for non-BRT visitors | Medium | Medium | Fix timer to a UTC timestamp for June 28 10:00 BRT (-03:00) and display "horário de Brasília" label |
| Kiwify link goes down or changes before event | Low | High | Test link daily; have Rafaela's Kiwify dashboard bookmarked for quick update |
| Page not live early enough for pre-event traffic | High | High | Target completion by June 21 — one full week before the event |
| Testimonial images too small/blurry to be credible | Medium | Medium | Display at full resolution with lightbox or large card format; check quality before using |
| Waitlist email collection has no backend in Phase 1 | High | Medium | Use a simple third-party form (Tally, Typeform, or Google Forms embed) as a stopgap for Phase 1 |

---

## Architecture Decision Records

- [ADR-001: Classic Brazilian Infoproduct Page Structure](adrs/adr-001.md) — Chose the proven 8-section Brazilian infoproduct layout over minimalist or story-first alternatives to maximize conversion signals for cold mobile traffic.

---

## Open Questions

1. **Waitlist email destination:** Which email marketing platform does Rafaela use (Mailchimp, Kit, ConvertKit, etc.)? The Phase 1 waitlist form needs a submission endpoint. If none, a Tally or Google Forms embed can be used as a stopgap.
2. **Post-event state trigger:** Should the page switch to waitlist mode automatically at midnight on June 28, or only after 13:00 BRT (when the live session ends)?
3. **Testimonial source:** Are the 4 images in `/depoimentos/` the final testimonials, or will more be added before launch?
4. **Hosting environment:** Is deployment on Vercel confirmed, or will this run on another platform?
5. **Analytics:** Should a Meta Pixel or Google Analytics tag be added to the page for retargeting? (Not in scope for MVP but worth deciding before deploy.)
6. **Pricing anchor:** Should the page show a "de R$ X por R$ 47" crossed-out original price to increase perceived value, or show R$ 47 as the flat price?
