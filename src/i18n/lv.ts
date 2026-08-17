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
    guide: "Ceļvedis",
    calculator: "Kalkulators",
    countries: "Valstis",
    numbers: "Numuri",
    timeline: "Laika līnija",
    video: "Video",
    faq: "BUJ",
    repo: "GitHub",
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
    lead: "Astoņpadsmit jautājumi, ko e-veikali uzdod visbiežāk. Atbildes balstās uz šajā lapā apkopotajiem datiem un regulas tekstu.",
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
    disclaimer: "Indikatīvi. Nav juridiska konsultācija.",
  },
} as const;

export type Dict = typeof lv;
export default lv;
