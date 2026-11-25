/**
 * Core Pillar & Early Cluster Pages:
 *  1. / (Homepage Pillar + 10-Second Pain-Point Router + Stage Stepper + Look-Alike Preview)
 *  2. /varieties-and-rootstocks/
 *  3. /april-and-october-pruning/
 */
import { SITE, ROOTSTOCKS, VARIETIES, TRELLIS_SYSTEMS, GLOSSARY } from '../data/site-data.js';
import { FAQS_BY_PAGE } from '../data/faqs.js';
import { renderLayout } from '../templates/layout.js';
import {
  renderDirectAnswer,
  renderStageStepper,
  renderLookalikeTriage,
  renderTable,
  renderFaqs,
} from '../templates/components.js';
import { LOOKALIKE_CARDS } from '../data/site-data.js';

export function buildHomePage() {
  const bodyHtml = `
    <section class="hero">
      <div class="container">
        <div class="hero-card">
          <div class="hero-eyebrow">ICAR-NRCG Pune · APEDA GrapeNet 2026 · Outdoor-Readable Field Guide</div>
          <h1>Grape Farming in India: Complete Vineyard, Fertigation &amp; Export Guide</h1>
          <p class="hero-sub">Built for Nashik, Sangli, Solapur, Vijayapura, and Tamil Nadu growers. Zero fluff — instant symptom triage, 110R vs Dogridge salinity rules, EU-safe GA3/CPPU doses, and live Guntha/Acre fertigation math.</p>

          <div class="pain-search-wrap">
            <label class="pain-search-label" for="pain-search-input">10-Second Pain-Point Router — What problem are you seeing today?</label>
            <div class="pain-search-bar">
              <input
                id="pain-search-input"
                class="pain-search-input"
                type="search"
                autocomplete="off"
                placeholder="Type symptom, variety, or term (e.g. Kevda, 110R, Dormex, CPPU, Guntha, Udadya)..."
              >
              <button id="pain-search-clear" class="pain-search-clear" type="button" hidden>Clear</button>
            </div>
            <div id="pain-search-results" class="search-results" role="region" aria-live="polite" hidden></div>
          </div>

          <div class="chip-grid" aria-label="6 quick-tap vineyard problem shortcuts">
            <a class="symptom-chip" href="/varieties-and-rootstocks/#rootstocks">
              <strong>Root / Mortality</strong>
              <span>110R vs Dogridge Na+</span>
            </a>
            <a class="symptom-chip" href="/fertilizer-schedule-and-calculator/#petiole-norms">
              <strong>Yellowing / Deficiency</strong>
              <span>45 DAP Petiole &amp; Lime</span>
            </a>
            <a class="symptom-chip" href="/april-and-october-pruning/">
              <strong>Pruning &amp; Bud Break</strong>
              <span>Apr 31–60d &amp; Dormex</span>
            </a>
            <a class="symptom-chip" href="/diseases-and-pests/#lookalike-triage">
              <strong>Disease Triage</strong>
              <span>Kevda, Bhuri, MRLs</span>
            </a>
            <a class="symptom-chip" href="/fertilizer-schedule-and-calculator/#calculator">
              <strong>Dose Calculator</strong>
              <span>Acre / Guntha / Vigha</span>
            </a>
            <a class="symptom-chip" href="/grapenet-raisins-and-profit/">
              <strong>Profit &amp; Harvest</strong>
              <span>GrapeNet, Raisins, Mandi</span>
            </a>
          </div>
        </div>

        <div class="stat-grid" aria-label="India grape sector snapshot">
          <div class="stat-tile"><div class="stat-value">1.62 Lakh ha</div><div class="stat-label">Indian grape area · 3.7M MT output [NHB]</div></div>
          <div class="stat-tile"><div class="stat-value">~95% Share</div><div class="stat-label">Maharashtra (69–70.7%) + Karnataka (24.5–25%)</div></div>
          <div class="stat-tile"><div class="stat-value">2.24 Lakh MT</div><div class="stat-label">2025–26 exports (US$ 368M · 46 nations) [APEDA]</div></div>
          <div class="stat-tile"><div class="stat-value">ECw &lt; 1.0</div><div class="stat-label">dS/m sweet-water limit; shift to 110R if saline</div></div>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="section" id="india-at-a-glance">
        <h2>Grapes in India at a Glance &amp; Export Traceability</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Farming in India',
          'India cultivates roughly <strong>1.62 lakh hectares</strong> (162,000 ha) of grapes producing <strong>3.7 million MT</strong> (21–23 t/ha), with <strong>~95%</strong> in Maharashtra (Nashik, Sangli, Solapur, Pune) and Karnataka (Vijayapura, Bagalkot, Belagavi, Bengaluru). In 2025–26, India exported <strong>2.24 lakh tonnes (US$ 368 million)</strong> to 46 countries via mandatory <strong>APEDA GrapeNet</strong> [ICAR-NRCG; APEDA 2026].'
        )}
        <div class="bento-grid cols-3">
          <article class="bento-card accent-green">
            <span class="pill pill-green">Rule 1 · Rootstock</span>
            <h3 style="margin-top:0.5rem;">Pick by Water Sodium, Not Blindly Dogridge</h3>
            <p>ICAR-NRCG Pune proved Dogridge cannot exclude Sodium (Na⁺) — saline borewells cause K deficiency and Year 4–5 dead cordons. Use <strong>110R or B2-56</strong> in saline/drought soils.</p>
            <a href="/varieties-and-rootstocks/#rootstocks">Compare 6 rootstocks →</a>
          </article>
          <article class="bento-card accent-amber">
            <span class="pill pill-amber">Rule 2 · Pruning</span>
            <h3 style="margin-top:0.5rem;">Apr 31–60 DAP &amp; 48-Hr Dormex Lock</h3>
            <p>Fruit-bud differentiation happens 35–60 days after April pruning (hard-cut N!). After October pruning (5–10 buds), apply <strong>Dormex 50% SL (30–40 ml/L) within 24–48 hrs</strong>.</p>
            <a href="/april-and-october-pruning/">View pruning calendar →</a>
          </article>
          <article class="bento-card accent-crimson">
            <span class="pill pill-crimson">Rule 3 · EU MRL Safety</span>
            <h3 style="margin-top:0.5rem;">Avoid CCC, Late Phosphonates &amp; &gt;2 ppm CPPU</h3>
            <p>EU export rejections spike from Chlormequat Chloride (CCC), Fosetyl-Al, Mancozeb, Carbendazim, and &gt;2 ppm CPPU. Always obey current-season <strong>ICAR-NRCG Annexure-5 PHIs</strong>.</p>
            <a href="/diseases-and-pests/#eu-mrl-warnings">Check banned &amp; MRL list →</a>
          </article>
        </div>
      </section>

      ${renderStageStepper('Interactive Crop-Stage Stepper (April Foundation → October Harvest)')}

      <section class="section" id="hub-directory">
        <h2>Explore All 7 Focused Vineyard Guides + Marathi Hub</h2>
        ${renderDirectAnswer(
          'Direct Answer · Anti-Cannibalization Reference Architecture',
          'Each viticulture topic lives in one authoritative hub — rootstocks and Y-trellis spacing, April/October pruning and Dormex timing, the live ICAR-NRCG/TNAU fertilizer calculator, EU-safe GA3/CPPU protocols, Downy/Powdery mildew and pest IPM, GrapeNet export and Sangli raisins, plus the complete Marathi grower guide [ICAR-NRCG; APEDA 2026].'
        )}
        <div class="bento-grid cols-3">
          <div class="bento-card">
            <h3><a href="/varieties-and-rootstocks/">1. Varieties, Rootstocks &amp; Y-Trellis</a></h3>
            <p>Thompson, Tas-A-Ganesh, Sonaka, Sharad, Anushka, Manjari Kishmish/Medika, 110R vs Dogridge Na⁺ table, and 981 vs 899 vines/acre spacing.</p>
          </div>
          <div class="bento-card">
            <h3><a href="/april-and-october-pruning/">2. April &amp; October Pruning + Dormex</a></h3>
            <p>Double-pruning physiology, sub-cane pinching (5–7 leaves), microscope bud test, 24–48 hr Dormex window, UV plastic cover, and 35–40 bunches/vine balance.</p>
          </div>
          <div class="bento-card">
            <h3><a href="/fertilizer-schedule-and-calculator/">3. Live Fertilizer Calculator &amp; Petioles</a></h3>
            <p>Split-screen ICAR-NRCG &amp; TNAU calculator with Guntha/Vigha/Kanal toggle, Worked Examples (a) &amp; (b), Tank A/B locks, and 1-click A4 PDF print.</p>
          </div>
          <div class="bento-card">
            <h3><a href="/ga3-cppu-and-berry-disorders/">4. GA3, CPPU &amp; Berry Disorders</a></h3>
            <p>EU-safe pre-bloom, capfall &amp; 3–7 mm dip doses (CPPU ≤2 ppm!), plus Pink Berry, berry cracking, post-harvest shatter, and B+Zn shot berry fixes.</p>
          </div>
          <div class="bento-card">
            <h3><a href="/diseases-and-pests/">5. Downy, Powdery, Pests &amp; EU MRLs</a></h3>
            <p>Visual look-alike triage, FRAC/IRAC rotation, Cryptolaemus mealybug biocontrol, CIB&amp;RC banned list, and NRCG Annexure-5 MRL triggers.</p>
          </div>
          <div class="bento-card">
            <h3><a href="/grapenet-raisins-and-profit/">6. GrapeNet Export, Raisins &amp; Profit</a></h3>
            <p>NRL-NRCG residue timeline, ≥16°Brix &amp; 0–1°C SO₂ cold chain, Sangli 25–26% raisin dip, Rs/acre budgets, and Agmarknet/eNAM mandi links.</p>
          </div>
        </div>
      </section>

      <section class="section" id="triage-preview">
        <h2>Quick Field Look-Alike Triage (Most Confused Vineyard Symptoms)</h2>
        ${renderDirectAnswer(
          'Direct Answer · Field Look-Alike Diagnosis',
          'Misdiagnosing Downy Mildew (Kevda) as Powdery Mildew (Bhuri) or blaming fungus for Dogridge Sodium scorch wastes critical spray windows. Verify upper oil spots vs ash-grey dust, check wood cross-sections for Botryosphaeria wedges, and confirm petiole Na⁺/Cl⁻ before applying chemical fixes [ICAR-NRCG].'
        )}
        ${renderLookalikeTriage(LOOKALIKE_CARDS.slice(0, 2))}
        <p><a class="btn btn-secondary" href="/diseases-and-pests/#lookalike-triage">See all 4 Look-Alike Triage Cards →</a></p>
      </section>

      <section class="section" id="state-priorities">
        <h2>State-by-State Priorities &amp; Multilingual Vineyard Glossary</h2>
        ${renderDirectAnswer(
          'Direct Answer · Regional Grape Priorities',
          'Maharashtra (~70% share) prioritizes 110R salinity shifts, Oct-rain Downy Mildew, and CCC/Phosphonate EU MRL compliance; Karnataka (~25%) focuses on Vijayapura raisin hygiene, alkaline black-soil K/Mg, and Bangalore Blue anthracnose; Tamil Nadu and AP/Telangana manage high-K double-crop Bowers, Powdery Mildew, and Thrips [ICAR-NRCG; IIHR; TNAU].'
        )}
        ${renderTable(
          ['English Term', 'Marathi (मराठी)', 'Hindi (हिन्दी)', 'Gujarati (ગુજરાતી)'],
          GLOSSARY.map((g) => [g.en, g.mr, g.hi, g.gu])
        )}
      </section>

      ${renderFaqs(FAQS_BY_PAGE.home, 'Top Indian Grape Grower Questions (FAQs)')}
    </div>`;

  return renderLayout({
    slug: '/',
    title: 'Grape Farming in India: Complete Vineyard, Fertigation & Export Guide | GrapesFarming.in',
    description:
      'Primary-source Indian grape farming guide (ICAR-NRCG Pune & APEDA 2026): 110R vs Dogridge rootstocks, April/October pruning, live Guntha/Acre fertilizer calculator, EU-safe GA3/CPPU, Downy Mildew IPM & GrapeNet export.',
    waTag: 'GRAPES-HOME',
    waPrompt: 'Need vineyard help for Nashik, Sangli, or Vijayapura?',
    breadcrumbs: [{ name: 'Home', url: `${SITE.origin}/` }],
    faqs: FAQS_BY_PAGE.home,
    isHome: true,
    bodyHtml,
  });
}

export function buildVarietiesRootstocksPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-green">Cluster 1 · Genetics, Rootstocks &amp; Canopy</span>
        <h1>Grape Varieties &amp; Rootstocks in India (110R vs Dogridge + Y-Trellis)</h1>
        ${renderDirectAnswer(
          'Direct Answer · Grape Varieties & Rootstocks in India',
          '<strong>Thompson Seedless</strong> and its clones (Tas-A-Ganesh, Sonaka, Manik Chaman, Clone 2A) cover <strong>~79%</strong> of India’s vineyards. Under saline borewells, <strong>ICAR-NRCG Pune</strong> proved <strong>Dogridge accumulates Sodium (Na⁺)</strong> and causes Year 4–5 dead cordons — choose <strong>110R (or B2-56)</strong> on an <strong>Extended Y-Trellis</strong> (899–981 vines/acre) [ICAR-NRCG; APEDA 2026].'
        )}
      </header>

      <section class="section" id="rootstocks">
        <h2>Indian Grape Rootstock Comparison: Why 110R Beats Dogridge in Saline Water</h2>
        ${renderDirectAnswer(
          'Direct Answer · 110R vs Dogridge Rootstock',
          'Pick rootstock strictly by borewell Sodium (Na⁺) and soil lime — not blindly Dogridge. <strong>110R and NRCG clone B2-56</strong> actively exclude Na⁺ and sustain bud fruitfulness and Brix under drought/salinity, whereas <strong>140Ru</strong> excels in shallow calcareous soils (18.47 kg/vine in Manjari Medika) and <strong>1103P</strong> fits heavy moist clay [ICAR-NRCG; Somkuwar 2024–25].'
        )}
        <div class="bento-card accent-crimson" style="margin-bottom:1rem;">
          <span class="pill pill-crimson">ICAR-NRCG Warning</span>
          <h3 style="margin:0.45rem 0 0.25rem;color:var(--crimson-ink);">Do NOT Plant Dogridge Under Saline Borewells (ECw &gt; 1.0 dS/m)</h3>
          <p style="margin:0;">Dogridge gives vigorous early growth and bold berries in Years 2–3, but cannot block Na⁺ uptake. By Year 4–5, Na⁺ build-up locks out Potassium &amp; Magnesium, causes marginal leaf burn, drops fruitfulness, and kills cordons. Likewise avoid <strong>SO4</strong> (&gt;85% mortality at 3,500 ppm NaCl).</p>
        </div>
        ${renderTable(
          ['Rootstock', 'Vigour', 'Na+ & Cl- Response', 'Drought & Soil Fit', 'Key Field Traits & Verdict'],
          ROOTSTOCKS.map((r) => [
            r.name,
            r.vigour,
            r.salt,
            r.soilFit,
            `${r.traits} <br><span class="pill ${r.verdict.includes('Avoid') ? 'pill-crimson' : 'pill-green'}" style="margin-top:0.35rem;">${r.verdict}</span>`,
          ])
        )}
      </section>

      <section class="section" id="varieties">
        <h2>Major Commercial Grape Varieties &amp; Clones in India</h2>
        ${renderDirectAnswer(
          'Direct Answer · Commercial Grape Varieties',
          'Green seedless <strong>Thompson Seedless</strong> and <strong>Tas-A-Ganesh / Clone 2A</strong> anchor EU/Gulf exports (135–160 days, ≥16°Brix), <strong>Sonaka/Manik Chaman</strong> lead domestic elongated fresh and long raisins, <strong>Sharad Seedless</strong> leads black seedless exports, <strong>Anushka</strong> harvests early (120–130 d), and <strong>Manjari Kishmish</strong> delivers 26.4% raisin recovery [ICAR-NRCG; APEDA 2026].'
        )}
        ${renderTable(
          ['Variety / Clone', 'Color & Seed', 'Days (Oct Prune → Pick)', 'Primary Use & States', 'Key Traits & Weaknesses'],
          VARIETIES.map((v) => [v.name, v.type, v.days, v.use, v.traits])
        )}
      </section>

      <section class="section" id="trellis-spacing">
        <h2>Extended Y-Trellis vs Bower, Trenching &amp; Vines per Acre</h2>
        ${renderDirectAnswer(
          'Direct Answer · Grape Spacing & Extended Y-Trellis',
          'Export vineyards use <strong>Extended Y-Trellis</strong> or <strong>Flat Roof Gable</strong> at <strong>2.75 × 1.5 m (981 vines/acre)</strong> or <strong>3.0 × 1.5 m (899 vines/acre)</strong>. Splitting the canopy at 30°–40° increases sunlight on basal buds, cuts Downy/Powdery mildew microclimate humidity, and improves GA3 spray reach over traditional Bower (Pandal) systems [ICAR-NRCG; MANAGE].'
        )}
        ${renderTable(
          ['Training System', 'Spacing (m | ft)', 'Vines / ha', 'Vines / acre', 'Agronomic Fit'],
          TRELLIS_SYSTEMS.map((t) => [t.system, t.spacing, t.perHa, t.perAcre, t.fit])
        )}
        <div class="bento-card accent-green">
          <h3>Land Preparation, Trenching &amp; In-Situ Grafting Protocol [TNAU; ICAR-NRCG]</h3>
          <p style="margin:0;">Open <strong>75 × 75 cm (2.5 × 2.5 ft)</strong> North–South trenches 1 month before planting. Mix topsoil with <strong>40–55 t/ha FYM/compost + SSP + neem cake + <em>Trichoderma</em></strong>. Plant certified rootstock in Jan–Feb, perform <em>in-situ</em> wedge grafting in Aug–Sep, and pinch 15 cm below the first wire to establish uniform primary arms.</p>
        </div>
      </section>

      ${renderFaqs(FAQS_BY_PAGE.varieties, 'Varieties, Rootstocks & Spacing FAQs')}
    </div>`;

  return renderLayout({
    slug: '/varieties-and-rootstocks/',
    title: 'Grape Varieties & Rootstocks in India (110R vs Dogridge + Y-Trellis) | GrapesFarming.in',
    description:
      'Compare 110R, B2-56, Dogridge, 140Ru, and 1103P rootstocks for saline water plus 10 Indian grape varieties (Thompson, Tas-A-Ganesh, Sonaka, Sharad, Manjari) and Extended Y-Trellis spacing.',
    waTag: 'GRAPES-ROOTSTOCK',
    waPrompt: 'Confused between 110R, 140Ru, or Dogridge for your borewell?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'Varieties & Rootstocks', url: `${SITE.origin}/varieties-and-rootstocks/` },
    ],
    faqs: FAQS_BY_PAGE.varieties,
    datasets: [
      {
        name: 'Indian Grape Rootstock & Spacing Comparison Dataset (ICAR-NRCG Pune)',
        description: 'Sodium exclusion, drought/lime tolerance, vine populations per acre/hectare, and cultivar maturity windows for Indian viticulture.',
      },
    ],
    bodyHtml,
  });
}

export function buildPruningPage() {
  const bodyHtml = `
    <div class="container">
      <header class="page-hero">
        <span class="pill pill-amber">Cluster 2 · Double-Pruning Physiology</span>
        <h1>April &amp; October Grape Pruning: Bud Fruitfulness, Sub-Canes &amp; Dormex</h1>
        ${renderDirectAnswer(
          'Direct Answer · April & October Grape Pruning',
          'Tropical Indian vineyards follow <strong>double pruning and single cropping</strong>: <strong>April (Foundation) Pruning</strong> to 0–2 basal buds drives fruit-bud differentiation at <strong>35–60 DAP</strong>, while <strong>October (Forward) Pruning</strong> to 5–10 buds plus <strong>Dormex 50% SL (30–40 ml/L) within 24–48 hrs</strong> harvests in 120–160 days [ICAR-NRCG; MPKV].'
        )}
      </header>

      ${renderStageStepper('Interactive Pruning-to-Harvest Stage Stepper')}

      <section class="section" id="april-pruning">
        <h2>April (Foundation / Kharad) Pruning &amp; Days 31–60 Bud Differentiation</h2>
        ${renderDirectAnswer(
          'Direct Answer · April Pruning & Fruit-Bud Differentiation',
          'Prune back to <strong>0–2 basal buds</strong> in March–April, strip loose bark, and thin to <strong>30–40 shoots/vine</strong> by 15–30 DAP. Between <strong>Days 31–60</strong>, cut Nitrogen hard, prevent drought stress, pinch sub-canes mechanically at <strong>5–7 leaves</strong>, and keep sunlight hitting basal buds so fruitful clusters form for October [ICAR-NRCG; MPKV].'
        )}
        <div class="bento-grid cols-2">
          <div class="bento-card accent-green">
            <h3>Sub-Cane Pinching Beats Repeated CCC Sprays</h3>
            <p>Mechanical pinching at 5–7 leaves paired with <strong>6-BA (10 ppm)</strong> or <strong>Uracil (50 ppm)</strong> at 45 DAP builds compact fruitful sub-canes cleanly without triggering EU Chlormequat Chloride (CCC / Lihocin) residue violations.</p>
          </div>
          <div class="bento-card accent-amber">
            <h3>April Days 35–60 Drought &amp; Shade Warning</h3>
            <p>Two mistakes ruin October yield 5 months in advance: (1) moisture stress during April Days 35–60, and (2) lush shaded Bower canopies fed excess Urea. Both convert flower primordia into blind tendrils.</p>
          </div>
        </div>
      </section>

      <section class="section" id="october-pruning">
        <h2>October (Forward / God) Pruning, 48-Hr Dormex Rule &amp; Weather Shielding</h2>
        ${renderDirectAnswer(
          'Direct Answer · October Pruning & Dormex Timing',
          'Run a microscope bud-fruitfulness test before pruning <strong>5–10 buds</strong> in late September–October, then swab/spray <strong>Hydrogen Cyanamide (Dormex 50% SL at 30–40 ml/L = 1.5–2.0% a.i.) within 24–48 hours</strong>. Avoid early September rain ("fillage" &amp; Downy Mildew) and late November cold (&lt;10°C shot berries) [ICAR-NRCG; MH Protocols 2026].'
        )}
        ${renderTable(
          ['Vineyard Calendar Window', 'Pruning / Canopy Action', 'Target Benchmark', 'Critical Risk Guard'],
          [
            ['April (Day 0)', 'Back prune 0–2 basal buds; strip trunk bark', 'Clean open primary arms', 'Seal cuts with Copper paste against dieback'],
            ['Apr 15–45 DAP', 'Thin to 30–40 shoots; pinch sub-canes 5–7 leaves', '45 DAP petiole sampling', 'Hard-cut N Days 31–60; no CCC overuse'],
            ['Jun–Sep (61–120 DAP)', 'Ripen 8–10 mm brown canes under monsoon', 'Stored cane carbohydrates', 'Protect cane foliage from monsoon Kevda'],
            ['Late Sep–Oct (Day 0)', 'Microscope bud test; prune 5–10 buds', 'Dormex 30–40 ml/L in <48h', 'Past 48h ruins uniform sprout; >40 ml/L burns buds'],
            ['Oct 15–60 DAP', 'Balance load to 35–40 bunches/vine', 'Pre-bloom & capfall GA3', 'Unseasonal Oct rain causes fillage & Kevda'],
            ['Oct 61–85 DAP', 'Scissor berry thinning to 80–100 berries/bunch', '3–4 mm & 6–7 mm GA3 dip', 'Never exceed 2 ppm CPPU; protect from Thrips'],
            ['Oct 86–150 DAP', 'Bunch skirting / bags; UV plastic cover option', '>=16°Brix export / 22–24° raisin', 'Obey NRCG Annexure-5 PHIs; stop N by 95–105 DAP'],
          ]
        )}
        <div class="bento-card" style="margin-top:1rem;">
          <h3>UV Plastic Cover &amp; Crop-Load Discipline</h3>
          <p style="margin:0;">Installing UV plastic covers (<strong>580 kLy, 25% thermicity</strong>) shields Oct–Feb clusters from unseasonal rain, Downy Mildew, and &lt;10°C cold snaps while keeping canopy microclimate manageable. Always cap crop load at <strong>35–40 bunches/vine</strong> — over-cropping stalls sugar below 16°Brix and exhausts next year’s canes [ICAR-NRCG; MANAGE]. *(Note: Tamil Nadu / Bengaluru vineyards run double pruning + double cropping for 2 harvests/year.)*</p>
        </div>
      </section>

      ${renderFaqs(FAQS_BY_PAGE.pruning, 'April & October Pruning FAQs')}
    </div>`;

  return renderLayout({
    slug: '/april-and-october-pruning/',
    title: 'April & October Grape Pruning: Bud Fruitfulness & 48-Hr Dormex | GrapesFarming.in',
    description:
      'Step-by-step Indian grapevine pruning protocol (ICAR-NRCG & MPKV): April foundation pruning (0–2 buds), Days 31–60 bud differentiation, October pruning (5–10 buds), 24–48 hr Dormex 50% SL, and annual vineyard calendar.',
    waTag: 'GRAPES-PRUNING',
    waPrompt: 'Planning April or October pruning dates & Dormex dose?',
    breadcrumbs: [
      { name: 'Home', url: `${SITE.origin}/` },
      { name: 'April & October Pruning', url: `${SITE.origin}/april-and-october-pruning/` },
    ],
    faqs: FAQS_BY_PAGE.pruning,
    datasets: [
      {
        name: 'Annual Indian Vineyard Pruning & Canopy Calendar (ICAR-NRCG / MPKV)',
        description: 'Stage-by-stage DAP timing for April foundation pruning, bud differentiation, October forward pruning, Dormex application, and bunch thinning.',
      },
    ],
    bodyHtml,
  });
}
