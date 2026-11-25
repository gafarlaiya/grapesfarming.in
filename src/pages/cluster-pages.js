/**
 * Cluster Pages 3, 4, 5, 6:
 *  4. /fertilizer-schedule-and-calculator/
 *  5. /ga3-cppu-and-berry-disorders/
 *  6. /diseases-and-pests/
 *  7. /grapenet-raisins-and-profit/
 */
import {
  SITE,
  FERTIGATION_TABLE,
  PETIOLE_NORMS,
  PESTS_TABLE,
  DISEASES_TABLE,
  LOOKALIKE_CARDS,
} from '../data/site-data.js';
import { FAQS_BY_PAGE } from '../data/faqs.js';
import { renderLayout } from '../templates/layout.js';
import {
  renderDirectAnswer,
  renderCalculatorWidget,
  renderLookalikeTriage,
  renderTable,
  renderFaqs,
} from '../templates/components.js';

export function buildFertilizerCalculatorPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-green">Cluster 3 · Live Calculator, Fertigation &amp; Petioles</span>
        <h1>Grape Fertilizer Schedule, Petiole Norms &amp; Live Dose Calculator</h1>
        ${renderDirectAnswer(
          'Direct Answer · Grape Fertilizer & Fertigation Schedule',
          'Maharashtra/Karnataka single-crop drip vineyards budget <strong>180–266 kg N : 160–213 kg P₂O₅ : 240–320 kg K₂O/ha/yr</strong> (~108:72:135 g/vine @ 2,222/ha + 40–50 t/ha FYM), split <strong>35% N / 45% P / 25% K in April</strong> and <strong>65% N / 55% P / 75% K in October</strong>. Tamil Nadu double-crop Bowers use <strong>150:100:350 g/vine per crop</strong> [ICAR-NRCG; TNAU].'
        )}
      </header>

      ${renderCalculatorWidget()}

      <section class="section" id="fertigation-schedule">
        <h2>Stage-Wise Drip Fertigation &amp; Daily Irrigation Schedule (ICAR-NRCG)</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Drip Irrigation & Stage Splits',
          'Single-crop vines need 2,500–4,500 L/vine in April and 5,000–7,500 L/vine in October (~300–450 mm drip). Daily drip climbs from <strong>6–10 L/vine/day</strong> at sprout (1–40 DAP) to <strong>10–14 L</strong> at bloom/set (41–70 DAP) and <strong>14–22 L</strong> at 6–16 mm sizing (71–110 DAP), tapering to <strong>8–12 L</strong> at veraison (taper 7–10 d pre-pick) [ICAR-NRCG].'
        )}
        ${renderTable(
          ['Cycle & Stage', 'DAP Window', 'Share (% Annual)', 'WSF / Soil Products', 'Agronomy Rule [ICAR-NRCG]'],
          FERTIGATION_TABLE.map((r) => [r.stage, r.dap, r.share, r.wsf, r.rule])
        )}
      </section>

      <section class="section" id="water-salinity">
        <h2>Water Salinity (ECw), Bicarbonate Acidification &amp; Tank A/B Safety Locks</h2>
        ${renderDirectAnswer(
          'Direct Answer · Water Quality & Tank Incompatibility Rules',
          'Keep irrigation water at <strong>ECw &lt; 1.0 dS/m</strong> (&gt;2.7 causes severe loss) and <strong>Cl⁻ ≤ 3 me/L</strong> own-rooted. Acidify high-bicarbonate water (<strong>HCO₃⁻ &gt; 2.5–3.0 me/L</strong>) with controlled H₂SO₄ to <strong>pH 6.5</strong>, auto-block MOP under salinity, and isolate <strong>Ca(NO₃)₂ strictly in Tank B</strong> away from SO₄/PO₄ tanks [ICAR-NRCG; MANAGE].'
        )}
        <div class="bento-grid cols-2">
          <div class="bento-card accent-crimson">
            <span class="pill pill-crimson">Hard Guard · Tank A vs Tank B</span>
            <h3 style="margin-top:0.5rem;color:var(--crimson-ink);">Never Mix Calcium Nitrate with Sulphates or Phosphates</h3>
            <p style="margin:0;">Keep <strong>Ca(NO₃)₂</strong> strictly in <strong>Tank B</strong>. Keep <strong>MAP (12:61:00), MKP (0:52:34), SOP (0:0:50), and MgSO₄</strong> in <strong>Tank A</strong>. Mixing them precipitates solid gypsum/calcium phosphate that permanently clogs 4 LPH inline emitters.</p>
          </div>
          <div class="bento-card accent-amber">
            <span class="pill pill-amber">Hard Guard · Saline &amp; Calcareous Fixes</span>
            <h3 style="margin-top:0.5rem;color:var(--amber-ink);">Acidify pH 6.5 + Block Overhead Saline Sprinklers</h3>
            <p style="margin:0;">Never overhead-sprinkle water with <strong>&gt;100 ppm Cl, &gt;70 ppm Na, or &gt;1 ppm B</strong>. Apply <strong>10–15 t/ha mulch</strong> + gypsum + compost on pH &gt;8.0 soils, and use <strong>Fe-EDDHA (10–15 g/vine)</strong> for calcareous iron chlorosis. Seaweed/humic biostimulants help fine root flush alongside NPK, but never replace 110R or acidification [ICAR-NRCG].</p>
          </div>
        </div>
      </section>

      <section class="section" id="petiole-norms">
        <h2>Petiole Testing Norms (45 DAP April &amp; October Full Bloom)</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Petiole Nutrient Norms',
          'Collect petioles at <strong>45 DAP April</strong> (bud differentiation) and <strong>October full bloom</strong> to tune doses accurately. Optimum Thompson norms: <strong>N 1.0–1.5%, P 0.30–0.50%, K 1.5–2.5%, Ca 0.90–1.50%, Mg 0.30–0.60%, Zn &amp; B 30–50 ppm, Fe 50–100 ppm</strong>. Toxicity flags: <strong>Na &gt;0.40–0.50%</strong> or <strong>Cl &gt;1.0–1.5%</strong> [ICAR-NRCG].'
        )}
        ${renderTable(
          ['Nutrient / Element', 'Optimum Range', 'Deficiency / Toxicity Alert', 'Corrective Vineyard Action'],
          PETIOLE_NORMS.map((p) => [p.nutrient, p.optimum, p.alert, p.action])
        )}
      </section>

      <section class="section" id="worked-examples">
        <h2>Verified Worked Examples (ICAR-NRCG &amp; TNAU Math Audit)</h2>
        <div class="bento-grid cols-2">
          <div class="bento-card accent-green">
            <h3>Worked Example (a): 40 Gunthas (1 Acre) Nashik 110R Saline Drip</h3>
            <p><strong>Setup:</strong> 3.0 × 1.5 m = <strong>899 vines</strong> · ECw 1.6 (MOP blocked!) · HCO₃⁻ 3.2 (pH 6.5 acidification) · Soil N Med, P Low (+25%), K Med.</p>
            <p><strong>Annual Totals:</strong> 97.09 kg N · 80.91 kg P₂O₅ · 121.37 kg K₂O · 17,980 kg FYM.</p>
            <p style="margin:0;"><strong>April:</strong> 151.69 kg SSP, 23.35 kg MKP, 44.80 kg SOP, 73.87 kg Urea (52.76 / 10.54 / 10.57 kg).<br><strong>October:</strong> 72.95 kg MAP, 50.58 kg KNO₃, 136.54 kg SOP, 103.87 kg Urea (stop N by 95–105 DAP).</p>
          </div>
          <div class="bento-card accent-green">
            <h3>Worked Example (b): 1 Acre TN Muscat / Anab-e-Shahi Double-Crop</h3>
            <p><strong>Setup:</strong> 3.0 × 3.0 m = <strong>450 vines</strong> · Medium Soil · ECw 0.6 (sweet water, MOP allowed).</p>
            <p><strong>Per-Crop Totals (150:100:350 g/vine):</strong> 67.50 kg N · 45.00 kg P₂O₅ · 157.50 kg K₂O · 13,500 kg FYM.</p>
            <p style="margin:0;"><strong>Per-Crop Products:</strong> 281.25 kg SSP (basal) · 262.50 kg MOP (131.25 kg @ 45 &amp; 75 DAP) · 146.74 kg Urea (73.37 kg @ 15 &amp; 45 DAP; zero past 75 DAP).</p>
          </div>
        </div>
      </section>

      ${renderFaqs(FAQS_BY_PAGE.fertilizer, 'Fertilizer Schedule & Petiole Testing FAQs')}
    </div>`;

  return renderLayout({
    slug: '/fertilizer-schedule-and-calculator/',
    title: 'Grape Fertilizer Schedule, Petiole Norms & Dose Calculator | GrapesFarming.in',
    description:
      'Interactive ICAR-NRCG & TNAU grape fertilizer calculator with Acre, Guntha (40/acre), Gujarat Vigha, HP Bigha & J&K Kanal toggles, Tank A/B safety locks, saline MOP guard, petiole norms & 1-page A4 print.',
    waTag: 'GRAPES-CALC',
    waPrompt: 'Want an agronomist to double-check your water ECw or petiole report?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'Fertilizer Schedule & Calculator', url: `${SITE.origin}/fertilizer-schedule-and-calculator/` },
    ],
    faqs: FAQS_BY_PAGE.fertilizer,
    datasets: [
      {
        name: 'ICAR-NRCG Single-Crop Drip & TNAU Double-Crop Grape Fertigation Dataset',
        description: 'Stage-wise NPK percentage splits, WSF product schedules, petiole optimum ranges, and regional Indian land area conversion constants.',
      },
    ],
    bodyHtml,
  });
}

export function buildGa3DisordersPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-amber">Cluster 4 · PGR Precision &amp; Berry Quality</span>
        <h1>GA3 &amp; CPPU Protocol + Pink Berry, Cracking, Shatter &amp; Shot Berries</h1>
        ${renderDirectAnswer(
          'Direct Answer · EU-Safe GA3 & CPPU Protocol',
          'For export-grade Thompson Seedless, spray <strong>GA3 10 ppm</strong> pre-bloom (pH 5.5–6.0), <strong>15–20 ppm</strong> at 50% &amp; 90% capfall, and dip at 3–4 mm &amp; 6–7 mm in <strong>GA3 30–40 ppm</strong> OR <strong>GA3 25–30 ppm + CPPU 1–2 ppm strictly once</strong>. Exceeding 2 ppm CPPU triggers thick skin, &lt;16°Brix, shatter, and EU MRL rejection [ICAR-NRCG].'
        )}
      </header>

      <section class="section" id="ga3-cppu">
        <h2>Step-by-Step EU-Safe GA3, 6-BA &amp; CPPU Schedule (ICAR-NRCG)</h2>
        ${renderDirectAnswer(
          'Direct Answer · PGR Stage Doses & MRL Traps',
          'Never substitute repeated <strong>CCC (Chlormequat Chloride / Lihocin)</strong> sprays for April sub-cane pinching (5–7 leaves), and never exceed <strong>2 ppm CPPU</strong> in berry dips. Always acidify GA3 spray water to <strong>pH 5.5–6.0</strong> for uniform panicle elongation and berry sizing [ICAR-NRCG; APEDA 2026].'
        )}
        ${renderTable(
          ['Stage & Timing', 'Approved PGR / Bio-Regulator', 'Exact Dose & Water Rule', 'EU MRL & Quality Guard'],
          [
            ['April 45 DAP (Sub-Cane)', 'Mechanical pinching + 6-BA / Uracil', 'Pinch at 5–7 leaves + 6-BA 10 ppm or Uracil 50 ppm', 'AVOID repeated CCC (Lihocin) — top EU MRL failure trigger!'],
            ['Oct Pruning (<24–48 hrs)', 'Hydrogen Cyanamide (Dormex 50% SL)', '30–40 ml/L (1.5–2.0% a.i.) within 24–48 hrs', 'Waiting past 48h destroys uniformity; >40 ml/L burns buds'],
            ['Pre-Bloom (2–3 in panicle)', 'GA3 (Gibberellic Acid)', '10 ppm · Water pH 5.5–6.0', 'Clean panicle elongation without twisting'],
            ['Capfall (50% & 90%)', 'GA3 Blossom Thinning', '15–20 ppm', 'Creates loose ventilated export bunches; reduces bunch rot'],
            ['Berry Dip (3–4 mm & 6–7 mm)', 'GA3 alone OR GA3 + CPPU (once!)', 'GA3 30–40 ppm OR GA3 25–30 ppm + CPPU 1–2 ppm', 'HARD LIMIT: CPPU >2 ppm -> crunchy skin, <16°Brix, shatter & EU MRL fail!'],
          ]
        )}
      </section>

      <section class="section" id="disorders">
        <h2>Physiological Disorders: Pink Berry, Cracking, Shatter, Shot &amp; Water Berry</h2>
        ${renderDirectAnswer(
          'Direct Answer · Preventing Grape Physiological Disorders',
          '<strong>Pink Berry</strong> stems from cold-night/warm-day swings on sun-exposed clusters (fix: diffused Y-trellis shade + bunch bags). <strong>Berry Cracking &amp; Shatter</strong> come from irregular veraison drip, Ca shortage, late N, &gt;22°Brix over-ripening, or &gt;2 ppm CPPU. <strong>Shot Berries</strong> respond to pre-bloom 0.1% B + 0.25% Zn [ICAR-NRCG; APEDA].'
        )}
        ${renderLookalikeTriage(LOOKALIKE_CARDS.slice(2, 4))}
        ${renderTable(
          ['Physiological Disorder', 'Primary Root Cause', 'Diagnostic Field Clue', 'Verified ICAR-NRCG Prevention'],
          [
            ['Pink Berry Syndrome', 'Cold-night / warm-day swing + direct sunlight', 'Unwanted pink blush on white Thompson clusters', 'Diffused Y-trellis canopy shade, bunch skirting/paper bags, balanced K/Ca'],
            ['Berry Cracking', 'Sudden irrigation spike at veraison / Powdery scarring', 'Vertical split in ripening berries inviting rot', 'Steady veraison drip (8–12 L/vine/day), Tank-B Ca(NO3)2 at 41–70 DAP, stop Bhuri'],
            ['Post-Harvest Shatter (Mani Gal)', 'CPPU >2 ppm, late N (>105 DAP), Ca shortage, >22°Brix', 'Berries detach cleanly inside cartons during transit', 'CPPU <=2 ppm, zero N past 100 DAP, 4–6h pre-cooling (0–1°C) + dual-release SO2 pads'],
            ['Shot Berries', 'Boron/Zinc deficiency or cold late-Nov pruning', 'Tiny pea-sized smooth green berries mixed in bunch', 'Pre-bloom 0.1% B + 0.25% Zn (verify water B <1 ppm!); avoid Nov pruning'],
            ['Water Berry', 'Imbalanced Mg / Ca / K ratio & over-cropping', 'Soft, watery, low-Brix berries at cluster tips', 'Cap crop load at 35–40 bunches/vine; balance MgSO4 (0.5–1%) + Ca + SOP'],
          ]
        )}
      </section>

      ${renderFaqs(FAQS_BY_PAGE.ga3, 'GA3, CPPU & Berry Disorder FAQs')}
    </div>`;

  return renderLayout({
    slug: '/ga3-cppu-and-berry-disorders/',
    title: 'GA3 & CPPU Protocol + Pink Berry, Cracking & Shot Berries | GrapesFarming.in',
    description:
      'EU-safe ICAR-NRCG GA3 & CPPU dipping protocol (never exceed 2 ppm CPPU!) plus field fixes for Pink Berry Syndrome, berry cracking, post-harvest shatter, shot berries, and water berry.',
    waTag: 'GRAPES-GA3',
    waPrompt: 'Need GA3 / CPPU dip confirmation for your berry mm stage?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'GA3, CPPU & Berry Disorders', url: `${SITE.origin}/ga3-cppu-and-berry-disorders/` },
    ],
    faqs: FAQS_BY_PAGE.ga3,
    datasets: [
      {
        name: 'ICAR-NRCG EU-Safe GA3 & CPPU Vineyard PGR Schedule',
        description: 'Exact ppm concentration, water pH, stage timing, and EU MRL safety caps for seedless table grape production in India.',
      },
    ],
    bodyHtml,
  });
}

export function buildDiseasesPestsPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-crimson">Cluster 5 · IPM, FRAC Rotation &amp; CIB&amp;RC / EU MRL Compliance</span>
        <h1>Grape Downy Mildew, Powdery Mildew, Thrips, Mealybugs &amp; EU MRL Rules</h1>
        ${renderDirectAnswer(
          'Direct Answer · Grape Diseases, Pests & EU MRL Safety',
          '<strong>Downy Mildew (Kevda)</strong> and <strong>Powdery Mildew (Bhuri)</strong> dominate Indian vineyards alongside Flea Beetle, Thrips, and Mealybugs. Pair <strong>Extended Y-Trellis airflow</strong> with FRAC/IRAC rotation and <em>Cryptolaemus</em> biocontrol, strictly obeying <strong>ICAR-NRCG Annexure-5 PHIs</strong> and avoiding CIB&amp;RC-banned pesticides and late Phosphonates/Mancozeb [ICAR-NRCG; APEDA 2026].'
        )}
      </header>

      <section class="section" id="eu-mrl-warnings">
        <h2>Mandatory CIB&amp;RC Banned Chemicals &amp; EU GrapeNet MRL Red List</h2>
        ${renderDirectAnswer(
          'Direct Answer · Banned Pesticides & EU Rejection Triggers',
          '<strong>CIB&amp;RC BANNED in India:</strong> Dichlorvos, Monocrotophos, Carbofuran, and Phorate. <strong>Top EU GrapeNet MRL Rejection Triggers:</strong> Chlormequat Chloride (CCC), Fosetyl-Al / Phosphonic acid, Mancozeb, Carbendazim, Acephate, and late Chlorpyrifos. Also flag <strong>Streptocycline</strong> antibiotic restrictions — verify current-season <strong>ICAR-NRCG Annexure-5</strong> before every spray [DPPQ&amp;S; APEDA 2026].'
        )}
        <div class="bento-grid cols-2">
          <div class="bento-card accent-crimson">
            <span class="pill pill-crimson">CIB&amp;RC BANNED · ZERO USE</span>
            <h3 style="margin-top:0.5rem;color:var(--crimson-ink);">Prohibited Molecules (DPPQ&amp;S India)</h3>
            <ul style="margin:0.4rem 0 0;padding-left:1.2rem;">
              <li><strong>Dichlorvos (DDVP)</strong> — Banned</li>
              <li><strong>Monocrotophos</strong> — Banned / Restricted</li>
              <li><strong>Carbofuran</strong> — Banned</li>
              <li><strong>Phorate</strong> — Banned</li>
              <li><strong>Streptocycline</strong> — Antibiotic restrictions apply; verify label status before any bacterial leaf spot spray</li>
            </ul>
          </div>
          <div class="bento-card accent-amber">
            <span class="pill pill-amber">EU MRL FAILURE TRIGGERS · ANNEXURE-5</span>
            <h3 style="margin-top:0.5rem;color:var(--amber-ink);">Stop Early or Avoid in Export Lots [APEDA; NRCG]</h3>
            <ul style="margin:0.4rem 0 0;padding-left:1.2rem;">
              <li><strong>CCC (Lihocin)</strong> — Replace with mechanical 5–7 leaf sub-cane pinching</li>
              <li><strong>Fosetyl-Al / Phosphonic acid &amp; Mancozeb</strong> — Long persistence; halt early per Annexure-5 PHI</li>
              <li><strong>Carbendazim &amp; Acephate</strong> — High EU border rejection risk</li>
              <li><strong>Chlorpyrifos</strong> — Trunk stem-borer plug (5 ml/L) ONLY; NEVER spray near berries!</li>
              <li><strong>Imidacloprid</strong> — Bud-break Flea Beetle ONLY (60d+ EU PHI)</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section" id="lookalike-triage">
        <h2>Visual "Photo Look-Alike" Vineyard Triage Cards</h2>
        ${renderDirectAnswer(
          'Direct Answer · Look-Alike Disease & Disorder Triage',
          'Compare confusing field symptoms side-by-side before spraying: <strong>Downy Mildew</strong> (yellow upper oil spots + underside white fluff) vs <strong>Powdery Mildew</strong> (ash-grey dust + berry cracking), and <strong>Dogridge Na⁺ Scorch</strong> vs <strong>Botryosphaeria Arm Dieback</strong> (no systemic cure — prune back to clean white-green wood) [ICAR-NRCG].'
        )}
        ${renderLookalikeTriage(LOOKALIKE_CARDS)}
      </section>

      <section class="section" id="downy-mildew">
        <h2>Major Grapevine Diseases &amp; FRAC Rotation Matrix</h2>
        ${renderDirectAnswer(
          'Direct Answer · Downy Mildew, Powdery Mildew, Anthracnose & Dieback',
          'Control <strong>Downy Mildew</strong> by stripping low shaded leaves and rotating Copper (2 g/L), Bordeaux (0.5–1%), Dimethomorph + Mancozeb, and Mandipropamid. Control <strong>Powdery Mildew</strong> with Wettable Sulphur (2 g/L, stop &gt;32–35°C), Myclobutanil, Azoxystrobin, and late-safe Potassium bicarbonate [ICAR-NRCG].'
        )}
        <div id="powdery-mildew"></div>
        ${renderTable(
          ['Disease', 'Pathogen', 'Key Diagnostic Symptoms', 'Cultural + FRAC Rotation Control', 'EU MRL / Compliance Note'],
          DISEASES_TABLE.map((d) => [d.disease, `<em>${d.pathogen}</em>`, d.symptoms, d.control, d.euRisk])
        )}
      </section>

      <section class="section" id="pests">
        <h2>Major Vineyard Pests, ETLs, Biocontrol &amp; CIB&amp;RC Safe Options</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Pest IPM & Biocontrol',
          'Act at exact thresholds: <strong>Flea Beetle</strong> (&gt;5/vine at 7–25 DAP), <strong>Thrips</strong> (&gt;5/shoot pre-bloom to 8 mm with 25 blue sticky traps/ha), <strong>Mealybug</strong> (bark strip + ant band + 1,500–2,500/ha <em>Cryptolaemus</em> beetles Nov–Dec), and <strong>Spider Mites</strong> (&gt;5/leaf Jan–Apr) [ICAR-NRCG Annexure-5].'
        )}
        ${renderTable(
          ['Pest', 'Field Symptoms', 'Risk Window / ETL', 'Cultural & Biocontrol', 'CIB&RC / EU MRL Safe Chemical'],
          PESTS_TABLE.map((p) => [p.pest, p.symptoms, p.etl, p.cultural, p.chemical])
        )}
      </section>

      ${renderFaqs(FAQS_BY_PAGE.diseases, 'Grape Disease, Pest & EU MRL FAQs')}
    </div>`;

  return renderLayout({
    slug: '/diseases-and-pests/',
    title: 'Grape Downy Mildew, Powdery Mildew, Thrips & Mealybugs (EU MRL Safe) | GrapesFarming.in',
    description:
      'ICAR-NRCG Annexure-5 & CIB&RC compliant Indian grape IPM guide: Downy Mildew (Kevda), Powdery Mildew (Bhuri), Flea Beetle (Udadya), Thrips, Mealybug Cryptolaemus biocontrol, visual look-alike triage & EU MRL warnings.',
    waTag: 'GRAPES-DISEASE',
    waPrompt: 'Spotted Kevda, Bhuri, Thrips, or Mealybug in your block?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'Diseases & Pests', url: `${SITE.origin}/diseases-and-pests/` },
    ],
    faqs: FAQS_BY_PAGE.diseases,
    datasets: [
      {
        name: 'Indian Grapevine Disease, Pest ETL & EU MRL Safety Matrix (ICAR-NRCG / CIB&RC)',
        description: 'Diagnostic symptoms, economic thresholds, biocontrol agents, FRAC/IRAC rotations, and CIB&RC banned / EU MRL risk molecules.',
      },
    ],
    bodyHtml,
  });
}

export function buildExportRaisinsProfitPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-green">Cluster 6 · Export Traceability, Raisins &amp; Economics</span>
        <h1>GrapeNet EU MRLs, Sangli Raisins &amp; Vineyard Profit per Acre</h1>
        ${renderDirectAnswer(
          'Direct Answer · GrapeNet Export, Raisins & Vineyard Profit',
          'India exported <strong>2.24 lakh tonnes (US$ 368M)</strong> of grapes to 46 countries in 2025–26 via <strong>APEDA GrapeNet</strong> (requiring NRL-NRCG clearance, ≥16°Brix, and 0–1°C cold chain). Bearing vineyards yield <strong>10–14 t/acre</strong> at Rs 2.2–3.5L annual cost, generating <strong>Rs 2.5–5.5+ lakh/acre</strong> net in clean seasons [APEDA 2026; ICAR-NRCG].'
        )}
      </header>

      <section class="section" id="grapenet">
        <h2>APEDA GrapeNet Export Checklist &amp; Cold-Chain Specifications</h2>
        ${renderDirectAnswer(
          'Direct Answer · Mandatory APEDA GrapeNet Standards',
          'Register vineyard plots on <strong>APEDA GrapeNet</strong> from Day 1, clear <strong>NRL-NRCG Pune</strong> multi-residue sampling <strong>15–20 days pre-harvest</strong>, harvest at <strong>≥16°Brix (~20:1 sugar/acid, 16–18 mm berries)</strong>, pack 4.5–5 kg ventilated cartons with dual-release SO₂ pads, and forced-air pre-cool within 4–6 hrs to <strong>0–1°C (90–95% RH)</strong> [APEDA 2026].'
        )}
        ${renderTable(
          ['Export Checkpoint', 'Mandatory APEDA / EU Spec', 'Timing / Verification Authority'],
          [
            ['Plot Traceability', 'Active GrapeNet registration + spray logbook', 'Before October forward pruning [APEDA]'],
            ['Residue Clearance', 'Multi-residue lab pass per ICAR-NRCG Annexure-5', '15–20 days pre-harvest at NRL-NRCG empanelled lab'],
            ['Maturity & Berry Size', '>=16°Brix, ~20:1 sugar/acid ratio, 16–18 mm diameter', 'Hand refractometer check across vineyard blocks'],
            ['Packaging & SO2 Protection', '4.5–5 kg ventilated punnets/cartons + dual-release SO2 pad', 'Packhouse Agmark grading & phytosanitary inspection'],
            ['Forced-Air Pre-Cooling', 'Cool within 4–6 hrs of harvest to 0–1°C at 90–95% RH', 'Reefer container dispatch (EU, UK, Russia, UAE, Vietnam May 2026)'],
          ]
        )}
      </section>

      <section class="section" id="raisins">
        <h2>Sangli GI &amp; Vijayapura Raisin Making Protocol (25–26% Recovery)</h2>
        ${renderDirectAnswer(
          'Direct Answer · Indian Raisin (Manuka) Recovery & Dipping',
          'For golden Sangli GI or Vijayapura raisins, harvest Thompson, Tas-A-Ganesh, Sonaka, or <strong>Manjari Kishmish (26.4% recovery at 22.4°Brix)</strong> at <strong>22–24°Brix</strong>. Dip bunches <strong>2–3 minutes</strong> in <strong>Ethyl Oleate (1.5%) + Potassium Carbonate (2.5%)</strong> and shade-dry on ventilated wire racks for <strong>12–15 days</strong> [ICAR-NRCG; Somkuwar 2025].'
        )}
        <div class="bento-grid cols-3">
          <div class="bento-card accent-green">
            <h3>1. Sugar Target</h3>
            <p style="margin:0;">Wait until clusters hit <strong>22–24°Brix</strong> (never pick at 16°Brix table stage) to achieve <strong>25–26%</strong> dry raisin recovery.</p>
          </div>
          <div class="bento-card accent-amber">
            <h3>2. Dipping Emulsion</h3>
            <p style="margin:0;">Dip <strong>2–3 minutes</strong> in <strong>Ethyl Oleate 1.5% + Potassium Carbonate 2.5%</strong> to crack waxy cuticle evenly for faster golden drying.</p>
          </div>
          <div class="bento-card accent-green">
            <h3>3. Shade-Rack Hygiene</h3>
            <p style="margin:0;">Shade-dry <strong>12–15 days</strong> in dust-free ventilated Vijayapura/Sangli sheds to preserve uniform green-golden grade and zero aflatoxin.</p>
          </div>
        </div>
      </section>

      <section class="section" id="economics">
        <h2>Vineyard Establishment Cost, Bearing Profit per Acre &amp; Live Mandis</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Farming Cost & Profit per Acre',
          'Year 1–2 establishment (Extended Y-Trellis + drip + grafting) costs <strong>Rs 5.5–8.5 lakh/acre</strong> (Rs 10–14+ lakh/acre with UV plastic cover). Bearing maintenance (Year 3+) averages <strong>Rs 2.2–3.5 lakh/acre/yr</strong>, yielding <strong>10–14 t/acre (25–35 t/ha)</strong> for Rs 5.5–10 lakh gross and <strong>Rs 2.5–5.5+ lakh/acre net</strong> in clean seasons.'
        )}
        ${renderTable(
          ['Financial Parameter', 'Indicative Benchmark (Per Acre)', 'Key Risk / Variable Notes'],
          [
            ['Establishment (Yr 1–2, Open Y-Trellis)', 'Rs 5.5 – 8.5 lakh / acre', 'Includes steel/GI Y-trellis, 4 LPH drip, trenching & 110R grafting'],
            ['Establishment with UV Plastic Cover', 'Rs 10 – 14+ lakh / acre', '580 kLy UV film shields against Oct/Feb unseasonal rain & hail'],
            ['Annual Bearing Cost (Yr 3+)', 'Rs 2.2 – 3.5 lakh / acre / yr', 'Pruning labor, GA3/thinning, WSF fertigation, IPM, bunch bags'],
            ['Commercial Yield', '10 – 14 tonnes / acre (25–35 t/ha)', 'Balance at 35–40 bunches/vine for export Brix & berry diameter'],
            ['Gross Revenue / Net Return', 'Gross Rs 5.5–10L · Net Rs 2.5–5.5+L / acre', 'High downside risk from unseasonal rain, hail, or EU MRL failure'],
          ]
        )}
        <div class="bento-card" style="margin-top:1rem;">
          <h3>Check Live Official Grape Mandi Rates (Zero Guessed Prices)</h3>
          <p style="margin:0 0 0.75rem;">Track real-time arrivals and modal wholesale rates for <strong>Pimpalgaon, Lasalgaon, Dindori, Tasgaon, Solapur, and Vijayapura</strong> directly on government portals:</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
            <a class="btn btn-primary" href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer">Open Agmarknet Live Rates ↗</a>
            <a class="btn btn-secondary" href="https://enam.gov.in" target="_blank" rel="noopener noreferrer">Open eNAM Portal ↗</a>
          </div>
        </div>
      </section>

      ${renderFaqs(FAQS_BY_PAGE.export, 'GrapeNet Export, Raisin & Economics FAQs')}
    </div>`;

  return renderLayout({
    slug: '/grapenet-raisins-and-profit/',
    title: 'GrapeNet EU MRLs, Sangli Raisins & Vineyard Profit/Acre | GrapesFarming.in',
    description:
      'APEDA GrapeNet export specs (>=16°Brix, NRL-NRCG clearance, 0–1°C cold chain + SO2 pads), Sangli/Vijayapura raisin dipping (25–26% recovery), Rs/acre vineyard economics & Agmarknet/eNAM mandi links.',
    waTag: 'GRAPES-EXPORT',
    waPrompt: 'Preparing GrapeNet EU export lots or Sangli raisin drying?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'GrapeNet, Raisins & Profit', url: `${SITE.origin}/grapenet-raisins-and-profit/` },
    ],
    faqs: FAQS_BY_PAGE.export,
    datasets: [
      {
        name: 'Indian Grape Export Cold-Chain & Per-Acre Economics Dataset (APEDA / ICAR-NRCG)',
        description: 'APEDA GrapeNet export parameters, Sangli/Vijayapura raisin recovery benchmarks, and per-acre establishment and bearing vineyard budgets.',
      },
    ],
    bodyHtml,
  });
}
