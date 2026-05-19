---
status: pending
title: Metadata & SEO
type: chore
complexity: low
dependencies:
  - task_06
---

# Task 08: Metadata & SEO

## Overview
Updates `app/layout.tsx` with the workshop-specific title, description, and Open Graph tags so the page shares correctly from Instagram and WhatsApp links. This is an additive change to the root layout with no risk of breaking existing functionality.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- The `<title>` tag MUST reflect the workshop name in Portuguese (sourced from `content.docx` or PRD)
- The `<meta name="description">` MUST be a concise Portuguese description under 160 characters
- Open Graph `og:title`, `og:description`, and `og:type` (`website`) tags MUST be set
- `og:image` SHOULD reference one of the hero images (e.g., `/images/hero1.png`) — confirm the image path matches `public/images/` from task_01
- The existing Geist font configuration and `dark` class setup in `layout.tsx` MUST NOT be removed
- All metadata changes MUST use Next.js `Metadata` object export — no raw `<head>` manipulation
</requirements>

## Subtasks
- [ ] 8.1 Update the `metadata` export in `app/layout.tsx` with `title`, `description`, `openGraph` fields
- [ ] 8.2 Set `og:image` to point to the hero image path in `public/images/`
- [ ] 8.3 Verify `<title>` and `<meta description>` render in the SSR output

## Implementation Details
See TechSpec "Impact Analysis" row for `app/layout.tsx` ("Update metadata (title, description, OG tags for the workshop)"). Use the Next.js `Metadata` type for type safety. Workshop title and description copy should come from `content.docx` or PRD Overview section. The OG image path must match the asset placed by task_01 (`/images/hero1.png`).

### Relevant Files
- `app/layout.tsx` — the only file modified in this task
- `public/images/hero1.png` — OG image source (placed by task_01)

### Dependent Files
- `app/layout.tsx` — consumed by all routes (only one route exists: `app/page.tsx`)

### Related ADRs
None — metadata configuration is a standard Next.js pattern with no architectural decision required.

## Deliverables
- Updated `app/layout.tsx` with workshop metadata
- Unit test verifying metadata fields are present **(REQUIRED)**

## Tests
- Unit tests:
  - [ ] `app/layout.tsx` exports a `metadata` object with a non-empty `title` string
  - [ ] `metadata.description` is present and under 160 characters
  - [ ] `metadata.openGraph.title` matches `metadata.title`
  - [ ] `metadata.openGraph.images` contains at least one entry referencing a path starting with `/images/`
- Integration tests:
  - [ ] `curl http://localhost:3000` (or Playwright page source) contains `<title>` tag with workshop name (not "Create Next App")
  - [ ] Page source contains `<meta property="og:title"` tag
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Page `<title>` is the workshop name, not the default Next.js placeholder
- `og:image` resolves to a valid image URL on the deployed domain
- No font or layout changes introduced
