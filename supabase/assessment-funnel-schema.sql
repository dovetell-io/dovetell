-- dovetell public assessment funnel schema
-- Status: draft
-- Created: 2026-05-14
--
-- Purpose:
--   Minimal Postgres shape for persisting public assessment runs, recommendation
--   events, content-download events, and later account-claim linkage.
--
-- Naming convention:
--   Local table columns use `[table_name_singular]_field_name`.
--   Foreign keys keep the foreign identifier name so ownership is obvious.
--   See dev-docs/database-naming-conventions.md.
--   Examples:
--     leads.lead_id
--     leads.lead_email
--     assessment_runs.assessment_run_id
--     assessment_runs.lead_id
--     assessment_answers.assessment_answer_score
--
-- Boundary:
--   This schema stores service/funnel state only. It must not become the
--   canonical store for customer-owned governed markdown context.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  lead_id uuid primary key default gen_random_uuid(),
  lead_email text not null,
  lead_normalized_email text not null,
  lead_first_seen_at timestamptz not null default now(),
  lead_last_seen_at timestamptz not null default now(),
  lead_marketing_consent boolean not null default false,
  lead_source text,
  lead_metadata jsonb not null default '{}'::jsonb,
  unique (lead_normalized_email)
);

create or replace function public.set_lead_normalized_email()
returns trigger
language plpgsql
as $$
begin
  new.lead_normalized_email := lower(trim(new.lead_email));
  return new;
end;
$$;

drop trigger if exists set_lead_normalized_email on public.leads;
create trigger set_lead_normalized_email
before insert or update of lead_email on public.leads
for each row execute function public.set_lead_normalized_email();

create table if not exists public.assessment_runs (
  assessment_run_id uuid primary key default gen_random_uuid(),
  assessment_run_browser_uid text,
  assessment_run_project_pid text,
  assessment_run_aid text,
  assessment_run_public_token text not null default encode(gen_random_bytes(16), 'hex'),
  lead_id uuid references public.leads(lead_id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  assessment_run_revision_id text not null,
  assessment_run_version_id text not null,
  assessment_run_score_raw integer not null check (assessment_run_score_raw >= 0),
  assessment_run_score_raw_max integer not null check (assessment_run_score_raw_max > 0),
  assessment_run_score_display integer not null check (assessment_run_score_display between 0 and 100),
  assessment_run_score_display_max integer not null default 100,
  assessment_run_level_id text not null,
  assessment_run_level_name text not null,
  assessment_run_biggest_gap_id text,
  assessment_run_biggest_gap_name text,
  assessment_run_project_name text,
  assessment_run_respondent_role text,
  assessment_run_team_size text,
  assessment_run_company_name text,
  assessment_run_industry_name text,
  assessment_run_ai_tool text,
  assessment_run_discovery_source text,
  assessment_run_email_gate_trigger text,
  assessment_run_claim_url text,
  assessment_run_submitted_at timestamptz not null default now(),
  assessment_run_claimed_at timestamptz,
  assessment_run_created_at timestamptz not null default now(),
  unique (assessment_run_public_token),
  unique (assessment_run_aid)
);

create index if not exists assessment_runs_lead_id_idx
  on public.assessment_runs(lead_id);

create index if not exists assessment_runs_user_id_idx
  on public.assessment_runs(user_id);

create index if not exists assessment_runs_project_pid_idx
  on public.assessment_runs(assessment_run_project_pid);

create index if not exists assessment_runs_revision_id_idx
  on public.assessment_runs(assessment_run_revision_id);

create table if not exists public.assessment_answers (
  assessment_answer_id uuid primary key default gen_random_uuid(),
  assessment_run_id uuid not null references public.assessment_runs(assessment_run_id) on delete cascade,
  assessment_answer_revision_id text not null,
  assessment_answer_section_id text not null,
  assessment_answer_section_name text not null,
  assessment_answer_question_id text not null,
  assessment_answer_score integer,
  assessment_answer_question_weight integer not null default 1,
  assessment_answer_weighted_score integer generated always as (
    coalesce(assessment_answer_score, 0) * assessment_answer_question_weight
  ) stored,
  assessment_answer_created_at timestamptz not null default now(),
  unique (assessment_run_id, assessment_answer_question_id)
);

create index if not exists assessment_answers_run_id_idx
  on public.assessment_answers(assessment_run_id);

create table if not exists public.recommendation_events (
  recommendation_event_id uuid primary key default gen_random_uuid(),
  assessment_run_id uuid references public.assessment_runs(assessment_run_id) on delete set null,
  lead_id uuid references public.leads(lead_id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  recommendation_event_key text not null,
  recommendation_event_name text,
  recommendation_event_level_id text,
  recommendation_event_score_display integer check (
    recommendation_event_score_display is null
    or recommendation_event_score_display between 0 and 100
  ),
  recommendation_event_respondent_role text,
  recommendation_event_team_size text,
  recommendation_event_ai_tool text,
  recommendation_event_biggest_gap_id text,
  recommendation_event_biggest_gap_name text,
  recommendation_event_url_params jsonb not null default '{}'::jsonb,
  recommendation_event_created_at timestamptz not null default now()
);

create index if not exists recommendation_events_run_id_idx
  on public.recommendation_events(assessment_run_id);

create table if not exists public.content_download_events (
  content_download_event_id uuid primary key default gen_random_uuid(),
  assessment_run_id uuid references public.assessment_runs(assessment_run_id) on delete set null,
  lead_id uuid references public.leads(lead_id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  content_download_event_key text not null,
  content_download_event_name text,
  content_download_event_href text,
  content_download_event_type text not null default 'click'
    check (content_download_event_type in ('view', 'click', 'download')),
  content_download_event_created_at timestamptz not null default now()
);

create index if not exists content_download_events_run_id_idx
  on public.content_download_events(assessment_run_id);

create table if not exists public.account_claims (
  account_claim_id uuid primary key default gen_random_uuid(),
  assessment_run_id uuid not null references public.assessment_runs(assessment_run_id) on delete cascade,
  lead_id uuid references public.leads(lead_id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  account_claim_method text not null
    check (account_claim_method in ('email_magic_link', 'oauth', 'anonymous_upgrade', 'manual')),
  account_claim_created_at timestamptz not null default now(),
  unique (assessment_run_id, user_id)
);

create index if not exists account_claims_user_id_idx
  on public.account_claims(user_id);

alter table public.leads enable row level security;
alter table public.assessment_runs enable row level security;
alter table public.assessment_answers enable row level security;
alter table public.recommendation_events enable row level security;
alter table public.content_download_events enable row level security;
alter table public.account_claims enable row level security;

-- Public inserts should go through a server-side intake function.
-- Do not grant broad anonymous table inserts from the browser until abuse,
-- validation, rate limits, and payload shape are finalized.

create policy "Users can read claimed assessment runs"
  on public.assessment_runs
  for select
  using (auth.uid() is not null and auth.uid() = user_id);

create policy "Users can read answers for claimed assessment runs"
  on public.assessment_answers
  for select
  using (
    exists (
      select 1
      from public.assessment_runs r
      where r.assessment_run_id = assessment_answers.assessment_run_id
        and r.user_id = auth.uid()
    )
  );

create policy "Users can read own recommendation events"
  on public.recommendation_events
  for select
  using (auth.uid() is not null and auth.uid() = user_id);

create policy "Users can read own content events"
  on public.content_download_events
  for select
  using (auth.uid() is not null and auth.uid() = user_id);

create policy "Users can read own account claims"
  on public.account_claims
  for select
  using (auth.uid() is not null and auth.uid() = user_id);
