# dovetell/context

This folder is dovetell running on itself.

Every architectural decision, assumption, definition, and design choice
made while building dovetell is captured here. This is the context base
for the dovetell product — the thing the product itself is designed to do
for other teams.

## Structure

```
.dovetell-context/
├── README.md                        ← this file
├── technical-source-of-truth.md     ← canonical technical spec
├── seed/
│   └── convo-seed-v1.6.md           ← conversation seed for AI sessions
├── decisions/
│   ├── ADR-001-id-architecture.md
│   ├── ADR-002-scoring-model.md
│   ├── ADR-003-page-separation.md
│   └── ADR-004-privacy-language.md
├── assumptions.md                   ← active assumptions (may be wrong)
└── definitions.md                   ← shared vocabulary
```

## How to use this

When starting a new Claude or ChatGPT session about dovetell:
1. Open `seed/convo-seed-v1.6.md`
2. Paste the full contents as your first message
3. Claude will have full context — no re-explaining required

When making a significant architectural decision:
1. Add an ADR to `decisions/`
2. Update `technical-source-of-truth.md` if it affects the spec
3. Update the seed doc if it affects how future sessions should understand the product

## The meta point

dovetell's north star is "I want to be asked fewer questions."
This folder exists so you never have to re-explain dovetell to an AI
tool. It is the product eating its own dog food.

Last updated: May 1, 2026