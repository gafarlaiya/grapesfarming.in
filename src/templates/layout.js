/**
 * Shared HTML5 Layout, SEO Meta, Hreflang, JSON-LD Graph, Header (<ul><li> + data-nosnippet),
 * Non-Obstructive WhatsApp Support Bar, and Footer (data-nosnippet legal boilerplate).
 */
import { SITE, CANONICAL_NAV } from '../data/site-data.js';

export function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildJsonLd({
  canonicalUrl,
  title,
  description,
  lang = 'en-IN',
  breadcrumbs = [],
  faqs = [],
  datasets = [],
  isHome = false,
}) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE.origin}/#organization`,
      name: SITE.publisher.name,
      url: SITE.origin,
      description: SITE.publisher.disclosure,
      areaServed: 'IN',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-99787-91167',
        contactType: 'agronomy education support',
        availableLanguage: ['en', 'mr', 'hi', 'gu'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.origin}/#website`,
      url: SITE.origin,
      name: SITE.name,
      inLanguage: lang,
      publisher: { '@id': `${SITE.origin}/#organization` },
      ...(isHome
        ? {
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE.origin}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }
        : {}),
    },
    {
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: title,
      description,
      inLanguage: lang,
      datePublished: '2026-04-01',
      dateModified: SITE.lastUpdated,
      mainEntityOfPage: canonicalUrl,
      author: { '@id': `${SITE.origin}/#organization` },
      publisher: { '@id': `${SITE.origin}/#organization` },
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  for (const ds of datasets) {
    graph.push({
      '@type': 'Dataset',
      name: ds.name,
      description: ds.description,
      url: canonicalUrl,
      creator: { '@id': `${SITE.origin}/#organization` },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      spatialCoverage: 'India',
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export function renderLayout({
  slug,
  title,
  description,
  lang = 'en',
  waTag = 'GRAPES-HELP',
  waPrompt = 'Need help with your vineyard?',
  breadcrumbs = [],
  faqs = [],
  datasets = [],
  bodyHtml,
  isHome = false,
  noindex = false,
}) {
  const canonicalUrl = slug === '/' ? `${SITE.origin}/` : `${SITE.origin}${slug}`;
  const isMarathi = lang === 'mr';
  const htmlLang = isMarathi ? 'mr-IN' : 'en-IN';

  // Only emit hreflang links for language pairs that actually exist in this build!
  const hreflangTags =
    slug === '/' || slug === '/mr/draksha-sheti/'
      ? `
  <link rel="alternate" hreflang="en-IN" href="${SITE.origin}/">
  <link rel="alternate" hreflang="mr-IN" href="${SITE.origin}/mr/draksha-sheti/">
  <link rel="alternate" hreflang="x-default" href="${SITE.origin}/">`
      : `
  <link rel="alternate" hreflang="en-IN" href="${canonicalUrl}">`;

  const jsonLd = buildJsonLd({
    canonicalUrl,
    title,
    description,
    lang: htmlLang,
    breadcrumbs,
    faqs,
    datasets,
    isHome,
  });

  const waText = `[${waTag}] Namaste! I am reading ${canonicalUrl} and need viticulture guidance for my vineyard.`;
  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waText)}`;

  const navItemsHtml = CANONICAL_NAV.map((item) => {
    const isCurrent = item.href === slug;
    return `<li><a href="${item.href}"${isCurrent ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a></li>`;
  }).join('\n          ');

  const breadcrumbHtml =
    breadcrumbs.length > 1
      ? `<nav class="breadcrumbs" aria-label="Breadcrumb">
      <div class="container">
        <ol>
          ${breadcrumbs
            .map((c, idx) =>
              idx === breadcrumbs.length - 1
                ? `<li aria-current="page">${escapeHtml(c.name)}</li>`
                : `<li><a href="${c.url.replace(SITE.origin, '') || '/'}">${escapeHtml(c.name)}</a></li>`
            )
            .join('')}
        </ol>
      </div>
    </nav>`
      : '';

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">${hreflangTags}
  ${noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">'}
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="theme-color" content="#14532D">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header" data-nosnippet>
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="GrapesFarming.in Home">
        <span class="brand-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="9" cy="11" r="2.2"/><circle cx="15" cy="11" r="2.2"/><circle cx="12" cy="15.5" r="2.2"/><circle cx="12" cy="7" r="2.2"/><path d="M12 4.8V2M12 2c2.5 0 4.5 1 5.5 2.5"/>
          </svg>
        </span>
        <span>GrapesFarming.in</span>
      </a>

      <nav id="site-nav" class="site-nav" aria-label="Primary vineyard guides">
        <div class="container">
          <ul class="nav-list">
          ${navItemsHtml}
          </ul>
        </div>
      </nav>

      <div class="header-actions">
        <ul class="lang-switch" aria-label="Available languages">
          <li><a href="/"${!isMarathi ? ' aria-current="page"' : ''}>EN</a></li>
          <li><a href="/mr/draksha-sheti/"${isMarathi ? ' aria-current="page"' : ''}>मराठी</a></li>
        </ul>
        <button id="nav-toggle" class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          Menu
        </button>
      </div>
    </div>
  </header>

  ${breadcrumbHtml}

  <main id="main-content">
    ${bodyHtml}
  </main>

  <aside class="wa-bar" data-nosnippet aria-label="WhatsApp Agronomy Support">
    <div class="container wa-bar-inner">
      <div class="wa-bar-text">
        <strong>${escapeHtml(waPrompt)}</strong>
        <span>WhatsApp Vineyard Desk (${SITE.whatsappDisplay}) · Tag: [${escapeHtml(waTag)}]</span>
      </div>
      <a class="wa-bar-cta" href="${waHref}" target="_blank" rel="noopener noreferrer">
        WhatsApp Help
      </a>
    </div>
  </aside>

  <footer class="site-footer" data-nosnippet>
    <div class="container">
      <div class="footer-grid">
        <div>
          <strong style="font-size:1.1rem;color:#fff;">GrapesFarming.in</strong>
          <p style="margin:0.5rem 0 0;font-size:0.92rem;color:#cbd5e1;">
            Primary-source Indian viticulture reference grounded strictly in ICAR-NRCG Pune, APEDA GrapeNet, MPKV Rahuri, TNAU Agritech, CIB&amp;RC, and ICAR-IISS manuals.
          </p>
        </div>
        <div>
          <strong style="color:#fff;">8 Canonical Vineyard Guides</strong>
          <ul class="footer-links">
            ${CANONICAL_NAV.map((n) => `<li><a href="${n.href}">${escapeHtml(n.label)}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <strong style="color:#fff;">Trust &amp; Official Portals</strong>
          <ul class="footer-links">
            <li><a href="/editorial-policy/">Editorial Policy &amp; GBO Disclosure</a></li>
            <li><a href="https://nrcgrapes.icar.gov.in" target="_blank" rel="noopener noreferrer">ICAR-NRCG Pune (Annexure-5 RMP)</a></li>
            <li><a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer">APEDA GrapeNet Portal</a></li>
            <li><a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer">Agmarknet Live Mandi Rates</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-legal">
        <strong>Transparent Publisher Disclosure:</strong> ${escapeHtml(SITE.publisher.disclosure)} Always verify current-season ICAR-NRCG Annexure-5 Pre-Harvest Intervals (PHIs) and CIB&amp;RC labels before spraying export blocks. Last reviewed: ${SITE.lastUpdated}.
      </div>
    </div>
  </footer>

  <script type="module" src="/assets/app.js"></script>
</body>
</html>
`;
}
