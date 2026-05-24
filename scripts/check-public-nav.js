const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PRIMARY_NAV_FILES = [
  'index.html',
  'products/index.html',
  'framework/index.html',
  'why/index.html',
  'writing/index.html',
  'writing/context-debt/index.html',
];

const SPECIAL_NAV_FILES = [
  'privacy/index.html',
  'recommendations/index.html',
  'assessments/index.html',
  'team-assessment/index.html',
];

const SOURCE_FILES = [
  'scripts/build-writing.js',
  'dovetell-data.json',
  'team-assessment/assessment-config.json',
];

const PRIMARY_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/framework', label: 'Framework' },
  { href: '/writing', label: 'Writings' },
  { href: '/team-assessment', label: 'Assessment' },
  { href: '/why', label: 'Why?' },
];

const BANNED_PUBLIC_TERMS = [
  /\bView packs\b/i,
  /\bTemplate Pack\b/i,
  /\bpackage ladder\b/i,
  /\bcompact package\b/i,
  /\bChoose a pack\b/i,
  /\bown the category language\b/i,
  /\bpublic intake\b/i,
  /\bprivacy-friendly analytics\b/i,
  /\bsource integrations only after\b/i,
];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function navFrom(html) {
  return html.match(/<nav[\s\S]*?<\/nav>/i)?.[0] || '';
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function fail(failures, file, message) {
  failures.push(`${file}: ${message}`);
}

function hasHref(nav, href) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`<a\\b[^>]*href=["']${escaped}["']`, 'i').test(nav);
}

function checkPrimaryNav(file, failures) {
  const html = read(file);
  const nav = navFrom(html);
  const navText = stripTags(nav);

  if (!nav) fail(failures, file, 'missing <nav> block');
  if (!hasHref(nav, '/')) fail(failures, file, 'wordmark/home link must point to /');

  for (const link of PRIMARY_LINKS) {
    if (!hasHref(nav, link.href)) fail(failures, file, `primary nav missing ${link.href}`);
    if (!navText.includes(link.label)) fail(failures, file, `primary nav missing "${link.label}" label`);
  }

  if (!navText.includes('View products')) fail(failures, file, 'CTA must read "View products"');
  if (!hasHref(nav, '/products')) fail(failures, file, 'CTA must point to /products');
  if (!/<img\b[^>]*src=["']\/assets\/favicon\.png["']/i.test(nav)) {
    fail(failures, file, 'primary wordmark must include /assets/favicon.png mark');
  }
}

function checkSpecialNav(file, failures) {
  const html = read(file);
  const nav = navFrom(html);

  if (!nav) fail(failures, file, 'missing <nav> block');
  if (!hasHref(nav, '/')) fail(failures, file, 'wordmark/home link must point to /');
}

function checkBannedTerms(file, failures) {
  const source = read(file);
  for (const pattern of BANNED_PUBLIC_TERMS) {
    if (pattern.test(source)) fail(failures, file, `contains banned public term ${pattern}`);
  }
}

function main() {
  const failures = [];
  const files = [...PRIMARY_NAV_FILES, ...SPECIAL_NAV_FILES, ...SOURCE_FILES];

  for (const file of PRIMARY_NAV_FILES) checkPrimaryNav(file, failures);
  for (const file of SPECIAL_NAV_FILES) checkSpecialNav(file, failures);
  for (const file of files) checkBannedTerms(file, failures);

  if (failures.length) {
    console.error('Public nav/copy contract failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Public nav/copy contract passed (${files.length} files checked).`);
}

main();
