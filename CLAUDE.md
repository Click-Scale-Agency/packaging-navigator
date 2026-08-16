# EU Packaging Hub (PPWR) — Project Context

Open-source knowledge hub + EPR fee calculator for the **EU Packaging and Packaging Waste Regulation (PPWR, Regulation (EU) 2025/40)**, applied since **12 August 2026**. Target audience: small businesses and e-commerce sellers (Latvian/Baltic first, EU-wide by design) who must handle EPR registration, packaging reporting and fees in every EU member state they ship to.

**Everything is free-for-all: MIT license, public GitHub repo, data as the primary product.**

**Repo status (2026-08-16):** this repo (`Click-Scale-Agency/packaging-navigator`) is the single home for UI + data, two-way synced with Lovable (project 8f0b9c29). The former `eu-packaging-hub` data repo was merged in here; `/data` at the repo root is canonical. UI code lives in `src/`, and `src/data/index.ts` is the ONLY bridge between canonical JSON and UI types — edit the mapping there, never fork the data into `src/`.

- Primary UI language: Latvian (LV), strings in `src/i18n/lv.ts`. English i18n on the roadmap.
- Stack: Vite + React + TypeScript + Tailwind CSS + Framer Motion (Lovable-synced). No backend, no tracking.
- The UI (shipping-label hero, calculator, country directory, timeline, FAQ) is built and data-driven per the model below.

## Core domain facts (do not re-research, see docs/research-log.md for sources)

1. PPWR applies directly in all 27 member states from 2026-08-12. No general SME exemption. EU-level relief for micro/small enterprises (Environmental Omnibus) was discussed but NOT in force as of Aug 2026 — assume obligations apply.
2. EPR is national: register in EVERY member state where packaging is first made available. No single EU registration. Most countries have a 0 kg threshold.
3. **Register ≠ PRO.** The register is the state's producer list (issues the number marketplaces check). The PRO (producer responsibility organisation / scheme) collects fees and recycles. Most markets require BOTH.
4. PPWR scope is defined by FUNCTION (Art. 2 + Art. 3 + Annex I), not by customs codes. Categories: sales (primary), grouped (secondary), transport (tertiary, incl. e-commerce packaging as defined subset), service, reusable, primary-production packaging. Labels, caps, tape, void fill all count separately.
5. CN/HS codes matter only for: (a) importing/classifying empty packaging, (b) Spain's plastic tax, (c) data structuring. Key headings: 3923 (plastic packaging), 3919/3920/3921 (films), 4819 (paper/board boxes), 4821 (paper labels), 7010 (glass), 7310 (steel cans), 7612 (aluminium), 4415 (wood), 6305 (textile sacks).
6. Spain has a SEPARATE plastic excise: €0.45/kg of non-recycled plastic in non-reusable packaging, collected by Agencia Tributaria (not the EPR scheme), applies to imports AND intra-EU acquisitions, 5 kg/month de-minimis. OPEN QUESTION: exact applicability to a LV e-shop shipping B2C to Spain — verify before building the Spain calculator module.
7. Fees are per-kg by material, modulated by recyclability (eco-modulation, swings of ±50–100%). They change YEARLY and differ between competing PROs. All rate data must carry `tariffYear` and `checkedAt`.

## Data architecture (canonical: JSON in repo)

```
/data
  /countries/{cc}.json      # 27 files, ISO 3166-1 alpha-2 lowercase
  cn-codes.json             # CN/HS headings per material
  regulation.json           # PPWR dates, EUR-Lex links, timeline
  /schema/country.schema.json
/docs/research-log.md       # research notes + sources with dates
/scripts/verify-sources.ts  # checks all source URLs alive, flags stale checkedAt
```

Three layers per country (do NOT merge them — v1 made this mistake):

1. `register` — the state producer register: name, official URL, number format (e.g. "DE + 13 digits"), whether a packaging register exists at all (LV: no; IE: no — Repak membership instead).
2. `pro` — scheme(s): examples with URLs, whether membership is mandatory, indicative rates €/kg per material with `tariffYear`.
3. `extraTaxes` — separate national taxes (ES plastic excise, HU termékdíj, EE pakendiaktsiis, HR poticajna naknada, RO Fund contribution).

Every country: `sources[] {url, title, checkedAt}` and `verified: boolean` (true only with an official tariff/source link). CI (GitHub Action) validates all country files against the schema and rejects `verified: true` without sources.

## Work plan (in order)

1. Scaffold repo: schema (draft in `data/schema/country.schema.json`), then `de.json` as the reference example, validated against schema.
2. GitHub Action: JSON schema validation on every PR + `verified`-requires-source rule.
3. Data collection sessions, ~5–6 countries per batch: WebFetch each register URL to verify it's live and correct, pull PRO tariff pages (mostly annual PDF price lists — Fost Plus, Ecoembes, CITEO etc.), fill country files, one commit per country so diffs are reviewable. Start from the verified register table in docs/research-log.md — names are confirmed, exact URLs partially need verification.
4. `scripts/verify-sources.ts` + monthly GitHub Action that opens an issue listing countries with stale `checkedAt` (>90 days) or dead source URLs.
5. Rebuild UI data layer to read from /data JSON; add CN-codes section to the site ("EPR is triggered by function, not CN code" explainer).
6. Marketplace number formats section (LUCID DE+13 digits, FR IDU/UIN, PL BDO 9 digits — verify Amazon/Etsy requirements).

## Non-goals (v1)

- No Supabase/backend — JSON in repo is canonical. A live-editing layer can be added later on top.
- No dynamic scraping infrastructure — sources are static pages/PDFs; a verification script is enough.
- No legal advice claims — every fee output carries an "indicative, verify official source" disclaimer.

## Conventions

- Conventional commits (`data(de): verified LUCID + 2026 dual-system rates`).
- All amounts EUR, rates as €/kg with 3 decimals max.
- Latvian UI copy lives in components for now; extract to i18n dictionary when EN is added.
- Never present unverified rates without the `verified: false` warning in UI.
