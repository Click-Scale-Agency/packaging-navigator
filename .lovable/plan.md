# Sociālo tīklu priekšskatījuma bilde (OG image)

Šobrīd, daloties ar saiti, redzams YouTube video kadrs no Tveris.App ieraksta — tas nav šī projekta zīmols. Vietā nāk pašu veidota priekšskatījuma bilde papīra/pasta etiķetes stilā.

## Ko lietotājs redz

- Facebook / LinkedIn / X / WhatsApp / Slack priekšskatījumā: 1200x630 attēls projekta vizuālajā valodā — silti balts papīrs (#faf8f4), tinte melna, pārtrauktas apmales un crop-marks, monospace etiķetes rindas.
- Saturs uz bildes: virsraksts "ES Iepakojuma Ceļvedis", apakšrinda "PPWR — Regula (ES) 2025/40 · piemēro no 12.08.2026", mazs zīmoga bloks "EPR maksu kalkulators · 27 valstis" un svītrkoda josla apakšā. Bez gradientiem, bez foto.
- Video sadaļas YouTube kadrs paliek kā līdz šim pašā lapā un `VideoObject` struktūrdatos — tikai vairs netiek lietots kā lapas kopīgošanas bilde.

## Tehniskā daļa

- Ģenerē `public/og-image.jpg` (1200x630) ar premium kvalitātes attēlu ģenerēšanu, precīzi pēc dizaina sistēmas krāsām un tipogrāfijas; pārbauda teksta salasāmību un vajadzības gadījumā pārģenerē.
- `src/routes/index.tsx`: `og:image` / `twitter:image` vairs nenāk no `briefingThumb`, bet ir absolūts URL `https://ppwr.clickscale.dev/og-image.jpg`; pievieno `og:image:width` 1200, `og:image:height` 630, `og:image:alt` (LV) un `og:url` + canonical uz `https://ppwr.clickscale.dev/`. `briefingThumb` paliek tikai `VideoObject.thumbnailUrl`.
- Tie paši `og:image`/`twitter:image` tagi tiek pievienoti arī pārējiem satura maršrutiem (`/celvedis`, `/metodologija`, `/valstis/$code`), lai neviena lapa nepaliek bez priekšskatījuma; `og:url` un canonical katrā norāda uz sevi.
- Pēc izmaiņām: platformas kešo iepriekšējo priekšskatījumu — jaunā bilde saitēs parādīsies pēc tam, kad tās pašas pārskanē lapu; ātrāk to var piespiest Facebook/LinkedIn saišu atkļūdotājos.
