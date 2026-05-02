# dovetell — Product Seed
Last updated: May 1, 2026

Use this file to give an AI assistant full context on dovetell before
starting a work session. Paste the full contents as your first message.
This file contains product context only — no personal or confidential information.

---

## What dovetell is

dovetell is a context orchestration layer for AI-assisted software teams.

North star: **"I want to be asked fewer questions."**

Not a documentation tool. Not a PM tool. Not an LLM wrapper.
The governing layer that captures decisions, aligns intent, and keeps
everyone from asking the same questions twice.

Three failure modes dovetell solves:
1. **Tribal knowledge failure** — domain context lives in one person's head
2. **Documentation drift** — governing docs go stale the moment work begins
3. **Bi-directional blindness** — code evolves without informing docs; docs change without reaching developers

Tagline: *"Tell it once. Let it travel."*

---

## Positioning

dovetell is a **Phase 2 → Phase 3 bridge** in the agent development stack:
- Phase 1 (weights): bigger models, more data
- Phase 2 (context): prompt engineering, RAG — dovetell starts here
- Phase 3 (harness): what environment should the model operate in — dovetell ends here

One-liner: *"Cursor handles the runtime. dovetell handles what the runtime needs to know about your team."*

Supporting frameworks:
- LangChain (2026): "If you're not the model, you're the harness"
- Foundation Capital (2025): context graphs as decision trace stores
- AI Daily Brief (2026): Harness-as-a-Service — domain context is the gap HaaS doesn't fill
- HBR (2026): PM is the bridger; dovetell makes bridging structural

---

## Product phases

### Phase 1 — now
- Team AI Maturity Assessment (live at dovetell.io/team-assessment)
- Prompt library (Gumroad — in progress)
- Free checklist, $49 Starter Kit, $99 Pro Kit, $299 Setup Review

### Phase 2 — next
SaaS platform: context base, unvetted queue, MCP integration, drift score

### Phase 3 — future
Queryable decision traces at scale. Context graph. dovetell as MCP server
embedded in every AI-assisted workflow.

---

## The Team AI Maturity Model

Four levels, scored 0–90 across six capability areas:

| Level | Score | State |
|---|---|---|
| Scattered | 0–22 | Ad hoc AI use, no shared context |
| Structured | 23–54 | Some repeatable practices, inconsistent |
| Coordinated | 55–72 | Aligned practices, shared context |
| Compounding | 73–90 | Systematic advantage, continuous lift |

Six capability areas (5 questions each, 0–3 points per question):
1. Shared Context
2. Prompt Reuse
3. Team Handoffs
4. Knowledge Capture
5. Review & Governance
6. Workflow Integration

---

## Site structure

```
dovetell.io/                    → homepage + waitlist
dovetell.io/framework           → framework diagram (team reference)
dovetell.io/team-assessment     → takes the assessment
dovetell.io/assessments         → returning user dashboard
dovetell.io/recommendations     → personalized offer page
dovetell.io/privacy             → privacy policy
docs.dovetell.io                → documentation (planned)
```

Hosted on GitHub Pages (dovetell-io/dovetell). All static HTML/JS.

---

## ID architecture

Four IDs track every assessment interaction:

| ID | Name | Scope | Generation |
|---|---|---|---|
| uid | userId | Per browser | Once, stored in localStorage |
| pid | projectId | Per project | Once, travels in URL |
| aid | assessmentId | Per run | Fresh every submission |
| vid | versionId | Per question set | Hardcoded (v01) |

Hierarchy: `email → uid → pid → aid`

URL format: `dovetell.io/assessments/?pid=8f3c2a1b`
Retake URL: `dovetell.io/team-assessment/?pid=8f3c2a1b&retake=1`

---

## Tech stack

| Layer | Tool | Notes |
|---|---|---|
| Hosting | GitHub Pages | dovetell-io/dovetell, free |
| Domain | Porkbun | dovetell.io |
| Forms | Formspree | Assessment xrejbpbv · Waitlist xaqvneqn |
| Analytics | Plausible | Privacy-first, dovetell.io domain |
| Products | Gumroad | ~10% + $0.50 per sale |
| Design | Figma | Logo vectorization pending |

Future backend: Supabase + Resend + Railway (when UUID persistence needed)

---

## Brand

- Name: always lowercase — dovetell
- Colors: blurple #5865F2 · near-black #1A1A2E · blurple-light #D8DAFD
- Fonts: Plus Jakarta Sans · JetBrains Mono
- Logo: white dove silhouette, two blurple broadcast arcs at wing-body junction
- Voice: pragmatic, grounded, direct — no jargon

---

## Data source

`dovetell-data.json` is the single source of truth for all assessment
content — questions, scoring thresholds, offer tiers, privacy language,
demographic options. Do not hardcode these values in HTML or JS.

---

## Working conventions

- All business accounts under dovetellio@gmail.com
- Boeing / employer never referenced in public-facing artifacts
- Fictional reference company for demos: Datagate Systems (Ops Analytics)
- No personal, confidential, or proprietary content in public repo
- Context folder (dovetell-io/dovetell/.dovetell-context/) is dovetell running on itself
- Personal context lives in jchromchak/dovetell/personal/ (private repo)

---

## The @dovetell vision

When the MCP server exists, a developer in Cursor or Claude Code types:

```
@dovetell what's our defect rate threshold?
```

dovetell queries the context base and returns the team's vetted answer —
sourced, with decision trace, linked to docs.dovetell.io. The answer
comes from `definitions.md` or `decisions.md`, confirmed by a human,
queryable at build time. "I want to be asked fewer questions" made literal.

---

## Claude Code closed loop

When working in Claude Code on `dovetell-io/dovetell`, files in
`.dovetell-context/` are picked up as project context automatically.
Every session starts informed — no re-explaining the ID architecture,
why reCAPTCHA is disabled, what Datagate Systems is, what a pid is.

When Phase 2 platform exists, it ingests `.dovetell-context/` as its
own context base. The loop closes:

**build the thing → use the thing to build the thing → the thing documents itself**
