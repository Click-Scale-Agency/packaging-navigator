# Navigācija: salauztās sadaļu saites + mobilā apakšjosla

## Kas ir salauzts

Galvenē sadaļu saites (`Kalkulators`, `Valstis`, `Numuri`, `Laika līnija`, `Video`, `BUJ`) ir vienkārši `<a href="#kalkulators">`. Šie `id` eksistē **tikai sākumlapā** (`Calculator.tsx`, `CountryCatalog.tsx`, `MarketplaceNumbers.tsx`, `Timeline.tsx`, `VideoBriefing.tsx`, `Faq.tsx`). Uz `/celvedis`, `/razotajiem`, `/metodologija` un `/valstis/<kods>` tādu sadaļu nav, tāpēc klikšķis neko nedara — tikai pieliek hash pie URL. Tas arī ir tas, ko rāda pievienotais ekrānuzņēmums (`/celvedis`).

Otrā problēma: visas nav saites ir `hidden ... sm:inline`, tāpēc telefonā redzams tikai logo un GITHUB — mobilā izvēlne neeksistē vispār.

## Risinājums

### 1. Sadaļu saites strādā no jebkuras lapas
Nomainīt `<a href="#...">` uz TanStack Router `<Link to="/" hash="kalkulators">`. Tad no apakšlapas notiek pāreja uz sākumlapu un pēc tam ritināšana uz sadaļu; sākumlapā tā paliek ritināšana uz vietas.

Pievienot nelielu hash-ritināšanas palīgu (`useHashScroll`), kas pēc navigācijas atrod elementu pēc `location.hash` un ritina pie tā ar `scrollIntoView({ block: "start" })` — vajadzīgs, jo sadaļas parādās pēc hidratācijas un pati pārlūkprogramma hash mērķi klienta pusē neatrod. Ņem vērā `prefers-reduced-motion` (bez animācijas).

### 2. Mobilā navigācija ekrāna apakšā (kā aplikācijās)
Jauns komponents `src/components/MobileNav.tsx`, redzams tikai zem `md`:

- Fiksēta josla ekrāna apakšā, papīra fons, augšā punktēta (perforācijas) līnija, `env(safe-area-inset-bottom)` polsterējums iPhone mājas indikatoram.
- 5 galvenie punkti ar lucide ikonām un 11px monospace uppercase parakstiem: **Sākums** (`/`), **Ceļvedis** (`/celvedis`), **Kalkulators** (`/` + `#kalkulators`), **Valstis** (`/` + `#valstis`), **Vairāk**.
- **Vairāk** atver augšup izslīdošu paneli ar atlikušajām saitēm: Ražotājiem, Numuri, Laika līnija, Video, BUJ, Metodoloģija, GitHub.
- Aktīvais punkts iekrāsojas pasta zilā ar īsu apakšsvītru; pārējie — `ink-soft`.
- Galvenes sadaļu saites paliek kā ir desktopā; mobilajā skatā tās vairs nav vajadzīgas.

### 3. Sīkumi, ko tas prasa
- `BackToTop` pogu mobilajā skatā pacelt virs jaunās joslas, lai nepārklājas.
- Kājenei pievienot apakšējo polsterējumu zem `md`, lai josla neaizsedz pēdējo rindu.
- Jaunās etiķetes (`Sākums`, `Vairāk`, `Metodoloģija`) ieliek `src/i18n/lv.ts` (`lv.nav`), nevis JSX.

## Tehniskās detaļas

- Faili: jauns `src/components/MobileNav.tsx`, jauns `src/hooks/use-hash-scroll.ts`; labojumi `src/components/Header.tsx`, `src/routes/__root.tsx` (ielikt `<MobileNav />` un hash-hooku), `src/components/BackToTop.tsx`, `src/components/Footer.tsx`, `src/i18n/lv.ts`.
- Nekādas datu vai `/data` izmaiņas; tikai prezentācija un navigācija.
- Josla renderējas bez Framer Motion ievadanimācijām (mobilais paliek viegls — tas pats iemesls kā iOS tukšās lapas labojumam).

## Pārbaude

- Playwright WebKit iPhone kontekstā: apakšjosla redzama, katrs punkts aizved uz pareizo vietu, arī no `/celvedis`; "Vairāk" panelis atveras un aizveras.
- Desktopā: sadaļu saites no `/celvedis` un `/razotajiem` aizved uz sākumlapas attiecīgo sadaļu; apakšjosla nav redzama.
