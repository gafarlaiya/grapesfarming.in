/**
 * Reusable Outdoor-Readable Agri-Tech Bento UI Components:
 *  - AEO Direct Answer Box (40–50 words)
 *  - Interactive Crop-Stage Stepper
 *  - Visual "Photo Look-Alike" Triage Cards (with crisp inline diagnostic SVGs)
 *  - Split-Screen Live Fertilizer Calculator
 *  - Semantic Responsive Tables & FAQs
 */
import { escapeHtml } from './layout.js';
import { CROP_STAGES, LOOKALIKE_CARDS } from '../data/site-data.js';
import { AREA_UNITS, SPACING_PRESETS } from '../lib/calculator-engine.js';

export function renderDirectAnswer(label, htmlText) {
  return `
    <div class="direct-answer">
      <span class="direct-answer-label">${escapeHtml(label)}</span>
      <p>${htmlText}</p>
    </div>`;
}

export function renderStageStepper(heading = 'Interactive Vineyard Crop-Stage Stepper') {
  const tabsHtml = CROP_STAGES.map(
    (s, i) => `
      <button
        type="button"
        role="tab"
        class="stepper-tab"
        id="tab-${s.id}"
        aria-controls="panel-${s.id}"
        aria-selected="${i === 0 ? 'true' : 'false'}"
        tabindex="${i === 0 ? '0' : '-1'}"
      >${escapeHtml(s.shortLabel)}</button>`
  ).join('');

  const panelsHtml = CROP_STAGES.map(
    (s, i) => `
      <div
        role="tabpanel"
        id="panel-${s.id}"
        aria-labelledby="tab-${s.id}"
        class="stepper-panel"
        ${i === 0 ? '' : 'hidden'}
      >
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.5rem;">
          <h3 style="margin:0;">${escapeHtml(s.title)}</h3>
          <span class="pill pill-green">${escapeHtml(s.dap)}</span>
        </div>
        <div class="stepper-metrics">
          <div class="stepper-box">
            <div class="stepper-box-label">Daily Drip Water</div>
            <strong>${escapeHtml(s.water)}</strong>
          </div>
          <div class="stepper-box">
            <div class="stepper-box-label">Nutrient Focus</div>
            <span>${escapeHtml(s.nutrient)}</span>
          </div>
          <div class="stepper-box">
            <div class="stepper-box-label">Canopy &amp; PGR Task</div>
            <span>${escapeHtml(s.canopy)}</span>
          </div>
        </div>
        <div class="warn-item ${s.alertLevel}">
          <strong>Top Stage Alert: ${escapeHtml(s.alertTitle)}</strong>
          ${escapeHtml(s.alertText)}
        </div>
        <div style="margin-top:0.75rem;">
          <a class="btn btn-secondary" href="${s.link}">Open full guide for this stage →</a>
        </div>
      </div>`
  ).join('');

  return `
    <section class="section" id="stage-stepper">
      <h2>${escapeHtml(heading)}</h2>
      <p style="margin:0 0 0.9rem;color:var(--ink-muted);">Tap any pruning or fruiting stage to check exact DAP window, daily drip water (L/vine/day), fertigation focus, canopy task, and EU MRL/disease alerts [ICAR-NRCG].</p>
      <div class="stepper-shell" data-stepper>
        <div class="stepper-tabs" role="tablist" aria-label="Grapevine crop stages">
          ${tabsHtml}
        </div>
        ${panelsHtml}
      </div>
    </section>`;
}

function diagnosticSvg(key) {
  const svgs = {
    downy: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#ECFDF5"/><path d="M34 10C20 14 14 28 18 44c4 10 16 14 16 14s12-4 16-14c4-16-2-30-16-34z" fill="#22C55E" stroke="#14532D" stroke-width="2"/><circle cx="28" cy="28" r="6" fill="#FDE047" opacity="0.9"/><circle cx="40" cy="38" r="5" fill="#FFFFFF" stroke="#94A3B8" stroke-dasharray="2 2"/></svg>`,
    powdery: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#F8FAFC"/><circle cx="27" cy="29" r="10" fill="#86EFAC" stroke="#14532D" stroke-width="2"/><circle cx="41" cy="31" r="10" fill="#CBD5E1" stroke="#475569" stroke-width="2"/><circle cx="34" cy="44" r="10" fill="#94A3B8" stroke="#334155" stroke-width="2"/><path d="M34 36l-2 15" stroke="#DC2626" stroke-width="2"/></svg>`,
    salinity: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#FFFBEB"/><path d="M34 10C20 14 14 28 18 44c4 10 16 14 16 14s12-4 16-14c4-16-2-30-16-34z" fill="#FDE047" stroke="#B45309" stroke-width="4"/><path d="M34 12v44M34 26l-10 6M34 36l10 6" stroke="#15803D" stroke-width="2"/></svg>`,
    dieback: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#FEF2F2"/><circle cx="34" cy="34" r="22" fill="#FEF3C7" stroke="#78350F" stroke-width="3"/><path d="M34 34L54 24A22 22 0 0 1 46 52Z" fill="#7F1D1D"/></svg>`,
    shotberry: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#ECFDF5"/><circle cx="24" cy="26" r="8" fill="#4ADE80" stroke="#14532D" stroke-width="2"/><circle cx="44" cy="28" r="8" fill="#4ADE80" stroke="#14532D" stroke-width="2"/><circle cx="34" cy="42" r="4" fill="#86EFAC" stroke="#14532D" stroke-width="1.5"/><circle cx="22" cy="44" r="3.5" fill="#86EFAC" stroke="#14532D" stroke-width="1.5"/><circle cx="44" cy="45" r="3.5" fill="#86EFAC" stroke="#14532D" stroke-width="1.5"/></svg>`,
    thrips: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#FFFBEB"/><circle cx="34" cy="34" r="18" fill="#86EFAC" stroke="#14532D" stroke-width="2"/><ellipse cx="34" cy="24" rx="11" ry="4.5" fill="none" stroke="#B45309" stroke-width="3"/></svg>`,
    pinkberry: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#FDF2F8"/><circle cx="26" cy="28" r="9" fill="#86EFAC" stroke="#14532D" stroke-width="2"/><circle cx="42" cy="30" r="9" fill="#F9A8D4" stroke="#BE185D" stroke-width="2"/><circle cx="34" cy="44" r="9" fill="#F472B6" stroke="#BE185D" stroke-width="2"/></svg>`,
    shatter: `<svg class="triage-svg" viewBox="0 0 68 68" aria-hidden="true"><rect width="68" height="68" fill="#FEF2F2"/><path d="M34 10v16M34 26l-10 8M34 26l10 8" stroke="#78350F" stroke-width="2.5"/><circle cx="23" cy="50" r="8" fill="#86EFAC" stroke="#DC2626" stroke-width="2"/><circle cx="45" cy="52" r="8" fill="#86EFAC" stroke="#DC2626" stroke-width="2"/></svg>`,
  };
  return svgs[key] || svgs.downy;
}

export function renderLookalikeTriage(cards = LOOKALIKE_CARDS) {
  return cards
    .map((pair) => {
      const renderSide = (side) => `
        <div class="triage-side tone-${side.badgeTone}">
          <div class="triage-head">
            ${diagnosticSvg(side.visualKey)}
            <div>
              <span class="pill pill-${side.badgeTone}">${escapeHtml(side.badge)}</span>
              <h3 style="margin:0.35rem 0 0.1rem;color:var(--ink);">${escapeHtml(side.name)}</h3>
              <div style="font-size:0.84rem;color:var(--ink-soft);"><em>${escapeHtml(side.pathogen)}</em></div>
            </div>
          </div>
          <ul class="triage-clues">
            ${side.clues.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
          <div class="triage-action"><strong>Field Fix:</strong> ${escapeHtml(side.action)}</div>
        </div>`;

      return `
        <article class="triage-pair" id="triage-${pair.id}">
          <div class="triage-category">${escapeHtml(pair.category)}</div>
          <div class="triage-split">
            ${renderSide(pair.left)}
            ${renderSide(pair.right)}
          </div>
        </article>`;
    })
    .join('');
}

export function renderTable(headers, rows) {
  return `
    <div class="table-scroll">
      <table>
        <thead>
          <tr>${headers.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r) =>
                `<tr>${r
                  .map((cell, idx) => (idx === 0 ? `<td><strong>${cell}</strong></td>` : `<td>${cell}</td>`))
                  .join('')}</tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>`;
}

export function renderFaqs(faqs, heading = 'Frequently Asked Grower Questions') {
  return `
    <section class="section" id="faqs">
      <h2>${escapeHtml(heading)}</h2>
      <div class="faq-list">
        ${faqs
          .map(
            (f, i) => `
          <details class="faq-item"${i === 0 ? ' open' : ''}>
            <summary>${escapeHtml(f.q)}</summary>
            <p>${escapeHtml(f.a)}</p>
          </details>`
          )
          .join('')}
      </div>
    </section>`;
}

export function renderCalculatorWidget() {
  const unitButtons = Object.values(AREA_UNITS)
    .map(
      (u) =>
        `<button type="button" class="unit-pill" data-unit-btn="${u.id}" aria-pressed="${u.id === 'guntha' ? 'true' : 'false'}">${escapeHtml(u.shortLabel)}</button>`
    )
    .join('');

  const unitOptions = Object.values(AREA_UNITS)
    .map((u) => `<option value="${u.id}">${escapeHtml(u.label)}</option>`)
    .join('');

  const spacingOptions = SPACING_PRESETS.map(
    (s) => `<option value="${s.id}">${escapeHtml(s.label)}</option>`
  ).join('');

  return `
    <section class="section" id="calculator">
      <h2>Live Grape Fertilizer &amp; Fertigation Dose Calculator</h2>
      ${renderDirectAnswer(
        'Direct Answer · ICAR-NRCG & TNAU Calculator',
        'Calculate exact grapevines, annual or per-crop N:P₂O₅:K₂O (kg), and commercial 25/45/50 kg bag counts across Acre, Guntha (40/acre), Gujarat Vigha (16/20/24 gunthas), HP Bigha, and J&amp;K Kanal. Automatically blocks MOP when ECw ≥ 1.0 dS/m or Cl⁻ > 3 me/L and enforces Tank A/B Ca(NO₃)₂ locks [ICAR-NRCG; TNAU].'
      )}

      <div class="calc-layout">
        <form id="grape-calc-form" class="calc-form-card" novalidate>
          <div class="preset-row">
            <button type="button" class="btn btn-subtle" data-example-btn="nashik_saline">Load Worked Ex. (a): Nashik 110R Saline</button>
            <button type="button" class="btn btn-subtle" data-example-btn="tn_double_crop">Load Worked Ex. (b): TN Double-Crop Bower</button>
          </div>

          <div class="form-grid">
            <div class="field">
              <label for="calc-regime">Cropping Regime (Strictly Separated)</label>
              <select id="calc-regime" name="regime">
                <option value="mh_ka_single">MH / KA Single-Crop Drip (ICAR-NRCG: Apr + Oct Splits)</option>
                <option value="tn_double">TN / South India Double-Crop Bower (TNAU: Per-Crop)</option>
              </select>
            </div>

            <div class="field">
              <label for="calc-area">Vineyard Area &amp; Regional Land Unit</label>
              <div class="form-grid two">
                <input id="calc-area" type="number" step="0.1" min="0.1" value="40" aria-label="Area quantity">
                <select id="calc-unit" aria-label="Area unit">${unitOptions}</select>
              </div>
              <div class="unit-pills" role="group" aria-label="Quick regional area unit toggle">${unitButtons}</div>
              <div id="calc-unit-note" style="font-size:0.83rem;color:var(--ink-soft);margin-top:0.35rem;">40 Gunthas = 1 Acre (101.17 m² each)</div>
            </div>

            <div class="field">
              <label for="calc-spacing-preset">Trellis Spacing Preset</label>
              <select id="calc-spacing-preset">
                ${spacingOptions}
              </select>
            </div>

            <div class="form-grid two">
              <div class="field">
                <label for="calc-row-m">Row-to-Row Spacing (m)</label>
                <input id="calc-row-m" type="number" step="0.05" min="1.5" max="6" value="3.0">
              </div>
              <div class="field">
                <label for="calc-vine-m">Vine-to-Vine Spacing (m)</label>
                <input id="calc-vine-m" type="number" step="0.05" min="0.9" max="6" value="1.5">
              </div>
            </div>

            <div class="field">
              <label for="calc-rootstock">Rootstock Selection</label>
              <select id="calc-rootstock">
                <option value="110r">110R / B2-56 (Best Na+ Exclusion &amp; Drought)</option>
                <option value="dogridge">Dogridge (Cannot Exclude Na+ — Caution in Saline Water)</option>
                <option value="140ru">140Ru (Calcareous &amp; Shallow Soil)</option>
                <option value="1103p">1103P (Heavy Moist Black Clay)</option>
                <option value="own_rooted">Own-Rooted V. vinifera (Sweet Water Only)</option>
              </select>
            </div>

            <div class="form-grid three">
              <div class="field">
                <label for="calc-soil-n">Soil N (SHC)</label>
                <select id="calc-soil-n">
                  <option value="low">Low (&lt;280 · +25%)</option>
                  <option value="medium" selected>Medium (0%)</option>
                  <option value="high">High (&gt;560 · -25%)</option>
                </select>
              </div>
              <div class="field">
                <label for="calc-soil-p">Soil P (SHC)</label>
                <select id="calc-soil-p">
                  <option value="low" selected>Low (&lt;10 · +25%)</option>
                  <option value="medium">Medium (0%)</option>
                  <option value="high">High (&gt;25 · -25%)</option>
                </select>
              </div>
              <div class="field">
                <label for="calc-soil-k">Soil K (SHC)</label>
                <select id="calc-soil-k">
                  <option value="low">Low (&lt;118 · +25%)</option>
                  <option value="medium" selected>Medium (0%)</option>
                  <option value="high">High (&gt;280 · -25%)</option>
                </select>
              </div>
            </div>

            <div class="form-grid three">
              <div class="field">
                <label for="calc-ecw">Water ECw (dS/m)</label>
                <input id="calc-ecw" type="number" step="0.1" min="0" max="10" value="1.6">
              </div>
              <div class="field">
                <label for="calc-cl">Chloride Cl⁻ (me/L)</label>
                <input id="calc-cl" type="number" step="0.5" min="0" max="30" value="4.0">
              </div>
              <div class="field">
                <label for="calc-hco3">Bicarbonate HCO₃⁻ (me/L)</label>
                <input id="calc-hco3" type="number" step="0.1" min="0" max="15" value="3.2">
              </div>
            </div>

            <label class="check-row">
              <input id="calc-petiole-na" type="checkbox">
              <span><strong>Petiole Na &gt; 0.40% Override:</strong> Block MOP + boost Chloride-free SOP by +20% + gypsum [ICAR-NRCG]</span>
            </label>
            <label class="check-row">
              <input id="calc-petiole-p" type="checkbox">
              <span><strong>April 45 DAP Petiole P &lt; 0.25% Override:</strong> Boost April Days 31–60 MKP (0:52:34) by +20% [ICAR-NRCG]</span>
            </label>
          </div>
        </form>

        <div class="calc-summary-card" aria-live="polite">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;">
            <div>
              <span class="pill pill-green">Printable 1-Page A4 Schedule</span>
              <h3 id="calc-summary-title" style="margin:0.4rem 0 0.2rem;color:var(--ink);">MH / KA Single-Crop Drip (ICAR-NRCG)</h3>
              <p id="calc-summary-sub" style="margin:0;font-size:0.88rem;color:var(--ink-muted);">40 Guntha (1 acre · 4,046.86 m²) · Spacing 3 × 1.5 m</p>
            </div>
          </div>

          <div class="summary-kpi-grid">
            <div class="kpi-box"><div id="kpi-vines" class="kpi-num">899</div><div class="kpi-cap">Total Vines</div></div>
            <div class="kpi-box"><div id="kpi-n" class="kpi-num">97.09 kg</div><div class="kpi-cap">Total N</div></div>
            <div class="kpi-box"><div id="kpi-p" class="kpi-num">80.91 kg</div><div class="kpi-cap">Total P₂O₅</div></div>
            <div class="kpi-box"><div id="kpi-k" class="kpi-num">121.37 kg</div><div class="kpi-cap">Total K₂O</div></div>
          </div>

          <div id="calc-cycle-split"></div>
          <div id="calc-warnings" class="warning-stack"></div>

          <div class="table-scroll" style="margin:0.75rem 0;">
            <table>
              <thead>
                <tr>
                  <th scope="col">Stage / Cycle</th>
                  <th scope="col">Commercial Input</th>
                  <th scope="col">Tank Lock</th>
                  <th scope="col">Qty &amp; Bags</th>
                </tr>
              </thead>
              <tbody id="calc-products-body"></tbody>
            </table>
          </div>

          <div class="calc-actions">
            <button id="calc-print-btn" type="button" class="btn btn-primary">1-Click Print / Save PDF (A4)</button>
            <a id="calc-wa-btn" class="btn btn-whatsapp" href="https://wa.me/919978791167" target="_blank" rel="noopener noreferrer">Share Schedule on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>`;
}
