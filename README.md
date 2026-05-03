# dovetell

**Context orchestration for AI-assisted software teams.**

> Tell it once. Let it travel.

dovetell is the governing layer that captures decisions, aligns intent,
and keeps everyone from asking the same questions twice.

---

## What this repo is

This is the public product site for dovetell — hosted on GitHub Pages
at [dovetell.io](https://dovetell.io).

It is also dovetell running on itself. The `.dovetell-context/` folder
contains the context files that govern how this product is built.

---

## Site structure

| Path | Description |
|------|-------------|
| `index.html` | Homepage |
| `framework/` | The dovetell framework diagram |
| `why/` | "Why not just X?" positioning page |
| `team-assessment/` | Team AI Maturity Assessment |
| `assessments/` | Returning user dashboard |
| `recommendations/` | Personalized offer page |
| `privacy/` | Privacy policy |
| `app-demo/` | Vision demo screens (not live product) |
| `assets/` | Brand assets — logo, favicon, OG image |

---

## Context files (`.dovetell-context/`)

These files are the source of truth for how dovetell is built,
positioned, and governed. They are picked up automatically by
Claude Code when working in this repo.

| File | Purpose |
|------|---------|
| `dovetell-seed.md` | Full product context — paste at start of any AI session |
| `brand.md` | Colors, typography, assets, voice, demo personas |
| `personas.md` | Fictional demo characters and canonical context data |
| `roles.md` | Product role model and permission matrix |
| `approval-workflow.md` | Workflow positioning and competitive analysis |
| `actions-layer-spec.md` | Git-native task layer design spec |
| `ai-independence-positioning.md` | AI-optional architecture and positioning |
| `decisions.md` | All product and architecture decisions with rationale |

---

## ID and naming conventions

**GUIDs:** All context items use 8-character nanoid prefixed identifiers.

| Type | Format | Example |
|------|--------|---------|
| Task | `task-[8char]` | `task-a1b2c3d4` |
| Decision | `decision-[8char]` | `decision-d9e4f1b7` |
| Session | `[8char]` hash | `2a2d3774` |

**Session hashes:** Each Claude work session gets an 8-character hash
derived from sha256(session-description). The hash is embedded in the
chat title `(2a2d3774)` and used as the `source:` field on any tasks
or decisions generated in that session. Allows tracing any artifact
back to its originating conversation.

**File naming:** kebab-case throughout.
- Platform-required exact names: `favicon.png`, `apple-touch-icon.png`, `og.png`
- dovetell assets: `dovetell-[descriptor].ext`
- Demo assets: `demo-[descriptor].ext` in `app-demo/assets/`
- Version suffixes (`-v2`) on prompts and drafts only — never on production files

---

## Task queue

Operational tasks are tracked in a separate repo to maintain an air gap
from the product codebase.

| Item | Location |
|------|----------|
| Task queue | `dovetell-io/sandbox/tasks.md` |
| Task UI | `jchromchak/tasks` (GitHub Pages, private token) |

tasks.md uses a flat append log schema — newest tasks at the bottom,
UI handles grouping by priority. Each task carries an ID, priority,
owner, source (session hash), and optional decision reference.

---

## Key architectural principle

**dovetell is a renderer, not an owner.**

Context lives in `.dovetell-context/` in this repo. dovetell reads,
renders, and writes back to these files. No content is stored in
dovetell's database. The team owns the data. Always.

---

## Demo and vision

The `app-demo/` folder contains vision demos of the Phase 2 platform.
These are static HTML mockups — not live product.

All demo content uses fictional Datagate Systems personas. See
`.dovetell-context/personas.md` for the canonical demo dataset.

---

## License

Site content: [CC0-1.0](LICENSE)

---

*dovetell · dovetell.io · May 2026*
