/**
 * Marathi Primary Regional Hub + Trust & 404 Pages:
 *  8. /mr/draksha-sheti/ (8th canonical Appendix (b) URL)
 *  9. /editorial-policy/ (Trust, Primary Sources & Transparent GBO Disclosure)
 * 10. /404.html
 */
import { SITE, PRIMARY_REFERENCES, GLOSSARY } from '../data/site-data.js';
import { FAQS_BY_PAGE } from '../data/faqs.js';
import { renderLayout } from '../templates/layout.js';
import { renderDirectAnswer, renderTable, renderFaqs } from '../templates/components.js';

export function buildMarathiPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-green">मराठी द्राक्ष मार्गदर्शक · ICAR-NRCG पुणे व APEDA 2026</span>
        <h1>द्राक्ष शेती संपूर्ण मार्गदर्शन: खरड/गोड छाटणी, खते, केवडा व निर्यात</h1>
        ${renderDirectAnswer(
          'थेट उत्तर · भारतातील द्राक्ष शेती (ICAR-NRCG पुणे)',
          'भारतात सुमारे <strong>१.६२ लाख हेक्टर</strong> द्राक्ष लागवडीपैकी <strong>६९–७०.७% क्षेत्र महाराष्ट्रात</strong> (नाशिक, सांगली, सोलापूर, पुणे) आहे. क्षारयुक्त पाण्यासाठी डॉगरिज ऐवजी <strong>110R / B2-56 खुंट</strong>, <strong>विस्तारित Y-ट्रेलिस</strong> (८९९–९८१ वेली/एकर), गोड छाटणीनंतर <strong>२४–४८ तासांत डॉर्मेक्स</strong> आणि <strong>APEDA GrapeNet</strong> नोंदणी यशस्वी निर्यातीची गुरुकिल्ली आहे [ICAR-NRCG; APEDA 2026].'
        )}
        <div style="display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:0.75rem;">
          <a class="btn btn-primary" href="/fertilizer-schedule-and-calculator/#calculator">लाईव्ह खत कॅल्क्युलेटर (गुंठा / एकर) उघडा →</a>
          <a class="btn btn-secondary" href="/">English Guide (EN)</a>
        </div>
      </header>

      <section class="section" id="mr-rootstock">
        <h2>१. क्षारयुक्त पाण्यात 110R विरुद्ध डॉगरिज (Rootstock निवड)</h2>
        ${renderDirectAnswer(
          'थेट उत्तर · खुंट आणि पाण्याची क्षारता (ECw)',
          '<strong>ICAR-NRCG पुणे</strong> यांनी सिद्ध केले आहे की <strong>डॉगरिज खुंट सोडियम (Na⁺) अडवू शकत नाही</strong>; क्षारयुक्त बोरवेल पाण्यात ४–५ वर्षांनंतर पोटॅश कमतरता व ओलांडे सुकतात. म्हणून क्षारयुक्त व दुष्काळी पट्ट्यात <strong>110R किंवा B2-56</strong> निवडावे आणि बायकार्बोनेट <strong>HCO₃⁻ &gt; २.५ me/L</strong> असल्यास पाणी <strong>pH ६.५</strong> पर्यंत आम्लयुक्त करावे [ICAR-NRCG].'
        )}
        ${renderTable(
          ['खुंट (Rootstock)', 'क्षारता / सोडियम (Na+) सहनशीलता', 'जमीन व शिफारस [ICAR-NRCG]'],
          [
            ['110R व B2-56 (NRCG क्लोन)', 'सोडियम (Na+) सक्रियपणे अडवतो (सर्वोत्तम)', 'क्षारयुक्त पाणी व दुष्काळी भागासाठी सर्वोत्कृष्ट; थॉम्पसनमध्ये सर्वाधिक घडनिर्मिती व गोडी'],
            ['डॉगरिज (Dogridge)', 'सोडियम साठवतो (Na+ अडवत नाही!)', 'फक्त गोड पाण्याच्या मध्यम/काळ्या जमिनीसाठी; क्षारयुक्त पाण्यात ४–५ वर्षांनी ओलांडे सुकतात'],
            ['140Ru', 'चुनखडी व दुष्काळ सहनशील', 'उथळ व चुनखडीयुक्त जमिनीत उत्कृष्ट कॅल्शियम शोषण व उत्पादन'],
            ['1103P', 'मध्यम क्षार सहनशील', 'भारी व ओलावा टिकवणाऱ्या काळ्या जमिनीसाठी उपयुक्त'],
          ]
        )}
      </section>

      <section class="section" id="mr-pruning">
        <h2>२. खरड छाटणी (एप्रिल) व गोड छाटणी (ऑक्टोबर) वेळापत्रक</h2>
        ${renderDirectAnswer(
          'थेट उत्तर · खरड व गोड छाटणीचे नियम',
          '<strong>खरड छाटणी (एप्रिल)</strong> ०–२ डोळ्यांवर करून <strong>३१–६० दिवसांत नत्र (Urea) कमी करावे</strong> व बगलफूट ५–७ पानांवर खुडावी — याच काळात घडनिर्मिती होते. <strong>गोड छाटणी (ऑक्टोबर)</strong> ५–१० डोळ्यांवर करून <strong>२४–४८ तासांत Dormex 50% SL (३०–४० मि.ली./लि.)</strong> लावावे आणि प्रति वेल <strong>३५–४० घड</strong> ठेवावेत [ICAR-NRCG; MPKV].'
        )}
        ${renderTable(
          ['टप्पा (DAP)', 'दैनंदिन पाणी (लि./वेल)', 'खत व संजीवके (PGR)', 'मुख्य इशारा [ICAR-NRCG]'],
          [
            ['खरड १–३० दिवस', '६–१० लिटर', 'बेसल ४०–५० टन शेणखत + SSP; २५% नत्र (युरिया + १९:१९:१९)', 'उडद्या (Flea Beetle) व करपा तपासणी; जुनी साल काढा'],
            ['खरड ३१–६० दिवस (घडनिर्मिती)', '८–१२ लिटर (ताण टाळा)', 'नत्र बंद/किमान (५%)! MKP (0:52:34) + SOP; ४५ व्या दिवशी देठ परीक्षण', 'जास्त युरिया किंवा CCC मुळे वांझ बाळ्या व EU MRL धोका'],
            ['गोड १–४० दिवस (फुटवा → फुलोरा)', '६–१० लिटर', 'MAP (12:61:00) + युरिया; फुलोऱ्यापूर्वी ०.१% बोरॉन + ०.२५% झिंक; GA3 १० ppm', 'डॉर्मेक्स ४८ तासांच्या आत; पावसाळी केवडा (Downy) संरक्षण'],
            ['गोड ४१–७० दिवस (सेटिंग → ६ मि.मी.)', '१०–१४ लिटर', 'कॅल्शियम नायट्रेट (स्वतंत्र टँक B!) + १३:०:४५ + SOP; कॅपफॉल GA3 १५–२० ppm', 'थ्रिप्स नियंत्रण; टँक A मध्ये कॅल्शियम कधीही मिसळू नका'],
            ['गोड ७१–१०५ दिवस (मणी फुगवण)', '१४–२२ लिटर', '१३:०:४५ + SOP + MgSO4; ९५–१०५ दिवसांनी नत्र पूर्ण बंद!', 'CPPU कधीही २ ppm पेक्षा जास्त वापरू नका (मणी गळ व MRL धोका)'],
            ['गोड १०६–१५० दिवस (पाणी उतरणे → काढणी)', '८–१२ लिटर (७–१० दिवस आधी कमी)', 'फक्त 0:0:50 (SOP) — ≥१६°Brix गोडीसाठी', 'Annexure-5 PHI पाळा; निर्यात १६°Brix व मनुका २२–२४°Brix'],
          ]
        )}
      </section>

      <section class="section" id="mr-diseases">
        <h2>३. केवडा, भुरी, थ्रिप्स, मिलीबग व EU MRL / CIB&amp;RC बंदी नियम</h2>
        ${renderDirectAnswer(
          'थेट उत्तर · केवडा, भुरी व निर्यात सुरक्षित फवारणी',
          'पावसाळी <strong>केवडा (Downy)</strong> साठी Y-ट्रेलिस हवा खेळती ठेवून कॉपर, डायमेथोमॉर्फ + मॅन्कोझेब व मँडीप्रोपॅमिड फिरवून वापरावे (EU साठी फॉस्फोनेट्स व मॅन्कोझेब लवकर थांबवा). <strong>भुरी (Powdery)</strong> साठी सल्फर (३२–३५°C वरील तापमानात बंद) व पोटॅशियम बायकार्बोनेट वापरावे. <strong>CIB&amp;RC बंदी:</strong> डायक्लोरव्हॉस, मोनोक्रोटोफॉस, कार्बोफ्युरान, फोरेट [ICAR-NRCG].'
        )}
        <div class="bento-grid cols-2">
          <div class="bento-card accent-crimson">
            <h3 style="color:var(--crimson-ink);">EU निर्यातीत MRL फेल होणारी प्रमुख रसायने</h3>
            <p style="margin:0;"><strong>CCC (लिहोसिन)</strong>, <strong>फॉसेटाइल-एएल (फॉस्फोनेट्स)</strong>, <strong>मॅन्कोझेब</strong>, <strong>कार्बेन्डाझिम</strong> आणि मण्यांवर <strong>क्लोरपायरीफॉस</strong>. प्रत्येक फवारणीपूर्वी चालू हंगामातील <strong>ICAR-NRCG Annexure-5 PHI</strong> तपासा.</p>
          </div>
          <div class="bento-card accent-green">
            <h3>सांगली / विजापूर मनुका व बाजारभाव</h3>
            <p style="margin:0;">मनुक्यासाठी <strong>२२–२४°Brix</strong> वर काढणी करा, <strong>इथाईल ओलिएट १.५% + पोटॅशियम कार्बोनेट २.५%</strong> मध्ये २–३ मिनिटे बुडवून १२–१५ दिवस सावलीत सुकवा (२५–२६% उतारा). पिंपळगाव, लासलगाव, तासगावचे दर <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer">Agmarknet</a> वर पहा.</p>
          </div>
        </div>
      </section>

      <section class="section" id="mr-glossary">
        <h2>४. द्राक्ष शेती शब्दकोश (मराठी · English · हिन्दी · ગુજરાતી)</h2>
        ${renderTable(
          ['मराठी (Marathi)', 'English Term', 'हिन्दी (Hindi)', 'ગુજરાતી (Gujarati)'],
          GLOSSARY.map((g) => [g.mr, g.en, g.hi, g.gu])
        )}
      </section>

      ${renderFaqs(FAQS_BY_PAGE.marathi, 'द्राक्ष उत्पादक शेतकऱ्यांचे महत्त्वाचे प्रश्न (FAQs)')}
    </div>`;

  return renderLayout({
    slug: '/mr/draksha-sheti/',
    title: 'द्राक्ष शेती संपूर्ण मार्गदर्शन: खरड/गोड छाटणी, खते व केवडा | GrapesFarming.in',
    description:
      'ICAR-NRCG पुणे व APEDA 2026 आधारित मराठी द्राक्ष शेती मार्गदर्शक: 110R विरुद्ध डॉगरिज, खरड व गोड छाटणी, डॉर्मेक्स ४८ तास नियम, ठिबक खत वेळापत्रक, केवडा/भुरी/उडद्या नियंत्रण व सांगली मनुका प्रक्रिया.',
    lang: 'mr',
    waTag: 'GRAPES-MR',
    waPrompt: 'तुमच्या द्राक्ष बागेसाठी मराठीत सल्ला हवा आहे का?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'मराठी द्राक्ष मार्गदर्शक', url: `${SITE.origin}/mr/draksha-sheti/` },
    ],
    faqs: FAQS_BY_PAGE.marathi,
    datasets: [
      {
        name: 'महाराष्ट्र द्राक्ष छाटणी व ठिबक खत वेळापत्रक (ICAR-NRCG / MPKV)',
        description: 'खरड व गोड छाटणी टप्पे, दैनंदिन पाणी, खत मात्रा आणि EU MRL सुरक्षित पीक संरक्षण माहिती.',
      },
    ],
    bodyHtml,
  });
}

export function buildEditorialPolicyPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-green">Trust, Verification &amp; Transparency</span>
        <h1>Editorial Policy, Primary Sources &amp; GBO Education Disclosure</h1>
        ${renderDirectAnswer(
          'Direct Answer · Editorial Standards & Publisher Disclosure',
          '<strong>GrapesFarming.in</strong> is a grower-education publication maintained by <strong>Gujarat Bio Organics Pvt. Ltd. (GBO)</strong>, Bhavnagar, Gujarat. Every rootstock comparison, fertilizer dose, petiole threshold, CIB&amp;RC banned-chemical notice, and APEDA GrapeNet MRL rule is sourced strictly from public Indian agricultural research institutions — never invented MRPs or unverified claims.'
        )}
      </header>

      <section class="section" id="disclosure">
        <h2>Transparent Publisher Disclosure &amp; Separation of Education from Commerce</h2>
        <div class="bento-grid cols-2">
          <div class="bento-card accent-green">
            <h3>Who Publishes GrapesFarming.in?</h3>
            <p style="margin:0;">This reference portal is funded and published by <strong>${SITE.publisher.name}</strong> (${SITE.publisher.location}) to give Indian vineyard growers fast, outdoor-readable access to peer-reviewed viticulture protocols without paywalls or ad clutter.</p>
          </div>
          <div class="bento-card accent-amber">
            <h3>Zero Invented Numbers &amp; Neutral Biostimulant Policy</h3>
            <p style="margin:0;">We never fabricate live mandi prices, fertilizer MRPs, or unverified yield promises. Where biostimulants (seaweed/humic acids) are discussed, they are framed neutrally alongside NPK and water chemistry — explicitly noting they cannot substitute for 110R rootstock or bicarbonate acidification.</p>
          </div>
        </div>
      </section>

      <section class="section" id="methodology">
        <h2>Fact-Checking, Calculator Audit &amp; Compliance Rules</h2>
        <div class="bento-card">
          <ul style="margin:0;padding-left:1.2rem;">
            <li><strong>Two Strictly Separated Fertilizer Regimes:</strong> Maharashtra/Karnataka single-crop drip (ICAR-NRCG Pune) and Tamil Nadu double-crop Bower (TNAU Agritech) are never blended. Both Worked Examples (a) and (b) are verified by automated unit tests on every build.</li>
            <li><strong>Safety-First Chemical Compliance:</strong> CIB&amp;RC banned chemicals (Dichlorvos, Monocrotophos, Carbofuran, Phorate), Streptocycline antibiotic restrictions, CPPU ≤ 2 ppm caps, Tank A/B Ca(NO₃)₂ isolation, and ICAR-NRCG Annexure-5 EU MRL PHIs are prominently preserved across every relevant guide.</li>
            <li><strong>Regional Land Unit Accuracy:</strong> Acre (40 Gunthas = 4,046.86 m²), Saurashtra/GJ/Gaekwad Vighas (16/20/24 Gunthas), HP Bigha (800 m²), and J&amp;K Kanal (505.86 m²) follow Revenue Department 2026 standards.</li>
            <li><strong>Update Cadence:</strong> Content is reviewed against annual ICAR-NRCG Annexure-5 RMP circulars and APEDA GrapeNet advisories. Last full technical review: <strong>${SITE.lastUpdated}</strong>.</li>
          </ul>
        </div>
      </section>

      <section class="section" id="primary-sources">
        <h2>Verified Primary References (Appendix d)</h2>
        ${renderTable(
          ['Institution / Authority', 'Primary Publication / Dataset', 'Official Portal'],
          PRIMARY_REFERENCES.map((r) => [
            r.org,
            r.title,
            `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.url.replace('https://', '')} ↗</a>`,
          ])
        )}
      </section>
    </div>`;

  return renderLayout({
    slug: '/editorial-policy/',
    title: 'Editorial Policy, Primary Sources & GBO Disclosure | GrapesFarming.in',
    description:
      'Transparent Gujarat Bio Organics Pvt. Ltd. (GBO) publisher disclosure, ICAR-NRCG/APEDA/TNAU primary-source verification standards, and automated calculator audit policy for GrapesFarming.in.',
    waTag: 'GRAPES-EDITORIAL',
    waPrompt: 'Spotted a seasonal Annexure-5 update or correction to share?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'Editorial Policy', url: `${SITE.origin}/editorial-policy/` },
    ],
    bodyHtml,
  });
}

export function build404Page() {
  const bodyHtml = `
    <div class="container">
      <section class="page-hero" style="text-align:center;padding:2.5rem 1.5rem;">
        <span class="pill pill-amber">404 · Page Not Found</span>
        <h1>This Vineyard Page Does Not Exist</h1>
        <p style="max-width:560px;margin:0 auto 1.25rem;color:var(--ink-muted);">
          GrapesFarming.in maintains 8 focused canonical viticulture guides with zero duplicate or thin pages. Jump straight to the section you need below:
        </p>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.65rem;">
          <a class="btn btn-primary" href="/">Go to Homepage &amp; Instant Search</a>
          <a class="btn btn-secondary" href="/fertilizer-schedule-and-calculator/#calculator">Open Dose Calculator</a>
          <a class="btn btn-secondary" href="/mr/draksha-sheti/">मराठी मार्गदर्शक</a>
        </div>
      </section>
    </div>`;

  return renderLayout({
    slug: '/404.html',
    title: 'Page Not Found (404) | GrapesFarming.in',
    description: 'The requested page was not found on GrapesFarming.in. Navigate to our 8 canonical Indian viticulture guides.',
    waTag: 'GRAPES-404',
    waPrompt: 'Looking for a specific grape farming topic?',
    noindex: true,
    bodyHtml,
  });
}
