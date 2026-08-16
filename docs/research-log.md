# Research Log — PPWR / EU Packaging EPR

Compiled: 2026-08-16 (Claude chat research session). All findings below carry the source they came from; re-verify anything marked ⚠ before setting `verified: true`.

## 1. Regulation basics

- Regulation (EU) 2025/40 (PPWR): published OJ 22.01.2025, in force 11.02.2025, **applies 12.08.2026**. Replaces Directive 94/62/EC. Applies directly, no national transposition.
- Full text: https://eur-lex.europa.eu/eli/reg/2025/40/oj
- EC guidance + FAQ published March 2026, FAQ updated August 2026 (via ecosistant.eu report) — locate and link the official EC documents.
- Key deadlines: 12.08.2026 EPR registration / DoC / authorised representative / 40% empty-space cap (e-commerce) / PFAS limits for food packaging; 12.02.2027 member-state penalty regimes + national producer registers set up; 12.08.2028 harmonised labelling; 01.01.2030 recyclability grades (A/B/C), recycled-content minimums, reuse targets.
- Authorised Representative suspension for EU producers (Environmental Omnibus, COM(2025) 982): Council dropped EPR provisions from mandate 24.06.2026, negotiations reported discontinued → **assume AR obligation applies from 12.08.2026** (source: informait.com PPWR compliance guide 2026).
- Enforcement via marketplaces: under DSA, platforms (Amazon, Zalando…) must verify sellers' packaging registration where registers exist (source: circulatepack.com). Matches observed Amazon behaviour (LSM 12.08.2026 article: seller shown DE/ES register demands).

## 2. Scope — what counts as packaging

- Defined by FUNCTION (Art. 2, Art. 3, Annex I): contain, protect, handle, deliver, present. Sticky fruit labels = packaging; shrink/collation film = packaging; grower-only plant pots = not packaging (source: circularise.com).
- Categories (Art. 3): sales (primary), grouped (secondary), transport (replaces tertiary; e-commerce packaging is a defined subset), service packaging (filled at point of sale, incl. take-away), reusable, primary-production. Classification is 3 axes: structural level + functional subtype + single-use/reusable overlay (source: coolset.com).
- E-commerce: shipping cartons, mailers, poly bags, void fill, bubble wrap, inserts ALL in scope; no B2C dispatch carve-out; 40% max empty space from 2030, calculated on product dimensional volume vs inner carton volume (source: shippypro.com).
- Annex V bans certain formats (e.g. single-use plastic for condiments/sauces in HORECA, single-use accommodation miniatures) (source: compliancegate.com).

## 3. CN / HS codes for packaging (for imports of empty packaging + data structuring)

EPR obligations are NOT triggered by CN codes — function decides. Codes needed when buying/importing empty packaging and for the Spanish plastic tax.

| Material | Heading | Notes |
|---|---|---|
| Plastic packaging articles | 3923 | 3923.10 boxes/cases, 3923.21/29 sacks & bags, 3923.30 bottles/carboys, 3923.50 stoppers/lids/caps, 3923.90 other |
| Plastic films (wrap, bubble, stretch) | 3919 (self-adhesive), 3920, 3921 | |
| Paper/board boxes | 4819 | 4819.10 corrugated, 4819.20 folding non-corrugated |
| Paper labels | 4821 | 4821.10 printed |
| Glass containers | 7010 | 7010.90 bottles/jars |
| Steel/tin cans | 7310 | 7310.10 food/beverage |
| Aluminium containers | 7612 | 7612.90 |
| Wood (cases, pallets, drums) | 4415 | |
| Textile sacks | 6305 | plant-fibre bags/nets 5608.90 |

Sources: tariffnumber.com (3923), groundedpackaging.co HS guide, flexport.com headings. ⚠ Verify exact CN 8-digit splits against TARIC before publishing cn-codes.json.

## 4. Spain plastic excise (separate from EPR!)

- Law 7/2022; in force 01.01.2023. €0.45/kg of NON-recycled plastic in non-reusable packaging, empty or filled.
- Taxpayer: manufacturer / importer / intra-EU acquirer. Accrual: manufacture = first delivery; import = with customs duties; **intra-EU acquisition = 15th day of month following start of transport**. De-minimis: ≤5 kg non-recycled plastic per month. Registration in special registry, Model 592 returns. (Sources: trade.gov market intelligence; regsurance.com; fas.usda.gov GAIN SP2023-0004.)
- ⚠ OPEN: does a LV B2C e-shop shipping parcels to Spanish consumers count as making an "intra-Community acquisition" (normally the Spanish acquirer does), or does the obligation shift under distance-selling? Needs a primary-source answer (AEAT guidance) before the ES calculator module claims anything.

## 5. Verified national register map (packaging stream)

Source of register names/coverage: repax.io/epr-registers (fetched 2026-08-16, 46 registers / 31 countries). ⚠ = exact official portal URL still to be fetched/confirmed in Claude Code batch work.

| CC | Register (packaging) | Portal | Notes |
|---|---|---|---|
| AT | EDM (run by Umweltbundesamt for BMLUK) | edm.gv.at ⚠ | NOT VKS (v1 error). Foreign distance sellers need AR to register. |
| BE | IVC/CIE (Interregional Packaging Commission) | ivcie.be | Members declare via Fost Plus / Valipac; non-members directly to Commission. |
| BG | NISO (ExEA) | nwms.eea.government.bg ⚠ | Qualified e-signature required. |
| HR | RPPO (FZOEU) | fzoeu.hr | State-run fee model: pay Fund directly, no private PROs. |
| CY | DoE registers | moa.gov.cy ⚠ | Comply via licensed schemes (Green Dot Cyprus). |
| CZ | Seznam osob (obaly), VISOH2 | mzp.gov.cz ⚠ | In practice via EKO-KOM contract. |
| DK | DPA (single register, all streams) | producentansvar.dk | Register via virk.dk. |
| EE | PAKIS (separate from PROTO) | pakis.envir.ee | |
| FI | Tuottajarekisteri | ⚠ NEW | From 01.01.2026 held by new Finnish Supervisory Agency (LVV), took over from Pirkanmaa ELY. Find new URL. |
| FR | SYDEREP (ADEME) — issues IDU/UIN per scheme | syderep.ademe.fr | PROs: CITEO, Léko. UIN must be shown on marketplaces. |
| DE | LUCID (ZSVR) | lucid.verpackungsregister.org | Registration free; dual-system contract MANDATORY before first supply. VerpackDG (national adaptation act) in force 12.08.2026. First unit triggers duty. |
| GR | EMPA (EOAN) | eoan.gr | |
| HU | OKIR / OKIRkapu; fees to MOHU concession | okirkapu.hu ⚠ | Separate green tax (termékdíj) exists. |
| IE | **No state packaging register** — PRL covers only WEEE/batteries/tyres | repak.ie | Packaging compliance = Repak membership. (v1 error fixed.) |
| IT | CONAI (private-law consortium) — RENAP is only WEEE/bat/tyres | conai.org | Material consortia: COREPLA, COMIECO etc. Plastic bands ~€51–922/t. |
| LV | **No separate packaging register yet** — Elektroregistrs = WEEE/batteries only | vvd.gov.lv | Packaging via DRN system + waste-manager contracts (LZP, Zaļā josta). PPWR register to be created by 2027. |
| LT | GPAIS (unified, 8 streams) | gpais.eu | Registration + reporting mandatory even at small volumes. |
| LU | e-RA covers only WEEE/batteries — packaging via Valorlux in practice | valorlux.lu | |
| MT | ERA | era.org.mt | Number on invoices; annual renewal by 31 March. |
| NL | Packaging via Verpact (no state packaging register; RWS UPV = other streams) | verpact.nl | High plastic rate (~€1+/kg); SUP surcharge. |
| PL | Rejestr-BDO | bdo.mos.gov.pl | 9-digit BDO number on invoices/waste docs before trading. |
| PT | SILiAmb (APA) | siliamb.apambiente.pt ⚠ | Per-stream enrolment, annual declarations. |
| RO | AFM (Environmental Fund) — fund-and-declaration model | afm.ro | Penalty 2 RON/kg for unmet recycling targets. |
| SK | RVVV (env. ministry), filed via ISOH | minzp.sk ⚠ | One register, seven streams. |
| SI | ARSO Embalaža | gov.si ⚠ | **No de-minimis threshold.** |
| ES | RPP (MITECO), packaging section | miteco.gob.es | + separate plastic excise via Agencia Tributaria (sect. 4). PROs: Ecoembes, Procircular, ECOTIC ENVASES. |
| SE | Producentansvarsregistret (Naturvårdsverket e-service) | naturvardsverket.se | High fees (alu ~€1.09/kg). |

## 6. Indicative fee levels gathered (all ⚠ unverified, tariffYear mixed 2025/2026)

- DE plastic avg €1.6–2.1/t… no—€1,600–2,100/t = €1.6–2.1/kg per algorep.ai; other sources suggest ~€0.6–1.0/kg. Conflicting → verify against a dual-system price list (Lizenzero calculator is public).
- ES: Ecoembes paper 0.105–0.115 €/kg (compliancegate). NL: Verpact paper €0.017/kg. BE: Fost Plus plastic band 1 base €65/t. IT: CONAI glass €40/t, plastic €51–922/t bands. FR: CITEO eco-modulation ±15–20% bonus to 50–100% malus (assuro.io). Aluminium spread across EU: BE €48/t … SE €1,090/t; LV €99/t; EE €145/t; FR €186.5/t; AT €480/t; NL €300/t; HR €54.4/t (netzerocompare, 2025).
- Non-EU AR costs ~€2,000–15,000/yr per country claimed by algorep.ai — treat as vendor marketing, verify.

## 7. Marketplace number formats (partial, verify against marketplace docs)

- DE LUCID: "DE" + 13 digits, issued ~24h after registration, must be in Amazon/eBay seller account (zmart.de).
- FR: IDU/UIN per scheme from SYDEREP.
- PL: 9-digit BDO number.

## 8. Open questions before/while building

1. ES plastic tax applicability to LV→ES B2C parcels (sect. 4).
2. FI new register URL post-LVV handover.
3. Exact official portal URLs for all ⚠ rows.
4. Official EC PPWR guidance + FAQ document links (Mar 2026 + Aug 2026 update).
5. DE fee level conflict (algorep vs others) — resolve with a real dual-system price list.
6. Per-country: is direct registration possible for foreign sellers without AR, and what does registration cost.
7. LV specifics: current DRN rates vs PRO service fees; what changes when the PPWR-mandated register arrives (by 12.02.2027).

## 9. Latvian media context (for site's "why" section)

- LSM 10.08.2026: producers alarmed; "Ingredienti" e-shop halting EU deliveries; Ministry (R. Vesere, KEM): registers to be built within 24 months, register ≠ immediate taxes. https://www.lsm.lv/raksts/zinas/ekonomika/10.08.2026-razotajus-uztrauc-jauna-iepakojumu-regula-ministrija-prasibas-ieviesis-pakapeniski.a658209/
- LSM 12.08.2026: small sellers (S. Maskaļonoks) hit by Amazon register demands (DE, ES live); EU small-business petition for moratorium underway. https://www.lsm.lv/raksts/zinas/ekonomika/12.08.2026-mazie-uznemeji-jaunu-iepakojuma-prasibu-del-satraukti-par-tirgosanos-eiropas-savieniba.a658584/
- TV3 (same week): "Mazajiem uzņēmumiem var nākties aizvērt durvis uz Eiropu" — original prompt for this project.

## 10. Batch 0 — skeleton fill session (2026-08-16, Claude Code)

All 27 country files created (verified:false). Direct page fetches were blocked in the session environment; the following were confirmed via web search instead (snippet-level confidence, still need a real fetch before verified:true):

- AT: EDM portal www.edm.gv.at confirmed (BMLUK EDM page + EDM registration info page). AR required for foreign distance sellers (EU and third-country) selling B2C — confirmed.
- CZ: Seznam osob under mzp.gov.cz confirmed; registration fee 800 CZK; 60-day application deadline; EKO-KOM joint-performance contract exempts from individual listing.
- FI: register info at lvv.fi/en/environment/information-on-extended-producer-responsibility (LVV took over 01.01.2026). Exact e-service entry point still to find. PROs: Rinki + Suomen Pakkaustuottajat.
- HU: dual registration confirmed — OKIR/OKIRkapu for quarterly filings + MOHU service contract (one-off enrolment fee, quarterly invoices, 15-day payment).
- PT: SILiAmb confirmed; per-stream enrolment; declarations by 31 March; AR (Portugal-established representative) required for producers without PT establishment, distance sellers included; no volume thresholds.
- SK: RVVV kept by ministry, filed via ISOH; AR based in Slovakia required for foreign producers. PROs ENVI-PAK, NATUR-PACK.
- SI: ARSO evidenca (exact gov.si page still to locate); foreign B2C distance sellers register via local AR; annual report by 31 March. PROs: Slopak et al.
- CY: register with Department of Environment (MARDE), no register brand; Green Dot Cyprus is the ONLY licensed packaging PRO; repax reports a 2 t/year threshold — verify against the law.
- BG: register overseen by ExEA confirmed; NWMS portal URL still unverified.

Still open for verification batches: everything in §8, all PRO tariff PDFs, all ⚠ URLs (BG, CY, HU, SI, SK/ISOH), Amazon/Etsy marketplace requirement docs, GreenPak/HERRCO/Slopak/VANA/NPA/Rekopol scheme confirmations.
