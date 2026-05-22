const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'writing');
const OUTPUT_DIR = path.join(ROOT, 'writing');
const SITE_URL = 'https://preprod.dovetell.io';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: source };

  const data = {};
  for (const line of match[1].split('\n')) {
    const item = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!item) continue;
    data[item[1]] = item[2].replace(/^"(.*)"$/, '$1');
  }

  return { data, body: match[2].trim() };
}

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
}

function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push('<ul>');
    for (const item of list) html.push(`<li>${inlineMarkdown(item)}</li>`);
    html.push('</ul>');
    list = [];
  }

  for (const line of lines) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      html.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      html.push(
        `<figure class="article-figure"><img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}" loading="lazy"><figcaption>${inlineMarkdown(image[1])}</figcaption></figure>`
      );
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return html.join('\n');
}

function articleShell(article, content) {
  const url = `${SITE_URL}/writing/${article.slug}/`;
  const title = `${article.title} - dovetell`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(title)}</title>
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="description" content="${escapeHtml(article.description)}">
<meta property="og:image" content="${SITE_URL}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:title" content="${escapeHtml(article.title)}">
<meta property="og:description" content="${escapeHtml(article.description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE_URL}/assets/og.png">
<script defer data-domain="dovetell.io" src="https://plausible.io/js/script.js"></script>
<link rel="stylesheet" href="/assets/preprod-banner.css"/>
<script defer src="/assets/preprod-banner.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#111223;--ink-2:#202236;--paper:#fbfbff;--paper-2:#f1f2f8;--line:#dfe2ee;--muted:#62677e;--blurple:#5865f2;--blurple-dark:#3742c5;--green:#16834a;--sans:'Plus Jakarta Sans',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace}
html{scroll-behavior:smooth}
body{min-height:100vh;font-family:var(--sans);color:var(--ink);background:var(--paper);overflow-x:hidden}
a{color:inherit}
.shell{width:min(1060px,calc(100% - 48px));margin:0 auto}
nav{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(17,18,35,.92);backdrop-filter:blur(14px)}
.nav-inner{height:64px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-size:20px;font-weight:800;letter-spacing:0}
.wordmark img{width:30px;height:30px;border-radius:7px}
.nav-links{display:flex;align-items:center;gap:22px}
.nav-links a{color:rgba(247,247,255,.72);font-size:13px;font-weight:600;text-decoration:none}
.nav-links a:hover{color:#fff}
.nav-cta{color:#fff!important;background:var(--blurple);border-radius:8px;padding:10px 15px}
.nav-cta:hover{background:var(--blurple-dark)}
.article-hero{background:var(--ink);color:#fff;padding:74px 0 56px}
.kicker{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;color:#cfd3ff;font-family:var(--mono);font-size:11px;font-weight:700;text-transform:uppercase}
.status-dot{width:7px;height:7px;border-radius:50%;background:var(--green)}
.article-hero h1{max-width:860px;font-size:clamp(38px,6vw,68px);line-height:1.04;font-weight:800;letter-spacing:0;margin-bottom:20px}
.dek{max-width:680px;color:rgba(247,247,255,.74);font-size:18px;line-height:1.7}
.meta{margin-top:24px;color:rgba(247,247,255,.58);font-family:var(--mono);font-size:12px}
.article-wrap{display:grid;grid-template-columns:minmax(0,720px) 240px;gap:64px;padding:64px 0 86px;align-items:start}
.article{font-size:18px;line-height:1.78;color:var(--ink-2)}
.article h1{display:none}
.article h2{font-size:28px;line-height:1.2;color:var(--ink);margin:46px 0 14px;letter-spacing:0}
.article p{margin:0 0 22px}
.article ul{margin:0 0 26px 22px;display:grid;gap:9px}
.article li{padding-left:4px}
.article code{font-family:var(--mono);font-size:.9em;background:var(--paper-2);border:1px solid var(--line);border-radius:5px;padding:1px 5px}
.article-figure{margin:34px 0 38px;border:1px solid var(--line);border-radius:8px;background:#fff;overflow:hidden}
.article-figure img{display:block;width:100%;height:auto}
.article-figure figcaption{border-top:1px solid var(--line);padding:12px 14px;color:var(--muted);font-size:13px;line-height:1.5}
.side-note{position:sticky;top:96px;border:1px solid var(--line);border-radius:8px;background:#fff;padding:18px}
.side-note h2{font-size:13px;text-transform:uppercase;font-family:var(--mono);color:var(--blurple);margin-bottom:12px}
.side-note p{font-size:13px;line-height:1.65;color:var(--muted);margin-bottom:14px}
.side-note a{font-size:13px;font-weight:800;text-decoration:none;color:var(--blurple)}
footer{border-top:1px solid var(--line);padding:28px 0;color:var(--muted);background:#fff}
.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}
.footer-links{display:flex;gap:18px;flex-wrap:wrap}
.footer-links a{font-size:12px;text-decoration:none}
.footer-links a:hover{color:var(--ink)}
@media(max-width:860px){.shell{width:min(100% - 36px,1060px)}.article-wrap{grid-template-columns:1fr;gap:28px}.side-note{position:static}.nav-links{gap:10px}.nav-links a:not(.nav-cta){display:none}}
@media(max-width:560px){.shell{width:min(100% - 28px,1060px)}.article-hero{padding:56px 0 42px}.article{font-size:16px}.article h2{font-size:24px}.nav-inner{height:auto;min-height:62px;padding:10px 0}}
</style>
</head>
<body>
<nav>
  <div class="shell nav-inner">
    <a class="wordmark" href="/">
      <img src="/assets/favicon.png" alt="" aria-hidden="true">
      <span>dovetell</span>
    </a>
    <div class="nav-links">
      <a href="/products">Products</a>
      <a href="/framework">Framework</a>
      <a href="/writing">Writings</a>
      <a href="/team-assessment">Assessment</a>
      <a href="/why">Why?</a>
      <a class="nav-cta" href="/products">View packs</a>
    </div>
  </div>
</nav>
<main>
  <header class="article-hero">
    <div class="shell">
      <div class="kicker"><span class="status-dot"></span>Writings</div>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="dek">${escapeHtml(article.description)}</p>
      <div class="meta">${escapeHtml(article.date)}</div>
    </div>
  </header>
  <div class="shell article-wrap">
    <article class="article">
${content}
    </article>
    <aside class="side-note" aria-label="Writing note">
      <h2>Why this exists</h2>
      <p>This essay introduces the problem dovetell is built around: teams lose momentum when important context is scattered, stale, or trapped in someone else's memory.</p>
      <a href="/writing/">Back to writings</a>
    </aside>
  </div>
</main>
<footer>
  <div class="shell footer-inner">
    <div>dovetell · Tell it once. Let it travel.</div>
    <div class="footer-links">
      <a href="/products">Products</a>
      <a href="/framework">Framework</a>
      <a href="/writing">Writings</a>
      <a href="/team-assessment">Assessment</a>
      <a href="/privacy">Privacy</a>
    </div>
  </div>
</footer>
</body>
</html>`;
}

function indexShell(articles) {
  const cards = articles.map((article) => `
      <a class="writing-card" href="/writing/${article.slug}/">
        <div class="card-meta">${escapeHtml(article.date)}</div>
        <h2>${escapeHtml(article.title)}</h2>
        <p>${escapeHtml(article.description)}</p>
      </a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Writings - dovetell</title>
<link rel="canonical" href="${SITE_URL}/writing/">
<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta name="description" content="Owned essays and field notes on context debt, reviewed team memory, and AI-assisted software work.">
<meta property="og:image" content="${SITE_URL}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:title" content="Writings - dovetell">
<meta property="og:description" content="Owned essays and field notes on context debt, reviewed team memory, and AI-assisted software work.">
<meta property="og:url" content="${SITE_URL}/writing/">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE_URL}/assets/og.png">
<script defer data-domain="dovetell.io" src="https://plausible.io/js/script.js"></script>
<link rel="stylesheet" href="/assets/preprod-banner.css"/>
<script defer src="/assets/preprod-banner.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#111223;--paper:#fbfbff;--paper-2:#f1f2f8;--line:#dfe2ee;--muted:#62677e;--blurple:#5865f2;--blurple-dark:#3742c5;--green:#16834a;--sans:'Plus Jakarta Sans',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace}
body{min-height:100vh;font-family:var(--sans);color:var(--ink);background:var(--paper)}
a{color:inherit}
.shell{width:min(1060px,calc(100% - 48px));margin:0 auto}
nav{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(17,18,35,.92);backdrop-filter:blur(14px)}
.nav-inner{height:64px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-size:20px;font-weight:800}
.wordmark img{width:30px;height:30px;border-radius:7px}
.nav-links{display:flex;align-items:center;gap:22px}
.nav-links a{color:rgba(247,247,255,.72);font-size:13px;font-weight:600;text-decoration:none}
.nav-links a:hover{color:#fff}.nav-cta{color:#fff!important;background:var(--blurple);border-radius:8px;padding:10px 15px}.nav-cta:hover{background:var(--blurple-dark)}
.hero{background:var(--ink);color:#fff;padding:82px 0 64px}
.kicker{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;color:#cfd3ff;font-family:var(--mono);font-size:11px;font-weight:700;text-transform:uppercase}.status-dot{width:7px;height:7px;border-radius:50%;background:var(--green)}
h1{max-width:780px;font-size:clamp(42px,7vw,76px);line-height:1.02;font-weight:800;letter-spacing:0;margin-bottom:20px}
.hero p{max-width:660px;color:rgba(247,247,255,.72);font-size:18px;line-height:1.7}
.writing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:54px 0 86px}
.writing-card{display:block;border:1px solid var(--line);border-radius:8px;background:#fff;padding:24px;text-decoration:none;transition:border-color .2s,transform .2s}
.writing-card:hover{border-color:rgba(88,101,242,.5);transform:translateY(-2px)}
.card-meta{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--blurple);margin-bottom:14px}
.writing-card h2{font-size:24px;line-height:1.18;margin-bottom:12px}
.writing-card p{color:var(--muted);font-size:14px;line-height:1.65}
.note{border-top:1px solid var(--line);background:var(--paper-2);padding:34px 0;color:var(--muted);font-size:14px;line-height:1.7}
footer{border-top:1px solid var(--line);padding:28px 0;color:var(--muted);background:#fff}.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}.footer-links{display:flex;gap:18px;flex-wrap:wrap}.footer-links a{font-size:12px;text-decoration:none}.footer-links a:hover{color:var(--ink)}
@media(max-width:760px){.shell{width:min(100% - 36px,1060px)}.writing-grid{grid-template-columns:1fr}.nav-links{gap:10px}.nav-links a:not(.nav-cta){display:none}}
@media(max-width:560px){.shell{width:min(100% - 28px,1060px)}.hero{padding:58px 0 44px}.nav-inner{height:auto;min-height:62px;padding:10px 0}}
</style>
</head>
<body>
<nav>
  <div class="shell nav-inner">
    <a class="wordmark" href="/">
      <img src="/assets/favicon.png" alt="" aria-hidden="true">
      <span>dovetell</span>
    </a>
    <div class="nav-links">
      <a href="/products">Products</a>
      <a href="/framework">Framework</a>
      <a href="/writing">Writings</a>
      <a href="/team-assessment">Assessment</a>
      <a href="/why">Why?</a>
      <a class="nav-cta" href="/products">View packs</a>
    </div>
  </div>
</nav>
<main>
  <header class="hero">
    <div class="shell">
      <div class="kicker"><span class="status-dot"></span>Writings</div>
      <h1>Essays for AI-assisted teams trying to stop starting cold.</h1>
      <p>Field notes on context debt, reviewed team memory, and the habits that help AI-assisted teams preserve what they learn.</p>
    </div>
  </header>
  <section class="shell writing-grid" aria-label="Writings">
${cards}
  </section>
  <section class="note">
    <div class="shell">Start with the core essays, then use the products and framework pages when you are ready to put the pattern into a repo.</div>
  </section>
</main>
<footer>
  <div class="shell footer-inner">
    <div>dovetell · Tell it once. Let it travel.</div>
    <div class="footer-links">
      <a href="/products">Products</a>
      <a href="/framework">Framework</a>
      <a href="/writing">Writings</a>
      <a href="/team-assessment">Assessment</a>
      <a href="/privacy">Privacy</a>
    </div>
  </div>
</footer>
</body>
</html>`;
}

function build() {
  const articles = fs.readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data, body } = parseFrontmatter(source);
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        slug: data.slug || path.basename(file, '.md'),
        body,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexShell(articles));

  for (const article of articles) {
    const articleDir = path.join(OUTPUT_DIR, article.slug);
    fs.mkdirSync(articleDir, { recursive: true });
    fs.writeFileSync(
      path.join(articleDir, 'index.html'),
      articleShell(article, markdownToHtml(article.body))
    );
  }
}

build();
