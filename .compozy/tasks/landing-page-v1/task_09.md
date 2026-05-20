---
status: completed
title: Playwright Test Suite
type: test
complexity: high
dependencies:
  - task_06
  - task_07
  - task_08
---

# Task 09: Playwright Test Suite

## Overview
Writes and runs the full Playwright test suite defined in the TechSpec's Testing Approach section: navigation/content checks, multi-viewport responsiveness, accessibility audit, post-event state mock, and waitlist form submission. All tests must pass before the Lighthouse tuning task (task_10) begins.

<critical>
- ALWAYS READ the PRD and TechSpec before starting
- REFERENCE TECHSPEC for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — every task MUST include tests in deliverables
</critical>

<requirements>
- Tests MUST run via the `playwright-cli` skill against `http://localhost:3000`
- Navigation/content tests MUST verify: page loads without JS errors, `<h1>` is present and non-empty, Kiwify CTA is visible with correct `href` and `target="_blank"`, FAQ first item opens on click
- Responsiveness tests MUST cover viewports 375×812 (iPhone 14), 768×1024 (tablet), and 1280×800 (desktop); assert no horizontal scrollbar and CTA button height ≥ 48px at 375px
- Accessibility test MUST run `axe-playwright` or Lighthouse and assert accessibility score ≥ 90; additionally assert all `<img>` elements have non-empty `alt` attributes
- Post-event state test MUST mock `Date.now()` to a timestamp after `EVENT_UTC` and assert Kiwify button is not visible and waitlist form input is visible
- Waitlist form test MUST fill `teste@email.com`, submit, and assert a success message appears
- All tests MUST be organized in a single spec file or logically grouped spec files under a `.playwright/` or `tests/` directory consistent with the project's existing Playwright config
</requirements>

## Subtasks
- [x] 9.1 Check the existing `.playwright/` config and create or update the spec file location
- [x] 9.2 Write navigation/content tests: page load, `<h1>`, Kiwify CTA href/target, FAQ accordion open
- [x] 9.3 Write responsiveness tests for all three viewports including CTA touch-target height assertion
- [x] 9.4 Write accessibility test: `axe-playwright` scan asserting score ≥ 90 and all `<img>` `alt` attributes non-empty
- [x] 9.5 Write post-event state test: mock `Date.now()` past `EVENT_UTC`, assert CTA hidden and waitlist input visible
- [x] 9.6 Write waitlist form test: fill, submit, assert success message
- [x] 9.7 Run the full suite via `playwright-cli` skill; fix any failures

## Implementation Details
See TechSpec "Testing Approach — Playwright Tests" for the exact list of assertions required. The project already has a `.playwright/` directory — check its contents for an existing config before creating a new one. The post-event state mock requires overriding `Date.now()` in the browser context (`page.addInitScript`); `EVENT_UTC` is `2026-06-28T13:00:00.000Z`. The `playwright-cli` skill handles running Playwright — invoke it once tests are written.

### Relevant Files
- `.playwright/` — existing Playwright config directory; check for `playwright.config.ts` and existing tests
- `app/components/landing/CTABlock.tsx` — primary target for post-event state mock test
- `app/components/landing/WaitlistForm.tsx` — target for waitlist form test
- `app/components/landing/FaqAccordion.tsx` — target for accordion open test
- `app/lib/constants.ts` — `KIWIFY_URL` and `EVENT_UTC` values to assert against

### Dependent Files
- All landing page component files — the tests exercise the full rendered page; changes to components may require test updates

### Related ADRs
- [ADR-002: Client-Side Countdown Timer](../adrs/adr-002.md) — informs how to mock `Date.now()` for the post-event test
- [ADR-005: Native `<details>/<summary>` for FAQ Accordion](../adrs/adr-005.md) — informs the FAQ accordion test approach (click `<summary>`, assert `open` attribute)

## Deliverables
- Playwright spec file(s) covering all 5 test categories
- All tests passing with `npx playwright test` (via `playwright-cli` skill)
- Test run output confirming zero failures **(REQUIRED)**

## Tests
- Unit tests: N/A (Playwright tests are the deliverable)
- Integration tests:
  - [x] Page loads at `http://localhost:3000` without JS console errors
  - [x] `<h1>` is present and non-empty
  - [x] Kiwify CTA `<a>` href equals `https://pay.kiwify.com.br/3qkvzij`
  - [x] Kiwify CTA `<a>` has `target="_blank"`
  - [x] Clicking first FAQ `<summary>` causes its parent `<details>` to gain the `open` attribute
  - [x] Viewport 375×812: no horizontal scrollbar; CTA button height ≥ 48px
  - [x] Viewport 768×1024: no horizontal scrollbar
  - [x] Viewport 1280×800: no horizontal scrollbar
  - [x] `axe-playwright` accessibility audit passes (or Lighthouse accessibility ≥ 90)
  - [x] All `<img>` elements have non-empty `alt` attributes
  - [x] With `Date.now()` mocked past `EVENT_UTC`: Kiwify button not in DOM; waitlist input visible
  - [x] Waitlist form: fill `teste@email.com`, submit, success message appears
- Test coverage target: >=80%
- All tests must pass

## Success Criteria
- All tests passing
- Test coverage >=80%
- Zero Playwright test failures across all 5 test categories
- Accessibility score ≥ 90 (axe or Lighthouse)
- Post-event state test confirms the client-side `isExpired` switch works correctly
