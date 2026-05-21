# TechSpec: third-fixes — Landing Page Bug Fix Batch

## Executive Summary

Five independent, surgical fixes to the ORGANIZE-$E landing page. No new components, no new dependencies, no architectural changes. Each fix targets a single file or element; the full batch can be applied and reviewed as a sequence of minimal diffs.

The primary trade-off is scope discipline: by treating each fix in isolation rather than folding in adjacent cleanup (unused image removal, full metadata audit), the diff stays small and each change can be reverted independently. Unused assets in `public/images/` remain after this batch and require a future pass.

## System Architecture

### Component Overview

This batch touches three existing source files and one binary asset. No new components are introduced.

| File | Role | Fix applied |
|------|------|-------------|
| `app/layout.tsx` | Root layout — emits `<html>`, global metadata | Fix 3: lang attribute; Fix 4: OG image URL |
| `app/components/landing/CTABlock.tsx` | CTA button + countdown | Fix 1: overflow-x-clip removal + px-1 |
| `app/components/landing/BioSection.tsx` | Rafaela bio section | Fix 5: bio paragraph replacement |
| `app/favicon.ico` | Next.js App Router favicon auto-detection | Fix 2: brand favicon replaces default |
| `fotos/` (root directory) | Backup working directory — not served | Deleted after favicon is promoted |

Data flow is unchanged: all components are client-side React rendered by Next.js App Router. Metadata (`layout.tsx`) is static and emitted at build time.

## Implementation Design

### Core Interfaces

The five fixes are mechanical text and binary edits; no new interfaces or types are introduced. The relevant JSX shapes are shown below for reference:

```tsx
// CTABlock.tsx — wrapper div after fix (overflow-x-clip removed, px-1 added)
<div className="w-full px-1">
  {/* countdown grid unchanged */}
  <a className="animate-scale-pulse mt-5 inline-flex min-h-12 w-full ..." />
</div>

// layout.tsx — html element after fix
<html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>

// layout.tsx — OG image after fix
images: [{ url: "/images/new-hero1.png", width: 1080, height: 1080, alt: "Workshop ORGANIZE-$E" }]

// BioSection.tsx — replacement paragraph block (div.mt-6.space-y-5)
<div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700">
  <p>Tenho 32 anos, sou nordestina, de Fortaleza – Ceará, e hoje moro em Portugal há 4 anos, ao lado do meu marido.</p>
  <p>Sou formada em Administração, Educadora Financeira e Mentora de mulheres pelo mundo.</p>
  <p>A educação financeira transformou a minha vida, e hoje ensino mulheres a conquistarem uma vida melhor através dela.</p>
  <p>Já ajudei dezenas de mulheres a organizarem suas finanças, saírem do sufoco e realizarem seus sonhos com mais liberdade e segurança.</p>
</div>
```

### Data Models

No data model changes. All affected content is static JSX string literals.

### API Endpoints

No API changes.

## Integration Points

No external service integrations are added or modified. The OG image URL change (`/images/new-hero1.png`) assumes `new-hero1.png` already exists in `public/images/` — confirmed present at 1,243,542 bytes.

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
|-----------|-------------|----------------------|-----------------|
| `app/components/landing/CTABlock.tsx` | Modified | Remove `overflow-x-clip`, add `px-1`. Risk: none — `px-1` is 4px total horizontal inset | Remove class, add class |
| `app/layout.tsx` | Modified | Two edits: `lang="pt-BR"` and OG image URL. Risk: none — static string changes | Edit two lines |
| `app/components/landing/BioSection.tsx` | Modified | Replace 2 `<p>` tags with 4 `<p>` tags. Surrounding layout (subtitle, Instagram link) unchanged. Risk: low — paragraph count change may affect vertical rhythm | Replace paragraph block |
| `app/favicon.ico` | Modified | Overwrite 25 KB default with 4 KB brand icon. Next.js serves this automatically. Risk: none — binary file replacement | Overwrite file |
| `fotos/` (root dir) | Deprecated | Entire directory deleted. Contains backup images and the source favicon.ico. Risk: irreversible without git recovery | Delete directory after promoting favicon |
| `public/images/hero1.png` | None | OG image reference removed from metadata. File remains on disk (Phase 2 cleanup). | No action this batch |

## Testing Approach

### Unit Tests

No unit tests. All five fixes are static content or CSS class changes with no logic branches.

### Integration Tests (E2E — Playwright)

Run the existing Playwright suite in full. Add or update assertions to cover:

1. **Hydration / console errors**: `page.on('console', ...)` listener asserts zero messages of type `error` on a cold load of `/`
2. **Favicon presence**: assert `<link rel="icon">` or `<link rel="shortcut icon">` exists in `<head>` (Next.js App Router emits this automatically when `app/favicon.ico` is present)
3. **CTA button visible and not clipped**: assert the CTA `<a>` element with `animate-scale-pulse` is visible and its bounding box width is less than its parent bounding box width by at most `px-1` (4px per side)
4. **Bio text match**: assert the text "Tenho 32 anos, sou nordestina" is present in the page body
5. **lang attribute**: assert `document.documentElement.lang === 'pt-BR'`

No additional visual regression snapshots are required for this batch.

## Development Sequencing

### Build Order

Apply fixes in this order to avoid committing a broken intermediate state:

1. **Promote favicon** (`app/favicon.ico`) — no dependencies; binary overwrite; must happen before step 2
2. **Delete `fotos/` directory** — depends on step 1 (favicon promoted); irreversible, so do this after confirming step 1
3. **Fix `lang` attribute** (`app/layout.tsx:48`) — no dependencies; single line change
4. **Fix OG image URL** (`app/layout.tsx:32`) — no dependencies; can be applied together with step 3 in one file edit
5. **Fix `overflow-x-clip`** (`app/components/landing/CTABlock.tsx:33`) — no dependencies; remove class and add `px-1`
6. **Replace bio paragraphs** (`app/components/landing/BioSection.tsx:54-66`) — no dependencies; replace the `div.mt-6.space-y-5` content block

Steps 3–6 are independent and can be applied in any order. Steps 1 and 2 must remain sequential.

### Technical Dependencies

- `new-hero1.png` must exist in `public/images/` before step 4 is verified — confirmed present
- `fotos/favicon.ico` must be read/copied before step 2 — enforced by the step 1 → 2 ordering

## Monitoring and Observability

No runtime metrics. Post-deploy verification:

- Open browser DevTools on the production URL; confirm zero console errors on cold load
- Check the browser tab for the brand favicon icon
- Inspect `<html lang>` attribute in DevTools Elements panel
- Share the production URL in a link preview tool (Slack, iMessage) to verify OG image shows `new-hero1.png`

## Technical Considerations

### Key Decisions

**`overflow-x-clip` removal strategy**: Removing the class and adding `px-1` rather than only removing the class. The 1.03× scale on a `w-full` button requires horizontal clearance; `px-1` provides 4px per side at negligible layout cost. See ADR-003.

**`lang` attribute locale**: `pt-BR` over `pt-PT` despite the server trace showing `pt-PT`. The page targets Brazilian users; semantic accuracy for the audience takes precedence over matching an accidental server-side value. See ADR-002.

**Favicon via `app/favicon.ico` in-place replacement**: Next.js App Router automatically serves and links `app/favicon.ico` without any metadata configuration. Replacing the file is sufficient; no changes to `layout.tsx` metadata are needed for favicon support.

**Bio voice switch (third-person → first-person)**: The approved copy in `prompt.md` is first-person. The subtitle line "Educadora Financeira, Mentora e Empresária" is retained unchanged above the paragraphs to preserve credential scanning above the fold.

### Known Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Removing `fotos/` before favicon promotion loses the brand icon | Low | Build order enforces step 1 before step 2 |
| `px-1` on the CTABlock wrapper introduces 8px total horizontal inset that breaks the countdown grid | Low | Both the grid and the button are inside the same wrapper; grid uses `gap-2` internally and is unaffected by horizontal inset on the parent |
| First-person bio voice reads oddly inside a third-person page | Very Low | The rest of the page doesn't reference Rafaela in third person in the bio section; the section heading "Quem vai te guiar nesta jornada" works with either voice |

## Architecture Decision Records

- [ADR-001: Targeted Bug-Fix Batch Scope](adrs/adr-001.md) — Chose minimal targeted-fix approach over full asset audit or metadata standards pass
- [ADR-002: Portuguese Locale for html lang Attribute](adrs/adr-002.md) — Chose `pt-BR` over `pt-PT` and generic `pt` based on target audience locale accuracy
- [ADR-003: CTA Button Pulse Visibility Fix Strategy](adrs/adr-003.md) — Chose `overflow-x-clip` removal + `px-1` over remove-only or nested div approaches
