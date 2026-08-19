/**
 * Single source of UI copy. All strings in Latvian.
 * Add src/i18n/en.ts with the same shape to introduce English later.
 */
export const lv = {
  meta: {
    title: "ES Iepakojuma Ceļvedis — PPWR un EPR maksu kalkulators",
    description:
      "Atvērts ceļvedis ES Iepakojuma regulai (PPWR 2025/40): ražotāju reģistri, PRO shēmas un papildu nodokļi 27 dalībvalstīs. Indikatīvs EPR maksu kalkulators.",
  },
  brand: {
    name: "ES Iepakojuma Ceļvedis",
    subtitle: "EU Packaging Hub",
    tagline: "Atvērts ceļvedis PPWR prasībām",
  },
  errors: {
    notFoundTitle: "Lapa nav atrasta",
    notFoundBody: "Meklētā lapa nepastāv vai ir pārvietota.",
    goHome: "Uz sākumu",
    errorTitle: "Lapu neizdevās ielādēt",
    errorBody: "Radās kļūda mūsu pusē. Mēģini pārlādēt lapu vai atgriezties sākumlapā.",
    tryAgain: "Mēģināt vēlreiz",
  },
  a11y: {
    backToTop: "Atpakaļ uz augšu",
  },
  status: {
    official: "oficiāls",
    operator_published: "operatora publicēts",
    secondary_source: "sekundārs avots",
    inferred: "izsecināts",
    unverified: "nepārbaudīts",
    not_applicable: "nav attiecināms",
    unknown: "nezināms",
    validLabel: "spēkā",
  },
  statusDesc: {
    official: "Apstiprināts no primāra avota — likuma teksta vai valsts iestādes.",
    operator_published: "No operatora/PRO publicēta cenrāža vai tarifu lapas.",
    secondary_source: "No uzticama trešās puses avota, nevis primāra.",
    inferred: "Izsecināts no PPWR/interpretācijas, bez valsts specifiska avota.",
    unverified: "Vēl nav pārbaudīts pret avotu.",
    not_applicable: "Fakts šai valstij nepastāv (piem., nav publiska tarifa).",
    unknown: "Atklāts jautājums — nav noskaidrots.",
  },
  methodology: {
    metaTitle: "Metodoloģija un datu statusi",
    kicker: "Metodoloģija",
    title: "Kā mēs strukturējam datus",
    lead: "Šis portāls apzināti nodala zināmu, daļēji zināmu, interpretētu un nezināmu informāciju. Šeit ir, ko katrs statuss nozīmē un kā tiek rēķinātas izmaksas.",
    layersTitle: "Trīs pienākumu slāņi",
    layersLead:
      "Reģistrācija, PRO dalība un papildu nodokļi ir trīs atsevišķi pienākumi — tie nekad nav savstarpēji aizvietojami.",
    layerRegister:
      "Reģistrs — valsts ražotāju saraksts, kas izsniedz numuru, ko pārbauda tirdzniecības platformas.",
    layerPro: "PRO shēma — apsaimniekotājs, kas iekasē maksas un organizē pārstrādi.",
    layerTaxes:
      "Papildu nodokļi — atsevišķi nacionāli nodokļi (piemēram, Spānijas plastmasas akcīze), neatkarīgi no PRO maksas.",
    statusesTitle: "Verifikācijas statusi",
    statusesLead:
      "Katram tarifam un pienākumam ir savs statuss, avots un pārbaudes datums — nevis viens kopīgs “pārbaudīts” karodziņš visai valstij.",
    coverageTitle: "Kalkulatora seguma stāvokļi",
    coverageLead: "Kalkulators nekad nepieņem trūkstošu likmi par nulli.",
    coverageFull: "Aprēķināts — visiem izvēlētajiem materiāliem ir likme.",
    coveragePartial:
      "Daļējs — daļai materiālu likmes nav, tāpēc summa ir tikai zināmā daļa (apakšējā robeža), nevis pilnās izmaksas.",
    coverageNone: "Nav aprēķināms — nevienam izvēlētajam materiālam nav likmes.",
    coverageConditional:
      "Iespējams nodoklis — tas, vai nodoklis attiecas, atkarīgs no darījuma, tāpēc summai to automātiski nepieskaitām.",
    changelogTitle: "Izmaiņu žurnāls",
    changelogLead: "Būtiskās datu un metodoloģijas izmaiņas tiek fiksētas publiskā žurnālā.",
    changelogLink: "Skatīt izmaiņu žurnālu (GitHub)",
    disclaimerTitle: "Atruna",
    disclaimer:
      "Rezultāts ir sākotnējs atbilstības novērtējums, kas balstīts uz norādītajiem datiem un publiski pieejamiem avotiem. Tajā var nebūt ietverti visi tarifi, nodokļi, ekomodulācija, kā arī pārstāvniecības, audita un administratīvās izmaksas. Pirms reģistrācijas vai pārdošanas uzsākšanas pārbaudi informāciju attiecīgās valsts oficiālajā avotā vai pie kvalificēta speciālista.",
  },
  nav: {
    home: "Sākums",
    guide: "Ceļvedis",
    calculator: "Kalkulators",
    countries: "Valstis",
    numbers: "Numuri",
    timeline: "Laika līnija",
    video: "Video",
    faq: "BUJ",
    repo: "GitHub",
    more: "Vairāk",
    methodology: "Metodoloģija",
    menu: "Izvēlne",
    close: "Aizvērt",
  },
  hero: {
    headline: "Iepakojums tagad ir regulēts. Mēs to iztulkojam.",
    sub: "Regula (ES) 2025/40 — piemēro no 2026. gada 12. augusta. Vienā lapā: kur jāreģistrējas, kam jāmaksā un cik tas izmaksās.",
    senderLabel: "Nosūtītājs",
    sender: "Tavs e-veikals, LV",
    recipientLabel: "Saņēmējs",
    recipient: "27 ES dalībvalstis",
    stamp1: "PPWR",
    stamp2: "2026-08-12",
    stamp3: "PIEMĒRO",
    refLabel: "Dokumenta Nr.",
    ref: "PPWR/2025/40",
    weightLabel: "Svars",
    weight: "PĒC MATERIĀLA (€/kg)",
    classLabel: "Klase",
    class: "REĢISTRS / PRO / NODOKĻI",
    ctaPrimary: "Aprēķināt maksas",
    ctaSecondary: "Skatīt valstis",
    scrollHint: "Ritini uz leju",
  },
  calculator: {
    kicker: "Sadaļa 01",
    title: "Kalkulators",
    lead: "Ievadi viena sūtījuma iepakojuma svaru un izvēlies galamērķa valstis. Rezultāts ir indikatīvs — publiskotās tarifu likmes vēl tiek apkopotas.",
    materialsLabel: "Iepakojuma svars uz sūtījumu (g)",
    countriesLabel: "Galamērķa valstis",
    shipmentsLabel: "Sūtījumu skaits gadā",
    totalWeightLabel: "Kopējais materiāla svars",
    tableCountry: "Valsts",
    tableRegister: "Reģistrs",
    tableScheme: "Shēma",
    tableRate: "Likme €/kg",
    tableFee: "Indikatīvi €/gadā",
    noCountries: "Izvēlies vismaz vienu valsti, lai redzētu aprēķinu.",
    noRate: "nav likmes",
    disclaimer:
      "Indikatīvi. Nav juridiska konsultācija. Rāda tikai to izmaksu daļu, kurai ir publiskota likme — trūkstošās likmes netiek pieņemtas par nulli. Pilnvarotā pārstāvja, ekomodulācijas, konsultāciju un depozīta izmaksas nav iekļautas, jo tās ir mainīgas.",
    grandTotal: "Kopā 1. gadā (indikatīvi)",
    reset: "Notīrīt",
    selectAll: "Visas 27",
    breakdownVariable: "iepakojums",
    breakdownMinApplied: "min. gada maksa piemērota",
    breakdownReg: "reģistrācija",
    plusAr: "+ pārstāvis",
    plusArTitle:
      "Vajadzīgs vietējais pilnvarotais pārstāvis (PPWR 45. pants) — tā ir atsevišķa un mainīga maksa, kas nav iekļauta aprēķinātajā daļā.",
    fromPrefix: "no",
    altRateChip: "alternatīvā likme",
    altRateTitle: (name: string, when: string) => `${name}. ${when}`,
    altRateNote: (name: string, when: string) => `${name}: rāda ${when.toLowerCase()}`,
    arApplyQ: "Vai pienākums iecelt pārstāvi attiecas uz tevi?",
    arYes: "attiecas",
    arNo: "neattiecas",
    arUnknown: "nav zināms",
    fullTotalNote: "Daļa tarifu un administratīvo izmaksu var nebūt publiski pieejama.",
    arConfirmedNote: (n: number) =>
      n === 0
        ? "Pārstāvja maksa netiek pieskaitīta, kamēr neatzīmē, ka pienākums attiecas."
        : `Pieskaitīts ${n === 1 ? "vienai valstij" : `${n} valstīm`}, ko atzīmēji kā “attiecas”.`,
    partialBadge: "daļējs aprēķins",
    partialTitle: (mats: string) =>
      `Šiem izvēlētajiem materiāliem nav publiskotas likmes: ${mats}. Summa ir tikai zināmā daļa — reālās izmaksas ir augstākas.`,
    noneBadge: "nav aprēķināms",
    noneTitle:
      "Nevienam izvēlētajam materiālam nav publiskotas likmes šai valstij — summu nevar aprēķināt.",
    condTaxChip: "+ iespējams nodoklis",
    condTaxTitle: (names: string) =>
      `Iespējams papildu nodoklis (${names}) — tas, vai tas attiecas, atkarīgs no darījuma un iepakojuma, tāpēc summai to automātiski nepieskaitām. Jāpārbauda.`,
    arFeeLabel: "Pārstāvja gada maksa (aplēse, €/valstī)",
    arFeeHint:
      "Netiek pieskaitīta automātiski. Pārbaudi, kurās valstīs šis pienākums attiecas uz tavu uzņēmumu, un atzīmē tās sarakstā.",
    safeTotal: "Aprēķinātā daļa (PRO + reģistrācija)",
    estTotalLabel: "Iespējamās pilnvarotā pārstāvja izmaksas",
    estCountriesNote: (n: number) =>
      `${n === 1 ? "Vienā valstī" : `${n} valstīs`} atzīmēts “attiecas”`,
    partialSelectedNote: (n: number) =>
      `${n === 1 ? "Vienai valstij" : `${n} valstīm`} ir zināma tikai daļa likmju — kopsumma ir zināmā daļa, nevis pilnās izmaksas.`,
    fullTotal: "Aptuvenās zināmās izmaksas 1. gadā",
    drsChip: "depozīts",
    drsChipTitle:
      "Šajā valstī darbojas dzērienu depozīta sistēma (DRS) — tā ir atsevišķa no iepakojuma EPR.",
    copySummary: "Kopēt kopsavilkumu",
    downloadCsv: "Lejupielādēt CSV",
    copied: "Nokopēts!",
  },
  marketplace: {
    kicker: "Sadaļa 03",
    title: "Reģistrācijas numuri tirdzniecības platformām",
    lead: "Amazon, eBay, Etsy un citas platformas prasa iepakojuma EPR reģistrācijas numuru katrai valstij, kurā pārdod. Šeit ir katras valsts numura formāts un norāde, vai numurs jānorāda uz rēķiniem.",
    colCountry: "Valsts",
    colRegister: "Reģistrs",
    colFormat: "Numura formāts",
    colInvoice: "Uz rēķiniem",
    none: "nav atsevišķa numura formāta",
    yes: "jā",
    no: "nē",
    unknown: "nav zināms",
  },
  guide: {
    kicker: "Sadaļa 00",
    title: "Kas man jādara?",
    lead: "Atbildi uz dažiem jautājumiem, un mēs izveidosim rīcības plānu katrai valstij — kur reģistrēties, vai vajadzīgs pilnvarotais pārstāvis, kuru apsaimniekotāju izvēlēties un kas jāiesniedz.",
    promoKicker: "Rīcības ceļvedis",
    promoTitle: "Nezini, no kā sākt?",
    promoLead:
      "Kalkulators parāda, cik tas maksās. Ceļvedis parāda, kas tieši tev jādara — soli pa solim, katrai valstij, uz kuru sūti.",
    promoCta: "Sākt ceļvedi",
    promoBullet1: "Reģistrācija un numuri katrai valstij",
    promoBullet2: "Vai vajadzīgs pilnvarotais pārstāvis (PPWR 45. pants)",
    promoBullet3: "Uzdevumu un pierādījumu saraksts",
    step1Label: "1. solis",
    step1Title: "Uz kurām valstīm tu sūti?",
    step1Hint: "Izvēlies visas galamērķa valstis, kurās tavs iepakojums pirmo reizi nonāk tirgū.",
    step2Label: "2. solis",
    step2Title: "Kāds ir pārdošanas kanāls?",
    step2Hint:
      "Nosaka, kur jānorāda reģistrācijas numurs un kurš var uzņemties ražotāja pienākumus.",
    step3Label: "3. solis",
    step3Title: "Kurš pirmais laiž iepakojumu tirgū?",
    step3Hint: "PPWR pienākums ir tam, kurš iepakoto preci pirmais laiž konkrētās valsts tirgū.",
    channelOwn: "Savs e-veikals",
    channelOwnDesc: "Tu pārdod tieši pircējiem no sava interneta veikala (tālpārdošana).",
    channelMarketplace: "Tirdzniecības platforma",
    channelMarketplaceDesc: "Amazon, eBay, Etsy vai cita platforma.",
    channelB2b: "Vairumtirdzniecība (B2B)",
    channelB2bDesc: "Pārdod vietējiem uzņēmumiem vai izplatītājiem, nevis gala patērētājam.",
    whoYou: "Es pats (ārvalstu pārdevējs)",
    whoYouDesc: "Tu sūti no citas valsts tieši uz šo tirgu, un tev nav vietējas pārstāvniecības.",
    whoImporter: "Vietējais importētājs / izplatītājs",
    whoImporterDesc:
      "Vietējais uzņēmums ieved preci un pārdod to tālāk — tātad tas pirmais laiž preci tirgū.",
    whoPlatform: "Tirdzniecības platforma",
    whoPlatformDesc: "Platforma darbojas kā reģistrēts ražotājs šai precei un valstij.",
    resultTitle: "Tavs rīcības plāns",
    resultLead: (n: number) =>
      `${n} ${n % 10 === 1 && n % 100 !== 11 ? "valsts" : "valstis"} — katrai zemāk ir konkrēti soļi. Sāc ar tiem, kas atzīmēti kā “obligāti”, un tad ķeries pie pārbaudāmajām pozīcijām.`,
    resultEmpty: "Izvēlies vismaz vienu valsti un atbildi uz jautājumiem, lai redzētu plānu.",
    obligationYou: "Pienākums ir tev",
    obligationYouNote: "Tu pirmais laid iepakojumu šīs valsts tirgū, tāpēc EPR pienākumi ir tavi.",
    obligationOther: "Pienākums, visticamāk, nav tev",
    obligationImporterNote:
      "Iepakojumu pirmais laiž tirgū vietējais importētājs — praksē pienākums ir viņam. Tev atliek pārbaude un dokumentācija.",
    obligationPlatformNote:
      "Ja platforma ir reģistrēta kā ražotājs šai precei un valstij, tā var uzņemties pienākumu. Tas jāapstiprina rakstiski — pretējā gadījumā pienākums paliek tev.",
    tasksTitle: "Uzdevumi",
    evidenceTitle: "Savācamie pierādījumi",
    flagsTitle: "Jāpārbauda pašam",
    levelRequired: "obligāti",
    levelConditional: "nosacīti",
    levelInfo: "info",
    openCountry: "Atvērt valsts karti",
    taskRegister: (name: string) => `Reģistrējies ražotāju reģistrā: ${name}`,
    taskRegisterFormat: (fmt: string) => `Numura formāts: ${fmt}`,
    taskNoRegister:
      "Šajā valstī nav atsevišķa valsts reģistra — reģistrāciju un uzskaiti kārto apsaimniekotājs (PRO) vai tā tiek noteikta līgumā.",
    taskAr: "Iecel vietējo pilnvaroto pārstāvi (PPWR 45. pants)",
    taskArDetail:
      "Ārvalstu tālpārdevējam bez vietējās pārstāvniecības tas ir obligāti katrā galamērķa valstī no 2026. gada 12. augusta.",
    taskPro: (names: string) => `Slēdz līgumu ar apsaimniekotāju (PRO): ${names}`,
    taskProMandatory: "Dalība apsaimniekotāja shēmā šajā valstī ir obligāta.",
    taskProOptional:
      "Pienākumu var izpildīt, slēdzot līgumu ar licencētu apsaimniekotāju vai veicot likumā noteikto maksājumu — izvērtē, kurš variants ir izdevīgāks.",
    taskReport: "Ziņo iepakojuma apjomus",
    taskReportUnknown: "Ziņošanas biežums un termiņi vēl jāpārbauda.",
    taskReportCheck: "jāpārbauda",
    taskInvoice: "Norādi reģistrācijas numuru uz rēķiniem / komercdokumentiem",
    taskMarketplaceNumber: "Ievadi EPR reģistrācijas numuru platformas pārdevēja kontā",
    taskMarketplaceNumberDetail:
      "Bez derīga numura platforma var apturēt tavus sarakstus šajā valstī.",
    taskTax: (name: string) => `Papildu nodoklis: ${name}`,
    taskDrs: (op: string, dep: string) =>
      `Ja sūti dzērienus: piemēro depozīta sistēmu (${op}${dep ? `, ${dep}` : ""})`,
    taskImporterNumber: "Iegūsti un saglabā vietējā importētāja EPR reģistrācijas numuru",
    taskImporterContract: "Apstiprini līgumā, kurš kārto reģistrāciju, ziņošanu un maksas",
    taskPlatformConfirm:
      "Saņem no platformas rakstisku apstiprinājumu, ka tā ir reģistrētais ražotājs šai precei un valstij",
    evidenceRegNumber: "Reģistrācijas numurs (ekrānšāviņš / apstiprinājums)",
    evidenceProContract: "Līgums ar apsaimniekotāju (PRO)",
    evidenceArMandate: "Pilnvarotā pārstāvja pilnvarojums",
    evidenceDeclaration: "Iesniegtās iepakojuma deklarācijas un iesniegšanas apliecinājumi",
    evidenceImporterNumber: "Importētāja/platformas EPR numura kopija",
    flagUnverified: (code: string) =>
      `Dati par ${code} vēl nav salīdzināti ar oficiālu tarifu — apstiprini summas oficiālajā avotā.`,
    flagMarketplace:
      "Pārbaudi platformas līgumā, vai tā pati neuzņemas ražotāja pienākumus tavā vietā.",
    flagWhoFirst:
      "Noskaidro, kurš šajā valstī juridiski ir “ražotājs” — definīcija dažviet atšķiras.",
    flagB2b:
      "B2B gadījumā pienākums bieži pāriet vietējam pircējam, kas preci laiž tirgū tālāk — nostiprini to līgumā.",
    disclaimer:
      "Indikatīvi norādījumi, nevis juridiska konsultācija. Pirms reģistrācijas pārbaudi oficiālo avotu katrai valstij.",
    printPlan: "Drukāt / saglabāt PDF",
    step4Label: "4. solis",
    step4Title: "Kāds ir tavs iepakojums?",
    step4Hint:
      "Nosaka, kuras likmes un nodokļi attiecas un cik aptuveni tas izmaksās katrā valstī.",
    classMaterialsTitle: "Materiāli un svars uz sūtījumu (g)",
    classShipmentsLabel: "Sūtījumu skaits gadā",
    classLevelsTitle: "Iepakojuma līmenis",
    levelSales: "Pārdošanas (primārais)",
    levelGrouped: "Grupas (sekundārais)",
    levelTransport: "Transporta (terciārais)",
    levelEcom: "E-komercijas sūtījums",
    classAudienceTitle: "Kam paredzēts",
    audienceHousehold: "Mājsaimniecībai (B2C)",
    audienceCommercial: "Komerciāls / rūpniecisks",
    classReuseTitle: "Lietošanas veids",
    reuseSingle: "Vienreiz lietojams",
    reuseReusable: "Atkārtoti lietojams",
    costChip: (eur: string) => `≈ €${eur}/gadā`,
    costPartialChip: (eur: string) => `≥ €${eur}/gadā (daļējs)`,
    costChipTitle:
      "Indikatīvas iepakojuma EPR izmaksas gadā (PRO maksa + reģistrācija), rēķinot pēc izvēlētajiem materiāliem un svara. Pilnvarotā pārstāvja izmaksas nav iekļautas.",
    costPartialTitle:
      "Daļai izvēlēto materiālu nav publiskotas likmes — parādītā summa ir tikai zināmā daļa, un reālās izmaksas ir augstākas.",
    costUnknown: "nav publiskotas likmes",
    condTaxNote: (names: string) =>
      `Iespējams papildu nodoklis: ${names} — tas, vai tas attiecas, atkarīgs no darījuma un iepakojuma, tāpēc tas nav pieskaitīts. Jāpārbauda.`,
    openCalculator: "Atvērt pilno kalkulatoru ar šiem datiem",
    noteEcom:
      "E-komercijas un transporta iepakojums PPWR ir atsevišķa kategorija — to uzskaita un par to ziņo tāpat kā par pārdošanas iepakojumu.",
    noteCommercial:
      "Komerciālam un rūpnieciskam iepakojumam var būt cita ziņošanas plūsma nekā mājsaimniecības iepakojumam — precizē to ar apsaimniekotāju.",
    noteReusable:
      "Atkārtoti lietojamam iepakojumam piemēro atkārtotas lietošanas mērķu režīmu, tāpēc standarta EPR maksa par vienību var tikt rēķināta citādi — pārbaudi.",
    notePlastic:
      "Izvēlēta plastmasa: dažās valstīs (piemēram, Spānijā) papildus PRO maksai ir atsevišķs nodoklis par nepārstrādātu plastmasu.",
    scenariosTitle: "Sāc no gatava scenārija",
    scenariosHint:
      "Izvēlies tipisku situāciju — mēs aizpildīsim visus soļus, un tu varēsi tos labot.",
    copyPlan: "Kopēt plānu",
    copied: "Nokopēts!",
    printPlanBtn: "Drukāt / saglabāt PDF",
    planHeader: "PPWR rīcības plāns",
    planChannelLabel: "Kanāls",
    planWhoLabel: "Iepakojumu pirmais laiž tirgū",
    planSummaryLine: (n: number, kg: string) =>
      `${n} ${n % 10 === 1 && n % 100 !== 11 ? "valsts" : "valstis"} · kopējais iepakojums ${kg} kg/gadā`,
  },
  materials: {
    paper: "Papīrs / kartons",
    plastic: "Plastmasa",
    glass: "Stikls",
    metal: "Metāls",
    wood: "Koks",
    composite: "Kompozīts",
  },
  countries: {
    kicker: "Sadaļa 02",
    title: "Valstu katalogs",
    lead: "27 dalībvalstis. Katra kartīte rāda trīs atsevišķus slāņus — tie nekad nav viens un tas pats pienākums.",
    layerRegister: "Reģistrs",
    layerPro: "Shēma (PRO)",
    layerTaxes: "Papildu nodokļi",
    none: "nav",
    noRegister: "nav reģistra",
    unknown: "nav datu",
    open: "Atvērt",
    searchPlaceholder: "Meklēt valsti vai kodu",
    showAll: "Rādīt visas 27 valstis",
  },
  detail: {
    back: "Atpakaļ uz katalogu",
    registerTitle: "Slānis 1 — Valsts ražotāju reģistrs",
    proTitle: "Slānis 2 — Ražotāju atbildības organizācijas (PRO)",
    taxesTitle: "Slānis 3 — Atsevišķi valsts nodokļi",
    sourcesTitle: "Avoti",
    registerName: "Nosaukums",
    registerFormat: "Numura formāts",
    registerUrl: "Saite",
    exists: "Pastāv",
    notExists: "Nepastāv",
    membership: "Dalība obligāta",
    tariffYear: "Tarifu gads",
    rates: "Likmes €/kg",
    ratesRefScheme: (name: string) => `Likmes €/kg — atsauces shēma: ${name}`,
    ratesRefNote:
      "Citas šīs valsts shēmas var cenot atšķirīgi. Šī tabula atspoguļo atsauces (galvenās) shēmas publiskotās likmes, nevis katras shēmas atsevišķās.",
    yes: "jā",
    no: "nē",
    regContextTitle: "Regulējums un reģistrācija",
    competentAuthority: "Kompetentā iestāde",
    legalBasis: "Tiesiskais pamats",
    registrationCost: "Reģistrācijas maksa",
    annualMinFee: "Minimālā gada maksa",
    arRequired: "Vajadzīgs pilnvarotais pārstāvis",
    arHint:
      "Ārvalstu tālpārdevējam bez vietējās pārstāvniecības ir jāieceļ vietējais pilnvarotais pārstāvis (PPWR 45. pants).",
    numberOnInvoices: "Numurs jānorāda uz rēķiniem",
    deMinimis: "Slieksnis (de-minimis)",
    free: "bez maksas (€0)",
    depositTitle: "Depozīta sistēma (dzērienu iepakojums)",
    depositActive: "Aktīva",
    unknownShort: "nav zināms",
    lastReviewed: "Pēdējoreiz pārskatīts",
    checkedAt: "Pārbaudīts",
    verification: "Verifikācija",
    reportingTitle: "Ziņošana",
    reportingFrequency: "Biežums",
    reportingDeadlines: "Termiņi",
    reportingZero: "Nulles deklarācija",
    reportingCorrection: "Labojumi",
    reportingNone: "Šīs valsts ziņošanas kārtība vēl nav apkopota.",
    statutoryTitle: "Alternatīvās likumā noteiktās likmes",
    statutoryAppliesWhen: "Kad piemēro",
    statutoryRatesLabel: "Likmes (€/kg)",
    statutoryTariffYear: "Tarifa gads",
    statutoryScenarioNote:
      "Šīs likmes ir alternatīva PRO līgumam — tās nekad netiek summētas kopā ar apsaimniekotāja maksu.",
    noSources: "Avoti vēl nav pievienoti.",
    noPro: "PRO shēmas vēl nav apkopotas.",
    noTaxes: "Nav zināmu papildu nodokļu.",
    notFound: "Šāds valsts kods nav katalogā.",
  },
  timeline: {
    kicker: "Sadaļa 04",
    title: "Laika līnija",
    lead: "Pieci datumi, kas maina pienākumus. Sarkanais zīmogs rāda, kur mēs šobrīd atrodamies.",
    now: "ŠODIEN",
  },
  video: {
    kicker: "Sadaļa 05",
    title: "Video un kopsavilkums",
    lead: "Publisks Tveris.App sagatavots ieraksts par PPWR prasībām, kuras piemēro no 12. augusta, un tā strukturēts kopsavilkums latviski.",
    play: "Atskaņot",
    openYoutube: "Atvērt YouTube",
    keyPointsTitle: "Kopsavilkums",
    topicsTitle: "Detalizēts pārskats par tēmām",
    sourceLabel: "Avots — ieraksts",
  },
  faq: {
    kicker: "Sadaļa 06",
    title: "Bieži uzdotie jautājumi",
    lead: "Divdesmit divi jautājumi, ko e-veikali uzdod visbiežāk. Atbildes balstās uz šajā lapā apkopotajiem datiem, regulas tekstu un oficiālo EK BUJ.",
    groups: [
      {
        title: "Pamati",
        items: [
          {
            q: "Kas ir PPWR un no kura datuma tā ir spēkā?",
            a: "PPWR ir Regula (ES) 2025/40 par iepakojumu un iepakojuma atkritumiem. Tā ir regula, nevis direktīva — tas nozīmē, ka to piemēro visās 27 dalībvalstīs tieši, bez atsevišķas pārņemšanas nacionālajā likumā. Lielākā daļa prasību ir piemērojama no 2026. gada 12. augusta; atsevišķi pienākumi, piemēram, marķēšana un iepakojuma minimizēšana, iestājas vēlāk. Konkrētie datumi ir laika līnijas sadaļā.",
          },
          {
            q: "Kas vispār ir iepakojums PPWR izpratnē?",
            a: "Iepakojumu nosaka funkcija, nevis materiāls vai preces kods. Ja kaut kas aizsargā, satur, pārvieto vai pasniedz preci gala patērētājam, tas ir iepakojums: kastes, plēves, gaisa spilventiņi, līmlentes, etiķetes, vāciņi, arī tējas un kafijas maisiņi. Katrs elements tiek uzskaitīts atsevišķi pēc sava materiāla un svara.",
          },
          {
            q: "Kas ir “izgatavotājs” un ar ko tas atšķiras no ražotāja?",
            a: "PPWR ievieš jēdzienu “izgatavotājs” — tā ir persona, kas pieņem lēmumus par iepakojuma dizainu. Šai personai jāsagatavo un jāglabā ES atbilstības deklarācija. “Ražotājs” EPR nozīmē ir tas, kas iepakojumu pirmais laiž konkrētās valsts tirgū un maksā EPR maksas. Mazam e-veikalam, kas pats izvēlas savas kastes, abas lomas bieži sakrīt.",
          },
          {
            q: "Ar ko sākt, ja neesmu darījis neko?",
            a: "Vispirms uzraksti sarakstu ar valstīm, uz kurām sūti pasūtījumus tieši pircējiem. Tad nosver savu tipisko iepakojumu pa materiāliem. Ar šiem diviem datiem izej rīcības ceļvedi šajā lapā — tas parādīs, kur jāreģistrējas, kur vajadzīgs pilnvarotais pārstāvis un ko iesniegt. Dokumentāciju sāc kārtot uzreiz, negaidot kontroles pieprasījumu.",
          },
        ],
      },
      {
        title: "Reģistrācija un pienākumi",
        items: [
          {
            q: "Vai man jāreģistrējas visās 27 valstīs?",
            a: "Nē — tikai tajās, kurās tu pirmais laid tirgū iepakotu preci. Praksē tās ir visas valstis, uz kurām sūti pasūtījumus tieši pircējiem. Vienotas ES reģistrācijas nav: katra valsts ir atsevišķa procedūra, un lielākajā daļā valstu nav apjoma sliekšņa — pienākums iestājas ar pirmo sūtījumu.",
          },
          {
            q: "Ar ko reģistrs atšķiras no PRO?",
            a: "Reģistrs ir valsts uzturēts ražotāju saraksts: tu iegūsti numuru, ko pārbauda tirdzniecības platformas un uzraugi. PRO ir apsaimniekotājs, kuram tu maksā par savākšanu un pārstrādi. Vairumā valstu vajadzīgi abi. Piemēram, Vācijā — LUCID numurs un līgums ar duālo sistēmu; dažās valstīs, piemēram, Itālijā vai Nīderlandē, atsevišķa iepakojuma reģistra nav un viss notiek caur shēmu.",
          },
          {
            q: "Kas ir pilnvarotais pārstāvis un kad tas ir vajadzīgs?",
            a: "Tas ir vietējais uzņēmums vai persona attiecīgajā valstī, kas uzņemas tavus EPR pienākumus (PPWR 45. pants). To parasti prasa no ārvalstu tālpārdevēja, kuram šajā valstī nav juridiskas klātbūtnes. Maksa ir atsevišķa no PRO maksas, un tā stipri atšķiras starp pakalpojumu sniedzējiem, tāpēc kalkulators to nepieskaita automātiski — to atzīmē pats.",
          },
          {
            q: "Vai Amazon tiešām bloķē pārdevējus?",
            a: "Jā. Tirdzniecības platformām ir pienākums pārbaudīt ražotāja numurus, un bez derīga numura sludinājumus attiecīgajā valstī var apturēt. Numurs ir ne tikai jāiegūst, bet arī jāievada pārdevēja kontā — tas ir visbiežākais iemesls, kāpēc sludinājumi tiek apturēti, lai gan reģistrācija ir kārtībā.",
          },
          {
            q: "Ja pārdodu tikai caur platformu, vai pienākums ir tai?",
            a: "Tikai tad, ja platforma konkrētajā valstī un konkrētajai precei ir reģistrēta kā ražotājs un tas ir apstiprināts rakstiski. Pretējā gadījumā pienākums paliek tev. Vairums platformu pienākumu neuzņemas — tās to tikai pārbauda.",
          },
          {
            q: "Vai maziem uzņēmumiem ir atbrīvojums?",
            a: "Vispārēja ES atbrīvojuma maziem uzņēmumiem nav. Par atvieglojumiem mikro un mazajiem uzņēmumiem ES līmenī ir diskusijas, bet uz 2026. gada augustu tie nav spēkā, tāpēc jārēķinās, ka pienākumi attiecas pilnā apjomā. Atsevišķas valstis nosaka nelielus administratīvus sliekšņus, taču lielākajā daļā slieksnis ir 0 kg.",
          },
        ],
      },
      {
        title: "Izmaksas",
        items: [
          {
            q: "Cik tas izmaksās?",
            a: "Divas izmaksu daļas: vienreizēja vai gada reģistrācijas maksa un mainīgā PRO maksa par faktiski tirgū laisto iepakojuma svaru. Vienam e-veikalam ar dažiem tūkstošiem sūtījumu gadā PRO maksa bieži ir desmiti līdz simti eiro par valsti, bet reģistrācijas un pārstāvja izmaksas var būt lielākas par pašu maksu. Precīzu skaitli parāda kalkulators, ievadot savus svarus.",
          },
          {
            q: "Kā tiek rēķinātas €/kg likmes un kas ir ekomodulācija?",
            a: "Maksa ir likme €/kg katram materiālam, reizināta ar attiecīgā materiāla svaru. Ekomodulācija nozīmē, ka likme mainās atkarībā no pārstrādājamības: slikti pārstrādājams iepakojums var maksāt vairākas reizes vairāk nekā monomateriāls. Likmes tiek pārskatītas katru gadu, tāpēc katrai likmei ir norādīts tarifu gads.",
          },
          {
            q: "Kāpēc dažām valstīm nav norādīta likme?",
            a: "Vairākas shēmas cenrādi nepublicē — to izsniedz tikai pēc pieteikuma vai līguma noslēgšanas. Šādos gadījumos likmes vietā rāda “nav datu”, un trūkstošā likme nekad netiek pieņemta par nulli. Ja daļai materiālu likmes nav, kopsumma tiek atzīmēta kā daļēja — tā ir apakšējā robeža, nevis pilnās izmaksas.",
          },
          {
            q: "Vai depozīta sistēma (DRS) ir tas pats, kas EPR?",
            a: "Nē. Depozīta sistēma attiecas uz dzērienu iepakojumu, tā ir atsevišķa nauda, ko iekasē no pircēja un atmaksā pie taras nodošanas. EPR maksa par to pašu pudeli var būt jāmaksā papildus. Kalkulators depozītu nesummē — valstis ar aktīvu DRS ir tikai atzīmētas.",
          },
          {
            q: "Vai CN kods ietekmē izmaksas?",
            a: "EPR pienākumu CN kods nerada un neatceļ — to nosaka funkcija. Bet divos gadījumos kods ir svarīgs: ievedot tukšu iepakojumu kā preci un aprēķinot Spānijas plastmasas nodokli (€0,45/kg par nepārstrādātu plastmasu), kur deklarācija balstās uz CN kodiem. Šis nodoklis ir atsevišķs no PRO maksas un to iekasē nodokļu administrācija.",
          },
        ],
      },
      {
        title: "Dokumentācija un dati",
        items: [
          {
            q: "Kas ir ES atbilstības deklarācija un cik ilgi tā jāglabā?",
            a: "Tā ir rakstiska deklarācija, ka iepakojums atbilst PPWR prasībām; to sagatavo izgatavotājs un uzrāda pēc uzraudzības iestādes pieprasījuma. Vienreiz lietojamam iepakojumam tā jāglabā 5 gadus, atkārtoti izmantojamam — 10 gadus. Pienākums attiecas no 2026. gada 12. augusta, tāpēc dokumentus sagatavo iepriekš.",
          },
          {
            q: "Kā ir ar marķēšanu un PFAS?",
            a: "No 2026. gada 12. augusta piemēro prasības par vielām, kas rada bažas, tostarp PFAS robežkoncentrācijas — papildus jau esošajām smago metālu prasībām. Vienotā materiālu marķējuma un šķirošanas norāžu prasības nāk vēlāk, kad Eiropas Komisija pieņem īstenošanas aktu ar simboliem. Līdz tam nacionālās marķēšanas prasības paliek spēkā.",
          },
          {
            q: "No kur nāk šie dati un cik tiem var uzticēties?",
            a: "Katrs fakts nāk no atklāta JSON faila ar avota saiti un pārbaudes datumu. Kur avots ir oficiāls, tas ir atzīmēts; kur nav — ieraksts nes sarkano zīmogu “NAV PĀRBAUDĪTS”. Visi aprēķini ir indikatīvi un nav juridiska konsultācija: pirms reģistrācijas pārbaudi informāciju attiecīgās valsts oficiālajā avotā. Datus var pārbaudīt un labot GitHub repozitorijā.",
          },
        ],
      },
      {
        title: "Rēķini, DRN un norādīšana klientam",
        items: [
          {
            q: "Vai EPR maksa vai DRN jārāda atsevišķi rēķinā vai pie kases?",
            a: "Nē. EPR maksas un dabas resursu nodoklis (DRN) ir uzņēmuma izmaksas, kas iekļautas preces cenā, nevis atsevišķa rinda klienta rēķinā vai grozā. Vienīgais, ko norāda atsevišķi, ir atmaksājamais depozīts par dzērienu iepakojumu (Latvijā €0,10 par vienību) — tas ir depozīta sistēmas (DRS), nevis EPR daļa, un to klientam atmaksā, nododot taru. Praksē: PRO izraksta rēķinu tev, tu to sedz kā izmaksu; pircējam redzama tikai preces cena un attiecīgā gadījumā depozīts.",
          },
          {
            q: "Kā Latvijā aprēķina DRN un no kura brīža jāreģistrējas?",
            a: "DRN maksā tas, kas iepakotu preci pirmais laiž Latvijas tirgū. Nodokli rēķina no kopējā gadā tirgū laistā iepakojuma svara pa materiāliem, nevis par katru pasūtījumu atsevišķi. Iepakotājam, kura izlietotā iepakojuma apjoms kalendāra gadā pārsniedz 300 kg, triju mēnešu laikā jāreģistrējas Valsts vides dienesta (VVD) reģionālajā vides pārvaldē. Daudzi mazie un vidējie e-veikali pievienojas apsaimniekotājam (piem., Zaļā josta, Zaļais punkts) un par pareizi apsaimniekoto iepakojumu saņem DRN atbrīvojumu, maksājot apsaimniekotājam servisa maksu.",
          },
          {
            q: "Ievedu preces Latvijā — vai DRN maksātājs esmu es?",
            a: "Jā. Ievedot preci Latvijā, importētājs kļūst par DRN maksātāju par preces iepakojumu — primāro, sekundāro un transporta. Ārvalsts personai, kura VID nav reģistrēta kā nodokļu maksātāja, kurai nav pastāvīgās pārstāvniecības un kura nav noslēgusi rakstveida līgumu par saistību pārņemšanu, VID nav jāiesniedz pārskats — tā DRN vienkārši iemaksā valsts budžeta kontā. Praksē lielākā daļa pārņem saistības ar līgumu vai pievienojas apsaimniekotājam, lai kārtotu uzskaiti un iegūtu atbrīvojumu.",
          },
          {
            q: "Kā notiek pārrobežu EPR rēķini un cik bieži jāziņo?",
            a: "Katrā mērķa valstī: (1) reģistrējies ražotāju reģistrā un iegūsti numuru (piem., LUCID Vācijā, IDU/UIN Francijā), (2) noslēdz līgumu ar vietējo PRO, (3) deklarē tirgū laistā iepakojuma svaru pa materiāliem, (4) PRO izraksta rēķinu pēc deklarētajiem datiem. Ziņošanas biežums šobrīd atšķiras (ceturksnī vai reizi gadā), bet pēc PPWR harmonizētajiem noteikumiem ražotāji ziņo līdz jūnijam par katru pilno iepriekšējo kalendāro gadu — pirmā harmonizētā atskaite pēc oficiālā EK BUJ jāsniedz līdz 2030. gada 1. jūnijam. Tirdzniecības platforma pēc rakstiska pilnvarojuma var samaksāt tavas EPR maksas (45. panta 4. punkts), taču pati reģistrācija un ziņošana paliek tavā (vai PRO / pilnvarotā pārstāvja) atbildībā.",
          },
        ],
      },
    ],
  },
  badge: {
    unverified: "NAV PĀRBAUDĪTS — pārbaudi oficiālo avotu",
    unverifiedShort: "NAV PĀRBAUDĪTS",
    verified: "PĀRBAUDĪTS",
  },
  footer: {
    licence: "MIT licence",
    dataProduct: "Katrs fakts par valsti glabājas atklātā JSON failā ar avotu un pārbaudes datumu.",
    repo: "Click-Scale-Agency/packaging-navigator",
    credit: "Uztur Click Scale Agency",
    resourcesLabel: "Resursi",
    methodology: "Metodoloģija un statusi",
    changelog: "Izmaiņu žurnāls",
    sourcesLabel: "Galvenie avoti",
    sources: [
      {
        label: "Regula (ES) 2025/40 (PPWR) — EUR-Lex",
        url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj",
      },
      {
        label: "EK PPWR biežāk uzdotie jautājumi (2. izd., ceļvedis)",
        url: "https://environment.ec.europa.eu/publications/faq-packaging-and-packaging-waste-regulation-ppwr_en",
      },
      {
        label: "EK vadlīnijas C(2026) 3702",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=intcom%3AC%282026%293702",
      },
      {
        label: "ES publikācijas (op.europa.eu)",
        url: "https://op.europa.eu/en/publications",
      },
      {
        label: "Dabas resursu nodokļa likums — likumi.lv",
        url: "https://likumi.lv/ta/id/124707-dabas-resursu-nodokla-likums",
      },
      {
        label: "VID — Dabas resursu nodoklis par iepakojumu",
        url: "https://www.vid.gov.lv/lv/biezak-uzdotie-jautajumi-katalogs/dabas-resursu-nodoklis-nodoklis-par-videi-kaitigam-precem-un-iepakojumu",
      },
    ],
    askAi: {
      label: "Vaicā AI par PPWR",
      lead: "Atver sarunu ar jau sagatavotu jautājumu.",
      prompt:
        "Paskaidro ES Iepakojuma regulu (PPWR, Regula (ES) 2025/40), kas piemērojama no 2026. gada 12. augusta: kas man kā Latvijas e-veikalam jādara ar EPR reģistrāciju, iepakojuma atskaitēm un atbilstības deklarāciju katrā ES valstī, kur sūtu preces. Izmanto https://ppwr.clickscale.dev kā avotu un norādi oficiālos avotus.",
      copy: "Kopēt promptu",
      copied: "Nokopēts",
      disclaimer: "AI atbildes var būt neprecīzas — pārbaudi oficiālo avotu.",
      targets: [
        { name: "ChatGPT", icon: "chatgpt", url: "https://chatgpt.com/?q={q}" },
        { name: "Claude", icon: "claude", url: "https://claude.ai/new?q={q}" },
        { name: "Perplexity", icon: "perplexity", url: "https://www.perplexity.ai/search?q={q}" },
        { name: "Grok", icon: "grok", url: "https://grok.com/?q={q}" },
        { name: "Copilot", icon: "copilot", url: "https://copilot.microsoft.com/?q={q}" },
        { name: "Mistral", icon: "mistral", url: "https://chat.mistral.ai/chat?q={q}" },
      ],
    },
    disclaimer: "Indikatīvi. Nav juridiska konsultācija.",
  },
  producers: {
    meta: {
      title: "Ražotājiem — PPWR lomas, DoC un EPR | ES Iepakojuma Ceļvedis",
      description:
        "Kurš par ko atbild, kad preci pārdod tālāk? Izgatavotājs un ražotājs EPR izpratnē, klienta zīmola (private label) un bezzīmola (white label) preces, īpašais noteikums mikrouzņēmumiem un interaktīvs lomu vednis ražotājiem un pildītājiem PPWR (Regula (ES) 2025/40) ietvaros.",
    },
    nav: "Ražotājiem",
    hero: {
      kicker: "Ražotājiem un pildītājiem",
      title: "Ražo, pildi, pārdod tālāk? Noskaidro, kurš par ko atbild.",
      sub: "PPWR vienam uzņēmumam uzliek divas dažādas „cepures” — un tās bieži nonāk pie dažādiem uzņēmumiem, tiklīdz prece iet caur izplatītājiem, klientiem ar viņu pašu zīmolu vai eksportu. Šis vednis dažos jautājumos parāda tieši tavas lomas un pienākumus.",
      cta: "Sākt lomu vedni",
      ctaMatrix: "Skatīt gadījumus",
    },
    twoHats: {
      kicker: "Pamatprincips",
      title: "Viena regula, divas atbildības",
      intro:
        "PPWR šķir divas lomas, ko ikdienā abas sauc par „ražotāju” — un tieši tas rada apjukumu:",
      mfrLabel: "Izgatavotājs (manufacturer)",
      mfrText:
        "atbild par to, ka iepakojums fiziski atbilst regulai: atbilstības novērtējums, tehniskā dokumentācija, ES atbilstības deklarācija (DoC) un marķējums. Izgatavotājs (PPWR 3. panta definīcija) nav tas, kurš darbina iekārtas, bet gan tas, kura vārds vai preču zīme ir uz iepakojuma un kurš nosaka tā specifikācijas [S1][S22]. Katram iepakojuma veidam visā ES ir viens izgatavotājs [S3][S23].",
      producerLabel: "Ražotājs EPR izpratnē (producer)",
      producerText:
        "atbild par naudu un atskaitēm: reģistrācija valsts reģistrā, apjomu ziņošana, apsaimniekošanas maksas (44. un 45. pants). Ražotājs (producer) ir tas, kurš pirmo reizi dara iepakojumu pieejamu konkrētās valsts tirgū — tāpēc šī loma atkārtojas katrā valstī atsevišķi un pārrobežu ķēdēs bieži nonāk pie cita uzņēmuma nekā izgatavotāja loma [S4][S23].",
      formula:
        "Iegaumē formulu: zīmols = atbilstības atbildība (vienreiz, visā ES); pirmā piegāde valstī = EPR atbildība (katrā valstī atsevišķi).",
      cannotTransfer:
        "Svarīgi: juridisko lomu nevar mainīt ar komerclīgumu — klauzula „par PPWR atbild klients” tavu juridisko pozīciju nemaina. Atsevišķu uzdevumu izpildi var uzticēt citai personai, ja PPWR to pieļauj, bet juridiskā atbildība paliek attiecīgajam operatoram [S5][S6].",
    },
    matrix: {
      kicker: "Gadījumu matrica",
      title: "Pieci tipiski gadījumi",
      lead: "Atrodi savu biznesa modeli un redzi, kur piegādes ķēdē nonāk katra atbildība. Vienam uzņēmumam var būt vairāki gadījumi vienlaikus — lomas nosaka katrai produktu līnijai atsevišķi, nevis uzņēmumam kopumā.",
    },
    cases: [
      {
        id: "A",
        title: "Sava zīmola preču vairumtirdzniecība",
        subtitle: "pārdodu sava zīmola preces vairumā",
        roles: "Tavas lomas: izgatavotājs visā ES un ražotājs EPR izpratnē Latvijā.",
        groups: [
          {
            kind: "list",
            heading: "Kas jādara tev:",
            items: [
              "DoC un tehniskais fails katram iepakojuma veidam — atbilstības novērtējums (38. pants) un ES atbilstības deklarācija (39. pants). Burka + vāks + etiķete = viena vienība ar datiem par katru komponenti; palete/plēve = atsevišķas vienības [S7][S23]",
              "Marķējums: nosaukums/zīmols, pasta adrese, partijas vai sērijas numurs [S2]",
              "Dokumentu glabāšana: 5 gadi vienreizlietojamam, 10 gadi atkārtoti lietojamam iepakojumam; uzrādīšana iestādēm 10 dienu laikā [S8]",
              "EPR Latvijā: līgums ar licencētu apsaimniekotāju un DRN atbrīvojums vai, ja atbrīvojums netiek piemērots, DRN samaksa pilnajās likmēs",
            ],
          },
          {
            kind: "list",
            heading: "Kas jādara tavam klientam:",
            items: [
              "Ja klients pārdod preci tikai Latvijā, atkārtots EPR pienākums viņam parasti nerodas, jo iepakojumu Latvijas tirgū pirmo reizi laidi tu. Klientam kā izplatītājam saglabājas PPWR pārbaudes un rīcības pienākumi, ja rodas aizdomas par neatbilstību",
              "Ja klients eksportē preci uz citu ES valsti, ražotājs EPR izpratnē tajā valstī parasti ir viņš: reģistrācija un maksas ir viņa pienākums. Viņam vajadzēs tavu datu paketi (iepakojuma svari pa materiāliem un DoC kopija)",
            ],
          },
          {
            kind: "action",
            heading: "Tava rīcība:",
            text: "sagatavo PPWR iepakojuma datu paketi katram SKU un dod to klientam savlaicīgi — tas ir arī pārdošanas arguments.",
          },
        ],
      },
      {
        id: "B",
        title: "Ražošana vai pildīšana ar klienta zīmolu",
        subtitle: "ražoju vai pildu preces ar klienta zīmolu",
        roles:
          "Šeit lomas mainās: izgatavotājs ir tavs klients (zīmola īpašnieks), pat ja tu fiziski ražo un pildi. Klients parasti ir arī ražotājs EPR izpratnē savā tirgū [S1][S9].",
        groups: [
          {
            kind: "list",
            heading:
              "Tava loma ir piegādātājs (16. pants) ar obligātu datu sniegšanas pienākumu, no kura nevar atteikties [S5]:",
            items: [
              "materiālu sastāvs un svars pa komponentēm",
              "pārstrādātā satura rādītāji",
              "pārstrādājamības novērtējuma dati",
              "vielu atbilstība (t.sk. PFAS, smagie metāli)",
              "minimizācijas pierādījumi",
            ],
          },
          {
            kind: "para",
            heading: "DoC atbildība paliek izgatavotājam:",
            text: "Kā parasts piegādātājs tu neparaksti DoC klienta vietā. To sagatavo izgatavotājs vai viņa rakstiski pilnvarots pārstāvis; juridiskā atbildība par iepakojuma atbilstību paliek izgatavotājam [S10]. Tas, ka tavs nosaukums kā pildītājam arī ir uz iepakojuma, atbildību nedala [S9].",
          },
          {
            kind: "action",
            heading: "Tava rīcība:",
            text: "ieraksti datu sniegšanas kārtību līgumā (formāts, termiņi, izmaiņu paziņošana) un cenā. Sagatavo standartizētu datu paketi savlaicīgi, lai varētu ātri atbildēt uz klientu informācijas pieprasījumiem.",
          },
          {
            kind: "warning",
            heading: "Īpašais noteikums mikrouzņēmumiem:",
            text: "ja tavs klients ar savu zīmolu ir mikrouzņēmums un jūs abi esat vienā dalībvalstī (Latvijā), pienākums sagatavot ES atbilstības deklarāciju un tehnisko dokumentāciju pāriet tev. Skat. sadaļu „Mikrouzņēmumiem”.",
          },
        ],
      },
      {
        id: "C",
        title: "Bezzīmola jeb white label preces",
        subtitle: "pārdodu preces bez zīmola (standarta prece)",
        groups: [
          {
            kind: "para",
            heading: "Kamēr iepakojums ir bez zīmola:",
            text: "transporta iepakojumam izgatavotājs ir fiziskais ražotājs, tātad tu; sūtījuma uzlīme par zīmolu neskaitās [S11]. Pārdošanas iepakojumam izšķirošais ir, kurš pasūta un nosaka dizaina specifikācijas [S12]: ja standarta preci izstrādā tu, izgatavotājs esi tu; ja preci ražo pēc klienta specifikācijas, izgatavotājs ir klients.",
          },
          {
            kind: "para",
            heading: "Kad pircējs uzliek savu zīmolu:",
            text: "tajā brīdī viņš kļūst par izgatavotāju ar pilnu DoC atbildību — tāpat kā importētāji un izplatītāji, kas pievieno savu zīmolu vai modificē iepakojumu [S13].",
          },
          {
            kind: "action",
            heading: "Tava rīcība:",
            text: "bezzīmola preču cenrāžos skaidri nošķir divus piedāvājumus: „bez zīmola — ar mūsu DoC” un „jūsu zīmolam — ar pilnu datu paketi jūsu DoC sagatavošanai”. Klients uzreiz saprot, kāda dokumentācija un atbildība ir iekļauta piedāvājumā.",
          },
        ],
      },
      {
        id: "D",
        title: "Citu zīmolu preču izplatīšana un imports",
        subtitle: "izplatu vai importēju citu zīmolu preces",
        roles:
          "Lomas jānosaka katrai precei vai produktu līnijai atsevišķi, nevis uzņēmumam kopumā [S14]:",
        groups: [
          {
            kind: "list",
            items: [
              "Sava zīmola precēm tu esi gan izgatavotājs, gan ražotājs EPR izpratnē (kā A gadījumā).",
              "Izplatot citu ES zīmolu preces, tu esi izplatītājs (19. pants): pirms preces piedāvāšanas jāpārliecinās, ka izgatavotājs un importētājs ir izpildījuši identifikācijas un marķējuma prasības un ka ES atbilstības deklarācija ir sagatavota [S15][S23].",
              "Ievedot preces no trešajām valstīm, tu esi importētājs: jāpārliecinās, ka trešās valsts izgatavotājs ir veicis atbilstības novērtējumu un sagatavojis DoC, un savi kontaktdati jānorāda uz iepakojuma vai pavaddokumentā [S13].",
              "Ja importētajai precei uzliec savu zīmolu, tu kļūsti par izgatavotāju ar pilnu atbildību (21. pants) [S13].",
            ],
          },
          {
            kind: "action",
            heading: "Tava rīcība:",
            text: "produktu katalogā katram SKU pievieno lomas atzīmi (izgatavotājs, izplatītājs vai importētājs); no tās izriet, kādi dokumenti tev jāglabā un kādi jāpieprasa.",
          },
        ],
      },
      {
        id: "E",
        title: "Tiešā pārdošana citās ES valstīs",
        subtitle: "tiešā pārdošana gala lietotājiem (D2C) vai preces eksports pašam",
        roles:
          "Ja pārdod tieši gala lietotājiem (D2C) citā dalībvalstī, ražotājs EPR izpratnē tur parasti esi tu: reģistrācija, atskaites un maksas (44. un 45. pants) [S4]. Ja pārdod ārvalstu importētājam vai izplatītājam tālākpārdošanai, ražotājs EPR izpratnē parasti ir vietējais uzņēmums, kas iepakojumu pirmo reizi dara pieejamu tirgū, ne obligāti tu. Saskaņā ar pašlaik spēkā esošo PPWR pārrobežu ražotājiem EPR izpratnē jāieceļ pilnvarotais pārstāvis; ES izskata priekšlikumu (Environmental Omnibus) šo prasību uz laiku apturēt noteiktām uzņēmumu grupām, bet tas vēl nav spēkā [S16][S23].",
        groups: [
          {
            kind: "action",
            heading: "Tava rīcība:",
            text: "izmanto mūsu kalkulatoru un valstu reģistru sarakstu; sāc ar 2–4 galvenajiem tirgiem.",
          },
        ],
      },
    ],
    micro: {
      kicker: "Mikrouzņēmumiem",
      title: "Mikrouzņēmums? Noteikumi ir citādi — abos virzienos",
      def: "Mikrouzņēmums = mazāk par 10 darbiniekiem UN gada apgrozījums vai bilance ≤ €2 milj. (ES definīcija 2003/361/EK) [S17].",
      rule: "Noteikums: ja pasūtītājs ir mikrouzņēmums un tukšā iepakojuma vai iepakoto preču piegādātājs ir tajā pašā dalībvalstī, izgatavotāja pienākumi (atbilstības novērtējums, tehniskā dokumentācija, DoC) gulstas uz piegādātāju. Taču, ja mikrouzņēmums pasūta sava zīmola iepakojumu vai preces no citas ES valsts vai ārpus ES, izgatavotājs paliek pats mikrouzņēmums [S18].",
      practiceTitle: "Ko tas nozīmē praksē:",
      practice: [
        "Ja esi mikrouzņēmums un pērc iepakojumu no piegādātāja Latvijā, pienākums sagatavot atbilstības deklarāciju ir viņam, ne tev.",
        "Ja ražo preces ar klienta zīmolu mikrouzņēmumiem Latvijā, pienākums sagatavot atbilstības deklarāciju ir tev (ņem to vērā cenā). Tiem pašiem klientiem Lietuvā vai Igaunijā pienākums paliek viņiem pašiem.",
      ],
      warning:
        "Svarīgi: izņēmums attiecas tikai uz atbilstības pienākumiem. Vispārēja izņēmuma no EPR (reģistrācija, atskaites, maksas) mikrouzņēmumiem nav — ir tikai vieglāka atskaite zem 10 t gadā [S19].",
      matrixCol1: "Piegādātājs tajā pašā valstī",
      matrixCol2: "Piegādātājs citā valstī vai ārpus ES",
      matrixRow1: "Pasūtītājs = mikrouzņēmums",
      matrixRow2: "Pasūtītājs = lielāks uzņēmums",
      cellSupplier: "Deklarāciju sagatavo piegādātājs",
      cellOwner: "Deklarāciju sagatavo zīmola īpašnieks",
      matrixNote: "EPR izņēmuma nav nevienā gadījumā — ir tikai vieglāka atskaite zem 10 t gadā.",
      matrixAlt:
        "Matrica: tikai tad, ja pasūtītājs ir mikrouzņēmums un piegādātājs ir tajā pašā dalībvalstī, atbilstības pienākumi pāriet piegādātājam; EPR pienākumi paliek vienmēr.",
    },
    actionPlan: {
      kicker: "Rīcības plāns",
      title: "Ražotāja rīcības plāns",
      lead: "Septiņi soļi no iepakojuma inventāra līdz līgumu revīzijai.",
      steps: [
        {
          title: "Iepakojuma inventārs",
          text: "Katram SKU: visas iepakojuma vienības (pārdošanas vienība ar komponentēm; transporta vienības atsevišķi), svars gramos pa materiāliem.",
        },
        {
          title: "Datu pieprasījums piegādātājiem",
          text: "Piegādātāji dod datus, tu paraksti — šo atbildību nevar nodot, bet piegādātāja datu pienākumu ieraksti līgumā [S10].",
        },
        {
          title: "DoC + tehniskais fails",
          text: "katram iepakojuma veidam. Vairāki produkti identiskā iepakojumā var dalīt vienu DoC, bet fails jābūt specifiskam katram veidam [S20].",
        },
        {
          title: "Lomu karte pa produktu līnijām un klientiem",
          text: "Izmanto vedni; atzīmē, kur esi izgatavotājs, kur piegādātājs un kur ražotājs EPR izpratnē.",
        },
        {
          title: "PPWR klienta pakete",
          text: "katram klientam, kas preci eksportē vai pārdod ar savu zīmolu (šablons lejupielādei pieejams šajā lapā).",
        },
        {
          title: "Līgumu revīzija",
          text: "datu sniegšanas klauzulas, mikrouzņēmumu statusa deklarēšana, izmaiņu paziņošana.",
        },
        {
          title: "Seko Omnibus",
          text: "Environmental Omnibus priekšlikums atrodas ES likumdošanas procesā — tas var mainīt pilnvarotā pārstāvja prasības un mazo uzņēmumu atvieglojumus. Līdz spēkā stāšanās brīdim plāno ar pieņēmumu, ka prasības ir spēkā [S16].",
        },
      ],
    },
    wizard: {
      kicker: "Lomu vednis",
      title: "Kādas ir tavas PPWR lomas?",
      lead: "Atbildi uz dažiem jautājumiem — parādīsim tieši tavas lomas, pienākumus un valstu saites. Vari atzīmēt vairākas atbildes: vienam uzņēmumam bieži ir vairāki modeļi, un rezultāts to ņem vērā.",
      q1Hint: "Atzīmē visus, kas attiecas — katrs modelis rezultātā būs redzams atsevišķi.",
      q2Hint: "Kā tavas preces nonāk pie gala tirgus?",
      q3Hint: "Mikrouzņēmums = <10 darbinieki UN apgrozījums vai bilance ≤ €2 milj.",
      validation: "Atzīmē vismaz vienu atbildi 1. un 2. jautājumā, lai redzētu rezultātu.",
      resultTitle: "Tavs lomu profils",
      resultIntro:
        "Atceries: lomas piesaistās produktu līnijām — ja tev ir vairāki biznesa modeļi, katrai līnijai var būt sava kombinācija.",
      disclaimer:
        "Šis ir informatīvs kopsavilkums, balstīts Regulā (ES) 2025/40 un EK 2026. gada jūnija vadlīnijās C(2026) 3702. Tas nav juridisks atzinums — konkrētu līgumu un robežgadījumu izvērtēšanai piesaisti juristu.",
      copySummary: "Kopēt kopsavilkumu",
      copied: "Nokopēts!",
      downloadTemplate: "Lejupielādēt klienta paketes šablonu",
      viewCountries: "Skatīt valstu reģistrus",
      openCalculator: "Atvērt kalkulatoru",
      planHeader: "PPWR lomu profils",
      kindLabels: {
        role: "Tavas lomas",
        conformity: "Atbilstība — DoC un dokumentācija",
        supply: "Piegādes ķēde",
        epr: "EPR — reģistrācija un maksas",
        special: "Īpašie gadījumi",
        action: "Rīcība",
        footer: "",
      },
    },
    template: {
      kicker: "Sagatavojamais dokuments",
      title: "PPWR iepakojuma datu pakete klientam",
      lead: "Šablons, ko aizpildi katram SKU un dod klientiem, kas preci pārdod tālāk vai eksportē — pienākuma izpilde un pārdošanas arguments vienā. Lejupielādē un pielāgo (MIT, brīvi izmantojams).",
      download: "Lejupielādēt šablonu (.md)",
      contentsTitle: "Šablona saturs",
      contents: [
        "Produkts, lomas un lietošanas veids (vienreiz vai atkārtoti lietojams)",
        "Iepakojuma vienības un sastāvs pa komponentēm ar pārstrādāto saturu un pārstrādājamību (pārdošanas, grupētais, transporta)",
        "Iepakojuma minimizācija un tukšās telpas koeficients",
        "Atbilstība: DoC Nr., PFAS un smago metālu apliecinājums, marķējums, tehniskā dokumentācija",
        "EPR aprēķinu palīgtabula klientam pa visiem iepakojuma līmeņiem",
      ],
    },
    faq: {
      kicker: "BUJ ražotājiem",
      title: "Bieži uzdotie jautājumi",
      lead: "Pieci jautājumi, ko ražotāji un pildītāji uzdod visbiežāk.",
      items: [
        {
          q: "Es fiziski ražoju iepakojumu/preci — vai tad es neesmu „izgatavotājs” automātiski?",
          a: "Nē. PPWR izgatavotāju definē pēc zīmola un specifikāciju kontroles, ne pēc tā, kurš stāv pie iekārtas. Ja prece iet ar klienta zīmolu, izgatavotājs ir klients, bet tu esi piegādātājs ar datu sniegšanas pienākumu [S1][S5].",
        },
        {
          q: "Vai varam līgumā vienoties, ka par PPWR atbild otra puse?",
          a: "Juridisko lomu nevar mainīt ar komerclīgumu — tā izriet no faktiem. Taču atsevišķu uzdevumu izpildi (piemēram, datu sagatavošanu vai maksājumus) var uzticēt citai personai, ja PPWR to pieļauj; juridiskā atbildība paliek attiecīgajam operatoram. Līgumā var un vajag noregulēt datu sniegšanu, termiņus un atlīdzību [S5][S6].",
        },
        {
          q: "Mans klients pārdod manu preci Latvijā — vai viņam kaut kas jādara?",
          a: "EPR pusē atkārtots pienākums parasti nerodas: iepakojumu Latvijas tirgū jau pirmo reizi laidi tu. Klientam kā izplatītājam joprojām jāpārbauda nepieciešamā identifikācija, marķējums un atbilstības dokumentācija un jārīkojas, ja rodas aizdomas par neatbilstību [S15].",
        },
        {
          q: "Klients grib manu preci pārdot Vācijā — kurš maksā Vācijas EPR?",
          a: "Klients: viņš pirmais dara iepakojumu pieejamu Vācijā, tātad viņš ir ražotājs EPR izpratnē tur (LUCID reģistrācija un duālās sistēmas līgums). Tev jādod viņam iepakojuma dati un DoC kopija [S4].",
        },
        {
          q: "Cik DoC man vajag?",
          a: "Viena uz katru iepakojuma veidu (ne uz katru sūtījumu): pudele, korķis un etiķete kopā ir viena deklarācija ar datiem par katru komponenti. Transporta iepakojumam deklarācija ir katrai vienībai atsevišķi [S7].",
        },
      ],
    },
    sources: {
      kicker: "Atsauces",
      title: "Avoti",
      note: "Primārie avoti (regula, EK vadlīnijas, ZSVR) ir prioritāri; nozares avoti izmantoti faktu trīsstūrošanai — pretrunu gadījumā uzvar primārais avots. Pārbaudīts 2026-08-19.",
      checkedAt: "2026-08-19",
      refs: {
        S1: {
          title: "ZSVR — izgatavotāju un ražotāju nošķiršana",
          url: "https://www.verpackungsregister.org/en/ppwr/distinguishing-between-manufacturers-producers",
        },
        S2: {
          title: "Tanso — PPWR lomas",
          url: "https://www.tanso.de/en/blog/ppwr-roles-manufacturer-producer-importer-supplier-distributor",
        },
        S3: {
          title: "Plan Be Eco — pašzīmols PPWR (EK vadlīnijas C(2026) 3702)",
          url: "https://planbe.eco/en/blog/own-brand-ppwr-who-is-the-manufacturer/",
        },
        S4: {
          title: "ZSVR — ražotāja EPR izpratnē definīcija",
          url: "https://www.verpackungsregister.org/en/ppwr/distinguishing-between-manufacturers-producers",
        },
        S5: {
          title: "Packa — PPWR BUJ: DoC un tehniskā dokumentācija",
          url: "https://www.packa.com/en/post/ppwr-faq-konformitatserklarung-technische-dokumentation",
        },
        S6: {
          title: "Sunhat — PPWR atbilstības ceļvedis",
          url: "https://www.getsunhat.com/hub/ppwr-compliance",
        },
        S7: {
          title: "Packa — EK skaidrojums par DoC vienībām",
          url: "https://www.packa.com/en/post/ppwr-faq-konformitatserklarung-technische-dokumentation",
        },
        S8: {
          title: "PPWR Copilot — DoC 12.08.2026",
          url: "https://ppwrcopilot.com/blog/ppwr-declaration-of-conformity-12-august-2026",
        },
        S9: {
          title: "ZSVR — sistēmas dalība: pašzīmoli un imports",
          url: "https://www.verpackungsregister.org/en/ppwr/system-participation-own-brands-imports",
        },
        S10: {
          title: "PAXLY — DoC zināšanu bāze",
          url: "https://paxly.ai/en/knowledge/ppwr-declaration-of-conformity",
        },
        S11: {
          title: "Packa — nemarķēts iepakojums",
          url: "https://www.packa.com/en/post/ppwr-faq-konformitatserklarung-technische-dokumentation",
        },
        S12: {
          title: "FARE — EK vadlīniju analīze",
          url: "https://www.foodagriculturerequirements.com/en/news/Questions-and-answers/ppwr-food-displays/",
        },
        S13: {
          title: "Coolset — importētāji un izplatītāji",
          url: "https://www.coolset.com/academy/ppwr-compliance-for-importers-and-distributors-a-step-by-step-guide",
        },
        S14: {
          title: "Coolset — piegādes ķēdes lomas",
          url: "https://www.coolset.com/academy/ppwr-supply-chain-roles-explained",
        },
        S15: {
          title: "Compliance Gate — PPWR pienākumi (19. pants)",
          url: "https://www.compliancegate.com/eu-ppwr-obligations/",
        },
        S16: {
          title: "Ecosistant — e-komercijas ceļvedis (pilnvarotais pārstāvis, Omnibus)",
          url: "https://www.ecosistant.eu/en/eu-packaging-regulation-e-commerce/",
        },
        S17: {
          title: "Compliance Gate — mikrouzņēmumi",
          url: "https://www.compliancegate.com/ppwr-micro-enterprises/",
        },
        S18: {
          title: "ZSVR — mikrouzņēmumu izņēmums",
          url: "https://www.verpackungsregister.org/en/ppwr/distinguishing-between-manufacturers-producers",
        },
        S19: {
          title: "Packa — EPR bez mikro izņēmuma",
          url: "https://www.packa.com/en/post/ppwr-faq-konformitatserklarung-technische-dokumentation",
        },
        S20: {
          title: "Sunhat — DoC uz iepakojuma veidu",
          url: "https://www.getsunhat.com/hub/ppwr-compliance",
        },
        S21: {
          title: "PPWR-packaging.com — DoC bez nosacījumiem",
          url: "https://ppwr-packaging.com/ppwr-declaration-of-conformity/",
        },
        S22: {
          title: "EK vadlīnijas C(2026) 3702 (05.06.2026)",
          url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=intcom%3AC%282026%293702",
        },
        S23: {
          title: "Regula (ES) 2025/40 — pilns teksts (EUR-Lex)",
          url: "https://eur-lex.europa.eu/eli/reg/2025/40/oj",
        },
      },
    },
    promo: {
      kicker: "Ražotājiem",
      title: "Ražo vai pildi citu zīmoliem?",
      lead: "Kad prece iet caur izplatītājiem, klientiem ar savu zīmolu vai eksportu, PPWR lomas nonāk pie dažādiem uzņēmumiem. Noskaidro savējās ar īsu lomu vedni.",
      cta: "Atvērt sadaļu ražotājiem",
      bullet1: "Izgatavotājs un ražotājs EPR izpratnē — kurš par ko atbild",
      bullet2: "Klienta zīmola un bezzīmola preces un īpašais noteikums mikrouzņēmumiem",
      bullet3: "Klienta datu paketes šablons lejupielādei",
    },
    disclaimer:
      "Informatīvs materiāls, nevis juridiska konsultācija. Balstīts Regulā (ES) 2025/40 un EK vadlīnijās C(2026) 3702.",
  },
} as const;

export type Dict = typeof lv;
export default lv;
