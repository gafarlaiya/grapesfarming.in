/**
 * Zero-dependency Static Site Generator for grapesfarming.in
 * Generates ONLY the strict 8 canonical Appendix (b) URLs + /editorial-policy/ + 404.html,
 * plus assets, robots.txt, sitemap.xml, Cloudflare Pages _headers and _redirects.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/data/site-data.js';
import {
  buildHomePage,
  buildVarietiesRootstocksPage,
  buildPruningPage,
} from '../src/pages/core-pages.js';
import {
  buildFertilizerCalculatorPage,
  buildGa3DisordersPage,
  buildDiseasesPestsPage,
  buildExportRaisinsProfitPage,
} from '../src/pages/cluster-pages.js';
import {
  buildMarathiPage,
  buildEditorialPolicyPage,
  build404Page,
} from '../src/pages/marathi-and-trust.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeOut(relPath, content) {
  const full = path.join(DIST, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}

function cleanDist() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);
}

const CANONICAL_ROUTES = [
  { slug: '/', file: 'index.html', build: buildHomePage, priority: '1.0' },
  { slug: '/varieties-and-rootstocks/', file: 'varieties-and-rootstocks/index.html', build: buildVarietiesRootstocksPage, priority: '0.9' },
  { slug: '/april-and-october-pruning/', file: 'april-and-october-pruning/index.html', build: buildPruningPage, priority: '0.9' },
  { slug: '/fertilizer-schedule-and-calculator/', file: 'fertilizer-schedule-and-calculator/index.html', build: buildFertilizerCalculatorPage, priority: '0.95' },
  { slug: '/ga3-cppu-and-berry-disorders/', file: 'ga3-cppu-and-berry-disorders/index.html', build: buildGa3DisordersPage, priority: '0.9' },
  { slug: '/diseases-and-pests/', file: 'diseases-and-pests/index.html', build: buildDiseasesPestsPage, priority: '0.9' },
  { slug: '/grapenet-raisins-and-profit/', file: 'grapenet-raisins-and-profit/index.html', build: buildExportRaisinsProfitPage, priority: '0.9' },
  { slug: '/mr/draksha-sheti/', file: 'mr/draksha-sheti/index.html', build: buildMarathiPage, priority: '0.9' },
];

const TRUST_ROUTES = [
  { slug: '/editorial-policy/', file: 'editorial-policy/index.html', build: buildEditorialPolicyPage, priority: '0.5' },
];

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#14532D"/>
  <circle cx="25" cy="30" r="6" fill="#DCFCE7"/>
  <circle cx="39" cy="30" r="6" fill="#DCFCE7"/>
  <circle cx="32" cy="42" r="6" fill="#86EFAC"/>
  <circle cx="32" cy="20" r="6" fill="#FFFFFF"/>
  <path d="M32 14V7M32 7c6 0 11 2.5 13 6" stroke="#86EFAC" stroke-width="3.5" fill="none" stroke-linecap="round"/>
</svg>`;

function buildSitemap() {
  const urls = [...CANONICAL_ROUTES, ...TRUST_ROUTES]
    .map((r) => {
      const loc = r.slug === '/' ? `${SITE.origin}/` : `${SITE.origin}${r.slug}`;
      const alternates =
        r.slug === '/' || r.slug === '/mr/draksha-sheti/'
          ? `\n    <xhtml:link rel="alternate" hreflang="en-IN" href="${SITE.origin}/"/>\n    <xhtml:link rel="alternate" hreflang="mr-IN" href="${SITE.origin}/mr/draksha-sheti/"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.origin}/"/>`
          : '';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITE.lastUpdated}</lastmod>\n    <priority>${r.priority}</priority>${alternates}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;
}

function buildCloudflareHeaders() {
  return `# Preview hosts: automatic noindex, nofollow so staging never competes with grapesfarming.in
https://*.workers.dev/*
  X-Robots-Tag: noindex, nofollow

https://*.pages.dev/*
  X-Robots-Tag: noindex, nofollow

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

function buildCloudflareRedirects() {
  return `# Permanent 301 canonical redirects for alternate domains, spellings, and www
https://grapesfarming.com/* https://grapesfarming.in/:splat 301
http://grapesfarming.com/* https://grapesfarming.in/:splat 301
https://www.grapesfarming.com/* https://grapesfarming.in/:splat 301
http://www.grapesfarming.com/* https://grapesfarming.in/:splat 301
https://www.grapesfarming.in/* https://grapesfarming.in/:splat 301
http://www.grapesfarming.in/* https://grapesfarming.in/:splat 301
https://grapefarming.in/* https://grapesfarming.in/:splat 301
http://grapefarming.in/* https://grapesfarming.in/:splat 301
https://www.grapefarming.in/* https://grapesfarming.in/:splat 301
https://grapefarming.com/* https://grapesfarming.in/:splat 301
https://www.grapefarming.com/* https://grapesfarming.in/:splat 301
`;
}

function main() {
  cleanDist();

  for (const route of [...CANONICAL_ROUTES, ...TRUST_ROUTES]) {
    writeOut(route.file, route.build());
  }
  writeOut('404.html', build404Page());

  // Copy static assets (CSS, ESM client JS, shared calculator engine, search index, favicon)
  writeOut('assets/styles.css', fs.readFileSync(path.join(ROOT, 'src/assets/styles.css'), 'utf8'));
  writeOut('assets/app.js', fs.readFileSync(path.join(ROOT, 'src/assets/app.js'), 'utf8'));
  writeOut('assets/calculator-engine.js', fs.readFileSync(path.join(ROOT, 'src/lib/calculator-engine.js'), 'utf8'));
  writeOut('assets/search-index.js', fs.readFileSync(path.join(ROOT, 'src/data/search-index.js'), 'utf8'));
  writeOut('assets/favicon.svg', FAVICON_SVG);

  // SEO + Cloudflare deployment config files
  writeOut('robots.txt', buildRobotsTxt());
  writeOut('sitemap.xml', buildSitemap());
  writeOut('_headers', buildCloudflareHeaders());
  writeOut('_redirects', buildCloudflareRedirects());

  console.log(`Built grapesfarming.in -> ${DIST} (${CANONICAL_ROUTES.length} canonical + ${TRUST_ROUTES.length} trust + 404.html)`);
}

main();
