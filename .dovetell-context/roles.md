# dovetell — Roles

Last updated: May 2, 2026

The product role model. Abstract positions that real teams map onto
when setting up dovetell. Not fictional characters — see `personas.md`
for demo characters and how they map to these roles.

---

## Role model

| Role        | Who this is in real life                              | Vet | Accept | Add to queue | View context base |
|-------------|-------------------------------------------------------|-----|--------|--------------|-------------------|
| Owner       | PM, team lead — accountable for context quality       | ✓   | ✓      | ✓            | ✓                 |
| Approver    | Senior engineer, tech lead, domain SME                | ✓   | ✓      | ✓            | ✓                 |
| Contributor | Developer, analyst — anyone whose work generates context | —   | —      | ✓            | ✓                 |
| Viewer      | Stakeholder, non-technical teammate                   | —   | —      | —            | ✓                 |

---

## Role definitions

### Owner
The person accountable for the project's context quality. Typically
a PM or team lead. There is one Owner per project.

**Can do everything, plus:**
- Add and remove team members
- Configure project settings (staleness threshold, token scope)
- Delete or archive the project
- Assign Approver status to team members

**Design intent:** The Owner is the buyer persona. This is the person
who decided to use dovetell, who is responsible for what the AI knows,
and who the drift score is addressed to. dovetell is their governance tool.

---

### Approver
A subject matter authority who makes context items truth.
A project can have multiple Approvers — typically one per domain
(e.g. one for architecture decisions, one for data definitions,
one for policies). Approvers are assigned by the Owner.

**Can do everything a Contributor can, plus:**
- Vet items in the queue (mark as reviewed)
- Accept items (move from unvetted → vetted · becomes truth)
- Edit items before accepting
- Reject items (remove from queue with reason)
- Defer items (return to queue for later)

**Design intent:** The review gate is the core value of dovetell.
Context only becomes truth when a human with Approver or Owner
standing explicitly accepts it. Approvers are the humans in that loop.
They cannot be bypassed.

---

### Contributor
Anyone on the team whose work generates context — developers,
analysts, data scientists. Contributors feed the queue but do not
govern it. They do not need to understand dovetell deeply to
participate — context can arrive via import, prompt, or push hook.

**Can:**
- Add items directly to the unvetted queue
- Import documents (markdown, text, PDF, Notion export)
- View the full context base (read-only)
- See their own contributions and their vet status

**Cannot:**
- Vet, accept, or reject any item (including their own)
- Edit items after submission
- Access project settings or team management

**Design intent:** Contributors should not need to change how they
work. A developer who writes a decision in a sprint doc and imports
it has contributed. The queue catches it. The Approver decides if
it becomes truth. The Contributor's job is to generate context,
not govern it.

---

### Viewer
A non-technical teammate or stakeholder who consumes context
but does not produce or govern it. Viewers represent the
non-developer use case — the ops lead who needs to know what
the team decided, the PM at a client who needs to see current
definitions, the quality manager who monitors drift.

**Can:**
- View the context base in plain English (rendered, not raw markdown)
- Query the context base (read-only)
- See the drift score and context health
- See staleness alerts

**Cannot:**
- Add anything to the queue
- See raw markdown files
- Access import or settings

**Design intent:** The Viewer role makes dovetell valuable beyond
the engineering team. The same context base that feeds a developer's
@dovetell query also surfaces to a non-technical teammate in plain
English — no markdown required. Viewers are why "rendered for humans"
is a first-class output alongside "assembled context for models."

---

## Permission matrix (full)

| Action                          | Owner | Approver | Contributor | Viewer |
|---------------------------------|-------|----------|-------------|--------|
| View context base               | ✓     | ✓        | ✓           | ✓      |
| Query context base              | ✓     | ✓        | ✓           | ✓      |
| View drift score / health       | ✓     | ✓        | ✓           | ✓      |
| Add to unvetted queue           | ✓     | ✓        | ✓           | —      |
| Import documents                | ✓     | ✓        | ✓           | —      |
| Vet queue items                 | ✓     | ✓        | —           | —      |
| Accept queue items              | ✓     | ✓        | —           | —      |
| Edit before accepting           | ✓     | ✓        | —           | —      |
| Reject queue items              | ✓     | ✓        | —           | —      |
| Defer queue items               | ✓     | ✓        | —           | —      |
| Manage team members             | ✓     | —        | —           | —      |
| Assign Approver role            | ✓     | —        | —           | —      |
| Configure project settings      | ✓     | —        | —           | —      |
| Delete / archive project        | ✓     | —        | —           | —      |

---

## Persona mapping (from personas.md)

| Persona    | Company          | dovetell role |
|------------|------------------|---------------|
| Jane Park  | Datagate Systems | Owner         |
| Maya Rowe  | Datagate Systems | Approver      |
| Alex Kim   | Datagate Systems | Contributor   |
| Priya N.   | Datagate Systems | Contributor   |
| Sam Okafor | Datagate Systems | Viewer        |
| Marco R.   | Volta Energy     | Contributor   |

---

## Open questions (deferred)

- Can a Contributor be promoted to Approver without Owner action?
- Should Viewers have a separate "plain English only" rendering mode,
  or is that the default for all roles?
- Multi-owner projects — is there a single Owner or can ownership
  be shared? (Current assumption: one Owner per project)
- Guest access — can someone view a single exported context item
  without a dovetell account? (Relevant for client-facing use cases)
