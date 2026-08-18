# Izmaiņu žurnāls / Changelog

Būtiskās datu un metodoloģijas izmaiņas. Formāts seko [Keep a Changelog](https://keepachangelog.com/) principam; datumi ISO (YYYY-MM-DD).

## [Nepubliskots] — rēķinu/DRN sadaļa + oficiālā EK BUJ ceļvedis (2026-08-18)

Papildināta lapa ar informāciju no oficiālā EK PPWR BUJ ceļveža (2. izd., DG ENV, KH-01-26-068-EN-N) un evoex bloga raksta par iepakojuma nodokļiem e-komercijā (DRN, EPR, rēķini).

- **Jauna BUJ grupa “Rēķini, DRN un norādīšana klientam”** (4 jautājumi): EPR/DRN nerāda atsevišķi rēķinā vai kasē (tikai atmaksājamo depozītu €0,10); LV DRN aprēķins un 300 kg/gadā reģistrācijas slieksnis VVD; importētājs kā DRN maksātājs; pārrobežu EPR rēķini un ziņošana. BUJ lapā tagad 22 jautājumi.
- **`regulation.json` — oficiālais EK BUJ ceļvedis** pievienots kā precīzi citēts avots (2. izd., katalogs KH-01-26-068-EN-N, CC BY 4.0); pievienota `euPublications` saite. `notes` papildināts ar EK BUJ faktiem (XVIII–XX nod.): pirmā harmonizētā EPR atskaite jāsniedz **līdz 2030-06-01**; <10 t/gadā samazināti ziņošanas pienākumi; platforma pēc rakstiska pilnvarojuma var maksāt EPR maksas (45. p. 4. d.), bet reģistrācija/ziņošana paliek ražotājam; ekomodulācija harmonizēta uz 6. panta pārstrādājamības klasēm.
- **Kājenē “Galvenie avoti”** — atsauču bloks ar oficiālajiem avotiem (EUR-Lex PPWR, EK BUJ ceļvedis, EK vadlīnijas C(2026) 3702, op.europa.eu), LV DRN likumu + VID, un evoex bloga rakstu.
- LV DRN 300 kg slieksnis un €0,10 depozīts pārbaudīti pret oficiālajiem avotiem (likumi.lv, VID, VARAM); precizēts, ka 300 kg reģistrācija ir VVD (nevis VID, kā vedināja bloga formulējums).

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
