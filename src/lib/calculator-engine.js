/**
 * Grape Fertilizer & Fertigation Calculator Engine for grapesfarming.in
 * Primary sources: ICAR-NRCG Pune (MH/KA Single-Crop Drip), TNAU Agritech (TN Double-Crop Bower),
 * ICAR-IISS Soil Health Card brackets, and Revenue Dept 2026 regional land conversions.
 *
 * Shared cleanly between browser ESM UI and Node unit tests (zero external dependencies).
 */

export const AREA_UNITS = {
  acre: {
    id: 'acre',
    label: 'Acre (40 Gunthas)',
    shortLabel: 'Acre',
    sqMeters: 4046.86,
    note: '1 Acre = 40 Gunthas = 4,046.86 m²',
  },
  guntha: {
    id: 'guntha',
    label: 'Guntha (MH / GJ)',
    shortLabel: 'Guntha',
    sqMeters: 101.1715,
    note: '40 Gunthas = 1 Acre (101.17 m² each)',
  },
  vigha_saurashtra: {
    id: 'vigha_saurashtra',
    label: 'Saurashtra Vigha (16 Gunthas)',
    shortLabel: 'Saurashtra Vigha',
    sqMeters: 1618.744,
    note: '16 Gunthas = 0.40 Acre = 1,618.74 m²',
  },
  vigha_gj: {
    id: 'vigha_gj',
    label: 'Gujarat Standard Vigha (20 Gunthas)',
    shortLabel: 'GJ Vigha',
    sqMeters: 2023.43,
    note: '20 Gunthas = 0.50 Acre = 2,023.43 m²',
  },
  vigha_gaekwad: {
    id: 'vigha_gaekwad',
    label: 'Gaekwad Vigha (24 Gunthas)',
    shortLabel: 'Gaekwad Vigha',
    sqMeters: 2428.116,
    note: '24 Gunthas = 0.60 Acre = 2,428.12 m²',
  },
  bigha_hp: {
    id: 'bigha_hp',
    label: 'HP Bigha (800 m²)',
    shortLabel: 'HP Bigha',
    sqMeters: 800,
    note: '1 Himachal Bigha = 800 m² (~0.198 Acre)',
  },
  kanal_jk: {
    id: 'kanal_jk',
    label: 'J&K Kanal (505.86 m²)',
    shortLabel: 'J&K Kanal',
    sqMeters: 505.8575,
    note: '8 Kanals = 1 Acre (505.86 m² each)',
  },
  hectare: {
    id: 'hectare',
    label: 'Hectare (2.47 Acres)',
    shortLabel: 'Hectare',
    sqMeters: 10000,
    note: '1 Hectare = 10,000 m² = 98.84 Gunthas',
  },
};

export const SPACING_PRESETS = [
  { id: '2.75x1.5', label: '2.75 × 1.5 m (9 × 5 ft · Extended Y-Trellis · 981/acre)', rowM: 2.75, vineM: 1.5 },
  { id: '3.0x1.5', label: '3.0 × 1.5 m (10 × 5 ft · Y-Trellis / Gable · 899/acre)', rowM: 3.0, vineM: 1.5 },
  { id: '3.0x1.8', label: '3.0 × 1.8 m (10 × 6 ft · Wide Y / Bower · 749/acre)', rowM: 3.0, vineM: 1.8 },
  { id: '3.0x3.0', label: '3.0 × 3.0 m (10 × 10 ft · TN Double-Crop Bower · 450/acre)', rowM: 3.0, vineM: 3.0 },
];

export const SOIL_MULTIPLIERS = {
  low: 1.25,
  medium: 1.0,
  high: 0.75,
};

export const WORKED_EXAMPLES = {
  nashik_saline: {
    name: 'Worked Example (a): Nashik Thompson on 110R (Saline Drip)',
    regime: 'mh_ka_single',
    areaValue: 40,
    areaUnit: 'guntha',
    rowM: 3.0,
    vineM: 1.5,
    rootstock: '110r',
    soilN: 'medium',
    soilP: 'low',
    soilK: 'medium',
    ecw: 1.6,
    chloride: 4.0,
    bicarbonate: 3.2,
    petioleNaHigh: false,
    petiolePLow: false,
  },
  tn_double_crop: {
    name: 'Worked Example (b): Tamil Nadu Muscat / Anab-e-Shahi Bower',
    regime: 'tn_double',
    areaValue: 1,
    areaUnit: 'acre',
    rowM: 3.0,
    vineM: 3.0,
    rootstock: 'own_rooted',
    soilN: 'medium',
    soilP: 'medium',
    soilK: 'medium',
    ecw: 0.6,
    chloride: 1.5,
    bicarbonate: 1.8,
    petioleNaHigh: false,
    petiolePLow: false,
  },
};

export function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function bagCount(kg, bagSizeKg = 50) {
  if (!kg || kg <= 0) return 0;
  return round2(kg / bagSizeKg);
}

/**
 * Compute full grape vineyard fertilizer schedule & safety warnings.
 * @param {object} input
 */
export function calculateGrapeSchedule(input = {}) {
  const regime = input.regime === 'tn_double' ? 'tn_double' : 'mh_ka_single';
  const unitInfo = AREA_UNITS[input.areaUnit] || AREA_UNITS.acre;
  const areaValue = Math.max(0.05, Number(input.areaValue) || 1);
  const rowM = Math.max(1.5, Math.min(6.0, Number(input.rowM) || (regime === 'tn_double' ? 3.0 : 3.0)));
  const vineM = Math.max(0.9, Math.min(6.0, Number(input.vineM) || (regime === 'tn_double' ? 3.0 : 1.5)));

  const rootstock = input.rootstock || '110r';
  const soilN = SOIL_MULTIPLIERS[input.soilN] ? input.soilN : 'medium';
  const soilP = SOIL_MULTIPLIERS[input.soilP] ? input.soilP : 'medium';
  const soilK = SOIL_MULTIPLIERS[input.soilK] ? input.soilK : 'medium';

  const ecw = Math.max(0, Number(input.ecw ?? 0.8));
  const chloride = Math.max(0, Number(input.chloride ?? 2.0));
  const bicarbonate = Math.max(0, Number(input.bicarbonate ?? 1.8));
  const petioleNaHigh = Boolean(input.petioleNaHigh);
  const petiolePLow = Boolean(input.petiolePLow);

  const areaSqM = round2(areaValue * unitInfo.sqMeters);
  const acres = round2(areaSqM / AREA_UNITS.acre.sqMeters);
  const vines = Math.max(1, Math.round(areaSqM / (rowM * vineM)));

  // Hard agronomic guards from ICAR-NRCG
  const mopBlocked = ecw >= 1.0 || chloride > 3.0 || petioleNaHigh;
  const needsAcidification = bicarbonate > 2.5;
  const severeSalinity = ecw > 2.7;
  const dogridgeSalineWarning = rootstock === 'dogridge' && (ecw >= 1.0 || chloride > 3.0 || petioleNaHigh);

  const warnings = [];

  if (mopBlocked) {
    warnings.push({
      level: 'danger',
      code: 'MOP_BLOCKED',
      title: 'MOP (0:0:60) Auto-Blocked — Use SOP (0:0:50) / KNO3 Only',
      detail: `Water ECw (${ecw} dS/m), Chloride (${chloride} me/L), or Petiole Na+ (>0.40%) exceeds grape safety thresholds. Chloride-rich MOP will scorch leaf margins and trigger K lockup [ICAR-NRCG].`,
    });
  }

  if (dogridgeSalineWarning) {
    warnings.push({
      level: 'danger',
      code: 'DOGRIDGE_SODIUM_RISK',
      title: 'Dogridge Rootstock Sodium Alert',
      detail: 'ICAR-NRCG Pune proved Dogridge cannot exclude Sodium (Na+). Under saline borewells it accumulates Na+, causes Potassium deficiency, and triggers dead cordons after Year 4–5. Use 110R or B2-56 for new plantings and flush with gypsum + SOP.',
    });
  }

  if (severeSalinity) {
    warnings.push({
      level: 'danger',
      code: 'SEVERE_ECW',
      title: 'Severe Water Salinity Alert (ECw > 2.7 dS/m)',
      detail: 'ECw above 2.7 dS/m causes heavy yield drop even on tolerant rootstocks. Blend sweet canal/farm-pond water, apply 10–15 t/ha organic mulch, and schedule leaching fractions [ICAR-NRCG].',
    });
  }

  if (needsAcidification) {
    warnings.push({
      level: 'caution',
      code: 'BICARBONATE_ACIDIFY',
      title: `High Bicarbonates (${bicarbonate} me/L) — Acidify Drip Water to pH 6.5`,
      detail: 'HCO3- > 2.5 me/L plugs emitters, locks up Fe/Zn, and leaves white lime spots on berries. Use controlled H2SO4 acidification to target pH 6.5 and never overhead-sprinkle saline/high-Cl water [ICAR-NRCG; MANAGE].',
    });
  }

  if (petioleNaHigh) {
    warnings.push({
      level: 'danger',
      code: 'PETIOLE_NA_OVERRIDE',
      title: 'Petiole Na > 0.40% Override Active (+20% SOP + Gypsum)',
      detail: 'Potassium supply boosted by +20% as Chloride-free SOP (0:0:50) to out-compete Sodium uptake. Incorporate soil gypsum + organic compost before root flush [ICAR-NRCG].',
    });
  }

  if (petiolePLow) {
    warnings.push({
      level: 'caution',
      code: 'PETIOLE_P_OVERRIDE',
      title: 'April 45 DAP Petiole P < 0.25% Override (+20% MKP)',
      detail: 'April Bud-Differentiation MKP (0:52:34) boosted by +20% during Days 31–60 to protect October fruit-bud initiation [ICAR-NRCG].',
    });
  }

  // Always show Tank A / Tank B separation lock + Stage N locks
  warnings.push({
    level: 'caution',
    code: 'TANK_AB_LOCK',
    title: 'Tank A vs. Tank B Safety Lock (Never Mix Calcium + Sulphate/Phosphate)',
    detail: 'Dissolve Calcium Nitrate [Ca(NO3)2] in Tank B ONLY. Keep SSP, MAP (12:61:00), MKP (0:52:34), SOP (0:0:50), and MgSO4 in Tank A to prevent insoluble gypsum/calcium-phosphate emitter clogging.',
  });

  if (regime === 'mh_ka_single') {
    warnings.push({
      level: 'info',
      code: 'APRIL_N_BRAKE',
      title: 'April Days 31–60 N-Brake & October 100 DAP Zero-N Lock',
      detail: 'Hard-cut Nitrogen during April Days 31–60 (fruit-bud differentiation) or shoots turn into fruitless tendrils. Stop ALL Nitrogen by 95–105 DAP in October so berries hit >=16°Brix without cracking or shatter [ICAR-NRCG].',
    });

    // ICAR-NRCG Pune Single-Crop Model: 108 g N : 72 g P2O5 : 135 g K2O + 20 kg FYM per vine/year
    const nPerVineG = 108 * SOIL_MULTIPLIERS[soilN];
    const pPerVineG = 72 * SOIL_MULTIPLIERS[soilP];
    const kPerVineG = 135 * SOIL_MULTIPLIERS[soilK] * (petioleNaHigh ? 1.2 : 1.0);

    const totalN = round2((vines * nPerVineG) / 1000);
    const totalP = round2((vines * pPerVineG) / 1000);
    const totalK = round2((vines * kPerVineG) / 1000);
    const totalFymKg = Math.round(vines * 20);

    // April Split: 35% N, 45% P, 25% K
    const aprN = round2(totalN * 0.35);
    const aprP = round2(totalP * 0.45);
    const aprK = round2(totalK * 0.25);

    // October Split: 65% N, 55% P, 75% K
    const octN = round2(totalN - aprN);
    const octP = round2(totalP - aprP);
    const octK = round2(totalK - aprK);

    // April products (Basal SSP = 30% annual P = 2/3 of April P; MKP = remaining 15% annual P)
    const aprBasalP = round2(totalP * 0.30);
    const aprSspKg = round2(aprBasalP / 0.16);

    const aprMkpPBase = round2(aprP - aprBasalP);
    const aprMkpP = petiolePLow ? round2(aprMkpPBase * 1.2) : aprMkpPBase;
    const aprMkpKg = round2(aprMkpP / 0.52);
    const aprMkpKProvided = round2(aprMkpKg * 0.34);

    const aprRemK = Math.max(0, round2(aprK - aprMkpKProvided));
    const aprSopKg = round2(aprRemK / 0.50);

    const aprUreaKg = round2(aprN / 0.46);
    const aprUreaD1_30 = round2(round2(totalN * 0.25) / 0.46);
    const aprUreaD31_60 = round2(round2(totalN * 0.05) / 0.46); // N-brake window
    const aprUreaD61_120 = round2(aprUreaKg - aprUreaD1_30 - aprUreaD31_60);

    // October products (MAP for 100% Oct P; KNO3 for 25% Oct K; SOP for 75% Oct K; Urea for remaining Oct N)
    const octMapKg = round2(octP / 0.61);
    const octMapNProvided = round2(octMapKg * 0.12);

    const octKno3K = round2(octK * 0.25);
    const octKno3Kg = round2(octKno3K / 0.45);
    const octKno3NProvided = round2(octKno3Kg * 0.13);

    const octRemK = Math.max(0, round2(octK - octKno3K));
    const octSopKg = round2(octRemK / 0.50);

    const octRemN = Math.max(0, round2(octN - octMapNProvided - octKno3NProvided));
    const octUreaKg = round2(octRemN / 0.46);

    const products = [
      {
        cycle: 'April Basal (Day 0)',
        product: 'FYM / Well-Rotted Compost',
        tank: 'Soil Trench',
        kg: totalFymKg,
        bagSizeKg: 1000,
        bagsLabel: `${round2(totalFymKg / 1000)} tonnes`,
        note: 'Incorporate in root zone before April sprout flush',
      },
      {
        cycle: 'April Basal (Day 0)',
        product: 'SSP (16% P2O5)',
        tank: 'Soil Basal',
        kg: aprSspKg,
        bagSizeKg: 50,
        bagsLabel: `${bagCount(aprSspKg, 50)} × 50 kg bags`,
        note: `Supplies ${aprBasalP} kg P2O5 (30% annual P) + Sulphur & Calcium`,
      },
      {
        cycle: 'April Days 1–30 (Shoot Growth)',
        product: 'Urea (46% N) — Early Flush',
        tank: 'Tank A / Drip',
        kg: aprUreaD1_30,
        bagSizeKg: 45,
        bagsLabel: `${bagCount(aprUreaD1_30, 45)} × 45 kg bags`,
        note: 'Builds 5–7 leaf canes cleanly before bud differentiation',
      },
      {
        cycle: 'April Days 31–60 (Bud Differentiation)',
        product: 'MKP (0:52:34)',
        tank: 'Tank A (No Ca!)',
        kg: aprMkpKg,
        bagSizeKg: 25,
        bagsLabel: `${bagCount(aprMkpKg, 25)} × 25 kg bags`,
        note: `Supplies ${aprMkpP} kg P2O5 + ${aprMkpKProvided} kg K2O for fruitful buds`,
      },
      {
        cycle: 'April Days 31–60 (N-Brake Window)',
        product: 'Urea (46% N) — Minimal',
        tank: 'Tank A / Drip',
        kg: aprUreaD31_60,
        bagSizeKg: 45,
        bagsLabel: `${bagCount(aprUreaD31_60, 45)} × 45 kg bags`,
        note: 'N-BRAKE ACTIVE: never exceed this during Days 31–60',
      },
      {
        cycle: 'April Days 31–120 (Cane Ripening)',
        product: 'SOP (0:0:50)',
        tank: 'Tank A (No Ca!)',
        kg: aprSopKg,
        bagSizeKg: 25,
        bagsLabel: `${bagCount(aprSopKg, 25)} × 25 kg bags`,
        note: `Supplies ${aprRemK} kg K2O (Chloride-free) + Urea ${aprUreaD61_120} kg in Days 61–120`,
      },
      {
        cycle: 'October Days 1–40 (Sprout → Bloom)',
        product: 'MAP (12:61:00)',
        tank: 'Tank A (No Ca!)',
        kg: octMapKg,
        bagSizeKg: 25,
        bagsLabel: `${bagCount(octMapKg, 25)} × 25 kg bags`,
        note: `Supplies ${octP} kg P2O5 + ${octMapNProvided} kg N for panicle elongation`,
      },
      {
        cycle: 'October Days 1–95 (Stop N by 95–105 DAP)',
        product: 'Urea (46% N) — October Cycle',
        tank: 'Tank A / Drip',
        kg: octUreaKg,
        bagSizeKg: 45,
        bagsLabel: `${bagCount(octUreaKg, 45)} × 45 kg bags`,
        note: `Supplies ${octRemN} kg N; split Days 1–40 & 41–70; ZERO N past 100 DAP`,
      },
      {
        cycle: 'October Days 41–105 (Set → Sizing)',
        product: 'Potassium Nitrate KNO3 (13:0:45)',
        tank: 'Tank A / B Compat.',
        kg: octKno3Kg,
        bagSizeKg: 25,
        bagsLabel: `${bagCount(octKno3Kg, 25)} × 25 kg bags`,
        note: `Supplies ${octKno3K} kg K2O + ${octKno3NProvided} kg N; pair Calcium Nitrate separately in Tank B`,
      },
      {
        cycle: 'October Days 41–140 (Sizing → Veraison)',
        product: 'SOP (0:0:50) — Brix & Firmness',
        tank: 'Tank A (No Ca!)',
        kg: octSopKg,
        bagSizeKg: 25,
        bagsLabel: `${bagCount(octSopKg, 25)} × 25 kg bags`,
        note: `Supplies ${octRemK} kg K2O; sole nutrient from 106–140 DAP for >=16°Brix`,
      },
    ];

    return {
      regime,
      regimeLabel: 'MH / KA Single-Crop Drip (ICAR-NRCG)',
      areaValue,
      areaUnit: unitInfo.id,
      areaUnitLabel: unitInfo.shortLabel,
      areaSqM,
      acres,
      rowM,
      vineM,
      vines,
      rootstock,
      mopBlocked,
      needsAcidification,
      perVineGrams: {
        N: round2(nPerVineG),
        P2O5: round2(pPerVineG),
        K2O: round2(kPerVineG),
      },
      totals: {
        N: totalN,
        P2O5: totalP,
        K2O: totalK,
        FYM_kg: totalFymKg,
      },
      april: {
        N: aprN,
        P2O5: aprP,
        K2O: aprK,
        FYM_kg: totalFymKg,
        SSP_kg: aprSspKg,
        MKP_kg: aprMkpKg,
        SOP_kg: aprSopKg,
        Urea_kg: aprUreaKg,
        Urea_d1_30_kg: aprUreaD1_30,
        Urea_d31_60_kg: aprUreaD31_60,
        Urea_d61_120_kg: aprUreaD61_120,
      },
      october: {
        N: octN,
        P2O5: octP,
        K2O: octK,
        MAP_kg: octMapKg,
        KNO3_kg: octKno3Kg,
        SOP_kg: octSopKg,
        Urea_kg: octUreaKg,
      },
      products,
      warnings,
    };
  }

  // Tamil Nadu / South India Double-Crop Bower Model (TNAU Agritech):
  // Per-crop base: 150 g N : 100 g P2O5 : 350 g K2O + 30 kg FYM per vine
  const nPerVineG = 150 * SOIL_MULTIPLIERS[soilN];
  const pPerVineG = 100 * SOIL_MULTIPLIERS[soilP];
  const kPerVineG = 350 * SOIL_MULTIPLIERS[soilK] * (petioleNaHigh ? 1.2 : 1.0);

  const totalN = round2((vines * nPerVineG) / 1000);
  const totalP = round2((vines * pPerVineG) / 1000);
  const totalK = round2((vines * kPerVineG) / 1000);
  const totalFymKg = Math.round(vines * 30);

  const sspKg = round2(totalP / 0.16);
  const ureaKg = round2(totalN / 0.46);
  const ureaSplitKg = round2(ureaKg / 2);

  // If sweet water (ECw < 1.0 & Cl <= 3 & no Petiole Na alert), MOP (60% K2O) is used per TNAU.
  // If saline, auto-block MOP and substitute Chloride-free SOP (50% K2O)!
  const potashSource = mopBlocked ? 'SOP (0:0:50)' : 'MOP (0:0:60)';
  const potashKg = mopBlocked ? round2(totalK / 0.50) : round2(totalK / 0.60);
  const potashSplitKg = round2(potashKg / 2);

  warnings.push({
    level: 'info',
    code: 'TN_ZERO_N_75DAP',
    title: 'Double-Crop Bower Lock: Zero Nitrogen Past 75 DAP',
    detail: 'Apply Urea in two equal splits (15 DAP & 45 DAP) and Potash in two splits (45 DAP & 75 DAP). Stop all Nitrogen past 75 DAP to avoid berry shatter and low Brix [TNAU].',
  });

  const products = [
    {
      cycle: 'Per-Crop Basal (At Pruning)',
      product: 'FYM / Compost',
      tank: 'Soil Basin',
      kg: totalFymKg,
      bagSizeKg: 1000,
      bagsLabel: `${round2(totalFymKg / 1000)} tonnes`,
      note: '30 kg/vine per crop incorporated in circular trenches [TNAU]',
    },
    {
      cycle: 'Per-Crop Basal (At Pruning)',
      product: 'SSP (16% P2O5)',
      tank: 'Soil Basal',
      kg: sspKg,
      bagSizeKg: 50,
      bagsLabel: `${bagCount(sspKg, 50)} × 50 kg bags`,
      note: `100% of crop P2O5 (${totalP} kg) applied basally`,
    },
    {
      cycle: '15 DAP & 45 DAP (2 Equal Splits)',
      product: 'Urea (46% N)',
      tank: 'Soil / Drip',
      kg: ureaKg,
      bagSizeKg: 45,
      bagsLabel: `${bagCount(ureaKg, 45)} × 45 kg bags`,
      note: `${ureaSplitKg} kg at 15 DAP + ${ureaSplitKg} kg at 45 DAP (Zero N past 75 DAP)`,
    },
    {
      cycle: '45 DAP & 75 DAP (2 Equal Splits)',
      product: potashSource,
      tank: mopBlocked ? 'Tank A (Chloride-Free)' : 'Soil / Drip',
      kg: potashKg,
      bagSizeKg: mopBlocked ? 25 : 50,
      bagsLabel: `${bagCount(potashKg, mopBlocked ? 25 : 50)} × ${mopBlocked ? 25 : 50} kg bags`,
      note: `${potashSplitKg} kg at 45 DAP + ${potashSplitKg} kg at 75 DAP`,
    },
  ];

  return {
    regime,
    regimeLabel: 'TN / South India Double-Crop Bower (TNAU)',
    areaValue,
    areaUnit: unitInfo.id,
    areaUnitLabel: unitInfo.shortLabel,
    areaSqM,
    acres,
    rowM,
    vineM,
    vines,
    rootstock,
    mopBlocked,
    needsAcidification,
    perVineGrams: {
      N: round2(nPerVineG),
      P2O5: round2(pPerVineG),
      K2O: round2(kPerVineG),
    },
    totals: {
      N: totalN,
      P2O5: totalP,
      K2O: totalK,
      FYM_kg: totalFymKg,
    },
    perCrop: {
      SSP_kg: sspKg,
      Urea_kg: ureaKg,
      Urea_split_kg: ureaSplitKg,
      Potash_source: potashSource,
      MOP_kg: mopBlocked ? 0 : potashKg,
      SOP_kg: mopBlocked ? potashKg : 0,
      Potash_split_kg: potashSplitKg,
    },
    products,
    warnings,
  };
}
