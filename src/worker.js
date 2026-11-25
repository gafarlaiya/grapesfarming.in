/**
 * Cloudflare Worker entrypoint for grapesfarming.in
 * - Enforces 301 canonical redirects from alternate domains/spellings/www
 * - Injects X-Robots-Tag: noindex, nofollow on *.workers.dev and *.pages.dev previews
 * - Adds security & cache headers while serving static dist/ assets
 */

export const CANONICAL_HOST = 'grapesfarming.in';

export const REDIRECT_HOSTS = new Set([
  'www.grapesfarming.in',
  'grapesfarming.com',
  'www.grapesfarming.com',
  'grapefarming.in',
  'www.grapefarming.in',
  'grapefarming.com',
  'www.grapefarming.com',
]);

export function isPreviewHost(hostname) {
  const host = String(hostname || '').toLowerCase();
  return host.endsWith('.workers.dev') || host.endsWith('.pages.dev');
}

export function shouldRedirectHost(hostname) {
  return REDIRECT_HOSTS.has(String(hostname || '').toLowerCase());
}

export function applyResponseHeaders(response, hostname) {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Frame-Options', 'SAMEORIGIN');

  if (isPreviewHost(hostname)) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();

    if (shouldRedirectHost(hostname)) {
      const target = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
      return Response.redirect(target.toString(), 301);
    }

    const assetResponse = env?.ASSETS
      ? await env.ASSETS.fetch(request)
      : new Response('Not Found', { status: 404 });

    return applyResponseHeaders(assetResponse, hostname);
  },
};
