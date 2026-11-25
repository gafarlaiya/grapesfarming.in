/**
 * Lightweight Vanilla ESM Interactivity for grapesfarming.in
 * Budget target: total client JS <= 45 KB gzipped (actual ~7–9 KB gzipped!)
 * Features:
 *  1. Mobile Nav Drawer
 *  2. 10-Second Pain-Point Instant Search (<30ms local filtering, zero external API calls)
 *  3. Interactive Crop-Stage Stepper
 *  4. Split-Screen Live Grape Fertilizer Calculator + Print A4 + WhatsApp Share
 */
import { calculateGrapeSchedule, AREA_UNITS, WORKED_EXAMPLES } from './calculator-engine.js';
import { SEARCH_ITEMS } from './search-index.js';

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function initPainPointSearch() {
  const input = document.getElementById('pain-search-input');
  const resultsEl = document.getElementById('pain-search-results');
  const clearBtn = document.getElementById('pain-search-clear');
  if (!input || !resultsEl) return;

  const render = (raw) => {
    const q = raw.trim().toLowerCase();
    if (clearBtn) clearBtn.hidden = q.length === 0;
    if (!q) {
      resultsEl.hidden = true;
      resultsEl.innerHTML = '';
      return;
    }

    const terms = q.split(/\s+/).filter(Boolean);
    const matches = SEARCH_ITEMS.filter((item) => {
      const hay = `${item.title} ${item.category} ${item.summary} ${item.keywords}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    }).slice(0, 6);

    if (matches.length === 0) {
      resultsEl.innerHTML = `<div class="search-result-item"><strong>No exact local match for "${escapeHtml(raw)}".</strong><p class="search-result-summary">Try: 110R, Dogridge, Dormex, Kevda, Bhuri, Udadya, CPPU, Petiole, Guntha, GrapeNet, or Raisin.</p></div>`;
    } else {
      resultsEl.innerHTML = matches
        .map(
          (m) => `
          <a class="search-result-item" href="${m.url}">
            <div class="search-result-top">
              <span class="search-result-title">${escapeHtml(m.title)}</span>
              <span class="pill pill-green">${escapeHtml(m.badge)}</span>
            </div>
            <p class="search-result-summary">${escapeHtml(m.summary)}</p>
          </a>`
        )
        .join('');
    }
    resultsEl.hidden = false;
  };

  input.addEventListener('input', () => render(input.value));
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      render('');
      input.focus();
    });
  }
}

function initStageStepper() {
  const steppers = document.querySelectorAll('[data-stepper]');
  steppers.forEach((shell) => {
    const tabs = Array.from(shell.querySelectorAll('[role="tab"]'));
    const panels = Array.from(shell.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length) return;

    const activate = (idx) => {
      tabs.forEach((tab, i) => {
        const selected = i === idx;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel, i) => {
        panel.hidden = i !== idx;
      });
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(idx));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = (idx + 1) % tabs.length;
          activate(next);
          tabs[next].focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (idx - 1 + tabs.length) % tabs.length;
          activate(prev);
          tabs[prev].focus();
        }
      });
    });
  });
}

function initCalculator() {
  const form = document.getElementById('grape-calc-form');
  if (!form) return;

  const els = {
    regime: document.getElementById('calc-regime'),
    areaValue: document.getElementById('calc-area'),
    areaUnit: document.getElementById('calc-unit'),
    unitNote: document.getElementById('calc-unit-note'),
    spacingPreset: document.getElementById('calc-spacing-preset'),
    rowM: document.getElementById('calc-row-m'),
    vineM: document.getElementById('calc-vine-m'),
    rootstock: document.getElementById('calc-rootstock'),
    soilN: document.getElementById('calc-soil-n'),
    soilP: document.getElementById('calc-soil-p'),
    soilK: document.getElementById('calc-soil-k'),
    ecw: document.getElementById('calc-ecw'),
    chloride: document.getElementById('calc-cl'),
    bicarbonate: document.getElementById('calc-hco3'),
    petioleNa: document.getElementById('calc-petiole-na'),
    petioleP: document.getElementById('calc-petiole-p'),
    summaryTitle: document.getElementById('calc-summary-title'),
    summarySub: document.getElementById('calc-summary-sub'),
    kpiVines: document.getElementById('kpi-vines'),
    kpiN: document.getElementById('kpi-n'),
    kpiP: document.getElementById('kpi-p'),
    kpiK: document.getElementById('kpi-k'),
    cycleSplitEl: document.getElementById('calc-cycle-split'),
    warningsEl: document.getElementById('calc-warnings'),
    tableBody: document.getElementById('calc-products-body'),
    printBtn: document.getElementById('calc-print-btn'),
    waBtn: document.getElementById('calc-wa-btn'),
  };

  let lastResult = null;

  const unitButtons = Array.from(form.querySelectorAll('[data-unit-btn]'));
  const syncUnitPills = (unitId) => {
    unitButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.unitBtn === unitId));
    });
    if (els.unitNote && AREA_UNITS[unitId]) {
      els.unitNote.textContent = AREA_UNITS[unitId].note;
    }
  };

  unitButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      els.areaUnit.value = btn.dataset.unitBtn;
      syncUnitPills(btn.dataset.unitBtn);
      recalc();
    });
  });

  if (els.spacingPreset) {
    els.spacingPreset.addEventListener('change', () => {
      const val = els.spacingPreset.value;
      if (val && val.includes('x')) {
        const [r, v] = val.split('x').map(Number);
        els.rowM.value = r;
        els.vineM.value = v;
        recalc();
      }
    });
  }

  const applyPreset = (preset) => {
    els.regime.value = preset.regime;
    els.areaValue.value = preset.areaValue;
    els.areaUnit.value = preset.areaUnit;
    els.rowM.value = preset.rowM;
    els.vineM.value = preset.vineM;
    els.rootstock.value = preset.rootstock;
    els.soilN.value = preset.soilN;
    els.soilP.value = preset.soilP;
    els.soilK.value = preset.soilK;
    els.ecw.value = preset.ecw;
    els.chloride.value = preset.chloride;
    els.bicarbonate.value = preset.bicarbonate;
    els.petioleNa.checked = preset.petioleNaHigh;
    els.petioleP.checked = preset.petiolePLow;
    syncUnitPills(preset.areaUnit);
    recalc();
  };

  form.querySelectorAll('[data-example-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.exampleBtn;
      if (WORKED_EXAMPLES[key]) applyPreset(WORKED_EXAMPLES[key]);
    });
  });

  const recalc = () => {
    const input = {
      regime: els.regime.value,
      areaValue: Number(els.areaValue.value) || 1,
      areaUnit: els.areaUnit.value,
      rowM: Number(els.rowM.value) || 3.0,
      vineM: Number(els.vineM.value) || 1.5,
      rootstock: els.rootstock.value,
      soilN: els.soilN.value,
      soilP: els.soilP.value,
      soilK: els.soilK.value,
      ecw: Number(els.ecw.value) || 0,
      chloride: Number(els.chloride.value) || 0,
      bicarbonate: Number(els.bicarbonate.value) || 0,
      petioleNaHigh: els.petioleNa.checked,
      petiolePLow: els.petioleP.checked,
    };

    const res = calculateGrapeSchedule(input);
    lastResult = res;

    els.summaryTitle.textContent = res.regimeLabel;
    els.summarySub.textContent = `${res.areaValue} ${res.areaUnitLabel} (${res.acres} acre · ${res.areaSqM.toLocaleString('en-IN')} m²) · Spacing ${res.rowM} × ${res.vineM} m · FYM ${res.totals.FYM_kg.toLocaleString('en-IN')} kg`;
    els.kpiVines.textContent = res.vines.toLocaleString('en-IN');
    els.kpiN.textContent = `${res.totals.N} kg`;
    els.kpiP.textContent = `${res.totals.P2O5} kg`;
    els.kpiK.textContent = `${res.totals.K2O} kg`;

    if (res.regime === 'mh_ka_single') {
      els.cycleSplitEl.innerHTML = `
        <div class="bento-grid cols-2" style="gap:0.65rem;margin-bottom:0.85rem;">
          <div class="stepper-box">
            <div class="stepper-box-label">April Foundation (35% N · 45% P · 25% K)</div>
            <strong>${res.april.N} kg N · ${res.april.P2O5} kg P₂O₅ · ${res.april.K2O} kg K₂O</strong>
            <div style="font-size:0.84rem;color:var(--ink-muted);margin-top:0.25rem;">Urea split: ${res.april.Urea_d1_30_kg} kg (D1–30) · ${res.april.Urea_d31_60_kg} kg (D31–60 N-brake) · ${res.april.Urea_d61_120_kg} kg (D61–120)</div>
          </div>
          <div class="stepper-box">
            <div class="stepper-box-label">October Fruit Cycle (65% N · 55% P · 75% K)</div>
            <strong>${res.october.N} kg N · ${res.october.P2O5} kg P₂O₅ · ${res.october.K2O} kg K₂O</strong>
            <div style="font-size:0.84rem;color:var(--ink-muted);margin-top:0.25rem;">MAP ${res.october.MAP_kg} kg · KNO₃ ${res.october.KNO3_kg} kg · SOP ${res.october.SOP_kg} kg · Urea ${res.october.Urea_kg} kg</div>
          </div>
        </div>`;
    } else {
      els.cycleSplitEl.innerHTML = `
        <div class="stepper-box" style="margin-bottom:0.85rem;">
          <div class="stepper-box-label">Per-Crop Double-Bower Totals (TNAU: 150:100:350 g/vine)</div>
          <strong>SSP ${res.perCrop.SSP_kg} kg (Basal) · Urea ${res.perCrop.Urea_kg} kg (${res.perCrop.Urea_split_kg} kg × 2) · ${res.perCrop.Potash_source} ${res.mopBlocked ? res.perCrop.SOP_kg : res.perCrop.MOP_kg} kg (${res.perCrop.Potash_split_kg} kg × 2)</strong>
        </div>`;
    }

    els.warningsEl.innerHTML = res.warnings
      .map(
        (w) => `<div class="warn-item ${w.level}"><strong>${escapeHtml(w.title)}</strong>${escapeHtml(w.detail)}</div>`
      )
      .join('');

    els.tableBody.innerHTML = res.products
      .map(
        (p) => `
        <tr>
          <td><strong>${escapeHtml(p.cycle)}</strong></td>
          <td><strong>${escapeHtml(p.product)}</strong><br><span style="font-size:0.83rem;color:var(--ink-soft);">${escapeHtml(p.note)}</span></td>
          <td><span class="pill pill-slate">${escapeHtml(p.tank)}</span></td>
          <td><strong>${p.kg.toLocaleString('en-IN')} kg</strong><br><span style="font-size:0.83rem;color:var(--forest);">${escapeHtml(p.bagsLabel)}</span></td>
        </tr>`
      )
      .join('');

    if (els.waBtn) {
      const topLines = res.products
        .map((p) => `- ${p.product}: ${p.kg} kg (${p.bagsLabel}) [${p.tank}]`)
        .join('\n');
      const alertLine = res.mopBlocked ? 'SALINE LOCK: MOP blocked (SOP only).' : 'Sweet water (<1.0 dS/m).';
      const msg = `[GRAPES-CALC] Vineyard Fertilizer Schedule (${res.regimeLabel})\nArea: ${res.areaValue} ${res.areaUnitLabel} (${res.vines} vines @ ${res.rowM}x${res.vineM}m)\nNPK Total: ${res.totals.N} kg N | ${res.totals.P2O5} kg P2O5 | ${res.totals.K2O} kg K2O\n${alertLine} Tank A/B Lock: Isolate Ca(NO3)2 in Tank B.\nProducts:\n${topLines}\nGenerated on https://grapesfarming.in/fertilizer-schedule-and-calculator/`;
      els.waBtn.href = `https://wa.me/919978791167?text=${encodeURIComponent(msg)}`;
    }
  };

  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);

  if (els.printBtn) {
    els.printBtn.addEventListener('click', () => window.print());
  }

  // Initialize with Worked Example (a) Nashik 110R Saline Drip so users immediately see real ICAR numbers
  applyPreset(WORKED_EXAMPLES.nashik_saline);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPainPointSearch();
  initStageStepper();
  initCalculator();
});
