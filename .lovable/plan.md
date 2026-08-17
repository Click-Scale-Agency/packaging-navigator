# Sadaļa 05 ārā, BUJ lielāks un skaidrāks

## Kas tiek darīts

1. **Sadaļa 05 "Funkcija, nevis kods" tiek noņemta kā atsevišķa sadaļa.** Tās saturs nav lieks, bet trīs kartītes ar vienu domu neattaisno pilnu sadaļu — tas ir tipisks BUJ jautājums. Trīs punkti pārceļas uz BUJ kā divi jautājumi ("Kas vispār ir iepakojums PPWR izpratnē?" un "Vai CN/muitas kods nosaka EPR pienākumu?"). Komponents `FunctionNotCode.tsx` un tā i18n bloks tiek dzēsti.

2. **BUJ tiek paplašināts no 4 uz ~16 jautājumiem, sagrupētiem 4 blokos** ar apakšvirsrakstiem, lai garš saraksts paliek pārskatāms:
   - **Pamati** — kas ir PPWR un no kad; kas ir iepakojums (no bijušās 05); kas ir "izgatavotājs"; kas man jādara pirmajā nedēļā.
   - **Reģistrācija un pienākumi** — vai jāreģistrējas visās 27; ar ko reģistrs atšķiras no PRO; kas ir pilnvarotais pārstāvis un kad tas vajadzīgs; ko dara tirdzniecības platformas (Amazon/Etsy); vai ir mazā apgrozījuma slieksnis.
   - **Izmaksas** — cik tas maksās; kā rēķina €/kg un ekomodulāciju; kāpēc dažām valstīm nav likmes; kas ir DRS depozīts un vai tas ir tas pats; vai CN kods ietekmē izmaksas (Spānijas plastmasas nodoklis, no bijušās 05).
   - **Dokumentācija un dati** — ES atbilstības deklarācija un glabāšanas termiņi (5/10 gadi); marķēšana un PFAS robežas; no kur nāk šie dati un cik tiem drīkst uzticēties.

3. **Formulējumu korektūra.** Tiek pārrakstīti pamanītie neveiklie salikumi, tostarp:
   - Hero: "Šis ir mierīgs galds birokrātijas vidū: viena lapa, trīs slāņi, nekādu pārsteigumu." → skaidrs teikums bez metaforas ("Vienā lapā: kur jāreģistrējas, kam jāmaksā un cik.").
   - Kājene: "Dati ir produkts. Katrs valsts fakts glabājas JSON failā..." → "Katrs fakts par valsti glabājas atklātā JSON failā ar avotu un pārbaudes datumu."
   - Hero "Svars: VAR MAINĪTIES", "Ritini — zīmogi tiek uzspiesti" un līdzīgi dekoratīvi, bet nesakarīgi lauki tiek aizstāti ar jēgpilnu tekstu.
   - Metodoloģijā: "ES plastmasas akcīze" → "Spānijas plastmasas akcīze" (patlaban maldinoši).
   - Sadaļu numuri tiek sakārtoti pēc reālās secības (šobrīd "Sadaļa 04" atkārtojas divās sadaļās, un pēc 05 noņemšanas BUJ jākļūst par pēdējo numuru).

4. **Navigācija un SEO.** Enkurs `#funkcija` vairs nepastāv — pārbaudu, vai uz to nav saites galvā/kājenē. BUJ jautājumi tiek pievienoti `FAQPage` JSON-LD struktūrdatiem sākumlapas `head()`, lai tie var parādīties Google rezultātos.

## Tehniskā daļa

- `src/i18n/lv.ts`: dzēst `functionNotCode`; `faq.items` pārtaisīt par `faq.groups: { title, items[] }[]`; koriģēt `hero`, `footer`, `methodology` un `kicker` numurus.
- `src/components/Faq.tsx`: renderēt grupas (grupas virsraksts 11px uppercase, tālāk esošā perforētā akordeona rinda), saglabāt numerāciju nepārtrauktu cauri visām grupām, viens atvērts jautājums vienlaikus, atvērts pēc noklusējuma pirmais.
- `src/components/FunctionNotCode.tsx` — dzēst; izņemt importu un lietojumu no `src/routes/index.tsx`.
- `src/routes/index.tsx`: pievienot `FAQPage` JSON-LD, kas ģenerēts no `lv.faq.groups` (nevis dublēts teksts).
- Atbildes balstās tikai uz jau esošajiem projekta faktiem (`data/regulation.json`, `data/briefings/tveris-2026-08.json`, valstu JSON) — jauni fakti netiek izgudroti, un `/data` netiek aiztikts.
