# Workflow Memory

Keep only durable, cross-task context here. Do not duplicate facts that are obvious from the repository, PRD documents, or git history.

## Current State

## Shared Decisions

## Shared Learnings
- On local case-insensitive filesystems, `stat` can resolve `public/images/sobre-rafa.JPG` to the lowercase `sobre-rafa.jpg`; use exact directory-entry checks when future tasks need to prove an uppercase asset variant was not created.

## Open Risks

## Handoffs
- task_04 resolved the BioSection Lucide key-warning risk by replacing the Instagram icon with the inline SVG gradient; task_08 can assert `linearGradient#ig-gradient`, zero BioSection blockquotes, and `sobre-rafa` image src.
- task_07 exposes stable carousel hooks for task_08: `data-testid="testimonials-carousel"` with `data-selected-index`, `testimonial-slide`, `testimonials-prev`, and `testimonials-next`.
