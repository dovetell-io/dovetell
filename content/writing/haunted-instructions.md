---
title: "Your Agents Are Running on Haunted Instructions"
description: "Stale prompts, old rules, and outdated project notes do not disappear when teams start using agents. They become context the agent may still trust."
date: "2026-06-05"
slug: "haunted-instructions"
status: "draft"
---

# Your Agents Are Running on Haunted Instructions

![A dark editorial image reading Your agents are running on haunted instructions beside an old marked-up instruction sheet.](/assets/writing/haunted-instructions-hero.jpg)

Most teams do not have one instruction problem.

They have an instruction afterlife.

Old prompts keep circulating. Setup notes outlive the decision that created them. A process that was true three weeks ago still sits in a project brief, a wiki page, an agent file, or a copied chat.

The team moves on.

The instruction does not.

Then an AI agent reads it.

The result is rarely dramatic. The agent does not announce that it is following a ghost. It just makes a reasonable move from stale context.

It implements the old standard.

It revives a discarded plan.

It optimizes for a constraint that stopped mattering last Tuesday.

That is what I mean by haunted instructions.

They are instructions that still have influence after their authority has expired.

## This Is Not Just A Prompting Problem

The obvious answer is better prompting.

Write clearer prompts. Add more detail. Tell the model what matters. Put the rules in a system message. Keep a better `AGENTS.md`.

All useful.

But they do not solve the deeper problem.

The hard part is not writing instructions. The hard part is knowing which instructions are still true.

AI tools make this visible because they act. A stale wiki note can sit quietly for months. A stale instruction in an agent-visible file can become code, copy, design, or a product decision before lunch.

The failure mode changes from:

Someone might be confused later.

To:

The system may confidently continue the wrong past.

## How Instructions Become Haunted

Instructions usually become haunted in boring ways.

- A temporary workaround becomes a standing rule.
- A draft decision is copied into a durable file.
- A product direction changes, but the old launch copy stays in circulation.
- A naming convention is superseded, but both names remain visible.
- A context file says "always do this" when the actual rule became "usually, unless..."
- A human remembers the change, but the agent-readable context does not.

No villain required.

This is just what happens when AI-assisted work moves faster than the team's ability to retire, review, and reconcile context.

Most teams are not short on information.

They are short on authority.

## Bigger Context Windows Will Not Fix This

Large context windows are useful.

They let agents read more of the repo, more history, more notes, more docs, and more prior work.

They also make it easier to feed the agent more ghosts.

If the underlying context is stale, contradictory, or unreviewed, a larger context window does not automatically create clarity.

It can create a larger room for ambiguity.

The agent can see more. That does not mean it can know what the team currently believes.

This is why "just give the model more context" is an incomplete answer.

The question is not only how much context the agent can read. The question is what status that context has.

Is this current?

Was this reviewed?

Is this a decision, a draft, a guess, a note, a parked idea, or an old constraint that should no longer guide the work?

Without those distinctions, context becomes volume. And volume can make stale instructions harder to spot.

## The Missing Layer Is Review

Software teams already understand review in code.

Code can be proposed, changed, reviewed, merged, reverted, and traced. There is a difference between a branch and main. There is a difference between a comment and a committed change.

AI context needs a similar distinction.

Not because every note needs process around it.

Because agents need to know what they are allowed to trust.

A useful context system separates:

- rough notes from durable decisions
- proposed direction from reviewed direction
- local working memory from project truth
- current constraints from retired constraints
- exploratory prompts from reusable instructions

That does not require a heavy platform at the start.

It can begin with small, repo-owned context files and one clear rule: important instructions need visible status.

If an instruction is current, say so.

If it is a draft, say so.

If it is superseded, retire it.

If two instructions conflict, resolve the conflict instead of making the agent infer which ghost is friendlier.

## Haunted Instructions Are Expensive

The cost is not just bad output.

It is rework, review fatigue, and repeated explanation.

A human notices the agent followed the old path. They correct it. They add another note. They hope the next session sees the right one.

Sometimes that correction becomes another future ghost.

This is where context debt becomes operational.

Every unresolved instruction conflict is a small tax on the next session. Every stale rule left in the open increases the chance that an agent will faithfully continue something the team meant to leave behind.

As token costs become more visible, this matters more.

Carrying stale context is not free.

Re-explaining the same correction is not free.

Letting agents wander through contradictory instructions is not free.

The cost may not show up as one obvious failure. It shows up as churn.

## A Practical Starting Point

You do not need to solve all of team memory at once.

Start with the places agents already read.

For one active project, identify the instructions that shape the work:

- what this project is
- what should not change
- which decisions are current
- which names, rules, or patterns are authoritative
- what is still exploratory
- what the next safe move is

Then give those instructions a basic lifecycle.

Current.

Draft.

Superseded.

Parked.

Needs review.

That distinction is small. It is also the difference between an agent reading a project and an agent reading a stack of old sediment.

## The Goal Is Not Perfect Documentation

Perfect documentation is not the goal.

Recoverable intent is the goal.

When a human or agent returns to the work, they should be able to tell what the team currently believes, what changed, what drifted, and what should happen next.

That is the difference between context as a pile of notes and context as a working surface.

AI agents are going to keep reading whatever we give them.

The question is whether we keep handing them haunted instructions, or whether we give them context that has been reviewed, retired, and kept close enough to the work to matter.

Tell it once.

Then make sure the thing you told it is still alive.
