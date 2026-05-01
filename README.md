# dovetell

> A context orchestration framework for fast-moving teams building with AI.

**Tell it once. Let it travel.**

---

## The Problem

Every team has a version of this.

A developer asks the same domain question three sprints in a row. A data scientist builds the right answer to the wrong question because nobody told them what the metric actually means. A new team member spends their first two weeks reconstructing context that already existed — in someone's head.

The work moves faster than the record of it.

And every sprint, someone pays for it.

---

## The Framework

dovetell is a three-layer system for keeping what your team knows, what they're building, and what governs them — in sync.

### Layer 1 — Your Working Context
Each team member works from a personal prompt set loaded into their AI tool of choice — Cursor, Claude Code, ChatGPT. These prompts shape how the tool understands the project: the domain language, the constraints, the standards being worked toward.

### Layer 2 — The Team Prompt Repo
A shared, version-controlled repo that everyone pulls from and contributes back to. Domain glossary. Decision logs. Governing doc references. When someone figures something out, it goes in the repo. The whole team gets the benefit — not just the person who figured it out.

This is the heart of the framework.

### Layer 3 — Governing Documentation. 
The business processes, specs, and standards the team
is supposed to be building toward. In most teams these
exist but don't travel. The dovetell framework connects
them to the day-to-day — so when work drifts from what
the docs say, it surfaces during the sprint, not after.

### The Loop

Governing Docs (Layer 3)
↓  referenced by
Team Prompt Repo (Layer 2)
↓  pulled down to
Personal Prompt Instance (Layer 1)
↓  influences
The Work
↑  feeds back into
Team Prompt Repo (Layer 2)

Each sprint the loop tightens. Context that used to livein one person's head starts living in the repo instead. The same questions stop getting asked.

---

## The Three Pillars

**Capture** — get it out of your head before it disappears

**Align** — keep what's being built in sync with what
governs it

**Tell** — make knowledge available without being asked for it

---

## What's in This Repo

```
dovetell/
├── prompts/
│   ├── pm/                 ← Product Manager prompts
│   ├── developer/          ← Developer prompts
│   ├── data-scientist/     ← Data Scientist prompts
│   └── governance/         ← Cross-team prompts
├── decisions/              ← ADRs (how we run dovetell
│                             on dovetell)
└── docs/
├── positioning.md
└── brand.md
```

---

## Free Prompts

Two prompts available free — no signup required.

**Domain Glossary Builder** (PM)
Capture the terms that cause the most confusion on your
team, one at a time, before the next sprint starts.

**Code-to-Doc Alignment Check** (Developer)
Surface gaps between what you built and what was
specified — before you open the PR.

Browse them in the `/prompts` folder above.

---

## Full Prompt Library

The complete dovetell library has 20 prompts across
four team personas — PM, Developer, Data Scientist,
and Governance.

**Starter Pack — $19**
20 prompts, formatted for Claude, ChatGPT, Cursor,
and GitHub Copilot. Markdown and plain text.

**Team Kit — $49**
Starter Pack plus a ready-to-fork repo scaffold,
team onboarding guide, and governance prompts
built for team-wide adoption.

[Get the prompt library at dovetell.io →](https://dovetell.io)

---

## This Repo Is Dog Food

Every product decision behind dovetell is logged
as an ADR in `/decisions`.

The framework page at dovetell.io was written using
the dovetell framework itself — specifically the
Decision Log Capture and Sprint Context Handoff prompts.

You can read every decision we made and why.
That's not a marketing claim. It's just the `/decisions`
folder.

---

## Contributing

Found a gap? Built a prompt that works in your domain?
Open an issue using the templates in `.github/`.

- **New Prompt** — propose an addition to the library
- **Context Gap** — log a recurring question or
  knowledge gap your team keeps hitting

---

## License

Free prompts in this repo: CC BY 4.0 — use freely,
credit dovetell.

Paid library content: © 2026 dovetell. Not for
redistribution.

---

## Links

- Website: [dovetell.io](https://dovetell.io)
- Early access: [dovetell.io/#join-early-access](https://dovetell.io/#join-early-access)
- Email: [hello@dovetell.io](mailto:hello@dovetell.io)

---

*Built by a PM who got tired of answering the same questions every sprint.*
