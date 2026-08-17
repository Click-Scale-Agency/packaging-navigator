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

## 11. Batch 1+2 — verification session (2026-08-16, Claude Code, network open)

12 countries processed, all official pages/PDFs actually fetched. `verified:true`: DE, FR, BE, NL, ES, AT, IT, CZ, SE, DK, FI. PL stays `verified:false` (register confirmed, but Polish organizacje odzysku publish no official tariff — contract pricing; ROP reform still pending).

Resolutions of §8 open questions:

- **§8.4 RESOLVED**: EC guidance = Commission Notice C(2026) 3702 final, 05.06.2026 (EUR-Lex `intcom:C(2026)3702`); FAQ (2nd ed., 20 chapters, publ. ~01–03.08.2026) on environment.ec.europa.eu publications. Both linked in regulation.json. FAQ clarifies: no automatic market ban for non-compliant packaging from 12.08.2026 (corrective action first); pre-12.08.2026 stocks need not be destroyed/relabelled.
- **§8.5 RESOLVED**: DE plastic conflict — Lizenzero's own calculator API (fetchActivePriceList) returns 2026 active list: plastic 1.25 €/kg (alternative list 0.955), paper 0.288, glass 0.069. So BOTH earlier claims were off; real answer ~0.96–1.25 €/kg. API endpoint: lizenzero.de/ajaxInterserohApi/fetchActivePriceList?respectEffectiveDate=0
- **§8.2 PARTIAL**: LVV EPR page live at lvv.fi (fetched); exact e-service entry point still to find.
- **§8.1 STILL OPEN**: AEAT informacion-general page fetched — confirms Law 7/2022, Model 592, but NO primary statement on foreign B2C distance sellers as intra-EU acquirers. Do not claim applicability.
- **§8.6 PARTIAL**: DE — AR now MANDATORY for foreign sellers without German branch from 12.08.2026 (ZSVR knowledge base, big change vs VerpackG!); ES — representante autorizado mandatory for foreign direct sellers (MITECO RPP page); AT — AR required (earlier research). SE/DK/FI/PL/CZ: not stated on fetched pages.
- New: ES RPP number format ENV/YYYY/XXXXXXXXX, on invoices; PL BDO fees 2026 raised to 200/800 PLN (Mazovia BIP); DK VANA has flat small-producer rate <8 t/yr: household 3.81 DKK/kg (~0.51 €/kg); FI light declaration form for <50 t/yr; SE fees jumped after municipal collection takeover (plastic 13.40 SEK/kg ≈ 1.22 €/kg).

FX used for non-EUR tariffs (2026-08-16, open.er-api.com): 24.22 CZK, 11.01 SEK, 7.48 DKK per EUR — flagged as indicative conversions in country notes.

## 12. Batch 3–5 — remaining 15 countries (2026-08-16, Claude Code, same session)

All 27 files now processed. **verified:true (17):** AT, BE, BG, CY, CZ, DE, DK, EE, ES, FI, FR, HR, IT, LU, NL, PT, SE. **verified:false (10):** GR, HU, IE, LT, LV, MT, PL, RO, SI, SK — in every case because no official PER-MATERIAL PRO tariff is public (never guessed).

New official rate sources fetched this session:
- **HR** — FZOEU 'POPIS NAKNADA' fee list (eff. 20.05.2026) PDF: state-run collection-cost fees €/kg (gross incl. VAT), non-deposit packaging. verified:true.
- **CY** — Green Dot Cyprus official fee table (household, tariffYear 2025; 2026 not yet published). State moa.gov.cy env portal 503 this session. verified:true.
- **EE** — ETO 'teenustasud' 2026 (sales packaging €/t before VAT) + PAKIS register + EMTA pakendiaktsiis statutory rates (glass 0.60 / plastic·metal 2.50 / paper·wood 1.20 €/kg; PRO membership exempts). verified:true.
- **BG** — Ecopack member prices eff. 01.01.2026 (EUR/kg) + MOEW packaging page. Corrected bogus nwms.eea register URL. verified:true.
- **LU** — Valorlux 'Tarifs Point Vert 2026' PDF (household €/kg excl. VAT). verified:true.
- **PT** — Sociedade Ponto Verde VPV table (tariffYear 2024, current published; 2026 revision in litigation) + SILiAmb register live. min €120/yr. verified:true.

Documented-but-not-verified (rates recorded with caveat, or as extraTax):
- **HU** — OKIRkapu register fetched + MOHU FAQ official, but 2026 EPR fee TABLE is a govt decree not fetchable this session (NAK 503). Corroborated rates recorded (plastic 0.603, paper 0.477, glass 0.295, metal 0.512, wood 0.061, composite 0.526 €/kg @362.95 HUF/EUR); verified:false pending official decree fetch.
- **LT** — statutory packaging pollution-TAX rates recorded as extraTax (recyclable EUR/t, ×1.48 index for 2026); PRO management fees (tvarkymo įkainiai) not public.
- **LV** (home market) — DRN law fetched from likumi.lv; confirmed SUP-item rates (plastic bags/fishing gear 4.80, wet wipes/balloons 12.20, tobacco filters 8.00 €/kg) + 2026 foam-plastic changes (foam PS 44.00, foam plastic 24.40). Full Annex 7 per-material base table served as a separate attachment — still to fetch. §8.7 partly advanced.
- **RO** — only public figure is AFM 2 RON/kg penalty (already recorded); OIREP fees by contract.
- **GR/IE/MT/SI/SK** — licensed-scheme sites confirmed live, but per-material fees are contract/members-only (HERRCO Annex C1; Repak; GreenPak; Slopak; ENVI-PAK/NATUR-PACK).

FX added this session: 362.95 HUF/EUR (2026-08-16).

New AR (authorised representative) confirmations for foreign sellers: ES, AT, PT, SI, SK require one (per fetched official pages); DE now mandatory from 12.08.2026 (from batch 1).

## 13. Completion pass — statutory-rate deep dive (2026-08-16, Claude Code)

**verified:true now 18/27** (added **HU**). **verified:false 9:** GR, IE, LT, LV, MT, PL, RO, SI, SK — every one because its PRO fee is contract/members-only, NOT because data is missing.

- **HU FLIPPED** — fetched the official decree **33/2025. (XI. 28.) EM** from net.jogtar.hu (njt.hu was 503). Packaging díjtételek confirmed exactly (Ft/kg, base+modulation totals): plastic M01 219, paper P01 173, metal V01 186, glass U01 107, wood F01 22, composite K01 191, textile C01 148, other X01 129. verified:true (OKIRkapu register + official decree).
- **LV** — the DRN Annex 7 packaging table WAS in the likumi.lv HTML (needed table-cell-preserving parse, not a separate attachment as first thought). Full official €/kg: glass 0.44, wood/paper/cardboard/natural fibres 0.24, metal 1.10, bioplastic 0.24, plastic (polymer) 1.25, composite carton 1.25, polystyrene 2.20, foam plastic 24.40, foam polystyrene (EPS) 44.00. Recorded in DRN extraTax. Stays verified:false (no packaging register yet, no public PRO tariff) but DRN now fully sourced from the primary law.
- **PL** — official opłata produktowa rates from Dz.U. 2023 poz. 2683 (Dziennik Ustaw PDF): plastic 2.70, aluminium 1.40, ferrous 0.80, paper 0.70, glass 0.30, wood 0.30, composite 1.70, hazardous 2.00, other 1.00 zł/kg. Added as extraTax (statutory penalty/ceiling; Rekopol PRO fee still private).
- **SI** — okoljska dajatev €0.0017/kg + €33.38/yr admin (FU.gov.si). Small national levy; PRO fee private. Added as extraTax.
- **GR, IE, MT, SK** — confirmed no public per-material figure exists: HERRCO fees in contract Annex C1; Repak members-only; Malta packaging eco-contribution waived for scheme members (GreenPak/GreenMT fees on application); SK OZV recycling fees per-contract.

Net: all 9 unverified countries whose statute sets a per-material figure (LT, LV, PL, RO, SI) now carry it as an official extraTax; the remaining 4 (GR, IE, MT, SK) have genuinely no public per-material rate. FX: PLN/EUR 4.31, HUF/EUR 362.95 (2026-08-16).

## 14. Enrichment from project spec doc (2026-08-16, Claude Code)

Input: PPWR_EPR_ES27_specifikācija (ChatGPT-compiled, v1.0, 2026-08-16) — a system-design spec with per-country regulatory context. NOTE: the doc contains NO per-material tariffs (fees are modelled as "external tariff"), so our verified PRO/state rate data stays the authority on prices; the doc adds regulatory *context*.

Added to schema + all 27 files: `competentAuthority` and `legalBasis` (optional string fields, analogous to `register.operator` — regulatory context, not fee claims). Wired through src/data/types.ts + src/data/index.ts so the UI can render them. `vite build` green.

Cross-checked NEW register claims against primary sources before adopting (never trusted the doc blindly):
- **PT** — CONFIRMED the register is **SIRER** (Sistema Integrado de Registo Electrónico de Resíduos), declared via the SILiAmb platform (siliambfe.apambiente.pt), APA, DL 152-D/2017 art. 19 (apambiente.pt fetched). Updated register name + added SIRER source.
- **FI** — CONFIRMED the producer register is **TURRe** (public search jatehuoltokompassi.fi/haetietoja/turre/). Legal basis corrected to Waste Act 646/2011 + Decree 518/2014 (doc said 1029/2021 — cross-check caught the discrepancy).
- **BE** — **EPRIBEL** is a real IVC/CIE national-register initiative (reported ~12.08.2026) but epribel.be is still under construction (points to ivcie.be). Recorded as the emerging register; IVC/CIE stays the current channel. verified status unchanged.
- Other legalBasis/authority citations (DE VerpackG/VerpackDG, ES RD 1055/2022, IT D.Lgs 152/2006, FR Code de l'environnement/AGEC, etc.) match earlier verified research; adopted as context.

No `verified` flags changed by this enrichment (it adds context, not rates). DRS (deposit-return) structured field intentionally deferred — accurate 27-country DRS status needs its own verification pass.

## 15. UI surfacing + DRS round (2026-08-16, Claude Code)

Driven by the "useful catalog" goal — users need to see not just packaging €/kg but the *registration* picture (cost, annual fee, whether a foreign seller needs an authorised representative).

**Surfaced existing-but-hidden fields** through src/data (types + index bridge) into the country page: `register.registrationCostEur`, `arRequiredForForeignSellers`, `numberOnInvoices`, `pro.minAnnualFeeEur`, `thresholds.deMinimis`, plus `competentAuthority` + `legalBasis`. New "Regulējums un reģistrācija" section on /valstis/$code renders them, with a plain-language note that foreign distance sellers without a local establishment must appoint an authorised representative (PPWR Art. 45).

**DRS (deposit-return) round** — new optional `drs` field {active, operator, deposit, note, url} on schema + all 27 files, plus a UI section. 2026 status anchored to primary/consolidated sources (Zero Waste Europe, TOMRA, Sensoneo): **active (17):** DE, DK, SE, FI, EE, LT, LV, HR, NL, SK, IE, MT, RO, AT (01.01.2025), HU (2024), PL (01.10.2025), PT (10.04.2026). **not yet / none (10):** BG, CY, CZ, ES (conditional, targets-based), FR, GR (in preparation ~2026), IE n/a, IT, LU, SI. DRS is contextual (not a fee claim); `verified` flags unchanged.

**Registration cost backfill:** set CZ €33 (800 CZK). Most others are €0 (DE, FR) or tiered/non-EUR (PL 200/800 PLN) — kept in notes rather than forcing a single misleading number. The doc's §16 "full cost model" (registration + PRO entry + per-material + min annual + AR setup/maintenance + DRS + audit) is the reference for a future cost calculator.

## 16. Authorised representative — PPWR Art. 45 (2026-08-16, Claude Code)

Confirmed (EUR-Lex + consolidated compliance sources): PPWR Art. 45 requires a producer NOT established in a Member State to appoint, in each such Member State where it first makes packaging/packaged products available, a local authorised representative for EPR — mandatory from 12.08.2026, direct effect, no national transposition, cannot be relaxed. This squarely covers the site's audience (a Latvian e-shop shipping B2C into other Member States).

Action: set `register.arRequiredForForeignSellers = true` for all 27 (was already true for DE/ES/AT/PT/SI/SK from national confirmation; the other 21 now derive from Art. 45). BE and DK notes reconciled (they previously said "no AR statement on the page" — now clarified that the EU-level Art. 45 obligation applies regardless). The country page shows this per country with a plain-language Art. 45 hint. NOTE: the AR is a paid private service (market-priced, typically a few hundred to ~€1,500/yr per country) — not a fixed state fee, so it is not encoded in `registrationCostEur`.

Registration cost (`registrationCostEur`): state registration itself is typically free (the real recurring cost is the PRO fee + AR service). Confirmed values: DE €0, FR €0, CZ ≈€33 (800 CZK). PL is tiered (200/800 PLN, in notes). Others left null rather than assume.

## 17. Cost calculator — §16 full-cost model (2026-08-16, Claude Code)

Upgraded the calculator (src/components/Calculator.tsx) beyond the bare material €/kg. Per selected country it now computes: variable packaging fee (Σ rate×kg + material-linked extra tax) → **PRO fee = max(variable, minimum annual fee)** → **+ state registration cost** = first-year total; and **flags the authorised-representative requirement** as a separate, unpriced item (PPWR Art. 45; market-priced, not a fixed cost). Row shows a breakdown (iepakojums / min. gada maksa piemērota / reģistrācija / +pārstāvis). This surfaces the key SME insight: for small volumes the minimum annual fee dominates, not the per-kg rate. Not yet modelled (deferred, per §16's "estimate/variable" bucket): AR service fee amount, consulting/audit, DRS logistics, penalty risk.

## 18. DRS borderline verification (2026-08-16, Claude Code)

Point 3: verified the "planned/not-live" DRS cases. Confirmed none is live in 2026: **ES** — no universal DRS; conditional/targets-based under Ley 7/2022 (kept). **GR** — operator DRS Hellas SA established by producers/retailers, full operation expected 2026 but not yet live (note refined). **CZ** — planned for PET bottles + cans (~1.8bn bottles/yr), initially targeted mid-2025 but operator not yet appointed, not live (note refined). No `drs.active` values changed; only GR/CZ notes refined. Active-DRS list stays 17 (sources vary 17–18 EU; difference is counting of in-transition schemes).

## 19. Calculator — estimated additional costs (2026-08-16, Claude Code)

Added the §16 "estimate" layer without presenting guesses as facts: a user-adjustable "authorised-representative annual fee" input (default €400/country, clearly labelled an estimate the user tunes). The output now shows three tiers: **Safe costs** (PRO fee incl. minimum + registration), **Estimated additional** (AR fee × number of selected countries that require one), and **Full picture** (sum). Keeps the honest separation the spec demands (estimates never folded into the safe total). AR-fee amount is the user's assumption, not our claimed per-country data.

## 20. Calculator export + DRS flag + marketplace-numbers section (2026-08-16, Claude Code)

Points 1/3/4 from the UX plan:
- **Export (P1):** "Kopēt kopsavilkumu" (clipboard text) and "Lejupielādēt CSV" (blob download) of the per-country breakdown + the three totals. Client-side only; honest labels.
- **DRS flag (P3):** calculator rows show a "depozīts" chip when the country has an active beverage DRS (separate from EPR).
- **Marketplace numbers (P4):** new home section + nav link (#numuri) listing countries whose register issues a marketplace-relevant producer number — filtered to those with a confirmed number format (DE +13, ES ENV/YYYY/9, FR IDU/UIN, PL 9-digit BDO) or a number-on-invoices requirement (e.g. MT). Honest scope: only confirmed formats shown; grows as more are verified. Also fixed the stale header GitHub link (eu-packaging-hub → packaging-navigator).

## 21. Latvian translation of user-facing country text (2026-08-16, Claude Code)

The catalog is LV-first, but country data prose was English (with native terms). Translated every UI-RENDERED field to Latvian via a patch script (sets fields by path — numbers/rates/URLs/dates never touched; JSON round-trip is byte-identical so diffs stay clean): register.name descriptors, register.notes, thresholds.deMinimis, numberFormat, pro.membershipRequired (string variants), pro.schemes[].name descriptors, extraTaxes[].name/summary/collectedBy/rate, and sources[].title. Proper nouns kept in original/native (LUCID, PAKIS, GPAIS, Seznam osob, SIRER, RVVV, scheme names, law citations, portal URLs). Internal-only fields NOT rendered in the UI (country-level `notes`, `pro.ecoModulation`) were left as English documentation; the English audit trail also lives in this research log. Verified via a leftover-English scan (only remaining hit is SK's official Slovak register name, correctly kept).

## 22. Action guide — "Ko man jādara?" decision tool, scope A (2026-08-17, Claude Code)

Spec §3.3 "Ieteicamais lēmumu dzinējs": the site so far answered *"what does it cost / what are the facts"* (catalog + calculator + marketplace numbers). This adds the complementary *"what do I actually do"* layer, built as scope-A MVP (steps 1–3 + per-country action plan, all from existing `/data` — no new research).

- **New route `/celvedis`** (`src/routes/celvedis.tsx`) + home teaser section `GuidePromo.tsx` (anchor `#celvedis`, placed after Hero) + nav Link `lv.nav.guide`.
- **`ActionGuide.tsx`** — 3-step form: (1) destination countries, (2) sales channel (own webshop / marketplace / B2B), (3) who first makes the packaging available (you / local importer / platform). `buildPlan(country, channel, who)` derives a per-country plan: obligation holder, a task checklist (register + number format, authorised rep per Art. 45, PRO contract + membership, annual reporting, number-on-invoices, marketplace-number entry, extra taxes, DRS-if-beverages), an evidence list, and human-review flags. Tasks carry a level (obligāti / atkarībā / info). Honest by construction: unverified countries keep the red stamp + a "confirm against official source" flag; marketplace/B2B/who-first each add their own caveat flag; if the obligation rests with importer/platform the plan shifts to due-diligence tasks.
- All copy in `lv.guide.*`. No canonical data changed. `validate-data.mjs` green; `vite build` green (route tree regenerated to include `/celvedis`).

Deferred to scope B/C (awaiting user): packaging classification step (level/material/household-vs-commercial/reusable) wired to the calculator; scenario library (§14 ready-made "LV e-shop → DE/FR" profiles); exportable/printable action plan.

## 23. Action guide scope B — packaging classification + calculator wiring (2026-08-17, Claude Code)

Extends §22's guide with the packaging-classification step and connects it to the cost engine.

- **Shared fee engine** `src/lib/fees.ts` — extracted `rateFor` / `extraTaxFor` / `computeCountryCost` / `kgPerYearFrom` from the Calculator so the guide and calculator compute identical numbers from one source. Calculator refactored to consume it (no behaviour change).
- **Step 4 (classification)** in `ActionGuide.tsx`: material weights (g/shipment) + shipments/year, packaging level (sales / grouped / transport / e-commerce, multi-select), audience (household vs commercial), reuse (single vs reusable). `buildPlan` now takes the classification and adds informational context notes: e-commerce/transport counts as its own PPWR category; commercial packaging may follow a different reporting stream; reusable follows the reuse-target regime (per-use EPR may not apply the same); plastic → some MS levy a separate non-recycled-plastic tax on top of the PRO fee.
- **Indicative cost per country** shown as a chip in each plan card (same engine as the calculator; PRO fee incl. minimum + registration; AR excluded, as in §16), or "nav publiskotas likmes" when no rates exist.
- **Deep-link to the full calculator**: a button builds `/?w=paper:120,plastic:35&ship=2000&cc=DE,FR,ES#kalkulators`; the index route gained `validateSearch` (optional `w`/`ship`/`cc`) and the Calculator seeds its initial weights/shipments/selection from those params. Plain `<Link to="/">` links stay valid (search keys optional).
- tsc clean (strict `exactOptionalPropertyTypes` + `noPropertyAccessFromIndexSignature`); `vite build` + `validate-data.mjs` green.

## 24. Action guide scope C — scenario library + exportable plan (2026-08-17, Claude Code)

Completes the guide (spec §14 + exportable output).

- **Scenario library**: 5 ready-made Baltic/LV-first profiles (`SCENARIOS` in `ActionGuide.tsx`) that pre-fill every step and let the user tweak: "LV e-veikals → DE + FR", "LV pārdevējs Amazon → DE", "Baltijas e-veikals → LV + LT + EE", "Populārākie ES tirgi (DE/FR/ES/IT/NL/BE)", "Ievešana caur vietējo importētāju (B2B)". Rendered as a card row above step 1.
- **Exportable plan**: "Kopēt plānu" builds a full plain-text plan (per-country obligation holder, task checklist with levels + URLs, classification notes, evidence, human-review flags, indicative cost, plus the disclaimer) to the clipboard; "Drukāt / saglabāt PDF" calls `window.print()`. The four input steps + scenario bar + action buttons carry `print:hidden`, so a print/PDF shows only the plan cards.
- tsc clean; `vite build` + `validate-data.mjs` green. Scenario titles/descriptions are LV content strings co-located with their state config (whole app is LV-only).

Guide is now feature-complete across A/B/C: guided who-must-do-what flow, packaging classification, per-country cost via the shared engine, calculator deep-link, ready-made scenarios, and a copy/print action plan — all derived from canonical /data, nothing hardcoded.
