# Izņemt evoex avotu no kājenes

Kājenes blokā "Galvenie avoti" paliek tikai oficiāli (valsts / ES iestāžu) avoti. Nekomerciālais bloga raksts tiek izņemts.

## Izmaiņas

- `src/i18n/lv.ts` — no `footer.sources` masīva izņem ierakstu "evoex — Packaging tax for e-commerce (DRN, EPR, invoicing)" (un tā URL). Pārējie seši avoti (EUR-Lex PPWR, EK BUJ ceļvedis, EK vadlīnijas C(2026) 3702, op.europa.eu, DRN likums likumi.lv, VID) paliek nemainīti.

Citas saskarnes izmaiņas nav vajadzīgas — `Footer.tsx` renderē sarakstu no i18n. `docs/research-log.md` un `CHANGELOG.md` pieminējumi netiek aiztikti (vēsturiskā pētījuma pieraksti, nevis UI).
