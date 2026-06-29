# Task Memory: task_02.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
Update high-visibility landing copy in HeroSection, PriceBlock, FinalCTA, and FaqAccordion to remove live-seat wording and align with recording purchase path (post-event mode). Keep R$ 47, guarantee, and page structure intact.

## Important Decisions
- HeroSection eyebrow: "Workshop online e ao vivo" → "Workshop online e prático" (works for both pre/post-event)
- PriceBlock eyebrow: "Inscrição para o workshop" → "Workshop ORGANIZE-$E" (removes registration framing)
- PriceBlock body: "orientação ao vivo" → "conteúdo prático" (avoids implying live-only orientation)
- PriceBlock payment text left unchanged ("inscrição" is generic enough in context)
- FinalCTA: "Garanta sua vaga" → "Garanta seu acesso" (removes seat/spot wording)
- FaqAccordion FAQ 1: "evento" → "workshop" (neutral term)
- FaqAccordion FAQ 3: "ficará disponível" → "está disponível" (present tense)
- FaqAccordion FAQ 4: past tense + added recording availability mention
- Deliverables.tsx and layout.tsx left unchanged (out of MVP scope per ADR-002)

## Learnings
- Components that render CTABlock (HeroSection, PriceBlock, FinalCTA) inherit post-event copy like "Garanta seu acesso agora" and "gravação está disponível" — test selectors with generics like `/gravação/i` match multiple elements, requiring more specific regex or `getAllByText` assertions
- 60 unit tests pass; lint is clean

## Files / Surfaces
- app/components/landing/HeroSection.tsx (eyebrow text)
- app/components/landing/PriceBlock.tsx (eyebrow + body text)
- app/components/landing/FinalCTA.tsx (paragraph text)
- app/components/landing/FaqAccordion.tsx (FAQ 1, 3, 4 answers)
- __tests__/landing-components.test.tsx (new copy assertions)
- e2e/landing-page-v1.pw.ts (new post-event eyebrow test)

## Errors / Corrections
- Initial test assertions failed because `getByText(/gravação/i)` matched both PriceBlock copy and CTABlock post-event copy. Fixed with more specific regex `/gravação por 6 meses/i` and `getAllByText(/gravação está disponível/i).toHaveLength(2)`
- FinalCTA test assertion `/Garanta seu acesso/i` matched both FinalCTA copy and CTABlock "Garanta seu acesso agora". Fixed with `/Garanta seu acesso ao Workshop/i`
- Playwright tests cannot run locally — Chromium binary not installed (pre-existing environment issue)

## Ready for Next Run
