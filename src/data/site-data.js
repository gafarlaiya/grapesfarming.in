/**
 * Structured primary-source viticulture data for grapesfarming.in
 * 100% grounded in ICAR-NRCG Pune, APEDA (2026), NHB, MPKV Rahuri, MANAGE, TNAU, CIB&RC & SHC.
 * Zero invented prices, MRPs, or unverified product claims.
 */

export const SITE = {
  domain: 'grapesfarming.in',
  origin: 'https://grapesfarming.in',
  name: 'GrapesFarming.in',
  tagline: 'Primary-Source Indian Viticulture, Drip Fertigation & GrapeNet Export Reference',
  whatsappNumber: '919978791167',
  whatsappDisplay: '+91 99787 91167',
  publisher: {
    name: 'Gujarat Bio Organics Pvt. Ltd. (GBO)',
    location: 'Bhavnagar, Gujarat, India',
    disclosure:
      'Independent viticulture education initiative published by Gujarat Bio Organics Pvt. Ltd. (GBO). All fertilizer doses, rootstock comparisons, and CIB&RC / EU MRL safety protocols are cited strictly from ICAR-NRCG Pune, APEDA, MPKV Rahuri, TNAU, and DPPQ&S primary manuals — never promoting unverified chemical claims.',
  },
  lastUpdated: '2026-11-25',
};

export const CANONICAL_NAV = [
  { href: '/', label: 'Home', tag: 'GRAPES-HOME' },
  { href: '/varieties-and-rootstocks/', label: 'Varieties & Rootstocks', tag: 'GRAPES-ROOTSTOCK' },
  { href: '/april-and-october-pruning/', label: 'Apr–Oct Pruning', tag: 'GRAPES-PRUNING' },
  { href: '/fertilizer-schedule-and-calculator/', label: 'Dose Calculator', tag: 'GRAPES-CALC' },
  { href: '/ga3-cppu-and-berry-disorders/', label: 'GA3 & Disorders', tag: 'GRAPES-GA3' },
  { href: '/diseases-and-pests/', label: 'Diseases & Pests', tag: 'GRAPES-DISEASE' },
  { href: '/grapenet-raisins-and-profit/', label: 'GrapeNet & Profit', tag: 'GRAPES-EXPORT' },
  { href: '/mr/draksha-sheti/', label: 'मराठी मार्गदर्शक', tag: 'GRAPES-MR', lang: 'mr' },
];

export const CROP_STAGES = [
  {
    id: 'apr-foundation',
    shortLabel: 'Apr Foundation',
    title: 'April Foundation Pruning & Shoot Flush',
    dap: 'Apr 0–30 DAP',
    water: '6–10 L / vine / day',
    nutrient: 'Basal 40–50 t/ha FYM + 30% annual P (SSP); 25% N + 10% P + 10% K via Urea + 19:19:19 / MAP',
    canopy: 'Back-prune to 0–2 basal buds, strip loose trunk bark, thin shoots at 15–30 DAP to 30–40 uniform shoots/vine.',
    alertLevel: 'caution',
    alertTitle: 'Flea Beetle (Udadya) & Anthracnose Alert',
    alertText: 'Inspect swollen buds for Flea Beetle (>5/vine ETL). Strip bark pre-pruning and protect young shoots against Anthracnose with Copper (2–2.5 g/L) [ICAR-NRCG].',
    link: '/april-and-october-pruning/',
  },
  {
    id: 'apr-bud-diff',
    shortLabel: 'Bud Diff. (31–60d)',
    title: 'Fruit-Bud Differentiation Window (Critical)',
    dap: 'Apr 31–60 DAP',
    water: '8–12 L / vine / day (NO drought stress!)',
    nutrient: 'HARD N-BRAKE (5% N only!) + 15% P + 10% K via MKP (0:52:34) + SOP (0:0:50). Collect 45 DAP petiole sample.',
    canopy: 'Pinch sub-canes mechanically at 5–7 leaves + 6-BA (10 ppm) / Uracil (50 ppm). Keep Y-trellis open for summer sunlight on basal buds.',
    alertLevel: 'danger',
    alertTitle: 'Excess N or CCC MRL Trap',
    alertText: 'Excess Nitrogen or canopy shade during Days 31–60 turns fruit buds into blind tendrils. Avoid repeated Chlormequat Chloride (CCC/Lihocin) sprays — top EU MRL failure trigger [ICAR-NRCG; APEDA].',
    link: '/april-and-october-pruning/',
  },
  {
    id: 'apr-cane-maturity',
    shortLabel: 'Cane Maturity',
    title: 'Monsoon Cane Ripening & Wood Hardening',
    dap: 'Apr 61–120 DAP',
    water: 'Rainfed / 4–8 L / vine / day in dry spells',
    nutrient: '5% N + 0% P + 10% K via SOP (0:0:50) + MgSO4 / Boron check to ripen 8–10 mm brown canes.',
    canopy: 'Maintain 30°–40° Extended Y-Trellis airflow; remove excess water shoots and diseased monsoon foliage.',
    alertLevel: 'caution',
    alertTitle: 'Monsoon Downy Mildew & Arm Dieback',
    alertText: 'Protect cane leaves from Downy Mildew (Kevda) with Bordeaux (0.5–1%) / Copper so carbohydrates store properly. Paste trunk pruning wounds with Copper oxychloride against Botryosphaeria dieback [ICAR-NRCG].',
    link: '/diseases-and-pests/',
  },
  {
    id: 'oct-bloom',
    shortLabel: 'Oct Bloom & Dormex',
    title: 'October Forward Pruning, Dormex & Bloom',
    dap: 'Oct 1–40 DAP',
    water: '6–10 L / vine / day',
    nutrient: '25% N + 35% P + 15% K via MAP (12:61:00) + Urea. Pre-bloom 0.1% B + 0.25% Zn prevents shot berries.',
    canopy: 'Test bud fruitfulness under microscope; prune 5–10 buds; apply Dormex 50% SL (30–40 ml/L) WITHIN 24–48 hrs. Apply GA3 10 ppm pre-bloom (pH 5.5–6.0).',
    alertLevel: 'danger',
    alertTitle: '48-Hr Dormex Deadline & Wet-Panicle Downy Mildew',
    alertText: 'Waiting past 48 hrs after pruning ruins uniform sprouting. Unseasonal Oct rain causes tendril reversion ("fillage") and explosive Downy Mildew — rotate FRAC groups immediately [ICAR-NRCG].',
    link: '/april-and-october-pruning/',
  },
  {
    id: 'oct-set',
    shortLabel: 'Set → 6 mm',
    title: 'Capfall Thinning, Fruit Set & 6 mm Stage',
    dap: 'Oct 41–70 DAP',
    water: '10–14 L / vine / day',
    nutrient: '25% N + 10% P + 20% K + Calcium Nitrate (TANK B ONLY!) + KNO3 (13:0:45) + SOP. Collect Oct full-bloom petioles.',
    canopy: 'Capfall GA3 15–20 ppm (50% & 90% capfall); balance load to 35–40 bunches/vine; scissor-thin berries to 80–100/bunch.',
    alertLevel: 'caution',
    alertTitle: 'Thrips Scab & Tank A/B Lock',
    alertText: 'Thrips (>5/shoot) scar 3–6 mm berries with corky russet rings — hang blue sticky traps (25/ha) and rotate Spinosad/Emamectin per Annexure-5 PHI. Never mix Ca(NO3)2 with SO4/PO4.',
    link: '/ga3-cppu-and-berry-disorders/',
  },
  {
    id: 'oct-sizing',
    shortLabel: 'Sizing 6–16 mm',
    title: 'Berry Sizing & EU-Safe GA3/CPPU Dip',
    dap: 'Oct 71–105 DAP',
    water: '14–22 L / vine / day (Peak demand)',
    nutrient: '15% N + 0% P + 25% K via KNO3 + SOP + MgSO4. STOP ALL NITROGEN BY 95–105 DAP!',
    canopy: 'Berry dip at 3–4 mm & 6–7 mm: GA3 30–40 ppm OR GA3 25–30 ppm + CPPU 1–2 ppm strictly ONCE. Skirt bunches / apply bags.',
    alertLevel: 'danger',
    alertTitle: 'Never Exceed 2 ppm CPPU & Stop Mancozeb/Phosphonates Early',
    alertText: 'CPPU >2 ppm causes thick crunchy skin, <16°Brix, berry shatter & EU MRL violation. Release Cryptolaemus (1,500–2,500/ha) for mealybugs; halt Fosetyl-Al & Mancozeb per NRCG Annexure-5 PHI.',
    link: '/ga3-cppu-and-berry-disorders/',
  },
  {
    id: 'oct-veraison',
    shortLabel: 'Veraison & Pick',
    title: 'Veraison, Sugar Build & GrapeNet Harvest',
    dap: 'Oct 106–150 DAP',
    water: '8–12 L / vine / day (Taper 7–10 d pre-harvest)',
    nutrient: '0% N + 0% P + 10–15% K via SOP (0:0:50) ONLY to build >=16°Brix & firm pedicels.',
    canopy: 'Check NRL-NRCG residue clearance 15–20 d pre-pick. Harvest >=16°Brix (~20:1 sugar/acid, 16–18 mm) for EU export or 22–24°Brix for Sangli raisins.',
    alertLevel: 'caution',
    alertTitle: 'Pink Berry, Cracking & Cold-Chain Rule',
    alertText: 'Irregular veraison drip triggers berry cracking. Shade exposed clusters against Pink Berry. Pre-cool export cartons (4.5–5 kg + SO2 pad) within 4–6 hrs to 0–1°C (90–95% RH) [APEDA 2026].',
    link: '/grapenet-raisins-and-profit/',
  },
];

export const LOOKALIKE_CARDS = [
  {
    id: 'downy-vs-powdery',
    category: 'Fungal Leaf & Bunch Triage',
    left: {
      name: 'Downy Mildew (Kevda)',
      pathogen: 'Plasmopara viticola',
      badge: 'CURABLE · ACT IN <24 HRS',
      badgeTone: 'amber',
      visualKey: 'downy',
      clues: [
        'Translucent yellow "oil spots" on UPPER leaf surface',
        'Fluffy white cottony spore growth strictly on LOWER surface',
        'Wet Oct rain turns entire young flower panicle brown/twisted',
      ],
      action: 'Strip low shaded leaves; rotate Copper (2 g/L), Dimethomorph (1 g/L) + Mancozeb, Mandipropamid, or Cymoxanil+Mancozeb. Stop Phosphonates & Mancozeb early for EU MRL PHI [ICAR-NRCG].',
    },
    right: {
      name: 'Powdery Mildew (Bhuri)',
      pathogen: 'Erysiphe necator',
      badge: 'CURABLE · DRY WEATHER',
      badgeTone: 'amber',
      visualKey: 'powdery',
      clues: [
        'Ash-grey dusty powder on BOTH leaf surfaces & green canes',
        'Floury grey coating on berries -> scarred skin -> vertical berry cracking',
        'Thrives in dry, warm, shaded Y-trellis/Bower interiors',
      ],
      action: 'Pull cluster-zone leaves for airflow; Wettable Sulphur (2 g/L — stop above 32–35°C!), rotate Myclobutanil (0.4 g/L), Azoxystrobin, or Potassium bicarbonate near harvest [ICAR-NRCG].',
    },
  },
  {
    id: 'dogridge-vs-dieback',
    category: 'Vine Decline & Cordon Death Triage',
    left: {
      name: 'Dogridge Na+ Toxicity / K-Mg Scorch',
      pathogen: 'Saline Water (ECw >1.0 dS/m, Na+)',
      badge: 'MANAGEABLE · SWITCH TO 110R',
      badgeTone: 'amber',
      visualKey: 'salinity',
      clues: [
        'Marginal leaf scorching + interveinal yellowing on older leaves',
        'Petiole test shows Na >0.40–0.50% or Cl >1.0–1.5% alongside low K/Mg',
        'Gradual cordon weakening in Year 4–5 on Dogridge under saline borewells',
      ],
      action: 'Auto-block MOP immediately; switch to SOP (0:0:50) + 0.5–1% MgSO4 + gypsum + 10–15 t/ha mulch + water pH 6.5 acidification. Replant saline blocks on 110R / B2-56 [ICAR-NRCG].',
    },
    right: {
      name: 'Arm Dieback / Trunk Canker',
      pathogen: 'Botryosphaeria spp.',
      badge: 'NO SYSTEMIC CURE · PRUNE WOOD',
      badgeTone: 'crimson',
      visualKey: 'dieback',
      clues: [
        'Sudden wilting/death of one entire spur, arm, or cordon',
        'Cross-section cut of wood shows dark brown wedge-shaped necrosis',
        'Often enters through unprotected April/October pruning cuts',
      ],
      action: 'Cut back ruthlessly until cross-section shows 100% clean white-green wood. Immediately seal every cut with Copper oxychloride / Bordeaux wound paste + Trichoderma [ICAR-NRCG].',
    },
  },
  {
    id: 'shotberry-vs-thrips',
    category: 'Small / Scarred Berry Triage',
    left: {
      name: 'Shot Berries (Boron / Zinc / Cold)',
      pathogen: 'Micronutrient Deficiency or Late Nov Prune',
      badge: 'PREVENTABLE · PRE-BLOOM B+Zn',
      badgeTone: 'green',
      visualKey: 'shotberry',
      clues: [
        'Many tiny pea-sized green berries remain mixed beside normal berries',
        'Smooth skin (no corky rings) — caused by poor pollination/fertilization',
        'Worse when Oct pruning slips into late Nov cold or B/Zn is deficient',
      ],
      action: 'Spray 0.1% Boron + 0.25% Zinc pre-bloom (verify water B <1 ppm!). Keep Oct pruning in optimal window and confirm 45 DAP petiole B & Zn at 30–50 ppm [ICAR-NRCG].',
    },
    right: {
      name: 'Thrips Scab / Russet Ring',
      pathogen: 'Scirtothrips dorsalis / Rhipiphorothrips',
      badge: 'CURABLE · EARLY IPM (<8 mm)',
      badgeTone: 'amber',
      visualKey: 'thrips',
      clues: [
        'Corky brown halo/scab ring around berry stem end or sides',
        'Silvery curled young leaf tips at pre-bloom to 8 mm stage',
        'Rejects EU export lots visually even when Brix is >=16°',
      ],
      action: 'Install 25 blue sticky traps/ha at sprout; when >5 thrips/shoot, rotate Spinosad (0.25–0.3 ml/L) or Emamectin benzoate (0.22–0.4 g/L) strictly within NRCG Annexure-5 PHI [ICAR-NRCG].',
    },
  },
  {
    id: 'pinkberry-vs-cppu-shatter',
    category: 'Veraison & Post-Harvest Berry Triage',
    left: {
      name: 'Pink Berry Syndrome',
      pathogen: 'Abiotic Sun + Cold-Night / Warm-Day Swing',
      badge: 'CANOPY FIX · NOT FUNGAL',
      badgeTone: 'green',
      visualKey: 'pinkberry',
      clues: [
        'Unwanted pink/blush pigmentation on white Thompson Seedless clusters',
        'Concentrated on sun-exposed outer bunches during Jan–Feb temperature swings',
        'Berries stay intact on pedicel but lose uniform green-amber export grade',
      ],
      action: 'Maintain diffused Y-trellis leaf canopy shade, skirt/paper-bag exposed bunches, and maintain balanced K/Ca nutrition without excess late N [ICAR-NRCG].',
    },
    right: {
      name: 'CPPU Overdose Shatter & Cracking',
      pathogen: 'CPPU >2 ppm / Late N / Irregular Drip',
      badge: 'IRREVERSIBLE + EU MRL RISK',
      badgeTone: 'crimson',
      visualKey: 'shatter',
      clues: [
        'Abnormally thick crunchy berry skin, delayed sugar (<16°Brix), loose pedicels',
        'Berries split vertically after uneven veraison watering or drop inside export box',
        'CPPU >2 ppm triggers EU MRL failure and post-harvest shatter',
      ],
      action: 'NEVER exceed 1–2 ppm CPPU (strictly once). Keep veraison drip steady (8–12 L/vine/day), supply early Tank-B Calcium, pre-cool 4–6 hrs to 0–1°C, and pack with dual-release SO2 pads [APEDA].',
    },
  },
];

export const ROOTSTOCKS = [
  {
    name: '110R & B2-56 (NRCG Clone)',
    vigour: 'Moderate',
    salt: 'Actively excludes Na+ (Best)',
    soilFit: 'Saline borewells, drought & semi-arid Maharashtra/Karnataka',
    traits: 'Uniform sprouting, highest sustained bud fruitfulness, TSS & WUE in Thompson & Manjari Naveen [ICAR-NRCG]',
    verdict: 'Recommended Default',
  },
  {
    name: 'Dogridge (V. champini)',
    vigour: 'High',
    salt: 'Accumulates excess Na+ (Cannot exclude Na+!)',
    soilFit: 'Sweet-water deep/medium black soils only',
    traits: 'Bold berries initially, but induces rank vigour, lower fruitfulness & cordon dieback after Yr 4–5 under saline water [ICAR-NRCG]',
    verdict: 'Avoid in Saline Water',
  },
  {
    name: '140Ru',
    vigour: 'High–Moderate',
    salt: 'Drought & lime/calcareous tolerant',
    soilFit: 'Shallow / calcareous semi-arid soils',
    traits: 'Highest Ca uptake & yield in Manjari Medika (18.47 kg/vine) & Fantasy Seedless [Somkuwar 2024–25]',
    verdict: 'Calcareous Specialist',
  },
  {
    name: '1103P',
    vigour: 'Mod–Vigorous',
    salt: 'Moderate salt exclusion',
    soilFit: 'Heavy / moist black clay soils',
    traits: 'Longer shoots; slightly lower Thompson fruitfulness (81.1%) compared with 110R [ICAR-NRCG]',
    verdict: 'Heavy Clay Option',
  },
  {
    name: 'Salt Creek / SO4',
    vigour: 'High / Mod',
    salt: 'Good Cl- (Salt Creek); SO4 >85% mortality at 3,500 ppm NaCl',
    soilFit: 'Nematode/saline pockets (Salt Creek only)',
    traits: 'Lower field adoption in India than 110R or Dogridge [ICAR-NRCG]',
    verdict: 'Niche / Avoid SO4 in Salt',
  },
  {
    name: 'Own-Rooted (V. vinifera)',
    vigour: 'Moderate',
    salt: 'Low salt tolerance (<=3 me/L Cl-)',
    soilFit: 'Sweet-water deep loam only',
    traits: 'Fast sprouting, smallest berries; collapses under drought, nematodes, and salinity [ICAR-NRCG]',
    verdict: 'Sweet Water Only',
  },
];

export const VARIETIES = [
  { name: 'Thompson Seedless', type: 'Green-white, seedless', days: '140–160 d', use: 'EU/Gulf Export & Raisins (MH, KA)', traits: 'Export backbone (>=16°Brix); needs GA3/thinning; Downy, dieback & berry-drop sensitive [APEDA; NRCG]' },
  { name: 'Tas-A-Ganesh / Clone 2A', type: 'Green-white, seedless', days: '135–150 d', use: 'Export & Raisins (Sangli, Nashik, Pune)', traits: 'Slightly elongated natural berries; strong GA3 response (25–30 t/ha) [ICAR-NRCG]' },
  { name: 'Sonaka / Manik Chaman', type: 'Green-white, elongated', days: '135–150 d', use: 'Domestic Fresh & Long Raisin', traits: 'Long bold berries (+15% length); thinner skin gives lower EU sea-transit tolerance' },
  { name: 'Sharad Seedless (+ Krishna, Nanasaheb Purple)', type: 'Black/Dark Purple, seedless', days: '125–140 d', use: 'UK/Russia/Gulf & Black Raisins', traits: 'Early bold black berries; prone to post-harvest shatter & rain cracking' },
  { name: 'Crimson / Flame Seedless', type: 'Red, seedless', days: '120–145 d', use: 'Coloured Table (Nashik, Punjab)', traits: 'Crisp texture; Crimson needs 110R + open Y-trellis sunlight for red color' },
  { name: 'Anushka (Early White)', type: 'Green-white, seedless', days: '120–130 d', use: 'Early Table (W. Maharashtra)', traits: 'Early pick avoids March heatwave & late-winter rain [MH Protocols 2026]' },
  { name: 'Manjari Naveen (NRCG)', type: 'Green-white, seedless', days: '~120 d (Early)', use: 'Table (MH, KA)', traits: 'Bold/loose bunches with minimal GA3; dieback sensitive on poor rootstock [ICAR-NRCG]' },
  { name: 'Manjari Kishmish (NRCG)', type: 'White, seedless', days: '~130–140 d', use: 'Raisin (26.4% recovery)', traits: '22.4°Brix, superior raisin yield on Dogridge/110R [Somkuwar 2025]' },
  { name: 'Manjari Medika (NRCG)', type: 'Dark Purple, juice', days: '~135 d', use: 'Juice / Nutraceutical (18.47 kg/vine on 140Ru)', traits: 'Tolerant to arm dieback & bacterial leaf spot [ICAR-NRCG]' },
  { name: 'Bangalore Blue / Anab-e-Shahi / Muscat', type: 'Seeded', days: '~120–135 d', use: 'Juice/Wine (KA) & Double-Crop Table (TN/AP)', traits: 'Double-cropped (Bangalore Blue GI); high yield on heavy Bowers [TNAU]' },
];

export const TRELLIS_SYSTEMS = [
  { system: 'Extended Y-Trellis', spacing: '2.75 × 1.5 m (9 × 5 ft)', perHa: '2,425', perAcre: '981', fit: 'Nashik/Sangli export & organic standard; 30°–40° canopy split cuts Downy humidity' },
  { system: 'Extended Y / Flat Roof Gable', spacing: '3.0 × 1.5 m (10 × 5 ft)', perHa: '2,222', perAcre: '899', fit: 'Vigorous rootstocks (Dogridge/140Ru) & wide tractor/sprayer access' },
  { system: 'Wide Y / Bower', spacing: '3.0 × 1.8 m (10 × 6 ft)', perHa: '1,852', perAcre: '749', fit: 'Traditional vigorous Thompson Seedless Bower' },
  { system: 'Arbour / Heavy Bower', spacing: '3.0 × 3.0 to 3.0 × 6.0 m', perHa: '556–1,111', perAcre: '225–450', fit: 'Double-crop seeded Anab-e-Shahi / Bangalore Blue / Muscat [TNAU]' },
];

export const FERTIGATION_TABLE = [
  { stage: 'Apr Basal', dap: '0', share: '100% FYM + 30% P', wsf: '40–50 t/ha FYM + SSP', rule: 'Incorporate in root zone before root flush [ICAR-NRCG]' },
  { stage: 'Apr Shoot Growth', dap: '1–30', share: '25% N + 10% P + 10% K', wsf: 'Urea + 19:19:19 / MAP', rule: 'Builds 5–7 leaf canes evenly' },
  { stage: 'Apr Bud Differentiation', dap: '31–60', share: 'Cut N! (5% N + 15% P + 10% K)', wsf: '0:52:34 (MKP) + 0:0:50 (SOP)', rule: 'Excess N here converts buds into blind fruitless tendrils!' },
  { stage: 'Apr Cane Maturity', dap: '61–120', share: '5% N + 0% P + 10% K', wsf: 'SOP + Mg/B check', rule: 'Ripens 8–10 mm brown canes cleanly' },
  { stage: 'Oct Sprout → Bloom', dap: '1–40', share: '25% N + 35% P + 15% K', wsf: '12:61:00 (MAP) + Urea', rule: 'Elongates flower panicle cleanly' },
  { stage: 'Oct Set → 6 mm', dap: '41–70', share: '25% N + 10% P + 20% K + Ca', wsf: 'Ca(NO3)2 (Tank B!) + 13:0:45 + SOP', rule: 'Builds thick crack-resistant berry skin' },
  { stage: 'Oct Sizing (6–16 mm)', dap: '71–105', share: '15% N + 0% P + 25% K', wsf: '13:0:45 + SOP + MgSO4', rule: 'STOP ALL NITROGEN by 95–105 DAP' },
  { stage: 'Oct Veraison → Pick', dap: '106–140', share: '0% N + 0% P + 10–15% K', wsf: '0:0:50 (SOP) ONLY', rule: 'Builds >=16°Brix, sugar/acid ratio & pedicel firmness' },
];

export const PETIOLE_NORMS = [
  { nutrient: 'Nitrogen (N)', optimum: '1.0 – 1.5%', alert: '>1.8% causes rank shade & fruitless tendrils', action: 'Cut Urea/nitrate immediately during Apr 31–60 DAP' },
  { nutrient: 'Phosphorus (P)', optimum: '0.30 – 0.50%', alert: '<0.25% at 45 DAP Apr hurts Oct bunch count', action: 'Boost MKP (0:52:34) +20% during Apr Days 31–60' },
  { nutrient: 'Potassium (K)', optimum: '1.5 – 2.5%', alert: 'Depressed under Dogridge Na+ uptake', action: 'Apply Chloride-free SOP (0:0:50) + KNO3' },
  { nutrient: 'Calcium (Ca)', optimum: '0.90 – 1.50%', alert: '<0.80% increases berry cracking & shatter', action: 'Fertigate Ca(NO3)2 in Tank B during Oct 41–70 DAP' },
  { nutrient: 'Magnesium (Mg)', optimum: '0.30 – 0.60%', alert: 'Common interveinal yellowing on Dogridge', action: 'Foliar 0.5–1% MgSO4 or Tank-A fertigation' },
  { nutrient: 'Zinc (Zn) & Boron (B)', optimum: '30 – 50 ppm each', alert: 'Deficiency triggers shot berries; B >1 ppm in water is toxic', action: 'Pre-bloom 0.1% B + 0.25% Zn (verify water B first)' },
  { nutrient: 'Iron (Fe)', optimum: '50 – 100 ppm', alert: 'Locked up in calcareous/high-HCO3- soil', action: 'Acidify drip water to pH 6.5 + Fe-EDDHA 10–15 g/vine' },
  { nutrient: 'Sodium (Na) & Chloride (Cl)', optimum: 'Na <0.40% · Cl <1.0%', alert: 'TOXICITY: Na >0.40–0.50% or Cl >1.0–1.5%', action: 'Auto-block MOP; +20% SOP + gypsum + shift future blocks to 110R' },
];

export const PESTS_TABLE = [
  {
    pest: 'Flea Beetle (Udadya)',
    symptoms: 'Chews swollen sprouting buds causing blind spurs',
    etl: '7–25 DAP (>5 beetles/vine)',
    cultural: 'Strip loose trunk bark pre-pruning; clear orchard trash',
    chemical: 'Imidacloprid (0.3–0.4 ml/L) or Lambda-cyhalothrin strictly at bud-break (long 60d+ EU PHI — never apply late!)',
  },
  {
    pest: 'Thrips',
    symptoms: 'Corky scab/russet rings on berries; curled silvered shoots',
    etl: 'Pre-bloom to 8 mm (>5/shoot)',
    cultural: 'Blue sticky traps (25/ha); protective bunch bags',
    chemical: 'Spinosad (0.25–0.3 ml/L) or Emamectin benzoate (0.22–0.4 g/L) — rotate IRAC groups & obey NRCG Annexure-5 PHI',
  },
  {
    pest: 'Mealybug',
    symptoms: 'White cottony wax + sticky honeydew + black sooty mold inside bunches',
    etl: '60 DAP to harvest',
    cultural: 'Strip bark; trunk ant-barrier band; release Cryptolaemus montrouzieri (1,500–2,500/ha Nov–Dec)',
    chemical: 'Buprofezin (1.25–1.5 ml/L) or Spirotetramat early (NEVER spray Chlorpyrifos near berries!)',
  },
  {
    pest: 'Spider Mite & Jassids',
    symptoms: 'Bronzed webbed dry leaves (Feb–Mar); hopperburn margins',
    etl: 'Warm Jan–Apr (>5 mites/leaf)',
    cultural: 'Clean water misting; conserve predatory mites',
    chemical: 'Abamectin (0.4–0.5 ml/L), Spiromesifen (0.4–0.5 ml/L), Wettable Sulphur (2 g/L, stop >32–35°C)',
  },
  {
    pest: 'Stem Borer & Nematodes',
    symptoms: 'Trunk sawdust frass tunnels; stunted galled roots',
    etl: 'Year-round monitoring',
    cultural: 'Hooked wire extraction; 110R / Dogridge rootstock; Purpureocillium + neem cake',
    chemical: 'Chlorpyrifos (5 ml/L) trunk borer hole plug ONLY. BANNED by CIB&RC: Dichlorvos, Monocrotophos, Carbofuran, Phorate.',
  },
];

export const DISEASES_TABLE = [
  {
    disease: 'Downy Mildew (Kevda)',
    pathogen: 'Plasmopara viticola',
    symptoms: 'Yellow upper oil spots + fluffy white underside spores; ruins wet Oct panicles',
    control: 'Extended Y-trellis airflow, low-leaf stripping; rotate Copper (2 g/L) / Bordeaux (0.5–1%), Dimethomorph (1 g/L) + Mancozeb, Mandipropamid, Cymoxanil+Mancozeb',
    euRisk: 'HIGH EU MRL RISK: Stop Fosetyl-Al / Phosphonic acid & Mancozeb early per NRCG Annexure-5 PHI!',
  },
  {
    disease: 'Powdery Mildew (Bhuri)',
    pathogen: 'Erysiphe necator',
    symptoms: 'Ash-grey floury dust on leaves & berries leading to scarring and vertical cracking',
    control: 'Cluster-zone leaf pulling; Wettable Sulphur (2 g/L — stop >32–35°C!); rotate Myclobutanil (0.4 g/L), Azoxystrobin, or late-safe Potassium bicarbonate',
    euRisk: 'Check triazole/strobilurin PHIs in current-season NRCG Annexure-5; Potassium bicarbonate is late-stage safe',
  },
  {
    disease: 'Anthracnose & Bacterial Leaf Spot',
    pathogen: 'Elsinoe ampelina / Xanthomonas',
    symptoms: 'Sunken dark bird’s-eye cane lesions; angular water-soaked leaf spots in monsoon',
    control: 'April cane sanitation; Copper oxychloride (2–2.5 g/L), Propineb/Ziram, Kasugamycin where label-approved',
    euRisk: 'ANTIBIOTIC RESTRICTION: Flag Streptocycline restrictions; avoid Carbendazim in EU export lots',
  },
  {
    disease: 'Arm Dieback / Trunk Canker',
    pathogen: 'Botryosphaeria spp.',
    symptoms: 'Sudden arm/spur death with dark wedge-shaped internal wood decay',
    control: 'Prune back to 100% clean white-green wood + seal cuts with Copper oxychloride / Bordeaux wound paste + Trichoderma',
    euRisk: 'Cultural + wound-paste control (zero berry residue impact)',
  },
];

export const GLOSSARY = [
  { en: 'April Back Pruning', mr: 'खरड छाटणी (Kharad Chhatni)', hi: 'अप्रैल छंटाई', gu: 'એપ્રિલ છાંટણી' },
  { en: 'October Fruit Pruning', mr: 'गोड छाटणी (God Chhatni)', hi: 'अक्टूबर छंटाई', gu: 'ઓક્ટોબર છાંટણી' },
  { en: 'Sub-Cane', mr: 'बगलफूट (Bagalfut)', hi: 'बगल की शाखा', gu: 'બગલની ફૂટ' },
  { en: 'Downy Mildew', mr: 'केवडा (Kevda)', hi: 'डाउनी मिल्ड्यू', gu: 'કેવડો / તળછારો' },
  { en: 'Powdery Mildew', mr: 'भुरी (Bhuri)', hi: 'पाउडरी मिल्ड्यू', gu: 'ભુરી' },
  { en: 'Flea Beetle', mr: 'उडद्या (Udadya)', hi: 'फ्ली बीटल', gu: 'ઉડદિયા' },
  { en: 'Berry Drop / Shatter', mr: 'मणी गळ (Mani Gal)', hi: 'दाने झड़ना', gu: 'દાણા ખરવા' },
  { en: 'Berry Cracking', mr: 'मणी तडकणे (Mani Tadakne)', hi: 'दाने फटना', gu: 'દાણા ફાટવા' },
  { en: 'Raisins', mr: 'मनुका (Manuka)', hi: 'किशमिश', gu: 'કિસમિસ' },
];

export const PRIMARY_REFERENCES = [
  { org: 'ICAR–NRCG Pune (2018–2026)', title: 'GAP, Annexure-5 RMP, Soil/Petiole/PGR/Rootstock Guides', url: 'https://nrcgrapes.icar.gov.in' },
  { org: 'APEDA (2024–2026)', title: 'GrapeNet Traceability, Exports (2.24L MT / US$ 368M), Vietnam Access May 2026', url: 'https://apeda.gov.in' },
  { org: 'NHB & MoA&FW', title: 'National Grape Area (1.62L ha) & Production (3.7M MT)', url: 'https://nhb.gov.in' },
  { org: 'MPKV Rahuri & MANAGE', title: 'Maharashtra Vineyard Package of Practices & Extended Y-Trellis', url: 'https://mpkv.ac.in' },
  { org: 'TNAU Agritech Portal', title: 'Double-Crop Bower Fertilizer & Trenching Schedule', url: 'https://agritech.tnau.ac.in' },
  { org: 'DPPQ&S / CIB&RC', title: 'Registered & Banned Pesticides India', url: 'https://ppqs.gov.in' },
  { org: 'ICAR–IISS / SHC Portal', title: 'Soil Fertility Brackets (+25% / 0% / -25%)', url: 'https://soilhealth.dac.gov.in' },
  { org: 'Agmarknet & eNAM', title: 'Live Daily Grape Mandi Prices (Pimpalgaon, Lasalgaon, Tasgaon, Vijayapura)', url: 'https://agmarknet.gov.in' },
];
