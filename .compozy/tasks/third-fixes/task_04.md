---
status: completed
title: Replace Rafaela bio paragraphs in BioSection.tsx
type: bugfix
complexity: low
dependencies: []
---

# Replace Rafaela bio paragraphs in BioSection.tsx

## Overview

Replaces the two existing third-person `<p>` tags in the `div.mt-6.space-y-5` block of `BioSection.tsx` with four first-person paragraphs approved in `prompt.md`. The surrounding layout — section heading, subtitle line, and Instagram link — is left untouched. The change corrects the bio to use Rafaela's own voice and specifies her hometown (Fortaleza – Ceará).

<critical>
- Read the PRD and TechSpec before starting
- Reference TechSpec 'Core Interfaces' §BioSection paragraph block for the exact approved copy
- Focus on WHAT: replace the inner content of `div.mt-6.space-y-5` only — no structural or style changes
- Bio copy MUST match the approved text verbatim (character-for-character per PRD Success Metrics)
- Tests required: E2E assertion for "Tenho 32 anos, sou nordestina" presence is in task_05
</critical>

<requirements>
1. The `div.mt-6.space-y-5.text-lg.leading-8.text-zinc-700` block at `BioSection.tsx` lines 54–67 MUST be replaced with exactly four `<p>` tags matching the approved copy in TechSpec 'Core Interfaces' §BioSection.
2. The div's class names (`mt-6 space-y-5 text-lg leading-8 text-zinc-700`) MUST remain unchanged.
3. No other elements in `BioSection.tsx` (section heading, subtitle, Instagram link, image) MUST be modified.
4. The paragraph text MUST be verbatim:
   - P1: `Tenho 32 anos, sou nordestina, de Fortaleza – Ceará, e hoje moro em Portugal há 4 anos, ao lado do meu marido.`
   - P2: `Sou formada em Administração, Educadora Financeira e Mentora de mulheres pelo mundo.`
   - P3: `A educação financeira transformou a minha vida, e hoje ensino mulheres a conquistarem uma vida melhor através dela.`
   - P4: `Já ajudei dezenas de mulheres a organizarem suas finanças, saírem do sufoco e realizarem seus sonhos com mais liberdade e segurança.`
5. The build MUST produce zero TypeScript or ESLint errors after the change.
</requirements>

## Subtasks

- [x] Read `BioSection.tsx` lines 54–67 to confirm the current paragraph block location
- [x] Replace the two existing `<p>` tags with the four approved first-person paragraphs
- [x] Verify the wrapping div's class names are unchanged
- [x] Verify the heading, subtitle, and Instagram link above and below the paragraph block are unchanged
- [x] Run lint to confirm zero errors

## Implementation Details

Target block in `app/components/landing/BioSection.tsx` (currently lines 54–67):

```tsx
// Replace from:
<div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700">
  <p>
    Nordestina de Fortaleza e morando em Portugal há mais de 4 anos,
    Rafaela tem 32 anos e uma missão clara: transformar a vida
    financeira de mulheres pelo mundo.
  </p>
  <p>
    Formada em Administração e especialista em Finanças Pessoais,
    ajuda mulheres a conquistarem independência, segurança e liberdade
    através da organização. Com sua metodologia prática e acolhedora,
    já ajudou dezenas de mulheres no Brasil e na Europa a saírem do
    sufoco e darem os primeiros passos rumo à reserva financeira.
  </p>
</div>

// Replace to:
<div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700">
  <p>Tenho 32 anos, sou nordestina, de Fortaleza – Ceará, e hoje moro em Portugal há 4 anos, ao lado do meu marido.</p>
  <p>Sou formada em Administração, Educadora Financeira e Mentora de mulheres pelo mundo.</p>
  <p>A educação financeira transformou a minha vida, e hoje ensino mulheres a conquistarem uma vida melhor através dela.</p>
  <p>Já ajudei dezenas de mulheres a organizarem suas finanças, saírem do sufoco e realizarem seus sonhos com mais liberdade e segurança.</p>
</div>
```

See TechSpec 'Core Interfaces' §BioSection for the canonical approved copy. Voice switch rationale: see TechSpec 'Key Decisions' §Bio voice switch.

### Relevant Files

- `app/components/landing/BioSection.tsx` — only file modified; lines 54–67

### Dependent Files

- `e2e/second-fixes.pw.ts` — existing tests target the bio section (confirm they still pass after paragraph count changes from 2 to 4)
- `e2e/` (task_05) — will add assertion for "Tenho 32 anos, sou nordestina" text presence

### Related ADRs

- [ADR-001: Targeted Bug-Fix Batch Scope](adrs/adr-001.md) — bio update is in scope; no other bio section changes are authorized

## Deliverables

- `app/components/landing/BioSection.tsx` with four first-person `<p>` tags matching approved copy verbatim
- Zero lint or type errors

## Tests

### Unit Tests

No unit tests — this is a static JSX string replacement with no logic branches.

### Integration Tests

- Verify first paragraph text with grep: `grep "Tenho 32 anos" app/components/landing/BioSection.tsx` returns a match
- Verify third-person copy is absent: `grep "Nordestina de Fortaleza e morando" app/components/landing/BioSection.tsx` returns empty
- Confirm paragraph count: the `div.mt-6.space-y-5` block contains exactly 4 `<p>` tags
- E2E assertion (task_05): `page.getByText("Tenho 32 anos, sou nordestina")` is visible
- Existing `e2e/second-fixes.pw.ts` bio-section tests continue to pass

## Success Criteria

- Bio contains exactly four first-person paragraphs
- P1 starts with "Tenho 32 anos, sou nordestina, de Fortaleza – Ceará"
- Old third-person text ("Nordestina de Fortaleza e morando") is absent
- All existing Playwright tests continue to pass
