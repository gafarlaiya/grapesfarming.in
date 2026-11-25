import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGrapeSchedule,
  WORKED_EXAMPLES,
  AREA_UNITS,
} from '../src/lib/calculator-engine.js';

test('Worked Example (a): 40 Gunthas (1 Acre) Nashik Thompson on 110R, Saline Drip (ICAR-NRCG)', () => {
  const res = calculateGrapeSchedule(WORKED_EXAMPLES.nashik_saline);

  assert.equal(res.vines, 899, 'Expected 899 vines/acre at 3.0 x 1.5 m');
  assert.equal(res.mopBlocked, true, 'ECw 1.6 dS/m must auto-block MOP');
  assert.equal(res.needsAcidification, true, 'HCO3- 3.2 me/L must trigger pH 6.5 acidification alert');

  // Annual totals: 108:90:135 g/vine * 899 vines
  assert.equal(res.totals.N, 97.09);
  assert.equal(res.totals.P2O5, 80.91);
  assert.equal(res.totals.K2O, 121.37);
  assert.equal(res.totals.FYM_kg, 17980);

  // April cycle split & commercial products
  assert.equal(res.april.N, 33.98);
  assert.equal(res.april.P2O5, 36.41);
  assert.equal(res.april.K2O, 30.34);
  assert.equal(res.april.SSP_kg, 151.69);
  assert.equal(res.april.MKP_kg, 23.35);
  assert.equal(res.april.SOP_kg, 44.8);
  assert.equal(res.april.Urea_kg, 73.87);
  assert.equal(res.april.Urea_d1_30_kg, 52.76);
  assert.equal(res.april.Urea_d31_60_kg, 10.54);
  assert.equal(res.april.Urea_d61_120_kg, 10.57);
  assert.equal(
    Number((res.april.Urea_d1_30_kg + res.april.Urea_d31_60_kg + res.april.Urea_d61_120_kg).toFixed(2)),
    73.87,
    'April urea stage splits must sum exactly to 73.87 kg'
  );

  // October cycle split & commercial products
  assert.equal(res.october.N, 63.11);
  assert.equal(res.october.P2O5, 44.5);
  assert.equal(res.october.K2O, 91.03);
  assert.equal(res.october.MAP_kg, 72.95);
  assert.equal(res.october.KNO3_kg, 50.58);
  assert.equal(res.october.SOP_kg, 136.54);
  assert.equal(res.october.Urea_kg, 103.87);

  // Tank A/B lock & salinity alerts present
  const codes = new Set(res.warnings.map((w) => w.code));
  assert.ok(codes.has('MOP_BLOCKED'));
  assert.ok(codes.has('BICARBONATE_ACIDIFY'));
  assert.ok(codes.has('TANK_AB_LOCK'));
  assert.ok(codes.has('APRIL_N_BRAKE'));
});

test('Worked Example (b): 1 Acre Tamil Nadu Muscat / Anab-e-Shahi Double-Crop Bower (TNAU)', () => {
  const res = calculateGrapeSchedule(WORKED_EXAMPLES.tn_double_crop);

  assert.equal(res.vines, 450, 'Expected 450 vines/acre at 3.0 x 3.0 m');
  assert.equal(res.mopBlocked, false, 'ECw 0.6 dS/m & Cl- 1.5 me/L permits MOP');
  assert.equal(res.totals.N, 67.5);
  assert.equal(res.totals.P2O5, 45.0);
  assert.equal(res.totals.K2O, 157.5);
  assert.equal(res.totals.FYM_kg, 13500);

  assert.equal(res.perCrop.SSP_kg, 281.25);
  assert.equal(res.perCrop.Potash_source, 'MOP (0:0:60)');
  assert.equal(res.perCrop.MOP_kg, 262.5);
  assert.equal(res.perCrop.Potash_split_kg, 131.25);
  assert.equal(res.perCrop.Urea_kg, 146.74);
  assert.equal(res.perCrop.Urea_split_kg, 73.37);
});

test('Safety Guards: Dogridge Na+ warning, Petiole Na+ >0.40% (+20% SOP), Petiole P <0.25% (+20% MKP)', () => {
  const base = calculateGrapeSchedule({
    ...WORKED_EXAMPLES.nashik_saline,
    rootstock: 'dogridge',
    petioleNaHigh: true,
    petiolePLow: true,
  });

  const codes = new Set(base.warnings.map((w) => w.code));
  assert.ok(codes.has('DOGRIDGE_SODIUM_RISK'));
  assert.ok(codes.has('PETIOLE_NA_OVERRIDE'));
  assert.ok(codes.has('PETIOLE_P_OVERRIDE'));

  const standard = calculateGrapeSchedule(WORKED_EXAMPLES.nashik_saline);
  assert.ok(base.totals.K2O > standard.totals.K2O, 'Petiole Na+ override must raise K2O by 20%');
  assert.ok(base.april.MKP_kg > standard.april.MKP_kg, 'Petiole P low override must raise April MKP by 20%');
});

test('TN Double-Crop auto-blocks MOP when ECw >= 1.0 dS/m', () => {
  const salineTn = calculateGrapeSchedule({
    ...WORKED_EXAMPLES.tn_double_crop,
    ecw: 1.4,
  });
  assert.equal(salineTn.mopBlocked, true);
  assert.equal(salineTn.perCrop.Potash_source, 'SOP (0:0:50)');
  assert.equal(salineTn.perCrop.MOP_kg, 0);
  assert.equal(salineTn.perCrop.SOP_kg, 315.0);
});

test('Regional Land Unit Conversions match Revenue Dept 2026 standards', () => {
  assert.equal(Math.round(AREA_UNITS.guntha.sqMeters * 40 * 100) / 100, AREA_UNITS.acre.sqMeters);
  assert.equal(Math.round((AREA_UNITS.vigha_saurashtra.sqMeters / AREA_UNITS.guntha.sqMeters)), 16);
  assert.equal(Math.round((AREA_UNITS.vigha_gj.sqMeters / AREA_UNITS.guntha.sqMeters)), 20);
  assert.equal(Math.round((AREA_UNITS.vigha_gaekwad.sqMeters / AREA_UNITS.guntha.sqMeters)), 24);
  assert.equal(AREA_UNITS.bigha_hp.sqMeters, 800);
  assert.equal(Math.round(AREA_UNITS.kanal_jk.sqMeters * 8 * 100) / 100, AREA_UNITS.acre.sqMeters);
});
