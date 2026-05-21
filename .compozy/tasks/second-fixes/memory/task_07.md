# Task Memory: task_07.md

Keep only task-local execution context here. Do not duplicate facts that are obvious from the repository, task file, PRD documents, or git history.

## Objective Snapshot
- Rewrite `app/components/landing/Testimonials.tsx` in place from static grid to Embla carousel while preserving the exported `Testimonials` name, `"use client"`, and `testimonials` array shape.
- Implementation and validation are complete; tracking/commit remain the final closeout steps.

## Important Decisions
- Use the default `embla-carousel-react` hook import named `useEmblaCarousel`, matching the installed package exports and task wording.
- Keep `page.tsx` untouched per ADR-004.
- Expose `data-testid` and `data-selected-index` on the carousel surface to make task_08 E2E assertions stable without parsing Embla transforms.
- Use one centered testimonial per Embla snap at every viewport; showing all four at desktop would remove overflow and prevent meaningful auto-advance.

## Learnings
- Baseline before implementation: `Testimonials.tsx` still imports `useInView`, uses `useRef`, and renders a static responsive grid.
- Context7 resolved Embla docs to `/davidjerleke/embla-carousel`; current docs confirm attaching the hook ref to the viewport and using an Embla container/slide structure.
- Browser verification at `127.0.0.1:3000` showed desktop click `0 -> 1`, auto-advance `1 -> 2` after the 10s interval, mobile swipe `0 -> 1`, arrows visible only on desktop, and no horizontal overflow.

## Files / Surfaces
- `app/components/landing/Testimonials.tsx`
- `__tests__/landing-component-sources.test.ts`
- `__tests__/landing-components.test.tsx`
- `.compozy/tasks/second-fixes/task_07.md`
- `.compozy/tasks/second-fixes/_tasks.md`

## Errors / Corrections
- Initial verification showed the source constraints still required `Testimonials.tsx` to use `useInView`; updated that test to the new Embla contract.
- Vitest/jsdom lacked `window.matchMedia`, which Embla reads during mount; added a local mock in the landing component render tests.

## Ready for Next Run
- Task_08 can write F7 assertions against `data-testid="testimonials-carousel"` and compare its `data-selected-index` before/after click, wait, or swipe.
