# dovetell — Technical Source of Truth
Version: 0.2 · Updated: May 1, 2026 · Author: John Chromchak
Status: Pre-revenue, Phase 1 — prompt library + assessment live

---

## 1. What dovetell is

dovetell is a context orchestration layer for AI-assisted software teams.
North star: "I want to be asked fewer questions."

Not a documentation tool. Not a PM tool. Not an LLM wrapper.
The governing layer that captures decisions, aligns intent, and keeps
everyone from asking the same questions twice.

**Phase 1 (now):** Prompt library (Gumroad) + Team AI Maturity Assessment (live)
**Phase 2 (next):** SaaS platform — context base, unvetted queue, MCP integration

---

## 2. Repository Structure

```
dovetell-io/dovetell/              GitHub repo (public)
├── CNAME                          → dovetell.io
├── index.html                     → dovetell.io/
├── assets/
│   └── framework.png              → dovetell.io/assets/framework.png
├── framework/
│   └── index.html                 → dovetell.io/framework
├── team-assessment/
│   └── index.html                 → dovetell.io/team-assessment
├── assessments/
│   └── index.html                 → dovetell.io/assessments
├── recommendations/
│   └── index.html                 → dovetell.io/recommendations
├── privacy/
│   └── index.html                 → dovetell.io/privacy
├── dovetell-data.json             → assessment content source of truth
└── context/                       ← dovetell running on itself
    ├── README.md
    ├── technical-source-of-truth.md (this file)
    ├── seed/
    │   └── convo-seed-v1.6.md
    └── decisions/
        ├── ADR-001-id-architecture.md
        ├── ADR-002-scoring-model.md
        ├── ADR-003-page-separation.md
        └── ADR-004-privacy-language.md
```

### Page responsibilities

| Page | Job | Notes |
|---|---|---|
| `/` | Homepage, waitlist | Formspree xaqvneqn |
| `/framework/` | Framework diagram for team reference | Uses /assets/framework.png |
| `/team-assessment/` | Takes the assessment. One job only. | Formspree xrejbpbv. Redirects if pid in URL unless retake=1 |
| `/assessments/` | Returning user dashboard | Reads localStorage by pid. Shows history. |
| `/recommendations/` | Personalized offer page | Reads URL params. Stateless. |
| `/privacy/` | Privacy policy | Plain English |

---

## 3. Data Source

`dovetell-data.json` is the single source of truth for all assessment
content. The HTML fetches this on load. Do not hardcode questions,
scoring thresholds, levels, offers, or demographic options in HTML/JS.

**Contents:**
- `meta` — vid, title, subtitle, maxScore, questionsPerSection, maxPerQuestion
- `scoring` — answer labels, values, level definitions with thresholds and colors
- `nextSteps` — recommended actions per maturity level
- `sections` — all 6 sections with questions
- `offers` — tier definitions (Free, $49, $99, $299)
- `privacy` — gate note, data disclaimer, policy URL
- `demographics` — dropdown options for all optional fields

---

## 4. ID Architecture

See ADR-001 for full decision record.

### The four IDs

| ID | Full name | Scope | Generation | Storage |
|---|---|---|---|---|
| uid | userId | Per browser | Once on first submit | localStorage (permanent) |
| pid | projectId | Per project | Once per project, travels in URL | URL param + localStorage |
| aid | assessmentId | Per run | Fresh every submission | Formspree + localStorage history |
| vid | versionId | Per question set | Hardcoded `v01`, bump manually | Hardcoded in JS constant VID |

### Hierarchy

```
email
└── uid
    ├── pid-a
    │   ├── aid-1 (vid=v01)
    │   └── aid-2 (vid=v01)
    └── pid-b
        └── aid-1 (vid=v01)
```

### URL formats

```
First visit:    dovetell.io/team-assessment
Return visit:   dovetell.io/assessments/?pid=8f3c2a1b
Retake:         dovetell.io/team-assessment/?pid=8f3c2a1b&retake=1
Post-submit:    dovetell.io/recommendations/?level=Structured&score=18&max=90&pid=...&uid=...&aid=...
```

### Retake loop prevention

`retake=1` param signals `/team-assessment/` to skip redirect.
Without it: pid in URL → redirect to /assessments/ → infinite loop.

### localStorage schema

```
dovetell_uid                    → string (uid, permanent)
dovetell_run_{pid}              → JSON (last run object, for quick display)
dovetell_history_{pid}          → JSON array (all runs for this pid)
dovetell_pids_{uid}             → JSON array (all pids for this uid)
```

Run object:
```json
{
  "aid": "c3d4e5f6",
  "vid": "v01",
  "pid": "8f3c2a1b",
  "uid": "f4e2b3a9",
  "level": "Structured",
  "score": 18,
  "maxScore": 90,
  "projectName": "Ops Analytics Team",
  "takenAt": "2026-05-01T21:00:00.000Z"
}
```

---

## 5. Assessment Scoring

See ADR-002 for full decision record.

```
6 sections × 5 questions × max 3 points = 90 points total
Unanswered questions: score 0 (not excluded, not defaulted to 1)
```

### Thresholds (calibrated for 90-point scale)

| Level | Range | % |
|---|---|---|
| Scattered | 0–22 | 0–24% |
| Structured | 23–54 | 26–60% |
| Coordinated | 55–72 | 61–80% |
| Compounding | 73–90 | 81–100% |

**Recalibrate after 50 real completions.**

### Six capability areas

1. Shared Context
2. Prompt Reuse
3. Team Handoffs
4. Knowledge Capture
5. Review & Governance
6. Workflow Integration

---

## 6. Assessment Page Flow

```
/team-assessment/
  ↓ on load: pid in URL + no retake=1? → redirect /assessments/?pid=...
  ↓ no pid (or retake=1): show intro
  ↓ startAssessment() → 6 sections, 5 questions, scroll to card on each nav
  ↓ finishAssessment() → generate uid, pid, aid, vid → show email gate
  ↓ gate: email (required) + project name (optional) + demographics (optional)
  ↓ submitGate() → POST Formspree → save localStorage → show success + unique link
  ↓ renderResults() → show score, level scale, breakdown, gaps, strengths, next steps
  ↓ showOffer() → redirect /recommendations/?level=...&score=...&pid=...&uid=...&aid=...
```

---

## 7. Formspree

### Forms

| Form | ID | Page | Destination |
|---|---|---|---|
| Assessment | xrejbpbv | /team-assessment/ | dovetellio@gmail.com |
| Waitlist | xaqvneqn | / | dovetellio@gmail.com |

### Assessment payload fields

Identity: email, uid, pid, aid, vid, unique_link, trigger, taken_at
Results: level, total_score, section_breakdown, raw_answers, skipped_questions, skip_count
Demographics: project_name, role, team_size, company, industry, ai_tool, source
Formspree: _subject, _replyto

### Subject line format

```
dovetell — {level} ({score}/{max}) · pid:{pid} · aid:{aid} · {role} · {company} — {email}
```

### Hardening status

- reCAPTCHA: disabled (conflicts with AJAX fetch)
- Allowed Origins: pending HTTPS cert
- Once HTTPS live: set to https://dovetell.io on both forms

---

## 8. Privacy & Data

See ADR-004 for full decision record.

- Required: email only
- Optional: project name, role, team size, company, industry, AI tool, source
- Auto-collected: scores, answers, skip data, IDs, timestamp
- **Scores seen by dovetell product team. Never sold or shared with third parties.**
- Project name field shows: "⚠ Don't include sensitive, confidential, or proprietary information"
- Full policy at /privacy/

---

## 9. Analytics & Hosting

| Service | Purpose | Cost | Account |
|---|---|---|---|
| GitHub Pages | Static hosting | Free | dovetell-io/dovetell |
| Porkbun | Domain | ~$12/yr | dovetellio@gmail.com |
| Formspree | Forms | Business plan | dovetellio@gmail.com |
| Plausible | Analytics | ~$9/mo | dovetellio@gmail.com |
| Gumroad | Product delivery | ~10% + $0.50 | dovetellio@gmail.com |

Plausible script on every page:
```html
<script defer data-domain="dovetell.io" src="https://plausible.io/js/script.js"></script>
```

---

## 10. Design System

Colors: `#5865F2` blurple · `#3B45C4` dark · `#D8DAFD` light · `#EEF0FE` pale · `#1A1A2E` near-black
Fonts: Plus Jakarta Sans (body) · JetBrains Mono (code/mono)
Dark mode: homepage, framework · Light mode: all other pages
Brand always lowercase: dovetell

---

## 11. Open Issues

| Issue | Priority | Notes |
|---|---|---|
| No email to assessment taker | High | Formspree auto-response or Resend |
| Allowed Origins not set | Medium | Pending HTTPS cert |
| HTTPS not enforced | Medium | GitHub Pages cert pending |
| Scoring needs real-world calibration | Medium | Review after 50 completions |
| dovetell.css refactor | Low | After first 10 real completions |
| Multi-pid dashboard | Low | Needs email verification + backend |

---

## 12. Not In Scope

- Code review tool (never)
- Project management / tasks / sprints (never)
- LLM wrapper or chatbot (never)
- Autonomous updates without human review (never)
- Accounts before validation (defer)

Version: 0.1 · Created: May 1, 2026 · Author: John Chromchak
Status: Pre-revenue, Phase 1 — prompt library + assessment live

---

## 1. What dovetell is

dovetell is a context orchestration layer for AI-assisted software teams.
North star: "I want to be asked fewer questions."

Not a documentation tool. Not a PM tool. Not an LLM wrapper.
The governing layer that captures decisions, aligns intent, and keeps
everyone from asking the same questions twice.

**Phase 1 (now):** Prompt library (Gumroad) + Team AI Maturity Assessment (live)
**Phase 2 (next):** SaaS platform — context base, unvetted queue, MCP integration

---

## 2. Site Structure

```
dovetell-io/dovetell/              GitHub repo (public)
├── CNAME                          → dovetell.io
├── index.html                     → dovetell.io/
├── assets/
│   └── framework.png              → dovetell.io/assets/framework.png
├── framework/
│   └── index.html                 → dovetell.io/framework
├── team-assessment/
│   └── index.html                 → dovetell.io/team-assessment
├── assessments/
│   └── index.html                 → dovetell.io/assessments
├── recommendations/
│   └── index.html                 → dovetell.io/recommendations
└── privacy/
    └── index.html                 → dovetell.io/privacy
```

### Page responsibilities

| Page | Job | Notes |
|---|---|---|
| `/` | Homepage, waitlist | Formspree xaqvneqn |
| `/framework/` | Framework diagram for team reference | Uses /assets/framework.png |
| `/team-assessment/` | Takes the assessment. One job only. | Formspree xrejbpbv |
| `/assessments/` | Returning user dashboard | Reads localStorage by pid |
| `/recommendations/` | Personalized offer page | Reads URL params from assessment |
| `/privacy/` | Privacy policy | Plain English |

---

## 3. ID Architecture

### The four IDs

Every assessment interaction is tagged with four IDs. Together they
form a complete lineage from user to project to run to question set.

```
uid  — userId
       Permanent per browser. Generated once, stored in localStorage.
       Ties all projects for one person together across sessions.
       Key: dovetell_uid

pid  — projectId
       One per project or team being assessed.
       Generated on first visit, travels in URL on all subsequent visits.
       Persists across retakes of the same project.
       Same pid + multiple aids = growth tracking over time.

aid  — assessmentId
       Generated fresh on every submission.
       One per completed assessment run.
       Never reused. Provides lineage within a project.

vid  — versionId
       Hardcoded. Currently: v01
       Bump manually when questions change → v02, v03
       Tags each aid so scores can be compared across question versions.
```

### Hierarchy

```
email (common thread — ties uid to a person)
└── uid (userId — permanent per browser)
    ├── pid-a (projectId — e.g. "Ops Analytics Team")
    │   ├── aid-1 (assessmentId — Jan run, vid=v01, score=14, Scattered)
    │   ├── aid-2 (assessmentId — Mar run, vid=v01, score=18, Structured)
    │   └── aid-3 (assessmentId — May run, vid=v01, score=24, Coordinated)
    └── pid-b (projectId — e.g. "Data Infrastructure Squad")
        ├── aid-1 (assessmentId — Mar run, vid=v01, score=16, Structured)
        └── aid-2 (assessmentId — Apr run, vid=v01, score=19, Structured)
```

### URL format

**First visit (new project):**
```
dovetell.io/team-assessment
→ pid generated fresh
→ on submit: dovetell.io/assessments/?pid=8f3c2a1b
```

**Return visit (same project):**
```
dovetell.io/assessments/?pid=8f3c2a1b
→ /assessments/ reads pid, shows last score
→ Retake → dovetell.io/team-assessment/?pid=8f3c2a1b
→ pid preserved, new aid generated on submit
```

**Post-submission:**
```
dovetell.io/recommendations/?level=Structured&next=Coordinated&score=18&max=90&pid=8f3c2a1b&uid=f4e2b3a9&aid=c3d4e5f6
```

### ID generation

All IDs generated client-side in JavaScript.
Format: 8-character lowercase alphanumeric (Math.random().toString(36).substring(2,10))

```javascript
// uid — read from localStorage or generate + store
function getOrCreateUid() {
  let uid = localStorage.getItem('dovetell_uid');
  if (!uid) { uid = generateShortId(); localStorage.setItem('dovetell_uid', uid); }
  return uid;
}

// pid — read from URL ?pid= param or generate new
function getOrCreatePid() {
  return new URLSearchParams(window.location.search).get('pid') || generateShortId();
}

// aid — always fresh
function generateAid() { return generateShortId(); }

// vid — hardcoded
const VID = 'v01';
```

### localStorage schema

```
dovetell_uid                          → string (uid)
dovetell_run_{pid}                    → JSON (last run, for quick display)
dovetell_history_{pid}                → JSON array (all runs for this pid)
dovetell_pids_{uid}                   → JSON array (all pids for this uid)
```

Run object schema:
```json
{
  "aid": "c3d4e5f6",
  "vid": "v01",
  "pid": "8f3c2a1b",
  "uid": "f4e2b3a9",
  "level": "Structured",
  "score": 18,
  "maxScore": 90,
  "takenAt": "2026-05-01T21:00:00.000Z"
}
```

---

## 4. Assessment Architecture

### Scoring

6 sections × 5 questions × max 3 points = 90 points total

| Level | Score Range |
|---|---|
| Scattered | 0–12 |
| Structured | 13–24 (note: out of 90 total — these ranges need updating) |
| Coordinated | 25–30 |
| Compounding | 31–36 |

**⚠ Open issue:** Scoring thresholds were designed for a 36-point scale
(6 sections × max 6 pts). Current implementation scores 0–90
(6 sections × 5 questions × 3 pts). Thresholds need recalibration.
Current thresholds produce narrow Scattered/Coordinated/Compounding ranges.
Recommend: Scattered 0–30, Structured 31–54, Coordinated 55–72, Compounding 73–90.

### Six capability areas

1. Shared Context
2. Prompt Reuse
3. Team Handoffs
4. Knowledge Capture
5. Review & Governance
6. Workflow Integration

### Page flow

```
/team-assessment/
  ↓ (pid in URL?) → redirect to /assessments/
  ↓ (no pid) → show intro screen
  ↓ startAssessment() → 6 sections, 5 questions each
  ↓ finishAssessment() → generate uid, pid, aid, vid → show email gate modal
  ↓ submitGate() → POST to Formspree → save to localStorage → show success
  ↓ renderResults() → show score, gaps, strengths, next steps
  ↓ showOffer() → redirect to /recommendations/?level=...&pid=...
```

### Email gate modal fields

Required:
- email

Optional (collapsible "Tell us about your team"):
- role (PM / Developer / Data Scientist / Engineering Lead / Founder+CTO / Other)
- team_size (1 / 2–5 / 6–15 / 16–50 / 50+)
- company (free text)
- industry (Software·SaaS / Manufacturing / Finance / Healthcare / Consulting / Government·Defense / Other)
- ai_tool (Cursor / Claude·Claude Code / GitHub Copilot / ChatGPT / Gemini / Multiple / Other)
- source (LinkedIn / Colleague·referral / GitHub / Google / Other)

---

## 5. Formspree Integration

### Forms

| Form | ID | Used in | Destination |
|---|---|---|---|
| Assessment | xrejbpbv | /team-assessment/ | dovetellio@gmail.com |
| Waitlist | xaqvneqn | / (homepage) | dovetellio@gmail.com |

### Assessment submission payload

```json
{
  "email": "user@example.com",
  "uid":  "f4e2b3a9",
  "pid":  "8f3c2a1b",
  "aid":  "c3d4e5f6",
  "vid":  "v01",
  "unique_link": "https://dovetell.io/assessments/?pid=8f3c2a1b",
  "trigger": "gate",
  "taken_at": "2026-05-01T21:00:00.000Z",
  "level": "Structured",
  "total_score": "18/90",
  "section_breakdown": "Shared Context: 2/15 | Prompt Reuse: 4/15 | ...",
  "raw_answers": "Shared Context: [0,1,null,2,3] | ...",
  "skipped_questions": "Shared Context Q3",
  "skip_count": 1,
  "role": "Product Manager",
  "team_size": "6–15",
  "company": "Acme Corp",
  "industry": "Manufacturing",
  "ai_tool": "Cursor",
  "source": "LinkedIn",
  "_subject": "dovetell — Structured (18/90) · pid:8f3c2a1b · aid:c3d4e5f6 · Product Manager · Acme Corp — user@example.com",
  "_replyto": "user@example.com"
}
```

### Hardening status (as of May 1, 2026)

- reCAPTCHA: disabled (conflicts with AJAX fetch submission)
- Allowed Origins: pending HTTPS cert from GitHub Pages
- Once HTTPS live: set Allowed Origins to https://dovetell.io in both forms
- Formspree account: dovetellio@gmail.com, Business plan

---

## 6. Analytics

- Provider: Plausible (privacy-first, no cookies, no personal data)
- Domain: dovetell.io
- Script on all pages:
  `<script defer data-domain="dovetell.io" src="https://plausible.io/js/script.js"></script>`

---

## 7. Hosting & Infrastructure

| Service | Purpose | Cost | Account |
|---|---|---|---|
| GitHub Pages | Static hosting | Free | dovetell-io/dovetell |
| Porkbun | Domain registrar | ~$12/yr | dovetellio@gmail.com |
| Formspree | Form submissions | Business plan | dovetellio@gmail.com |
| Plausible | Analytics | ~$9/mo | dovetellio@gmail.com |
| Gumroad | Product delivery | ~10% + $0.50 | dovetellio@gmail.com |

**Future backend stack (when UUID model needs persistence):**
- Database: Supabase (Postgres + REST API)
- Email: Resend.com (free up to 3,000/mo) or Loops.so
- Backend: Railway or Render (Node/Express or FastAPI)

---

## 8. Design System

### Colors
```
--blurple:       #5865F2   primary
--blurple-dark:  #3B45C4   hover states
--blurple-light: #D8DAFD   light text on dark
--blurple-pale:  #EEF0FE   light backgrounds
--near-black:    #1A1A2E   dark backgrounds
```

### Typography
- Body: Plus Jakarta Sans (Google Fonts)
- Code/mono: JetBrains Mono (Google Fonts)

### Conventions
- Brand name always lowercase: dovetell
- Dark mode: homepage, framework page
- Light mode: assessment, assessments, recommendations, privacy
- All pages include Plausible script
- All pages mobile responsive (breakpoints at 680px and 768px)

### Assets
- Logo: white dove silhouette, two blurple broadcast arcs at wing-body junction
- Logo file: /assets/framework.png (framework diagram)
- Logo vectorization: pending (Figma, Saturday project)

---

## 9. Open Issues & Technical Debt

| Issue | Priority | Notes |
|---|---|---|
| Scoring thresholds miscalibrated | High | Designed for 36pts, actual is 90pts |
| No email sent to assessment taker | High | Formspree auto-response or Resend needed |
| Allowed Origins not set | Medium | Pending HTTPS cert from GitHub Pages |
| HTTPS not enforced | Medium | GitHub Pages cert pending |
| Offer screen CSS still in assessment | Low | Dead CSS, can clean up |
| recommendations/ and assessments/ not yet in repo | High | Need to add to GitHub |
| dovetell.css refactor not done | Low | All CSS still inline per page |
| dovetell-data.json not done | Low | Questions/content still hardcoded |
| Scoring model needs recalibration | High | See section 8 above |

---

## 10. Planned Pages (not yet built)

| Page | Purpose | Priority |
|---|---|---|
| /assessments/ dashboard multi-pid | Show all projects per email after verification | Medium |
| /recommendations/ | Personalized offer page — built May 1 | Done |
| Email auto-response | Send results to assessment taker | High |
| Formspree auto-response | Check Business plan feature | High |

---

## 11. Design Decisions Log

| Decision | Date | Rationale |
|---|---|---|
| GitHub Pages over Carrd | May 1 | Free, version controlled, no character limits, clean URLs |
| Client-side ID generation | May 1 | No backend required, IDs sent to Formspree for backloading |
| uid permanent per browser | May 1 | Ties projects to a person without requiring account creation |
| pid persists across retakes | May 1 | Enables growth tracking per project |
| aid fresh per submission | May 1 | Tracks individual runs within a project |
| vid hardcoded v01 | May 1 | Simple versioning, bump when questions change |
| Hierarchy: email → uid → pid → aid | May 1 | Clean tree, not a graph. Email owns uid. uid owns pids. pid owns aids. |
| /assessments/ as separate page | May 1 | Returning user logic belongs in its own page, not embedded in assessment |
| /recommendations/ as separate page | May 1 | Offer page is a different job from assessment results |
| BYOK / local inference | May 1 | Not in the API cost business; trust signal for regulated industries |
| reCAPTCHA disabled | May 1 | Conflicts with AJAX fetch; Allowed Origins is sufficient |
| Formspree Business plan | May 1 | All submissions to dovetellio@gmail.com, clean LLC separation |
| Manual email replies until 50+ | May 1 | Personal founder reply converts better than automated template |
| Raw answers + skip tracking | May 1 | null in answer array = skipped question — product research signal |
| localStorage for run history | May 1 | No backend needed; full history per pid stored client-side |
| dovetell.css refactor deferred | May 1 | Premature optimization; do after first 10 real completions |
| dovetell-data.json refactor deferred | May 1 | Same; questions may change based on real data |

---

## 12. Refactor Queue (future)

### dovetell.css
Extract shared CSS into a single stylesheet. All pages currently
have duplicated nav, wordmark, button, color, and typography CSS.
**Trigger:** after first 10 real assessment completions from non-founder users.

### dovetell-data.json
Extract assessment questions, section names, icons, maturity levels,
scoring thresholds, offer tiers, and next step recommendations into
a JSON file fetched on load.
**Trigger:** same as above. Do both refactors in one motion.

### Scoring recalibration
Current thresholds (0–12, 13–24, 25–30, 31–36) designed for 36-point
scale. Actual scale is 90 points. Recommended new thresholds:
- Scattered: 0–30
- Structured: 31–54
- Coordinated: 55–72
- Compounding: 73–90
**Trigger:** before any marketing push. This affects how results read.

---

## 13. Not In Scope (intentional)

- Code review tool (never)
- Project management / tasks / sprints (never)
- LLM wrapper or chatbot (never)
- Autonomous context updates without human review (never — human in loop is a feature)
- Accounts before validation (defer — email + uid is enough for now)