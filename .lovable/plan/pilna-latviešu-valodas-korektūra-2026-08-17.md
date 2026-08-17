# Pilna latviešu valodas korektūra

Mērķis: izlabot locījumu, gramatikas un loģikas nesakritības visā lapas tekstā, nemainot funkcionalitāti, datus vai dizainu.

## Ko pārbaudīšu

1. `src/i18n/lv.ts` (466 rindas) — galvenais teksta avots: virsraksti, sadaļu ievadi, kalkulatora etiķetes, atrunas, BUJ, ceļveža soļi, kļūdu paziņojumi.
2. Iekļautie (inline) latviešu teksti komponentos un maršrutos: `Hero`, `Calculator`, `CountryCatalog`, `ActionGuide`, `MarketplaceNumbers`, `Timeline`, `VideoBriefing`, `Faq`, `Footer`, `primitives`, `routes/index.tsx`, `routes/valstis.$code.tsx`, `routes/metodologija.tsx`, `routes/celvedis.tsx` — labošu tekstu uz vietas vai pārcelšu uz `lv.ts`, ja tas ir tīri redakcionāls virknes teksts.
3. Meta/SEO teksti (title, description, og) — pareizrakstība un dabiska latviešu valoda.
4. Dinamiski veidotās frāzes (funkcijas ar skaitļiem/nosaukumiem, piem. `partialSelectedNote`, `arConfirmedNote`) — pareizi locījumi vienskaitlim/daudzskaitlim, nevis “valstij(-īm)” tipa aizvietotāji.

## Tipiskās kļūdas, ko labošu

- Nepareizs jautājuma locījums: “Ko man jādara?” → “Kas man jādara?”
- Datīva/ģenitīva jaukšana ar “jā-” formām (“kas jāsagatavo”, “kam jāreģistrējas”).
- Daudzskaitļa un skaitļa saskaņa (“1 valstij” / “3 valstīm” / “5 valstīs”).
- Prievārdu locījumi: “pret avotu”, “caur”, “uz” lietojums; “no 12. augusta” secība un datumu formāts (12.08.2026. vai “2026. gada 12. augusts” konsekventi).
- Anglicismi un neveiklas konstrukcijas (“aptver”, “pieprasa”, “piemērojamība”) → skaidra latviešu valoda.
- Loģikas nesakritības: teikums apgalvo vienu, bet UI rāda citu (piem. atrunas, kas runā par “verificēts” karodziņu, kura vairs nav; “trūkstošās likmes NETIEK pieņemtas par nulli” formulējums).
- Konsekvence terminos: reģistrs / apsaimniekotājs (PRO) / papildu nodokļi; “pilnvarotais pārstāvis”; “ekomodulācija”; “depozīta sistēma (DRS)”.
- Pēdiņas un domuzīmes: latviešu “…” pēdiņas un pareiza domuzīme ar atstarpēm.
- Lielo burtu lietojums virsrakstos (latviski tikai pirmais vārds un īpašvārdi).

## Ko NEAIZTIEKU

- `/data`, `/docs`, `/scripts`, `.github/` — kanoniskais datu slānis. Ja tur latviešu tekstos (piem. `notes`, `register.notes`, `extraTaxes.summary`) atradīšu gramatikas kļūdas, tās neizlabošu, bet sagatavošu sarakstu ar failu, lauku un ieteikto labojumu, ko var pielietot datu sesijā.
- Loģika, aprēķini, datu struktūra, dizains, izkārtojums.

## Piegāde

- Labojumi `src/i18n/lv.ts` un komponentos/maršrutos.
- Īss kopsavilkums ar būtiskākajām izmaiņām + atsevišķs saraksts ar ieteiktajiem `/data` teksta labojumiem.
- Pārbaude: būvējums + vizuāla pārlūka pārbaude galvenajām sadaļām un vienai valsts lapai (`/valstis/LV`).
