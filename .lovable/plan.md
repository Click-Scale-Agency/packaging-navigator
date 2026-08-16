# Video sadaļa + Tveris.App kopsavilkums

Jauna sadaļa starp "Laika līnija" un "Funkcija, nevis kods": ieraksta video no Tveris.App un tā strukturēts kopsavilkums latviski.

## Ko lietotājs redz

- Sekcijas galva "Sadaļa 04 — Video un kopsavilkums" ar īsu ievadu (avots: Tveris.App sanāksmes ieraksts, YouTube).
- **Video kartīte** papīra-etiķetes stilā: 16:9 rāmis ar pārtrauktu apmali un crop-marks, YouTube iegulšana, kas sākas 14:20 (t=860s). Rāda tikai priekšskatījuma attēlu ar "▶ Atskaņot" — YouTube iframe ielādējas tikai pēc klikšķa (bez trešo pušu sīkfailiem un bez tracking, kamēr lietotājs nav piekritis). Blakus saite "Atvērt YouTube".
- **Kopsavilkums**: 7 galvenie punkti kā numurēta perforēta saraksta rinda ar zīmoga-presi (tāda pati `Press` animācija kā citur).
- **Detalizēts pārskats**: 8 tēmas kā salokāmi bloki (tas pats akordeona modelis kā BUJ) — termiņi, ES atbilstības deklarācija, iepakojuma definīcijas paplašinājums, bažas izraisošas vielas/PFAS, jēdziens "izgatavotājs", sekundārie ES akti, Iepakojuma likuma grozījumi, ieteikumi uzņēmumiem.
- Sekcijas kājā avota rinda: Tveris.App logotips + datums + atruna "Kopsavilkums nav juridiska konsultācija".
- Navigācijā (Header) pievienota saite "Video"; nākamo sekciju kikeri pārnumurēti (Funkcija = 05, BUJ = 06).

## Dati un teksts

- Video metadati + kopsavilkuma teksts glabājas kā dati, nevis JSX: jauns fails `data/briefings/tveris-2026-08.json` (ārpus `/data/countries`, canonical shēma netiek mainīta), ar laukiem: `source` (nosaukums, url, platforma, videoId, startSeconds, publishedAt), `keyPoints[]`, `topics[] {title, body}`, `disclaimer`.
- `src/data/index.ts` papildināts ar `briefings` eksportu (import.meta.glob pār `/data/briefings/*.json`), mapēts uz jauniem UI tipiem `src/data/types.ts` (`Briefing`, `BriefingTopic`).
- Sekciju virsraksti/etiķetes/pogas — `src/i18n/lv.ts` (`video: { kicker, title, lead, play, openYoutube, keyPointsTitle, topicsTitle, sourceLabel, disclaimer }`). Kopsavilkuma saturs paliek datos (tas ir dati, ne UI copy).

## Tehniskā daļa

- Jauns komponents `src/components/VideoBriefing.tsx` (klienta stāvoklis: `playing`, `openTopic`), izmanto `Press`, `SectionHead`, `CropMarks` no `primitives.tsx`.
- YouTube priekšskatījuma attēls: `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` (nav lokāla binārā faila). Iframe: `youtube-nocookie.com/embed/<id>?start=860&autoplay=1`, `title` atribūts LV, `allowfullscreen`.
- Iekļauts `src/routes/index.tsx` starp `<Timeline />` un `<FunctionNotCode />`; jauns `id="video"` enkurs.
- Tveris.App logotips pievienots kā Lovable asset pointer (`src/assets/tveris-logo.jpeg.asset.json`) un rādīts avota rindā ar alt tekstu; augšupielādētais fails netiek kopēts repo.
- SEO: `src/routes/index.tsx` head() papildināts ar `VideoObject` JSON-LD (nosaukums, apraksts, thumbnail, embedUrl) un og:image ar YouTube thumbnail absolūto URL.
- Blakus tiek izlabota esošā hidratācijas kļūda `src/components/Timeline.tsx` (šodienas datuma aprēķins servera/klienta pusē atšķiras) — pārceļot "ŠODIEN" marķējumu uz pēc-hidratācijas efektu.
