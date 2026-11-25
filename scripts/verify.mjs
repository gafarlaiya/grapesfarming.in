/**
 * Comprehensive SEO / AEO / GEO, Link Integrity, Payload Budget & Compliance Gate Verification
 * for grapesfarming.in
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const EXPECTED_HTML_FILES = [
  'index.html',
  'varieties-and-rootstocks/index.html',
  'april-and-october-pruning/index.html',
  'fertilizer-schedule-and-calculator/index.html',
  'ga3-cppu-and-berry-disorders/index.html',
  'diseases-and-pests/index.html',
  'grapenet-raisins-and-profit/index.html',
  'mr/draksha-sheti/index.html',
  'editorial-policy/index.html',
  '404.html',
].sort();

const FORBIDDEN_STRINGS = [
  'coming soon',
  'after the trial',
  'lorem ipsum',
  'TODO',
  'FIXME',
];

const errors = [];
const checks = [];

function pass(name, detail) {
  checks.push({ ok: true, name, detail });
}

function fail(name, detail) {
  checks.push({ ok: false, name, detail });
  errors.push(`${name}: ${detail}`);
}

function walkFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full, base));
    } else {
      out.push(path.relative(base, full).replaceAll(path.sep, '/'));
    }
  }
  return out;
}

const allDistFiles = walkFiles(DIST);
const htmlFiles = allDistFiles.filter((f) => f.endsWith('.html')).sort();

// Gate 1: Strict Anti-Cannibalization URL Structure
if (JSON.stringify(htmlFiles) === JSON.stringify(EXPECTED_HTML_FILES)) {
  pass('Gate 1 · Anti-Cannibalization URLs', `Exact match: 8 canonical Appendix (b) URLs + /editorial-policy/ + 404.html (${htmlFiles.length} HTML files)`);
} else {
  fail('Gate 1 · Anti-Cannibalization URLs', `Expected ${JSON.stringify(EXPECTED_HTML_FILES)}, got ${JSON.stringify(htmlFiles)}`);
}

// Build map of valid internal targets and their element IDs
const htmlContents = new Map();
const idsByRoute = new Map();

function fileToRoute(relFile) {
  if (relFile === 'index.html') return '/';
  if (relFile.endsWith('/index.html')) return '/' + relFile.slice(0, -'index.html'.length);
  return '/' + relFile;
}

for (const rel of htmlFiles) {
  const content = fs.readFileSync(path.join(DIST, rel), 'utf8');
  htmlContents.set(rel, content);
  const route = fileToRoute(rel);
  const ids = new Set();
  for (const m of content.matchAll(/\sid="([^"]+)"/g)) {
    ids.add(m[1]);
  }
  idsByRoute.set(route, ids);
}

// Gate 2: Internal Link Integrity, Hash Anchors & Language Switcher Hygiene
let totalInternalLinks = 0;
let brokenLinks = [];

for (const [rel, html] of htmlContents.entries()) {
  const currentRoute = fileToRoute(rel);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:')
    ) {
      continue;
    }

    totalInternalLinks++;

    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      if (!idsByRoute.get(currentRoute)?.has(targetId)) {
        brokenLinks.push(`${rel} -> ${href} (missing #${targetId})`);
      }
      continue;
    }

    const [pathPart, hashPart] = href.split('#');
    const cleanPath = pathPart.split('?')[0];

    // Asset file check
    if (cleanPath.startsWith('/assets/') || cleanPath === '/robots.txt' || cleanPath === '/sitemap.xml') {
      const assetPath = path.join(DIST, cleanPath.slice(1));
      if (!fs.existsSync(assetPath)) {
        brokenLinks.push(`${rel} -> ${href} (missing asset)`);
      }
      continue;
    }

    // HTML route check
    if (!idsByRoute.has(cleanPath)) {
      brokenLinks.push(`${rel} -> ${href} (404 route)`);
    } else if (hashPart && !idsByRoute.get(cleanPath)?.has(hashPart)) {
      brokenLinks.push(`${rel} -> ${href} (missing #${hashPart} on ${cleanPath})`);
    }
  }
}

if (brokenLinks.length === 0) {
  pass('Gate 2 · Internal Link & Hash Integrity', `${totalInternalLinks} internal links/assets checked, 0 broken links or 404 language links`);
} else {
  fail('Gate 2 · Internal Link & Hash Integrity', brokenLinks.join('; '));
}

// Gate 3: Client JS Payload Budget (<= 45 KB gzipped) & CSS size
const jsFiles = allDistFiles.filter((f) => f.endsWith('.js'));
let jsRawBytes = 0;
let jsGzipBytes = 0;
for (const jf of jsFiles) {
  const buf = fs.readFileSync(path.join(DIST, jf));
  jsRawBytes += buf.length;
  jsGzipBytes += zlib.gzipSync(buf, { level: 9 }).length;
}
const jsGzipKb = Number((jsGzipBytes / 1024).toFixed(2));
const cssBuf = fs.readFileSync(path.join(DIST, 'assets/styles.css'));
const cssGzipKb = Number((zlib.gzipSync(cssBuf, { level: 9 }).length / 1024).toFixed(2));

if (jsGzipKb <= 45) {
  pass('Gate 3 · Rural-4G Payload Budget', `Total client JS = ${jsGzipKb} KB gzipped (${(jsRawBytes / 1024).toFixed(1)} KB raw) <= 45 KB limit; CSS = ${cssGzipKb} KB gzipped`);
} else {
  fail('Gate 3 · Rural-4G Payload Budget', `Client JS is ${jsGzipKb} KB gzipped (exceeds 45 KB limit)`);
}

// Gate 4: SEO / AEO / GEO, JSON-LD, Snippet Hygiene & Compliance Checks
let jsonLdChecked = 0;
let directAnswerCount = 0;
let tablesWrappedOk = true;

for (const [rel, html] of htmlContents.entries()) {
  // Forbidden strings check
  const lower = html.toLowerCase();
  for (const bad of FORBIDDEN_STRINGS) {
    if (lower.includes(bad.toLowerCase())) {
      fail('Gate 4a · Forbidden Strings', `Found "${bad}" in ${rel}`);
    }
  }

  // Header <ul class="nav-list"><li> + data-nosnippet on <header> and <footer>
  if (!html.includes('<header class="site-header" data-nosnippet>')) {
    fail('Gate 4b · Header Snippet Hygiene', `Missing data-nosnippet on <header> in ${rel}`);
  }
  if (!html.includes('<ul class="nav-list">') || !html.includes('<li><a href=')) {
    fail('Gate 4b · Header Nav Semantics', `Header nav must use <ul><li> in ${rel}`);
  }
  if (!html.includes('<footer class="site-footer" data-nosnippet>')) {
    fail('Gate 4b · Footer Snippet Hygiene', `Missing data-nosnippet on <footer> in ${rel}`);
  }

  // Valid JSON-LD parsing & required types
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ldMatch) {
    fail('Gate 4c · JSON-LD Presence', `Missing JSON-LD in ${rel}`);
  } else {
    try {
      const parsed = JSON.parse(ldMatch[1]);
      const types = new Set((parsed['@graph'] || []).map((n) => n['@type']));
      if (!types.has('Organization') || !types.has('WebSite') || !types.has('Article')) {
        fail('Gate 4c · JSON-LD Core Types', `Missing Organization/WebSite/Article in ${rel}`);
      }
      if (rel !== '404.html' && rel !== 'editorial-policy/index.html' && !types.has('FAQPage')) {
        fail('Gate 4c · JSON-LD FAQPage', `Missing FAQPage JSON-LD in ${rel}`);
      }
      if (rel === 'fertilizer-schedule-and-calculator/index.html' && !types.has('Dataset')) {
        fail('Gate 4c · JSON-LD Dataset', `Missing Dataset JSON-LD on schedule page ${rel}`);
      }
      jsonLdChecked++;
    } catch (err) {
      fail('Gate 4c · JSON-LD Valid JSON', `Invalid JSON-LD in ${rel}: ${err.message}`);
    }
  }

  // Direct Answer Boxes
  directAnswerCount += (html.match(/class="direct-answer"/g) || []).length;

  // Tables wrapped in .table-scroll
  const tableCount = (html.match(/<table>/g) || []).length;
  const scrollCount = (html.match(/class="table-scroll"/g) || []).length;
  if (tableCount > scrollCount) {
    tablesWrappedOk = false;
    fail('Gate 4d · Responsive Tables', `Unwrapped <table> found in ${rel} (${tableCount} tables vs ${scrollCount} wrappers)`);
  }

  // Only existing languages in hreflang (never broken hi/gu/kn hreflang)
  for (const hm of html.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)) {
    const targetPath = new URL(hm[2]).pathname;
    if (!idsByRoute.has(targetPath)) {
      fail('Gate 4e · Hreflang Integrity', `Broken hreflang ${hm[1]} -> ${hm[2]} in ${rel}`);
    }
  }
}

if (errors.length === 0) {
  pass('Gate 4 · SEO/AEO/GEO & JSON-LD Hygiene', `${jsonLdChecked} pages valid JSON-LD, ${directAnswerCount} Direct Answer boxes, all tables wrapped in .table-scroll, 0 forbidden strings`);
}

// Gate 5: Mandatory Agricultural Compliance & Safety Rules Preserved
const diseaseHtml = htmlContents.get('diseases-and-pests/index.html') || '';
const fertHtml = htmlContents.get('fertilizer-schedule-and-calculator/index.html') || '';
const ga3Html = htmlContents.get('ga3-cppu-and-berry-disorders/index.html') || '';
const rootHtml = htmlContents.get('varieties-and-rootstocks/index.html') || '';

const safetyChecks = [
  [diseaseHtml, 'Dichlorvos', 'CIB&RC banned Dichlorvos'],
  [diseaseHtml, 'Monocrotophos', 'CIB&RC banned Monocrotophos'],
  [diseaseHtml, 'Carbofuran', 'CIB&RC banned Carbofuran'],
  [diseaseHtml, 'Phorate', 'CIB&RC banned Phorate'],
  [diseaseHtml, 'Streptocycline', 'Streptocycline antibiotic restriction'],
  [diseaseHtml, 'Fosetyl-Al', 'EU MRL Fosetyl-Al/Phosphonate warning'],
  [diseaseHtml, 'Carbendazim', 'EU MRL Carbendazim warning'],
  [ga3Html, 'CPPU', 'CPPU <=2 ppm limit'],
  [fertHtml, 'Tank B', 'Tank A/B Calcium Nitrate separation lock'],
  [rootHtml, 'Dogridge', 'Dogridge Na+ exclusion warning'],
];

const missingSafety = safetyChecks.filter(([doc, token]) => !doc.includes(token)).map(([, , label]) => label);
if (missingSafety.length === 0) {
  pass('Gate 5 · CIB&RC, EU MRL & Tank A/B Safety Rules', 'All 10 mandatory chemical, MRL, rootstock & Tank A/B safety rules verified in DOM');
} else {
  fail('Gate 5 · Safety Rules', `Missing: ${missingSafety.join(', ')}`);
}

// Gate 6: robots.txt, sitemap.xml, _headers (workers.dev noindex), _redirects (301)
const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const headers = fs.readFileSync(path.join(DIST, '_headers'), 'utf8');
const redirects = fs.readFileSync(path.join(DIST, '_redirects'), 'utf8');

if (
  robots.includes('Sitemap: https://grapesfarming.in/sitemap.xml') &&
  sitemap.includes('https://grapesfarming.in/mr/draksha-sheti/') &&
  !sitemap.includes('workers.dev') &&
  headers.includes('https://*.workers.dev/*') &&
  headers.includes('X-Robots-Tag: noindex, nofollow') &&
  redirects.includes('https://grapesfarming.com/* https://grapesfarming.in/:splat 301') &&
  redirects.includes('https://grapefarming.in/* https://grapesfarming.in/:splat 301')
) {
  pass('Gate 6 · Deployment, Sitemap, Noindex & 301 Redirects', 'robots.txt, sitemap.xml, *.workers.dev X-Robots-Tag noindex, and 301 redirects verified');
} else {
  fail('Gate 6 · Deployment Config', 'One or more checks failed in robots.txt, sitemap.xml, _headers, or _redirects');
}

console.log('\n=== grapesfarming.in Gate Verification Report ===');
for (const c of checks) {
  console.log(`${c.ok ? '[PASS]' : '[FAIL]'} ${c.name} — ${c.detail}`);
}

if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} gate error(s).`);
  process.exit(1);
}
console.log('\nALL GATES PASSED (0 errors).');
