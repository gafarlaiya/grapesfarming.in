/**
 * Cloudflare Pages Middleware (used when deployed via Git integration).
 * Static Direct Upload deployments also enforce these rules via dist/_headers & dist/_redirects.
 */
import { CANONICAL_HOST, shouldRedirectHost, applyResponseHeaders } from '../src/worker.js';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  if (shouldRedirectHost(hostname)) {
    const target = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
    return Response.redirect(target.toString(), 301);
  }

  const response = await context.next();
  return applyResponseHeaders(response, hostname);
}
