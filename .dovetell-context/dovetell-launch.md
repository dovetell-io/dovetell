# dovetell — Master Launch File

Version: 0.2 · Session: a3f7c291
Last updated: 2026-05-03

Paste this file at the start of any Claude session working on dovetell.
It loads operational context — where things stand today, what exists, what’s next.
For product context (what dovetell is), also paste dovetell-seed.md.
For specific work, paste the companion file listed below.

-----

## Session setup

1. Generate session hash: sha256(short description)[:8]
1. Rename chat: “Session title (xxxxxxxx)”
1. Note hash: Current session → [set at session start]
1. All Claude tasks: source:claude-[hash]
1. All Claude decisions: source:claude-[hash]

Tracking files to maintain and export at session end:

- task-new-[sessionid].md
- decisions-new-[sessionid].md
- seed-addendum-[sessionid].md (if seed changes)

-----

## What dovetell is

Context orchestration layer for AI-assisted software teams.
North star: “I want to be asked fewer questions.”
Tagline: “Tell it once. Let it travel.”
Not a doc tool. Not a PM tool. Not an LLM wrapper.
Renderer not owner — the repo is the source of truth.
Protect the scope — context governance, not work management.

-----

## Repo map

### Public product — dovetell-io/dovetell (GitHub Pages)

```
dovetell-io/dovetell/
├── index.html                     ✓ live
├── framework/index.html           ✓ live
├── why/index.html                 ✓ live
├── team-assessment/index.html     ✓ live (Formspree xrejbpbv)
├── assessments/index.html         ✓ live
├── recommendations/index.html     ✓ live
├── privacy/index.html             ✓ live
├── app-demo/
│   ├── review.html                ✓ committed May 2
│   ├── projects.html              ✓ built · not committed
│   └── feed.html                  ✓ built · not committed
├── assets/
│   ├── dovetell-wordmark.svg      ✓ committed
│   ├── dovetell-mark-*.png        ✓ five variants committed
│   ├── branch-illustration.svg    ✓ committed
│   └── branch-illustration.png    ✓ committed
└── .dovetell-context/
    ├── dovetell-seed.md           ✓ committed
    ├── brand.md                   ✓ built · not committed
    ├── personas.md                ✓ built · not committed
    ├── roles.md                   ✓ built · not committed
    ├── approval-workflow.md       ✓ built · not committed
    ├── business-rules.md          ✓ built · not committed
    ├── risks.md                   ✓ built · not committed
    └── opportunities.md           ✓ built · not committed
```

### Sandbox — dovetell-io/dovetell-sandbox

```
dovetell-io/dovetell-sandbox/
├── tasks.md                       ✓ live
├── decisions.md                   ⚠ needs refactor to flat bullet format
├── opportunities.md               ⚠ needs commit (built this session)
├── risks.md                       ⚠ needs commit (built this session)
└── business-rules.md              ⚠ needs commit (built this session)
```

### Tracker — jchromchak/tasks (GitHub Pages)

```
jchromchak/tasks/
├── index.html                     ⚠ needs deploy (redirect to tasks/)
├── manifest.json                  ⚠ needs deploy
├── tasks/index.html               ⚠ build 6 · needs deploy
├── decisions/index.html           ⚠ build 6 · needs deploy
├── opportunities/index.html       ⚠ build 2 · needs deploy
├── rules/index.html               ⚠ build 2 · needs deploy
├── risks/index.html               ⚠ build 1 · needs deploy (new)
└── assets/                        ✓ deployed
```

Note: after deploy, delete home screen shortcut and re-add fresh.

### Private assets — dovetell-io/dovetell-assets

```
dovetell-io/dovetell-assets/       ⚠ repo not yet created
├── free-samples/                  ✓ scaffolded
│   └── sample-team-context.md
├── prompt-library-starter/        ✓ v1.0 zip ready → $29 founding
│   ├── README.md
│   ├── team-context.md
│   └── terms-of-use.md
├── prompt-library-starter-plus/   ✓ v1.0 zip ready → $59 founding
│   ├── README.md
│   ├── team-context.md
│   ├── maintenance-prompts.md
│   └── terms-of-use.md
├── setup-review/                  ✓ scaffolded (internal ops)
└── _internal/                     ✓ gumroad-listings.md · notes.md
```

-----

## Asset inventory

### Gumroad products

|Product     |Full|Launch      |Status                           |
|------------|----|------------|---------------------------------|
|Starter     |$49 |$29 founding|✓ ready — zip + listing copy done|
|Starter Plus|$99 |$59 founding|✓ ready — zip + listing copy done|
|Setup Review|$299|no discount |✓ internal ops ready             |
|Free sample |$0  |—           |✓ built · needs public URL       |

Founding: first 20 buyers or one week.
Listing copy: dovetell-assets/_internal/gumroad-listings.md
Images: gumroad-image-prompts.md — 4 prompts ready (regenerate Prompt 1 with “Starter” not “Starter Kit”)

### Tracker pages (jchromchak/tasks)

|Page          |Build|Status              |
|--------------|-----|--------------------|
|tasks/        |6    |⚠ needs deploy      |
|decisions/    |6    |⚠ needs deploy      |
|opportunities/|2    |⚠ needs deploy      |
|rules/        |2    |⚠ needs deploy      |
|risks/        |1    |⚠ needs deploy (new)|

### App demo screens

|Screen         |Status                 |
|---------------|-----------------------|
|review.html    |✓ committed May 2      |
|projects.html  |✓ built · not committed|
|feed.html      |✓ built · not committed|
|onboarding.html|✗ not yet built        |

### Brand assets

|Asset              |Status                                                                    |
|-------------------|--------------------------------------------------------------------------|
|Outline mark (new) |✓ designed · needs swap in site                                           |
|Gumroad images     |✓ Starter + Starter Plus squares done · comparison card done · banner done|
|Wordmark SVG       |✓ committed                                                               |
|Branch illustration|✓ committed                                                               |

-----

## Current priorities

### Now — transposition (this session closeout)

- Commit all sandbox files: opportunities.md · risks.md · business-rules.md
- Deploy tracker: all five folders to jchromchak/tasks
- Delete + re-add home screen shortcut after deploy
- Bulk import decisions-new-a3f7c291 via decisions.html
- Bulk import task-new-a3f7c291-final via tasks.html
- Create dovetell-io/dovetell-assets private repo and push
- Upload Starter + Starter Plus to Gumroad with founding pricing

### Next — this week

- Commit app-demo/projects.html · feed.html
- Commit .dovetell-context/ files (brand · personas · roles · approval-workflow · business-rules · risks · opportunities)
- Fix Maya R. → Maya Rowe across all app-demo files
- Swap solid dove for outline mark across site and app-demo
- Regenerate Prompt 1 image with “Starter” not “Starter Kit”
- Add free sample to public URL

### Later — pre-Phase 2

- Resolve onboarding open questions (4 items)
- Decide authentication architecture (Option A preferred)
- Build app-demo/onboarding.html
- Shared CSS/JS refactor (task-d3b4acc8)
- Context Health scoring formula
- Find + log AI Daily Brief infinite backlog episode as opportunity

-----

## Context files — five types

|File             |Prefix   |What it holds                                       |
|-----------------|---------|----------------------------------------------------|
|decisions.md     |decision-|Commitments made or to be made. type:resolved|active|
|opportunities.md |opp-     |Landscape. Not commitments. Scope-checked.          |
|risks.md         |risk-    |Risk register. Likelihood + impact + mitigation.    |
|business-rules.md|rule-    |Product behavior. UI logic. Scope constraints.      |
|tasks.md         |task-    |Work queue. Priority · owner · source.              |

-----

## Companion files — when to paste

|Working on                    |Paste alongside seed + launch           |
|------------------------------|----------------------------------------|
|Site copy, positioning        |brand.md                                |
|App demo screens              |personas.md · roles.md                  |
|Approval workflow, reviewer UI|approval-workflow.md                    |
|Onboarding / project profile  |team-profile.md                         |
|Product behavior, UI logic    |business-rules.md                       |
|Risk assessment, scope        |risks.md                                |
|Feature exploration           |opportunities.md                        |
|Task / decision tracking      |task-new-[id].md · decisions-new-[id].md|

-----

## Tech stack snapshot

|Layer    |Tool                        |Notes                              |
|---------|----------------------------|-----------------------------------|
|Hosting  |GitHub Pages                |dovetell-io/dovetell               |
|Domain   |Porkbun                     |dovetell.io                        |
|Forms    |Formspree Business          |xrejbpbv · xaqvneqn                |
|Analytics|Plausible                   |No cookies                         |
|Products |Gumroad                     |~10% + $0.50/sale                  |
|Tracker  |jchromchak/tasks            |GitHub Pages · 5 pages · shared PAT|
|Sandbox  |dovetell-io/dovetell-sandbox|5 context files                    |
|Assets   |dovetell-io/dovetell-assets |Private · not yet created          |
|Email    |dovetellio@gmail.com        |All accounts                       |

-----

## ID conventions

```
Sessions:      sha256(description)[:8]
Tasks:         task-[8char-nanoid]
Decisions:     decision-[8char]  sha256(slug)[:8]
Opportunities: opp-[8char]       sha256(slug)[:8]
Risks:         risk-[8char]      sha256(slug)[:8]
Rules:         rule-[8char]      sha256(slug)[:8]
```

Source: `john` or `claude-[sessionhash]`

Migration decision→opportunity:

- Decision: status:closed · closure-statement:Migrated to opp-[id]
- Opportunity: origin:decision-[id] — migrated [date]
- Nothing deleted. Full audit trail.

Assets:

- Zips: [product]-v[version].zip
- Content: kebab-case, no version suffix on production files
- Samples: free-samples/sample-[descriptor].md
- Internal: _internal/[descriptor].md

-----

## Governance guardrails

- Never reference Boeing or employer publicly
- Never Boeing-adjacent terminology in demo content
- Demo = Datagate Systems personas only
- App-demo requires verbal framing before sharing
- All context files = flat bullet append logs
- lowercase dovetell always
- Repo is source of truth — dovetell never owns content
- **Protect the scope** — context governance not work management
- New object types need explicit scope decision (rule-74f1009a)
- Opportunities ≠ decisions — landscape only until deliberately elevated
- Migration requires full audit trail in both directions
- Do not build Phase 2 before peer testing validates demand
- Do not let dovetell become ClickUp or Jira

-----

## Open questions

- Authentication architecture (preferred: Option A — GitHub OAuth BYOK)
- Onboarding: empty seed state · re-accessible profile · multi-project flow · configurable prompts
- Viewer flag behavior — soft signal vs queue item
- Context Health scoring formula
- Sequential approval spec (Phase 2 v2)
- dovetell vs dovemind — deferred (peer validation Monday)
- Infinite backlog positioning — find AI Daily Brief episode

-----

*This file is dovetell running on itself.*
*Last full update: 2026-05-03 · session a3f7c291*
