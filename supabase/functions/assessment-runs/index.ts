import { createClient } from 'jsr:@supabase/supabase-js@2';

type IntakePayload = {
  lead?: {
    email?: string;
    marketing_consent?: boolean;
    source?: string;
  };
  run?: {
    legacy_uid?: string;
    legacy_pid?: string;
    legacy_aid?: string;
    revision_id?: string;
    version_id?: string;
    raw_score?: number;
    raw_max_score?: number;
    display_score?: number;
    display_max_score?: number;
    level_id?: string;
    level_name?: string;
    biggest_gap_id?: string;
    biggest_gap_name?: string;
    project_name?: string;
    role?: string;
    team_size?: string;
    company?: string;
    industry?: string;
    ai_tool?: string;
    discovery_source?: string;
    email_gate_trigger?: string;
  };
  answers?: Array<{
    section_id?: string;
    section_name?: string;
    question_id?: string;
    answer_score?: number | null;
    question_weight?: number;
  }>;
  client?: {
    path?: string;
    submitted_at?: string;
  };
};

const allowedOrigins = new Set([
  'https://dovetell.io',
  'https://www.dovetell.io',
  'https://preprod.dovetell.io',
  'http://127.0.0.1:4180',
  'http://localhost:4180',
  'http://127.0.0.1:4179',
  'http://localhost:4179',
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://dovetell.io',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function jsonResponse(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json',
    },
  });
}

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function cleanEmail(value: unknown) {
  const email = cleanText(value, 320).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isInteger(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value);
}

function publicSiteUrl() {
  return (Deno.env.get('DOVETELL_PUBLIC_SITE_URL') || 'https://dovetell.io').replace(/\/$/, '');
}

function supabaseEnvironment(request: Request) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('DOVETELL_SUPABASE_SERVICE_ROLE_KEY')
    || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return {
      response: jsonResponse(request, 500, { ok: false, error: 'missing_supabase_environment' }),
      supabase: null,
    };
  }

  return {
    response: null,
    supabase: createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    }),
  };
}

function validatePayload(payload: IntakePayload) {
  const errors: string[] = [];
  const run = payload.run || {};
  const lead = payload.lead || {};
  const answers = Array.isArray(payload.answers) ? payload.answers : [];
  const email = cleanEmail(lead.email);

  if (!email) errors.push('lead.email is required');
  if (!cleanText(run.revision_id, 120)) errors.push('run.revision_id is required');
  if (!cleanText(run.version_id, 40)) errors.push('run.version_id is required');
  if (!cleanText(run.legacy_aid, 80)) errors.push('run.legacy_aid is required');
  if (!isInteger(run.raw_score) || Number(run.raw_score) < 0) errors.push('run.raw_score must be a non-negative integer');
  if (!isInteger(run.raw_max_score) || Number(run.raw_max_score) <= 0) errors.push('run.raw_max_score must be a positive integer');
  if (!isInteger(run.display_score) || Number(run.display_score) < 0 || Number(run.display_score) > 100) {
    errors.push('run.display_score must be an integer from 0 to 100');
  }
  if (!isInteger(run.display_max_score) || Number(run.display_max_score) <= 0) {
    errors.push('run.display_max_score must be a positive integer');
  }
  if (isInteger(run.raw_score) && isInteger(run.raw_max_score) && Number(run.raw_score) > Number(run.raw_max_score)) {
    errors.push('run.raw_score cannot exceed run.raw_max_score');
  }
  if (!cleanText(run.level_id, 80)) errors.push('run.level_id is required');
  if (!cleanText(run.level_name, 80)) errors.push('run.level_name is required');
  if (answers.length === 0) errors.push('answers must include at least one answer');
  if (answers.length > 120) errors.push('answers exceeds max length');

  answers.forEach((answer, index) => {
    if (!cleanText(answer.section_id, 120)) errors.push(`answers[${index}].section_id is required`);
    if (!cleanText(answer.section_name, 120)) errors.push(`answers[${index}].section_name is required`);
    if (!cleanText(answer.question_id, 120)) errors.push(`answers[${index}].question_id is required`);
    if (answer.answer_score !== null && answer.answer_score !== undefined && !isInteger(answer.answer_score)) {
      errors.push(`answers[${index}].answer_score must be an integer or null`);
    }
    if (!isInteger(answer.question_weight) || Number(answer.question_weight) <= 0 || Number(answer.question_weight) > 5) {
      errors.push(`answers[${index}].question_weight must be an integer from 1 to 5`);
    }
  });

  return errors;
}

async function sendAssessmentEmail(params: {
  email: string;
  projectUrl: string;
  claimUrl: string;
  score: number;
  maxScore: number;
  level: string;
  projectName: string;
}) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    return { delivered: false, status: 'skipped_missing_resend_key' };
  }

  const from = Deno.env.get('DOVETELL_EMAIL_FROM') || 'dovetell <hello@dovetell.io>';
  const subject = 'Your dovetell assessment link';
  const projectLabel = escapeHtml(params.projectName || 'your project');
  const level = escapeHtml(params.level);
  const projectUrl = escapeHtml(params.projectUrl);
  const claimUrl = escapeHtml(params.claimUrl);
  const preview = `Your ${params.score}/${params.maxScore} ${params.level} result and project link are ready.`;
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${subject}</title>
      </head>
      <body style="margin:0;padding:0;background:#f5f6fb;color:#16182b;font-family:Inter,Arial,sans-serif;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f6fb;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e5f0;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="background:#111223;padding:24px 28px;color:#f7f7ff;">
                    <div style="font-size:22px;font-weight:800;letter-spacing:0;">dovetell</div>
                    <div style="margin-top:8px;font-size:13px;line-height:1.5;color:#cfd3ff;">Tell it once. Let it travel.</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 28px 12px;">
                    <p style="margin:0 0 10px;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5865f2;">Assessment saved</p>
                    <h1 style="margin:0 0 14px;font-size:28px;line-height:1.15;color:#111223;">Your assessment link is ready.</h1>
                    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4f566f;">You scored <strong style="color:#111223;">${params.score}/${params.maxScore}</strong> and landed in <strong style="color:#111223;">${level}</strong> for ${projectLabel}. Use the link below to return to this project thread, retake the assessment, and compare progress over time.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                      <tr>
                        <td>
                          <a href="${projectUrl}" style="display:inline-block;background:#5865f2;color:#ffffff;text-decoration:none;border-radius:8px;padding:13px 18px;font-size:14px;font-weight:800;">Open assessment link</a>
                        </td>
                      </tr>
                    </table>
                    <div style="border:1px solid #dfe2ee;border-radius:10px;background:#fbfbff;padding:16px 18px;margin:0 0 22px;">
                      <div style="font-size:12px;font-weight:800;color:#111223;margin-bottom:6px;">Project link</div>
                      <a href="${projectUrl}" style="font-size:13px;line-height:1.5;color:#5865f2;word-break:break-all;">${projectUrl}</a>
                    </div>
                    <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#4f566f;">A good next step: pick the weakest area from your results and make one small piece of context easier for your next AI session to reuse.</p>
                    <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#4f566f;">No account is required. This link opens this project thread. The private claim link is included below in case the browser-local project link is not enough on another device.</p>
                    <div style="border-top:1px solid #edf0f7;padding-top:16px;">
                      <div style="font-size:12px;font-weight:800;color:#6b7280;margin-bottom:6px;">Claim link</div>
                      <a href="${claimUrl}" style="font-size:12px;line-height:1.5;color:#6b7280;word-break:break-all;">${claimUrl}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 28px;">
                    <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">You received this because you requested your dovetell assessment results. Reply to this email if something looks off.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
  const text = [
    'Your dovetell assessment is ready',
    '',
    `You scored ${params.score}/${params.maxScore} (${params.level}) for ${params.projectName || 'your project'}.`,
    '',
    'Use this project link to return, retake the assessment, and track progress over time:',
    params.projectUrl,
    '',
    'Claim link:',
    params.claimUrl,
    '',
    'No account is required. Reply if something looks off.',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from,
        to: params.email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.warn('Resend rejected assessment email', response.status, detail.slice(0, 500));
      return { delivered: false, status: 'failed' };
    }

    return { delivered: true, status: 'sent' };
  } catch (error) {
    console.warn('Resend assessment email failed', error);
    return { delivered: false, status: 'failed' };
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(request) });
  }

  if (request.method === 'GET') {
    const token = cleanText(new URL(request.url).searchParams.get('token'), 80);
    if (!token) {
      return jsonResponse(request, 400, { ok: false, error: 'token_required' });
    }

    const { response, supabase } = supabaseEnvironment(request);
    if (response || !supabase) return response;

    const { data: runRow, error } = await supabase
      .from('assessment_runs')
      .select(`
        assessment_run_public_token,
        assessment_run_browser_uid,
        assessment_run_project_pid,
        assessment_run_aid,
        assessment_run_revision_id,
        assessment_run_score_display,
        assessment_run_score_display_max,
        assessment_run_level_id,
        assessment_run_level_name,
        assessment_run_biggest_gap_id,
        assessment_run_biggest_gap_name,
        assessment_run_respondent_role,
        assessment_run_team_size,
        assessment_run_ai_tool
      `)
      .eq('assessment_run_public_token', token)
      .single();

    if (error || !runRow) {
      return jsonResponse(request, 404, { ok: false, error: 'assessment_run_not_found' });
    }

    return jsonResponse(request, 200, {
      ok: true,
      run: {
        token: runRow.assessment_run_public_token,
        uid: runRow.assessment_run_browser_uid,
        pid: runRow.assessment_run_project_pid,
        aid: runRow.assessment_run_aid,
        rev: runRow.assessment_run_revision_id,
        score: runRow.assessment_run_score_display,
        max: runRow.assessment_run_score_display_max,
        level_id: runRow.assessment_run_level_id,
        level: runRow.assessment_run_level_name,
        gap_id: runRow.assessment_run_biggest_gap_id,
        gap: runRow.assessment_run_biggest_gap_name,
        role: runRow.assessment_run_respondent_role,
        team_size: runRow.assessment_run_team_size,
        ai_tool: runRow.assessment_run_ai_tool,
      },
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, 405, { ok: false, error: 'method_not_allowed' });
  }

  let payload: IntakePayload;
  try {
    payload = await request.json();
  } catch (_error) {
    return jsonResponse(request, 400, { ok: false, error: 'invalid_json' });
  }

  const errors = validatePayload(payload);
  if (errors.length > 0) {
    return jsonResponse(request, 400, { ok: false, error: 'invalid_payload', details: errors });
  }

  const { response, supabase } = supabaseEnvironment(request);
  if (response || !supabase) return response;

  const lead = payload.lead || {};
  const run = payload.run || {};
  const email = cleanEmail(lead.email);
  const now = new Date().toISOString();

  const { data: leadRow, error: leadError } = await supabase
    .from('leads')
    .upsert({
      lead_email: email,
      lead_normalized_email: email,
      lead_marketing_consent: Boolean(lead.marketing_consent),
      lead_source: cleanText(lead.source, 120) || 'assessment-gate',
      lead_last_seen_at: now,
    }, { onConflict: 'lead_normalized_email' })
    .select('lead_id')
    .single();

  if (leadError || !leadRow) {
    return jsonResponse(request, 500, { ok: false, error: 'lead_upsert_failed' });
  }

  const { data: runRow, error: runError } = await supabase
    .from('assessment_runs')
    .insert({
      assessment_run_browser_uid: cleanText(run.legacy_uid, 80),
      assessment_run_project_pid: cleanText(run.legacy_pid, 80),
      assessment_run_aid: cleanText(run.legacy_aid, 80),
      lead_id: leadRow.lead_id,
      assessment_run_revision_id: cleanText(run.revision_id, 120),
      assessment_run_version_id: cleanText(run.version_id, 40),
      assessment_run_score_raw: run.raw_score,
      assessment_run_score_raw_max: run.raw_max_score,
      assessment_run_score_display: run.display_score,
      assessment_run_score_display_max: run.display_max_score,
      assessment_run_level_id: cleanText(run.level_id, 80),
      assessment_run_level_name: cleanText(run.level_name, 80),
      assessment_run_biggest_gap_id: cleanText(run.biggest_gap_id, 120),
      assessment_run_biggest_gap_name: cleanText(run.biggest_gap_name, 120),
      assessment_run_project_name: cleanText(run.project_name, 120),
      assessment_run_respondent_role: cleanText(run.role, 120),
      assessment_run_team_size: cleanText(run.team_size, 80),
      assessment_run_company_name: cleanText(run.company, 120),
      assessment_run_industry_name: cleanText(run.industry, 120),
      assessment_run_ai_tool: cleanText(run.ai_tool, 120),
      assessment_run_discovery_source: cleanText(run.discovery_source, 120),
      assessment_run_email_gate_trigger: cleanText(run.email_gate_trigger, 80),
      assessment_run_submitted_at: cleanText(payload.client?.submitted_at, 80) || now,
    })
    .select('assessment_run_id, assessment_run_public_token')
    .single();

  if (runError || !runRow) {
    return jsonResponse(request, 500, { ok: false, error: 'assessment_run_insert_failed' });
  }

  const answerRows = (payload.answers || []).map((answer) => ({
    assessment_run_id: runRow.assessment_run_id,
    assessment_answer_revision_id: cleanText(run.revision_id, 120),
    assessment_answer_section_id: cleanText(answer.section_id, 120),
    assessment_answer_section_name: cleanText(answer.section_name, 120),
    assessment_answer_question_id: cleanText(answer.question_id, 120),
    assessment_answer_score: answer.answer_score ?? null,
    assessment_answer_question_weight: answer.question_weight,
  }));

  const { error: answersError } = await supabase
    .from('assessment_answers')
    .insert(answerRows);

  if (answersError) {
    return jsonResponse(request, 500, { ok: false, error: 'assessment_answers_insert_failed' });
  }

  const baseUrl = publicSiteUrl();
  const projectUrl = `${baseUrl}/assessments/?pid=${encodeURIComponent(cleanText(run.legacy_pid, 80))}`;
  const claimUrl = `${baseUrl}/assessments/?token=${runRow.assessment_run_public_token}`;
  await supabase
    .from('assessment_runs')
    .update({ assessment_run_claim_url: claimUrl })
    .eq('assessment_run_id', runRow.assessment_run_id);

  const emailResult = await sendAssessmentEmail({
    email,
    projectUrl,
    claimUrl,
    score: Number(run.display_score),
    maxScore: Number(run.display_max_score),
    level: cleanText(run.level_name, 80),
    projectName: cleanText(run.project_name, 120),
  });

  return jsonResponse(request, 200, {
    ok: true,
    run_id: runRow.assessment_run_id,
    lead_id: leadRow.lead_id,
    public_token: runRow.assessment_run_public_token,
    project_url: projectUrl,
    claim_url: claimUrl,
    email_delivered: emailResult.delivered,
    email_status: emailResult.status,
  });
});
