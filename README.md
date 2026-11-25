# GrapesFarming.in — Indian Viticulture, Fertigation & GrapeNet Export Reference

Outdoor-readable Agri-Tech Bento UI built for Indian grape growers (Maharashtra, Karnataka, Tamil Nadu, AP/Telangana) over rural 4G, grounded strictly in **ICAR-NRCG Pune**, **APEDA GrapeNet (2026)**, **MPKV Rahuri**, **TNAU Agritech**, **CIB&RC**, and **ICAR-IISS** primary sources.

## Architecture & Canonical URLs (Strict Anti-Cannibalization)
1. `/` — Pillar: Grape Farming in India + 10-Second Pain-Point Router + Stage Stepper
2. `/varieties-and-rootstocks/` — 110R vs Dogridge Na⁺ Table, 10 Cultivars & Extended Y-Trellis Spacing
3. `/april-and-october-pruning/` — Double-Pruning Physiology, Apr Days 31–60 N-Brake & 48-Hr Dormex
4. `/fertilizer-schedule-and-calculator/` — Split-Screen Live Calculator (Acre/Guntha/Vigha/Bigha/Kanal), Tank A/B Lock & Petiole Norms
5. `/ga3-cppu-and-berry-disorders/` — EU-Safe GA3/CPPU Protocol (≤2 ppm CPPU) & Pink Berry/Cracking/Shot Berry Fixes
6. `/diseases-and-pests/` — Visual Look-Alike Triage, Kevda/Bhuri/Thrips/Mealybug IPM, CIB&RC Banned List & EU MRL Warnings
7. `/grapenet-raisins-and-profit/` — APEDA GrapeNet Cold Chain, Sangli Raisins (25–26% Recovery) & Per-Acre Economics
8. `/mr/draksha-sheti/` — Complete Marathi Grower Guide (द्राक्ष शेती संपूर्ण मार्गदर्शन)
- Trust page: `/editorial-policy/` (Transparent GBO Education Disclosure & Primary References)

## Commands
```bash
npm run build   # Builds static dist/ + robots.txt, sitemap.xml, _headers, _redirects
npm test        # Runs Calculator Worked Examples (a) & (b), safety guards & 301/noindex Worker tests
npm run verify  # Runs all 6 Gate checks (URLs, 0 broken links, <=45 KB JS, JSON-LD, compliance)
npm run check   # Runs build + test + verify together
```

## Easy Deployment Options
- **Option A — 1-Click Cloudflare Pages Direct Upload (Zero Build Config):** Drag and drop `grapesfarming-dist-cloudflare-upload.zip` into **Cloudflare Dashboard → Workers & Pages → Create → Pages → Direct Upload**.
- **Option B — GitHub Desktop → Cloudflare Pages / Workers:** Commit and push this repository; set build command `npm run build` and output directory `dist`.
- **301 Domain Redirects:** Included in both `dist/_redirects` (Pages) and `src/worker.js` (Workers) to redirect `grapesfarming.com`, `www.grapesfarming.com`, `www.grapesfarming.in`, `grapefarming.in`, and `grapefarming.com` → `https://grapesfarming.in` with `301` status.
