# Izmaiņu žurnāls / Changelog

Būtiskās datu un metodoloģijas izmaiņas. Formāts seko [Keep a Changelog](https://keepachangelog.com/) principam; datumi ISO (YYYY-MM-DD).

## [Nepubliskots] — validācijas partijas glābšana (no PR #9)

Pārceltas vēl vērtīgās daļas no agrākas validācijas partijas (PR #9), kas bija novecojusi un konfliktēja ar `main`; dublētās daļas (LV DRN, ES tags) atmestas, jo tās jau ir izdarītas citādi.

- **Francija → nepārbaudīts:** CITEO oficiālais 2026. tarifu ceļvedis ir `.7z` arhīvs, ko nevar atvērt/pārbaudīt; trešo pušu skaitļi atšķiras. `verified:false`, `.7z` avots `official:false`, caurspīdīga piezīme.
- **Likmju attiecinājums:** valsts lapā €/kg tabula tiek rādīta vienreiz, piesaistīta atsauces shēmai (nevis katrā shēmas kartītē); `rateFor` izmanto atsauces shēmu, ne vidējo — novērš latento shēmu sajaukšanu.
- **Datu korekcijas:** BG kompozīts 0,174 (Ecopack); CZ nepārbaudītā €33 reģ. maksa → null; PT likmes noapaļotas uz 3 zīmēm.
- **UI godīgums:** Hero PPWR datums lasīts no `regulation.json` (ne hardcode); ceļveža plastmasas piezīme tikai valstīm ar plastmasas-tagotu nodokli; MarketplaceNumbers rāda nepārbaudīts-zīmogu `verified:false` rindām.

## [Nepubliskots] — audita atbilde

Atbilde uz pilnu repozitorija auditu (2026-08-17). Galvenā doma: skaidri nodalīt **zināmu / daļēji zināmu / interpretētu / nezināmu** informāciju, nevis pasniegt visu kā vienu drošu skaitli.

### Labots (P0 — juridiskā/aprēķina precizitāte)
- **Tukšās telpas ierobežojums:** 40% → **50%** (PPWR 24. pants). Spēkā no **2030-01-01** (vai 3 gadus pēc tukšās telpas aprēķina īstenošanas akta — metode Komisijai jāpieņem līdz 2028-02-12 — atkarībā no vēlākā). Minimizācijas princips darbojas no 2026-08-12. Novērsta iekšējā pretruna, kur 40% bija norādīts divos dažādos datumos.
- **Spānijas plastmasas akcīze** vairs netiek automātiski pieskaitīta kalkulatorā: piemērojamība ārvalstu B2C tālpārdevējam ir atklāts jautājums, tāpēc tā parādās kā “iespējams nodoklis — jāpārbauda”, nevis fiksēta €0,45/kg likme.
- **Kalkulators vairs nepieņem nezināmu likmi par nulli:** ieviesti seguma stāvokļi *pilns / daļējs / nav aprēķināms*. Daļēja summa ir grīda, ne pilnas izmaksas.
- Pārsaukts “Drošās izmaksas” → **“Aprēķinātā daļa”**; CSV/kopsavilkumam pievienota seguma kolonna.
- HTML valoda `en` → `lv`; 404 un kļūdu lapas latviskotas.

### Pievienots (P1 — uzticamība)
- **Per-fakta verifikācija:** katram tarifam/pienākumam savs statuss (`official`, `operator_published`, `secondary_source`, `inferred`, `unverified`, `not_applicable`, `unknown`), avots, pārbaudes datums un spēkā esības periods — nevis viens “verificēts” karodziņš visai valstij. Latvija migrēta kā references piemērs.
- **Ziņošanas kārtība** katrai valstij (biežums, termiņi, nulles/labojumu deklarācijas) ar savu provenance.
- **Metodoloģijas lapa** (`/metodologija`) un šis publiskais izmaiņu žurnāls.
- Datu validācija paplašināta: `official` statuss prasa avotu, spēkā esības periodu konsistence, tieši 27 valstu faili.

### Zināmie ierobežojumi
- Per-fakta provenance un ziņošanas kārtība pagaidām aizpildīta tikai daļai valstu (LV kā references); pārējās tiek papildinātas nākamajās datu sesijās.
- PPWR 24. un 44. panta precīzs formulējums vēl jāsalīdzina ar EUR-Lex konsolidēto tekstu.
