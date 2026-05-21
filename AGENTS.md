<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## HIGH PRIORITY

- **IF YOU DON'T CHECK SKILLS** your task will be invalidated and we will generate rework
- Any ESLint error is not allowed and **MUST ALWAYS BE FIXED**
- **NEVER** use web search tools to search local project code — for local code, use Grep/Glob instead
- **DO NOT EDIT DEPENDENCY VERSIONS BY HAND IN LOCKFILES**. Change dependencies through Bun and let `package.json`/`bun.lock` update together

## Project Skills

| name | when to use |
| --- | --- |
| `clean-code` | When you need to refactor working code to make it more readable, cohesive, and maintainable. |
| `copywriting` | When writing or improving marketing copy for pages, headlines, CTAs, or positioning. |
| `cro` | When analyzing or optimizing conversion on landing pages, forms, and marketing pages. |
| `docx` | When the task involves creating, reading, editing, or reviewing `.docx` files. |
| `frontend-design` | When you need to build or improve the visual quality of interfaces, pages, or web components. |
| `git-commit` | When the user asks to create a commit with a conventional message and intentional staging. |
| `playwright-cli` | When you need to automate the browser, validate UI flows, or work with Playwright tests. |
| `programmatic-seo` | When creating SEO pages at scale using templates and keyword or location variations. |
| `tailwind-design-system` | When you need to structure design systems, tokens, and reusable components with Tailwind CSS v4. |
| `vercel-react-best-practices` | When writing, reviewing, or refactoring React/Next.js code with a focus on performance and best practices. |

## CRITICAL: Git operations

- **ABSOLUTELY FORBIDDEN**: **NEVER** run `git restore`, `git checkout`, `git reset`, `git clean`, `git rm`, or any other git commands that modify or discard working directory changes **WITHOUT EXPLICIT USER PERMISSION**
- **DATA LOSS RISK**: These commands can **PERMANENTLY LOSE CODE CHANGES** and cannot be easily recovered
- **REQUIRED ACTION**: If you need to revert or discard changes, **YOU MUST ASK THE USER FIRST**
- If the worktree contains unexpected edits, read them and work around them; do not revert them
- The commit message **MUST ONLY BE RELATED TO THE CHANGES**, not to the prompt
- **NEVER** commit prompt.md
- **ALWAYS** include a body in commit message to summarize the changes. Use the template below **IMPORTANT**:

```txt
<type>[optional scope]: <description>

Summary:
- Changes 1
- Changes 2
- ...
- Changes N
```

## Code Search and Discovery

- **TOOL HIERARCHY**: Use tools in this order:
  1. **Grep** / **Glob** — preferred for local project code
  2. **`find-docs` skill** — for external Go libraries and framework documentation
  3. **Web search tools** — for web research, latest news, code examples
- **FORBIDDEN**: Never use web search tools for local project code
