# Packaging Navigator — EU Packaging Hub (PPWR)

Atvērtā koda zināšanu bāze un EPR maksu kalkulators par **ES Iepakojuma un izlietotā iepakojuma regulu (PPWR, Regula (ES) 2025/40)**, kas piemērojama no **2026. gada 12. augusta**. Mērķauditorija: mazie uzņēmumi un e-komercijas pārdevēji, kuriem jāreģistrējas, jāatskaitās un jāmaksā par iepakojumu katrā ES dalībvalstī, uz kuru tie sūta preces.

**Open-source knowledge hub + EPR fee calculator** for the EU Packaging and Packaging Waste Regulation. Latvian/Baltic first, EU-wide by design. **The data is the product** — the UI is a Lovable-synced Vite/React app rendering it.

## Repo layout

| Path | Contents |
|---|---|
| `data/countries/{cc}.json` | **Canonical** per-country EPR facts: state register, PRO scheme(s) + rates, extra taxes |
| `data/regulation.json` | PPWR key dates, EUR-Lex links, timeline |
| `data/cn-codes.json` | CN/HS headings per packaging material (imports + Spanish plastic tax only) |
| `data/marketplace-numbers.json` | Register number formats marketplaces ask for (LUCID, IDU, BDO…) |
| `data/schema/country.schema.json` | JSON Schema every country file must pass |
| `src/` | The web app (Lovable-synced). `src/data/index.ts` adapts canonical JSON to UI types |
| `docs/research-log.md` | Research notes + sources with dates |
| `scripts/` | Data validation + source freshness checks |

Every country file carries `sources[]` with `checkedAt` dates and a `verified` flag — `verified: true` is only allowed with at least one official (government/register/PRO) source, enforced by CI. The UI must show the red "NAV PĀRBAUDĪTS" badge on anything unverified.

## Development

```bash
bun install
bun run dev
```

The app is edited visually in [Lovable](https://lovable.dev/projects/8f0b9c29-22ad-45a8-8024-e4f268139af7) (two-way GitHub sync). Data files under `/data` are edited in this repo directly (Claude Code data sessions) — never inside Lovable.

## Data validation

```bash
npm install --no-save ajv ajv-formats
node scripts/validate-data.mjs   # schema + project rules
bun scripts/verify-sources.ts    # source URLs alive + checkedAt freshness
```

CI runs schema validation on every PR touching `/data`; a monthly workflow opens an issue when source links die or `checkedAt` goes stale (>90 days).

## Disclaimer / Atruna

Šeit apkopotās likmes un prasības ir **indikatīvas** un nav juridiska konsultācija — pirms lēmumiem pārbaudiet oficiālos avotus. All rates and requirements are **indicative**, not legal advice; verify against the official sources linked in each file.

## License

[MIT](LICENSE) — data and code free for all.
