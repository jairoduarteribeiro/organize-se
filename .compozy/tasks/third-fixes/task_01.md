---
status: pending
title: Promote brand favicon and delete fotos/ directory
type: chore
complexity: low
dependencies: []
---

# Promote brand favicon and delete fotos/ directory

## Overview

Copies the brand `favicon.ico` from `fotos/favicon.ico` (4 286 bytes) to `app/favicon.ico`, replacing the default Next.js icon. Once the favicon is in place, the `fotos/` root directory is deleted entirely to remove the working-files backup from the repository. The step order is mandatory and irreversible: promote first, delete second.

<critical>
- Read the PRD and TechSpec before starting
- Reference TechSpec 'Development Sequencing' for the required step order
- Focus on WHAT the task specifies, not on adjacent cleanup
- Keep the change minimal — no other files in `public/` or `app/` are touched
- Tests are required: the E2E assertion for favicon presence is written in task_05, but verify locally that `app/favicon.ico` is the brand icon before closing this task
</critical>

<requirements>
1. `app/favicon.ico` MUST be overwritten with the contents of `fotos/favicon.ico` (the 4 286-byte brand icon) before the `fotos/` directory is deleted.
2. `fotos/` MUST be fully removed from the working tree so it does not appear in `git status`.
3. No other files in `app/`, `public/`, or anywhere else MUST be modified by this task.
4. The favicon binary MUST survive the deletion of `fotos/` at `app/favicon.ico`.
5. No build step or import in the codebase SHOULD reference `fotos/` — confirm with a grep before deleting.
</requirements>

## Subtasks

- [ ] Grep the codebase for any import or reference to `fotos/` to confirm no build step depends on it
- [ ] Copy `fotos/favicon.ico` to `app/favicon.ico` (overwrite the existing default)
- [ ] Verify `app/favicon.ico` file size is ~4 286 bytes (brand icon, not the 25 KB default)
- [ ] Delete the `fotos/` directory and all its contents
- [ ] Confirm `fotos/` no longer appears in `git status` or `ls` output

## Implementation Details

Steps must be applied in this exact order (see TechSpec 'Development Sequencing' §Build Order):

1. `cp fotos/favicon.ico app/favicon.ico`
2. `rm -rf fotos/`

Next.js App Router automatically serves `app/favicon.ico` and injects the corresponding `<link rel="icon">` into `<head>` — no changes to `app/layout.tsx` metadata are required for favicon support.

### Relevant Files

- `fotos/favicon.ico` — source brand favicon (4 286 bytes); read before writing
- `app/favicon.ico` — destination; current file is the 25 KB Next.js default
- `fotos/` — entire directory to be deleted after favicon is promoted

### Dependent Files

- `app/layout.tsx` — not modified here, but Next.js reads `app/favicon.ico` at build time; replacing the binary affects what this layout emits
- `e2e/` (task_05) — the E2E test will assert `<link rel="icon">` in `<head>`, which is enabled by this task

### Related ADRs

- [ADR-001: Targeted Bug-Fix Batch Scope](adrs/adr-001.md) — deletion of `fotos/` is explicitly in scope; unused `public/images/` assets are out of scope

## Deliverables

- `app/favicon.ico` replaced with the 4 286-byte brand icon
- `fotos/` directory absent from the repository
- No other files changed

## Tests

### Unit Tests

No unit tests — this is a binary file replacement and directory deletion with no logic branches.

### Integration Tests

- Verify `app/favicon.ico` has the correct file size (~4 286 bytes) with `wc -c app/favicon.ico`
- Verify `fotos/` is absent: `ls fotos/ 2>&1` should return "No such file or directory"
- Verify no build-time reference to `fotos/` remains: `grep -r "fotos/" . --include="*.ts" --include="*.tsx" --include="*.js"` should return empty
- E2E assertion (task_05): `<link rel="icon">` present in `<head>` on a full page load

## Success Criteria

- `app/favicon.ico` is the brand icon (≈4 286 bytes)
- `fotos/` does not appear in `git status`
- `grep -r "fotos/"` finds no source file references
- All existing Playwright tests continue to pass
