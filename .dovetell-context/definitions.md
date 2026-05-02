# dovetell — Definitions
Last updated: May 1, 2026

Shared vocabulary for the dovetell product and codebase.
When a term is used in code, context, or documentation, it means what's defined here.

---

## Core Concepts

**context base**
The living collection of decisions, assumptions, definitions, and policies
that governs how a team's AI-assisted work should behave. In Phase 1, this
is a folder of markdown files. In Phase 2, it's a queryable layer managed
by dovetell.

**context drift**
The gap that grows between what a team's documents say and what the code
or work actually does. The core problem dovetell solves.

**context orchestration**
The practice of assembling, aligning, and delivering the right context to
the right person or tool at the right time. dovetell's primary job.

**context injection layer**
Where dovetell sits in the agent harness architecture — between tools/skills
and memory/state. The layer that delivers domain context into agent sessions.

**tribal knowledge failure**
When domain context lives in one person's head and never gets captured.
One of dovetell's three target failure modes.

**documentation drift**
When governing docs are written once and go stale the moment work begins.
One of dovetell's three target failure modes.

**bi-directional blindness**
When code evolves without informing docs, and docs change without reaching
developers. One of dovetell's three target failure modes.

**unvetted**
Status for any item that was automatically captured or imported but has not
yet been reviewed and accepted by a human. All automated updates are unvetted
until approved. Prefix to the dovetell trust model.

**vetted**
Status for any item that has been reviewed and accepted by a PM or designated
reviewer. Vetted items are authoritative.

**decision trace**
A record of what was decided, when, by whom, under which policy, and with
which exceptions. The atomic unit of the context graph (Foundation Capital).

**drift score**
A metric (0–100) indicating how far a team's documented context has drifted
from their actual work. Red/Yellow/Green. Displayed on the Context Console.

**dog food loop**
Using dovetell to manage the context of building dovetell itself. The
practice of using the product to develop the product. Active from day one.

---

## ID Definitions

**uid** (userId)
A permanent random identifier for a browser/user. Generated once on first
assessment submission, stored in localStorage indefinitely. Ties all projects
for one person together. Never changes for the same browser.

**pid** (projectId)
A random identifier for one project or team being assessed. Generated once
per project, travels in the URL. The same pid is used across all retakes of
the same project, enabling growth tracking.

**aid** (assessmentId)
A random identifier for one completed assessment run. Generated fresh on
every submission. Never reused. Provides lineage within a project:
same pid, multiple aids over time = growth trajectory.

**vid** (versionId)
Identifies which question set was used. Currently hardcoded as `v01`.
Bumped manually when questions change (v02, v03). Allows comparing scores
across question versions accurately.

---

## Assessment Terms

**maturity level**
One of four states describing how systematically a team uses AI:
Scattered → Structured → Coordinated → Compounding.

**capability area**
One of six dimensions scored in the assessment: Shared Context, Prompt Reuse,
Team Handoffs, Knowledge Capture, Review & Governance, Workflow Integration.

**section score**
The total points earned in one capability area. Max 15 (5 questions × max 3).

**total score**
Sum of all six section scores. Min 0, max 90. Maps to a maturity level.

**skipped question**
A question left unanswered. Scores 0 and is flagged in the raw_answers
payload sent to Formspree. Tracked for product research — consistently
skipped questions signal unclear or irrelevant prompts.

---

## Platform Terms (Phase 2)

**context console**
The main dashboard. Shows drift score, unvetted queue count, stale items,
and recent activity. The PM opens it the way a dev opens a CI dashboard.

**unvetted queue**
The list of automatically captured or imported items awaiting human review.
Every automated update lands here first. The PM accepts, edits, rejects, or defers.

**context query**
A natural language question answered by the context base. Delivered via
MCP integration into Cursor, Claude Code, VS Code.

**context import**
The process of ingesting existing documents (markdown, Notion, Confluence)
into the context base. All imported items start as unvetted.

**MCP server**
The dovetell integration that makes the context base queryable from inside
AI coding tools. Developer types @dovetell and gets the team's answer.

---

## Company / Reference

**Datagate Systems**
Fictional reference company used in all public demos and mockups.
A 40-person team building operational analytics for manufacturing facilities.
Replaces all Boeing references in public-facing artifacts.

**dovetellio@gmail.com**
The product email address. All business accounts registered here.
Used for all Formspree notifications, Gumroad, Plausible, GitHub, Porkbun.

**dovetell-io/dovetell**
The public GitHub repo. Contains the site, the assessment, and the context folder.

**jchromchak/dovetell**
The personal private GitHub repo. Contains personal prompts, personal context,
and local config. Never mixed with the public product repo.