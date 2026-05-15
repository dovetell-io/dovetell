# Resend Assessment Email Template

Status: active
Created: 2026-05-15
Owner: jc/site-implementer
Source: public assessment email delivery hardening

This page documents the transactional email sent when someone saves an
assessment link from the public website.

## Purpose

Send a professional, trustworthy email that lets someone reopen a saved
assessment thread without implying that **dovetell** is already a full account
platform.

The email should:

- confirm that the assessment was saved
- show the score and level
- provide the project assessment link
- include the private claim link as a fallback
- avoid sales language, platform overclaims, and fake urgency
- keep the product name lowercase as `dovetell`

## Implementation

The template lives in:

- `supabase/functions/assessment-runs/index.ts`

The `sendAssessmentEmail()` function builds both HTML and plain text versions
for Resend. The function is intentionally self-contained because Supabase Edge
Functions deploy a single function source and should not depend on a browser or
site build pipeline.

## Public-Safe Copy

Subject:

> Your dovetell assessment link

Primary headline:

> Your assessment link is ready.

Body centerline:

> Use this project link to return to this project thread, retake the assessment,
> and compare progress over time.

Guardrail:

> No account is required. This link opens this project thread.

## Variables

- `email`: recipient email
- `projectUrl`: browser/project-thread URL, currently `/assessments/?pid=...`
- `claimUrl`: token-backed claim URL, currently `/assessments/?token=...`
- `score`: display score
- `maxScore`: display max score
- `level`: assessment level name
- `projectName`: optional project label from the assessment gate

## Design Notes

- The template uses inline CSS for email-client compatibility.
- The visual system uses the current public site palette: near-black,
  blurple, soft paper, and restrained borders.
- The email says "assessment saved" rather than "account created" because
  account persistence is not the public promise yet.
- The claim link is intentionally secondary. It is useful for device recovery,
  but the main human-facing concept is still the project assessment link.

## Review Checklist

- [ ] Send from a verified `DOVETELL_EMAIL_FROM` domain.
- [ ] Confirm `RESEND_API_KEY` exists in the deployed function environment.
- [ ] Test one preprod submission from `https://preprod.dovetell.io`.
- [ ] Confirm Resend reports `sent`.
- [ ] Confirm the project link opens the saved assessment thread.
- [ ] Confirm the email does not promise accounts, dashboards, automated drift
      detection, or review queues.

