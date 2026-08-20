# Izmaiņu žurnāls / Changelog

Būtiskās datu un metodoloģijas izmaiņas. Formāts seko [Keep a Changelog](https://keepachangelog.com/) principam; datumi ISO (YYYY-MM-DD).

## [Nepubliskots] — klienta datu paketes pārstrāde par tehnisko datu veidlapu (2026-08-20)

Dokuments `public/ppwr-klienta-paketes-sablons.md` (+ ģenerētais `.docx`) pārstrādāts pēc juridiskā satura audita. Jaunais nosaukums: **„Iepakojuma tehnisko datu veidlapa klientam”** (apakšvirsraksts „PPWR atbilstības dokumentācijas un EPR aprēķinu datu apkopošanai”). Failu ceļi `public/` nemainās, tāpēc lapas lejupielādes saites automātiski servē jauno versiju.

- **Statuss skaidri norādīts:** tā ir tehnisko datu nodošanas veidlapa — pati par sevi nav ES atbilstības deklarācija un neapliecina atbilstību; dati klientam jāizvērtē un jāizmanto savai tehniskajai dokumentācijai, DoC un EPR aprēķiniem.
- **Lomu skaidrojums juridiski precizēts:** absolūtais „ja klienta zīmols → izgatavotājs ir klients” aizstāts ar 3. panta 13. punkta formulējumu ar mikrouzņēmumu izņēmumu; pievienota lomu nošķīruma tabula (izgatavotājs / piegādātājs / importētājs / izplatītājs / EPR ražotājs) un norāde, ka PPWR izgatavotājs nav automātiski EPR ražotājs visās valstīs.
- **16. panta pienākums precizēts:** attiecas uz iepakojuma/materiālu piegādātāju; ne katrs gatava iepakota produkta piegādātājs automātiski ir 16. panta piegādātājs.
- **Identifikācija:** dokumenta versija/izmaiņas, iepakojuma specifikācijas ID, konfigurācijas versija, mērķa valstis, kanāls, datu spēkā esība; piezīme, ka vienam SKU var būt vairākas konfigurācijas.
- **Sastāva tabulas** (pārdošanas/grupētais/transporta/e-komercijas): materiāla veids + apakšveids + EPR kategorija, svēršanas metode, svars uz pārdoto vienību, materiāla piegādātājs, pierādījuma dokuments; **„CN kods” kolonna izņemta** (KN kods = tikai muitas klasifikācija, atsevišķa piezīme).
- **Pārstrādājamība:** metodika/datums/veicējs/pierādījums; atruna, ka līdz deleģēto aktu piemērošanai tas ir tehnisks novērtējums, nevis oficiāla PPWR klase.
- **Tukšā telpa:** skaidri norādīts, ka 50 % robeža vēl nav piemērojama (no 2030-01-01 vai +3 gadi pēc īstenošanas akta — vēlākais no abiem); metodikas akts EK jāpieņem līdz 2028-02-12, līdz tam aprēķins orientējošs; pārdošanas iepakojumam 50 % nepiemēro; pildmateriāls = tukšā telpa (24. pants).
- **PFAS atdalīts no smagajiem metāliem:** PFAS tikai pārtikas saskarei, piemērojams no 2026-08-12, prasīta testa metode/laboratorija/datums/dokuments („apliecinām” bez dokumenta nepietiek); smagajiem metāliem Pb+Cd+Hg+Cr(VI) summa ≤ 100 mg/kg ar pierādījuma dokumentu.
- **DoC nošķīrums:** veidlapa vs tehniskā dokumentācija vs ES atbilstības deklarācija; paraksts apliecina datu patiesumu, ne atbilstību.
- **Viens satura avots:** `scripts/build-client-package-docx.py` pārrakstīts — `.docx` tagad tiek ģenerēts tieši no Markdown faila (Markdown = galvenais avots), satura dublēšanās skriptā novērsta.

## [Nepubliskots] — sadaļas „Ražotājiem" juridiskie labojumi (2026-08-19)

Atbilde uz audita atradumiem par sadaļu `/razotajiem`. Dizains un struktūra nemainīti; laboti juridiskā satura precizitātes, vedņa loģikas un bojāta teksta jautājumi.

- **Vedņa mikrouzņēmumu loģika pārtaisīta:** 3. jautājums sadalīts neatkarīgos (vai pats esmu mikrouzņēmums; vai ir private label mikrouzņēmumu klienti Latvijā) + piegādātāja atrašanās vietas apakšjautājums. Ieviests `remove` mehānisms (`data/role-wizard.json`), lai mikrouzņēmumu izņēmums **aizstāj**, nevis papildina kategoriskos blokus — vairs neparādās pretrunīgi secinājumi (piem., „tu esi izgatavotājs" + „izgatavotājs ir piegādātājs" vienlaikus).
- **D2C vs wholesale nošķīrums:** 2. jautājumā atdalīta tiešā D2C pārdošana ārvalstīs, pārdošana ārvalstu izplatītājam/importētājam un pārdošana ārvalstu gala lietotājam. Ārvalstu izplatītāja gadījumā vairs netiek automātiski secināts, ka LV eksportētājs ir producer galamērķī; bloks „Klienti-eksportētāji" padarīts nosacīts.
- **LV EPR formulējums:** „DRN + līgums ar apsaimniekotāju" → „līgums ar licencētu apsaimniekotāju un DRN atbrīvojums, vai DRN samaksa pilnajās likmēs, ja atbrīvojums netiek piemērots" (bez maldinošas summēšanas).
- **Pilnvarotais pārstāvis:** precizēts, ka pēc pašreizējā PPWR AR ir nepieciešams, bet Environmental Omnibus atvieglojums vēl NAV spēkā un atrodas ES likumdošanas procesā; noņemts nestabilais ENVI balsojuma datums no lietotājam redzamā teksta.
- **DoC parakstīšana:** absolūtais „tu nevari parakstīt DoC klienta vietā" → „kā parasts piegādātājs neparaksti; to dara izgatavotājs vai viņa rakstiski pilnvarots pārstāvis, atbildība paliek izgatavotājam".
- **„Klientam Latvijā nekas nav jādara"** → precizēts, ka atkārtots EPR pienākums parasti nerodas, bet izplatītāja pārbaudes un neatbilstības rīcības pienākumi saglabājas.
- **Bojātās vadības rakstzīmes:** izlabotas 7 `U+0001` rakstzīmes `src/i18n/lv.ts` (radās agrākā redakcijā); repozitorijā tekstos vairs nav vadības rakstzīmju.
- **Primāro avotu atsauces:** galvenajiem apgalvojumiem pievienoti PPWR panti (3., 15., 16., 19., 21., 38., 39., 44., 45.) un [S22]/[S23]; nozares avoti saglabāti kā praktiski skaidrojumi.
- **Testi:** vedņa loģika izdalīta tīrā modulī `src/components/producers/wizard-logic.ts`; pievienoti determinēti scenāriju testi (`scripts/test-role-wizard.ts`, `bun test`), kas pārbauda 7 scenārijus un ka pretrunīgi bloki nekad nesakrīt.

## [Nepubliskots] — sadaļa „Ražotājiem" + lomu vednis (2026-08-19)

Jauna sadaļa `/razotajiem`, kas atbild uz jautājumu, ko ražotāji un pildītāji saņem no klientiem — „kurš par ko atbild, kad preci pārdod tālāk?". Saturs, loģika un atsauces sagatavoti izpētes sesijā (2026-08-19); avoti dubultā ar primāro regulu, EK vadlīnijām C(2026) 3702 un ZSVR skaidrojumiem.

- **Divu lomu skaidrojums** (izgatavotājs vs producer): zīmols = atbilstības atbildība (vienreiz, visā ES); pirmā piegāde valstī = EPR atbildība (katrā valstī atsevišķi). Lomas piešķir likums pēc faktiem — tās nevar pārcelt ar līgumu.
- **Gadījumu matrica A–E** (akordeons): savs zīmols/wholesale, private label, white label, ražotājs-izplatītājs, tiešā pārdošana — katram lomas, pienākumi un rīcība.
- **Mikrouzņēmumu izņēmums** ar divvirzienu 2×2 matricu: DoC nasta pāriet piegādātājam TIKAI ja pasūtītājs ir mikrouzņēmums un piegādātājs ir tajā pašā dalībvalstī; EPR izņēmuma nav nevienā gadījumā.
- **Interaktīvs lomu vednis** (`RoleWizard`): 3 jautājumi, multi-select, lēmumu koks + bloku teksti dzīvo `data/role-wizard.json` (kopiena var labot bez koda maiņas). Rezultāts = pienākumu bloki ar atsaucēm + „kopēt kopsavilkumu", šablona lejupielāde, saites uz valstu reģistriem/kalkulatoru.
- **Klienta datu paketes šablons** (`public/ppwr-klienta-paketes-sablons.md`, MIT) lejupielādei — aizpilda katram SKU un dod tālākpārdevējiem/eksportētājiem.
- **7 soļu ražotāja rīcības plāns**, BUJ ražotājiem (ar FAQ schema.org marķējumu SEO) un numurēts avotu saraksts (S1–S23).
- Navigācijā jauns ieraksts „Ražotājiem"; sākumlapā promo bloks. Viss saturs `src/i18n/lv.ts` `producers` telpā; dizains esošajā kraft-label sistēmā.
- Atvērtie jautājumi (nebloķē): ES plastmasas akcīzes piemērojamība LV→ES B2C (vedņa ES outputā brīdinājums, ne aprēķins); Omnibus/ENVI balsojums 01.10.2026 var mainīt mikrouzņēmumu un AR prasības.

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
