# PRD: third-fixes — Landing Page Bug Fix Batch

## Overview

This release resolves five concrete issues on the ORGANIZE-$E workshop landing page that were reported after the `second-fixes` iteration. The fixes address a clipped visual animation on the primary CTA button, a missing favicon, outdated bio copy for Rafaela, and a Next.js hydration error caused by a mismatched HTML `lang` attribute. An OG image update and source-directory cleanup are also included.

**Target users:** Visitors to the workshop landing page and the site owner (Rafaela).
**Value:** Restores intended visual polish, corrects brand representation, and eliminates a console error that may affect SEO crawlers and future debugging.

## Goals

- CTA button pulse is fully visible to every visitor, reinforcing urgency without visual glitches
- Browser tab shows the correct favicon, establishing brand recognition on first load
- Rafaela's bio accurately reflects her own voice and credentials as provided
- The Next.js hydration error no longer appears in browser consoles or server logs
- The `fotos/` working directory is removed and the OG image reflects current photography
- Zero regressions introduced across existing landing page sections

## User Stories

**Visitor persona (prospective workshop attendee):**
- As a visitor, I want to see the CTA button pulsing visibly so that I feel a sense of urgency to purchase
- As a visitor, I want the browser tab to show the brand favicon so the page feels professional and trustworthy
- As a visitor reading Rafaela's bio, I want the text to feel personal and direct so I can connect with her as a mentor

**Site owner persona (Rafaela / workshop host):**
- As the site owner, I want my bio to use my own words so the page accurately represents me
- As the site owner, I want the codebase free of console errors so I can confidently debug future issues
- As the site owner, I want source/backup files removed from the project so the repo reflects only what is deployed

## Core Features

**1. CTA Button Pulse Fix**
The `<a>` button in `CTABlock.tsx` uses `animate-scale-pulse` (scale 1 → 1.03). The parent container has `overflow-x-clip` which clips the outward expansion, making the animation imperceptible. The fix removes the overflow constraint from the container and adds enough horizontal breathing room so the scale transition is visible at the button edges.

**2. Favicon Configuration**
`fotos/favicon.ico` must be placed at `public/favicon.ico` (or `app/favicon.ico` for Next.js App Router auto-detection). The `app/layout.tsx` metadata block must reference it so browsers and bookmark managers display the correct icon.

**3. Unused Image Removal + OG Image Swap**
The `fotos/` root directory is deleted in full. The OG image in `app/layout.tsx` metadata is updated from `hero1.png` to `new-hero1.png` to match current hero photography.

**4. Rafaela Bio Text Update**
The bio copy in `BioSection.tsx` is replaced with the approved text from `prompt.md`. The revised copy uses first-person voice, specifies her hometown (Fortaleza – Ceará), and leads with her personal story before her credentials.

**5. Hydration Error Fix**
`app/layout.tsx` line 48 changes `lang="en"` to `lang="pt-PT"` to match what the server renders, eliminating the React hydration mismatch logged to the browser console.

## User Experience

**CTA button:** Visitors scrolling the page should see the yellow button gently breathe (scale pulse) without any visual clipping at the button edges. The animation must remain accessible — it is already suppressed via `@media (prefers-reduced-motion: reduce)` in `globals.css`.

**Favicon:** On page load the browser tab shows the ORGANIZE-$E icon. The icon also appears in browser history, bookmarks, and mobile home-screen shortcuts.

**Bio section:** Rafaela's bio reads naturally in first person. Paragraph breaks match the approved four-paragraph structure from `prompt.md`.

**No console errors:** Browser developer tools show no hydration warnings when the page loads, giving developers a clean baseline for future debugging.

## Non-Goals

- Replacing or resizing the default Next.js template SVGs (`file.svg`, `next.svg`, `globe.svg`, `window.svg`, `vercel.svg`) — separate cleanup pass
- Removing unused hero images (`hero2.png`, `hero3.png`, `rafa.png`) from `public/images/` — separate cleanup pass
- Auditing or rewriting other Open Graph metadata (title, description, canonical URL) — separate initiative
- Redesigning the CTA block layout or animation style beyond making the existing scale-pulse visible

## Phased Rollout Plan

### MVP (Phase 1 — this release)

All five fixes ship together as a single deployment. There is no incremental rollout; each fix is independent and low-risk.

Success criteria to consider shipped:
- Pulse animation visible on desktop and mobile without clipping
- Favicon displays in Chrome, Safari, and Firefox
- Bio text matches the approved copy verbatim
- Zero hydration warnings in browser console on a clean load
- `fotos/` directory absent from the repository
- OG image resolves to `new-hero1.png`

### Phase 2 (future)

- Remove unused images from `public/images/` (`hero2.png`, `hero3.png`, `rafa.png`, default SVGs)
- Full metadata and Open Graph audit

## Success Metrics

- **Pulse visibility**: Manual QA on viewport widths 375px, 768px, 1280px confirms animation is visible
- **Favicon**: Tab icon renders correctly in at least Chrome, Safari, Firefox, and mobile Safari
- **Hydration error**: Zero hydration warnings in browser console across cold and warm page loads
- **Bio accuracy**: Bio text matches the approved version character-for-character
- **Repo cleanliness**: `fotos/` is absent from `git status`
- **No regressions**: Playwright E2E suite passes in full

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Removing `overflow-x-clip` causes horizontal scrollbar on narrow viewports | Low | Add `overflow: hidden` only on the page wrapper instead of the button container; verify at 320px |
| Deleting `fotos/` removes the only copy of `favicon.ico` before it is copied to `public/` | Medium | Copy favicon first, delete directory second |
| `lang="pt-PT"` triggers a different spell-check or input behavior in some browsers | Very Low | No user-input fields use language-sensitive behavior in this page |
| Bio text line breaks render differently depending on the JSX whitespace handling | Low | Verify the four-paragraph structure renders correctly in browser |

## Architecture Decision Records

- [ADR-001: Targeted Bug-Fix Batch Scope](adrs/adr-001.md) — Chose minimal targeted-fix approach over full asset audit or metadata standards pass

## Open Questions

- Should the `lang` attribute use `pt-PT` (European Portuguese, matching the server's previous rendering) or `pt-BR` (Brazilian Portuguese, matching the workshop's target audience timezone)? The prompt error trace shows `pt-PT` on the server — this PRD assumes `pt-PT` is correct, but the site owner should confirm.
- Should `hero1.png` (currently the OG image) be deleted after the OG image is swapped to `new-hero1.png`, or retained as a fallback?
