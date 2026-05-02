# docs.dovetell.io — Architecture Plan
Last updated: May 1, 2026
Status: Planned — not yet built

---

## The idea

The context files you're writing right now ARE the documentation.
The difference between a context file and a docs page is formatting
and audience. docs.dovetell.io surfaces the context folder as a
public-facing documentation site.

The dog food loop closes completely:
- dovetell captures context → context becomes docs → docs are ingested
  by the dovetell platform as its own context base → platform uses
  dovetell to maintain its own docs

---

## URL structure

```
docs.dovetell.io/                     → overview / getting started
docs.dovetell.io/framework/           → the three pillars (Capture, Align, Tell)
docs.dovetell.io/assessment/          → how the maturity assessment works
docs.dovetell.io/maturity-model/      → the four levels explained
docs.dovetell.io/prompts/             → prompt library reference
docs.dovetell.io/architecture/        → technical architecture (ID system, data flow)
docs.dovetell.io/platform/            → Phase 2 platform (context console, queue, MCP)
docs.dovetell.io/decisions/           → public decisions log
docs.dovetell.io/changelog/           → what changed and when
```

---

## Source → docs mapping

| Context file | Docs page |
|---|---|
| .dovetell-context/dovetell-seed.md | docs/ overview |
| .dovetell-context/definitions.md | docs/ reference / glossary |
| .dovetell-context/decisions.md | docs/decisions/ |
| .dovetell-context/technical-source-of-truth.md | docs/architecture/ |
| dovetell-data.json | docs/assessment/ (questions, scoring) |
| ADR-001-id-architecture.md | docs/architecture/ids |
| ADR-002-scoring-model.md | docs/assessment/scoring |

The docs site is largely generated from the context folder.
Writing context = writing docs. One motion, two outputs.

---

## Hosting options

**Option A — /docs/ folder in existing repo (easiest)**
Add a `/docs/` folder to dovetell-io/dovetell.
GitHub Pages serves it at dovetell.io/docs.
Set up a CNAME for docs.dovetell.io pointing to the same repo.
No new infrastructure.

**Option B — Separate repo (cleanest)**
Create dovetell-io/docs.
GitHub Pages serves it at docs.dovetell.io.
Content is markdown files, converted to HTML.
Allows different contributors without touching the main product repo.

**Option C — Static site generator (most powerful)**
Use Astro, Docusaurus, or VitePress.
Reads markdown from /.dovetell-context/ folder, generates a proper docs site.
Search, versioning, navigation all built in.
More setup but the right long-term answer.

**Recommendation:** Option A now (zero work, just a subdomain CNAME).
Option C when the product has customers who need real docs.

---

## Minimum viable docs (v0.1)

Three pages to start. Everything else follows.

**1. What is dovetell?**
- The three failure modes
- The three pillars (Capture, Align, Tell)
- Where dovetell fits in the agent harness
- Source: dovetell-seed.md

**2. The maturity model**
- Four levels with descriptions and ranges
- Six capability areas
- How to read your score
- Source: dovetell-data.json scoring section

**3. How the assessment works**
- The flow (take → gate → results → recommendations)
- What data is collected and why
- Your unique link and how tracking works
- Privacy
- Source: technical-source-of-truth.md section 6

---

## When to build it

Not now. The right trigger is the first person who asks
"where can I read more about how this works?" after completing
the assessment. That question means the product is resonating
enough that people want to go deeper.

Until then, the context folder serves the purpose for internal use.

---

## The meta point

When docs.dovetell.io exists and is maintained through the context
folder, dovetell can point its own platform at docs.dovetell.io
and use it as the context base for answering questions about itself.

A developer building on dovetell asks @dovetell "what's a pid?" and
gets the answer from definitions.md, vetted, with a link to the docs.

That's the full loop. Context → docs → product → context.