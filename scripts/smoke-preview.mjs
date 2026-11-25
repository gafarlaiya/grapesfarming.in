/**
 * Live local preview smoke test: boots an HTTP server over dist/ and verifies
 * HTTP 200 on all 8 canonical URLs + /editorial-policy/ + assets + robots/sitemap,
 * plus HTTP 404 on unknown routes.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(DIST, p.slice(1));
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(fs.readFileSync(path.join(DIST, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
  fs.createReadStream(fp).pipe(res);
});

await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const port = srv.address().port;

const routes = [
  '/',
  '/varieties-and-rootstocks/',
  '/april-and-october-pruning/',
  '/fertilizer-schedule-and-calculator/',
  '/ga3-cppu-and-berry-disorders/',
  '/diseases-and-pests/',
  '/grapenet-raisins-and-profit/',
  '/mr/draksha-sheti/',
  '/editorial-policy/',
  '/assets/styles.css',
  '/assets/app.js',
  '/assets/calculator-engine.js',
  '/assets/search-index.js',
  '/robots.txt',
  '/sitemap.xml',
];

for (const u of routes) {
  const res = await fetch(`http://127.0.0.1:${port}${u}`);
  if (res.status !== 200) throw new Error(`Expected 200 for ${u}, got ${res.status}`);
  const body = await res.text();
  console.log(`[200] ${u} (${body.length.toLocaleString('en-US')} bytes)`);
}

const r404 = await fetch(`http://127.0.0.1:${port}/does-not-exist/`);
if (r404.status !== 404) throw new Error(`Expected 404, got ${r404.status}`);
console.log('[404] /does-not-exist/ (custom 404.html verified)');

srv.close();
