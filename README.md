# **Packaging Navigator**

Build "EU Packaging Hub" (Latvian working title: "ES Iepakojuma Ceļvedis") — an open-source knowledge hub + EPR fee calculator for the EU Packaging and Packaging Waste Regulation (PPWR, Regulation (EU) 2025/40, applies since 12 August 2026).

Reframe: this is not a compliance website — it is a calm desk in the middle of a bureaucratic storm. Small Latvian and Baltic e-shop owners arrive here panicking after Amazon froze their listings over a missing register number. Every design decision should lower their pulse: clarity as a public service. The central visual metaphor is the shipping label / customs stamp — the one object every e-commerce seller touches daily.

Stack: React, TypeScript, Tailwind CSS, Framer Motion for all animations, Lenis for smooth scroll. Micro-interactions on every interactive element. The site should sound good even on mute — rhythm through spacing and type, not decoration.

Visual language: warm paper white base (#faf8f4), ink black text (#111), one stamp-red accent (#d92d20) used ONLY for warnings/unverified flags, and one postal blue (#1d4ed8) for links/actions. Monospace type (like a customs form) for all data values, numbers and country codes; a strong grotesque for headlines (oversized, 80px+) against tiny 11px uppercase form-labels. Dashed borders, perforation lines and corner crop-marks as structural elements — the whole page feels like an oversized, beautifully typeset shipping document. No gradients, no stock photos, no glassmorphism.

ALL UI copy in Latvian. Keep copy strings in one dictionary file (src/i18n/lv.ts) so English can be added later.

DATA ARCHITECTURE — this is the most important constraint. The UI must be 100% data-driven from JSON files in src/data/ that mirror a GitHub repo (Click-Scale-Agency/eu-packaging-hub) which is the canonical source; these files will be overwritten by repo syncs, so NO country facts may be hardcoded in components. Each country file has three SEPARATE layers that must stay visually distinct in the UI (never merge them):
1) "register" — the state producer register (name, url, numberFormat e.g. "DE + 13 digits", exists:boolean — some countries like LV and IE have NO register),
2) "pro" — producer responsibility organisation schemes (name, url, rates €/kg per material: paper/plastic/glass/metal/wood/composite, tariffYear, membershipRequired),
3) "extraTaxes" — separate national taxes (e.g. Spain's €0.45/kg plastic excise, Latvia's DRN).
Plus: sources[] {url,title,checkedAt}, verified:boolean, lastReviewed. Create sample files for now with this exact shape for DE and LV (DE: register exists, LUCID, lucid.verpackungsregister.org, "DE + 13 digits", dual-system mandatory, rates all null, verified false. LV: register exists=false, note "reģistrs tiks izveidots līdz 2027", schemes Latvijas Zaļais punkts + Zaļā josta, DRN extra tax, verified false), and light placeholders for the other 25 EU countries. Every fee/rate display MUST show a red "NAV PĀRBAUDĪTS — pārbaudiet oficiālo avotu" stamp-style badge when verified is false, and every calculator output carries a permanent disclaimer: "Indikatīvi. Nav juridiska konsultācija."

Sections (single landing page + country detail route):
1. Hero — one oversized interactive shipping label filling the viewport: sender "Tavs e-veikals, LV", recipient "27 ES dalībvalstis", stamped with "PPWR 2026-08-12 — PIEMĒRO" and a barcode. On scroll the label's stamps press in one by one with spring physics. Single headline over it: "Iepakojums tagad ir regulēts. Mēs to iztulkojam."
2. Kalkulators — pick destination countries (chips), enter packaging weights per material (g), see indicative fee per country as monospace table rows that count up; unverified rows get the red stamp badge.
3. Valstu katalogs — 27 country cards in a grid, each a mini customs-form: flag-free (use ISO codes as big monospace letters), showing the three layers as three labelled form-rows (REĢISTRS / SHĒMA (PRO) / PAPILDU NODOKĻI). Click opens country detail with sources list and lastReviewed date.
4. Laika līnija — horizontal perforated timeline: 2025-02-11 spēkā → 2026-08-12 piemēro → 2027-02-12 reģistri+sodi → 2028-08-12 marķējums → 2030-01-01 pārstrādājamības klases. Current position marked with the red stamp.
5. "Funkcija, nevis kods" — short explainer section: EPR obligations are triggered by packaging FUNCTION, not CN customs codes; CN codes matter only for importing empty packaging and Spain's plastic tax.
6. BUJ (FAQ) — accordion, monospace questions: "Vai man jāreģistrējas visās 27 valstīs?", "Ar ko atšķiras reģistrs no PRO?", "Cik tas maksās?", "Vai Amazon tiešām bloķē?".
7. Footer — MIT licence, "Dati ir produkts" note, GitHub repo link, "Uztur Click Scale Agency" credit.

Motion: section reveals like a rubber stamp pressing (scale 1.02→1 with a soft spring, never bounce), table rows sliding in like printed receipt lines, timeline advancing as you scroll through it. Restraint over spectacle.

References (sensibility, not competitors): Teenage Engineering documentation pages, Stripe Press books, Dutch tax authority (Belastingdienst) clarity-first design, MUJI packaging, vintage airmail envelopes.

Fully responsive; calculator must be excellent on mobile. Awwwards-level typographic quality — this should feel like a national postal service hired a Swiss design studio to explain an EU regulation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f0b9c29-22ad-45a8-8024-e4f268139af7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
