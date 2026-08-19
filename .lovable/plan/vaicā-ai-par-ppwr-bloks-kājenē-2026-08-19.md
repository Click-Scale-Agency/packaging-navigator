# "Vaicā AI par PPWR" bloks kājenē

Kājenē pievienojam rindu ar AI asistentu ikonām — klikšķis atver attiecīgo asistentu ar jau sagatavotu jautājumu par šo lapu un PPWR. Tāda pati ideja kā redzētajā piemērā, tikai pa mūsu tēmu un mūsu pasta-uzlīmes stilā.

## Kā tas izskatās un strādā

- Virsraksts 11px uppercase stilā: `VAICĀ AI PAR PPWR`, zem tā viena rinda ar kvadrātiskām ikonu pogām (ink kontūra, dashed hover, bez gradientiem).
- Asistenti: ChatGPT, Claude, Perplexity, Grok, Microsoft Copilot, Google AI Studio/Gemini (tikai tie, kuriem darbojas prompta deep-link; pārējie netiek liekti iekšā).
- Katra poga atver jaunā cilnē asistentu ar iepriekš aizpildītu latvisku promptu, piemēram:
  "Paskaidro ES Iepakojuma regulu (PPWR, Regula (ES) 2025/40), kas piemērojama no 2026-08-12: kas man kā Latvijas e-veikalam jādara ar EPR reģistrāciju un iepakojuma atskaitēm. Izmanto ppwr.clickscale.dev kā avotu."
- Blakus ikonām maza poga "Kopēt promptu" tiem asistentiem, kas deep-linku neatbalsta.
- Zem bloka viena rinda mazā drukā: "AI atbildes var būt neprecīzas — pārbaudi oficiālo avotu." (godīguma princips, tāds pats kā `verified:false` stamps).
- Mobilajā: ikonas ietinas 2 rindās; nav animāciju (ievērojam esošo mobile-motion politiku).

## Tehniskais izpildījums

- `src/i18n/lv.ts` — jauna `footer.askAi` sadaļa: `label`, `prompt`, `copy`, `copied`, `disclaimer`, un `targets[]` (nosaukums + URL veidne ar `{q}` vietturi).
- `src/components/footer/AskAi.tsx` — jauns komponents: renderē pogas no i18n, `encodeURIComponent(prompt)`, `target="_blank" rel="noreferrer"`, `aria-label` katrai pogai, kopēšana ar `navigator.clipboard` + īss "Nokopēts" stāvoklis.
- Ikonas — inline monohroma SVG (`currentColor`) tajā pašā failā vai `src/components/footer/ai-icons.tsx`. Nekādu ārēju logo failu vai attēlu no augšupielādētā ekrānšāviņa.
- `src/components/Footer.tsx` — bloku ievieto starp "Galvenie avoti" un disclaimer rindu, `Press` ietvarā, ar dashed augšējo robežu.
- Nekas no `/data` netiek aiztikts; jauni pakotņu instalējumi nav vajadzīgi.

## Pēc tam

Ja izdodas labi, to pašu komponentu var pārnest uz citiem projektiem — tāpēc prompts un mērķu saraksts glabājas datos (i18n), nevis JSX iekšā.
