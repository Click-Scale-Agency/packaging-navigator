import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import lv from "@/i18n/lv";
import { countries, MATERIALS, type CountryData, type MaterialKey } from "@/data";
import { computeCountryCost, kgPerYearFrom } from "@/lib/fees";
import { PRESS_SPRING, Press, SectionHead, UnverifiedStamp } from "@/components/primitives";
import { cn } from "@/lib/utils";

type Channel = "own" | "marketplace" | "b2b";
type WhoFirst = "you" | "importer" | "platform";
type Level = "required" | "conditional" | "info";
type PackLevel = "sales" | "grouped" | "transport" | "ecom";
type Audience = "household" | "commercial";
type Reuse = "single" | "reusable";

interface Task {
  key: string;
  label: string;
  detail?: string | undefined;
  url?: string | undefined;
  level: Level;
}

interface Classification {
  levels: PackLevel[];
  audience: Audience;
  reuse: Reuse;
  hasPlastic: boolean;
  kgPerYear: Record<MaterialKey, number>;
  totalKg: number;
}

interface Plan {
  country: CountryData;
  obligationYou: boolean;
  obligationNote: string;
  tasks: Task[];
  evidence: string[];
  notes: string[];
  flags: string[];
  costLabel: string | null;
  costPartial: boolean;
}

const DEFAULT_SELECTION = ["DE", "FR", "ES"];

interface ScenarioState {
  selected: string[];
  channel: Channel;
  who: WhoFirst;
  weights: Record<MaterialKey, string>;
  shipments: string;
  levels: PackLevel[];
  audience: Audience;
  reuse: Reuse;
}

interface Scenario {
  id: string;
  title: string;
  desc: string;
  state: ScenarioState;
}

const W = (paper = "", plastic = "", glass = "", metal = "", wood = "", composite = "") =>
  ({ paper, plastic, glass, metal, wood, composite }) as Record<MaterialKey, string>;

/** Ready-made profiles for the Baltic / LV-first target audience (spec §14).
 * Each pre-fills every step; the user then tweaks. */
const SCENARIOS: Scenario[] = [
  {
    id: "lv-de-fr",
    title: "LV e-veikals → DE + FR",
    desc: "Savs interneta veikals, kas sūta tieši pircējiem uz Vāciju un Franciju.",
    state: {
      selected: ["DE", "FR"],
      channel: "own",
      who: "you",
      weights: W("120", "35"),
      shipments: "2000",
      levels: ["sales", "ecom"],
      audience: "household",
      reuse: "single",
    },
  },
  {
    id: "amazon-de",
    title: "LV pārdevējs Amazon → DE",
    desc: "Pārdošana caur tirdzniecības platformu Vācijas tirgū.",
    state: {
      selected: ["DE"],
      channel: "marketplace",
      who: "you",
      weights: W("80", "40"),
      shipments: "3000",
      levels: ["sales", "ecom"],
      audience: "household",
      reuse: "single",
    },
  },
  {
    id: "baltics",
    title: "Baltijas e-veikals → LV + LT + EE",
    desc: "Reģionāls e-veikals, kas sūta uz visām trim Baltijas valstīm.",
    state: {
      selected: ["LV", "LT", "EE"],
      channel: "own",
      who: "you",
      weights: W("100", "30"),
      shipments: "1500",
      levels: ["sales", "ecom"],
      audience: "household",
      reuse: "single",
    },
  },
  {
    id: "eu-top",
    title: "Populārākie ES tirgi",
    desc: "Lielāks e-veikals: DE, FR, ES, IT, NL, BE.",
    state: {
      selected: ["DE", "FR", "ES", "IT", "NL", "BE"],
      channel: "own",
      who: "you",
      weights: W("140", "45", "", "", "20"),
      shipments: "5000",
      levels: ["sales", "grouped", "ecom"],
      audience: "household",
      reuse: "single",
    },
  },
  {
    id: "importer",
    title: "Ievešana caur vietējo importētāju",
    desc: "Pārdod vietējam izplatītājam, kas preci laiž tirgū tālāk (DE).",
    state: {
      selected: ["DE"],
      channel: "b2b",
      who: "importer",
      weights: W("120", "35"),
      shipments: "2000",
      levels: ["sales", "grouped", "transport"],
      audience: "commercial",
      reuse: "single",
    },
  },
];

function proNames(country: CountryData): string {
  const names = country.pro.map((p) => p.name);
  return names.length ? names.join(", ") : "";
}

/** Derive the concrete, per-country action plan from the canonical data + the
 * four answers. Everything here reads from /data via the ./data bridge —
 * no country facts are hardcoded. */
function buildPlan(
  country: CountryData,
  channel: Channel,
  who: WhoFirst,
  cls: Classification,
): Plan {
  const tasks: Task[] = [];
  const evidence: string[] = [];
  const notes: string[] = [];
  const flags: string[] = [];

  const reg = country.register;
  const membershipRequired = country.pro.some((p) => p.membershipRequired);
  const names = proNames(country);

  const obligationYou = who === "you";
  const obligationNote =
    who === "you"
      ? lv.guide.obligationYouNote
      : who === "importer"
        ? lv.guide.obligationImporterNote
        : lv.guide.obligationPlatformNote;

  if (obligationYou) {
    // 1 — register
    if (reg.exists) {
      tasks.push({
        key: "register",
        label: lv.guide.taskRegister(reg.name ?? country.name),
        detail: reg.numberFormat ? lv.guide.taskRegisterFormat(reg.numberFormat) : undefined,
        url: reg.url ?? undefined,
        level: "required",
      });
      evidence.push(lv.guide.evidenceRegNumber);
    } else {
      tasks.push({ key: "no-register", label: lv.guide.taskNoRegister, level: "info" });
    }

    // 2 — authorised representative (Art. 45)
    if (reg.arRequired === true) {
      tasks.push({
        key: "ar",
        label: lv.guide.taskAr,
        detail: lv.guide.taskArDetail,
        level: "required",
      });
      evidence.push(lv.guide.evidenceArMandate);
    }

    // 3 — PRO contract
    if (country.pro.length) {
      tasks.push({
        key: "pro",
        label: lv.guide.taskPro(names),
        detail: membershipRequired ? lv.guide.taskProMandatory : lv.guide.taskProOptional,
        url: country.pro[0]?.url ?? undefined,
        level: membershipRequired ? "required" : "conditional",
      });
      evidence.push(lv.guide.evidenceProContract);
    }

    // 4 — reporting (per-country; never assert an unverified deadline as fact)
    const rep = country.reporting;
    if (rep?.frequency) {
      const unverified = rep.provenance != null && rep.provenance.status !== "official";
      const detailParts = [rep.frequency];
      if (rep.deadlines.length) detailParts.push(rep.deadlines.join("; "));
      if (unverified) detailParts.push(`(${lv.guide.taskReportCheck})`);
      tasks.push({
        key: "report",
        label: lv.guide.taskReport,
        detail: detailParts.join(" — "),
        level: "required",
      });
    } else {
      tasks.push({
        key: "report",
        label: lv.guide.taskReport,
        detail: lv.guide.taskReportUnknown,
        level: "required",
      });
    }
    evidence.push(lv.guide.evidenceDeclaration);

    // 5 — number on invoices
    if (reg.numberOnInvoices === true) {
      tasks.push({ key: "invoice", label: lv.guide.taskInvoice, level: "required" });
    }

    // 6 — marketplace number entry
    if (channel === "marketplace") {
      tasks.push({
        key: "mp-number",
        label: lv.guide.taskMarketplaceNumber,
        detail: lv.guide.taskMarketplaceNumberDetail,
        level: "required",
      });
    }

    // 7 — extra taxes
    for (const tax of country.extraTaxes) {
      tasks.push({
        key: `tax-${tax.name}`,
        label: lv.guide.taskTax(tax.name),
        url: tax.url ?? undefined,
        level: "conditional",
      });
    }

    // 8 — DRS (beverages only)
    if (country.drs?.active === true) {
      tasks.push({
        key: "drs",
        label: lv.guide.taskDrs(country.drs.operator ?? "", country.drs.deposit ?? ""),
        url: country.drs.url ?? undefined,
        level: "conditional",
      });
    }
  } else if (who === "importer") {
    tasks.push({ key: "imp-number", label: lv.guide.taskImporterNumber, level: "required" });
    tasks.push({ key: "imp-contract", label: lv.guide.taskImporterContract, level: "required" });
    evidence.push(lv.guide.evidenceImporterNumber);
  } else {
    tasks.push({ key: "plat-confirm", label: lv.guide.taskPlatformConfirm, level: "required" });
    evidence.push(lv.guide.evidenceImporterNumber);
    tasks.push({ key: "plat-report", label: lv.guide.taskReport, level: "conditional" });
  }

  // Classification-driven context notes (informational).
  if (cls.levels.includes("ecom") || cls.levels.includes("transport"))
    notes.push(lv.guide.noteEcom);
  if (cls.audience === "commercial") notes.push(lv.guide.noteCommercial);
  if (cls.reuse === "reusable") notes.push(lv.guide.noteReusable);
  // Only when this country actually levies a plastic-specific tax (e.g. ES).
  if (cls.hasPlastic && country.extraTaxes.some((t) => t.material === "plastic"))
    notes.push(lv.guide.notePlastic);

  // Indicative annual cost from the shared fee engine (same as the calculator).
  const cost = computeCountryCost(country, cls.kgPerYear, cls.totalKg);
  const costPartial =
    cost.coverage === "partial" || (cost.coverage === "none" && cost.unpricedMaterials.length > 0);
  const costLabel = !cost.known
    ? null
    : costPartial
      ? lv.guide.costPartialChip(cost.total.toFixed(0))
      : lv.guide.costChip(cost.total.toFixed(0));

  // Flags — always honest about verification + channel nuance.
  if (!country.verified) flags.push(lv.guide.flagUnverified(country.code));
  if (cost.conditionalTaxes.length)
    flags.push(lv.guide.condTaxNote(cost.conditionalTaxes.join(", ")));
  if (channel === "marketplace") flags.push(lv.guide.flagMarketplace);
  if (channel === "b2b") flags.push(lv.guide.flagB2b);
  flags.push(lv.guide.flagWhoFirst);

  return {
    country,
    obligationYou,
    obligationNote,
    tasks,
    evidence,
    notes,
    flags,
    costLabel,
    costPartial,
  };
}

const LEVEL_STYLE: Record<Level, string> = {
  required: "border-primary text-primary",
  conditional: "border-border-strong text-foreground",
  info: "border-border text-muted-foreground",
};

function levelText(level: Level): string {
  return level === "required"
    ? lv.guide.levelRequired
    : level === "conditional"
      ? lv.guide.levelConditional
      : lv.guide.levelInfo;
}

function OptionCard({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "block border-2 px-4 py-3 text-left transition-all active:scale-[0.98]",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border-strong hover:border-primary",
      )}
    >
      <span className="data-value block text-sm font-bold">{title}</span>
      <span
        className={cn(
          "mt-1 block text-xs leading-snug",
          active ? "text-background/80" : "text-muted-foreground",
        )}
      >
        {desc}
      </span>
    </button>
  );
}

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "data-value border px-3 py-1.5 text-xs uppercase tracking-[0.08em] transition-all active:scale-95",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border-strong text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}

function StepHead({ label, title, hint }: { label: string; title: string; hint: string }) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="form-label">{label}</span>
        <span className="h-px flex-1 border-t border-dashed border-border-strong" />
      </div>
      <h3 className="mt-4 text-xl md:text-2xl">{title}</h3>
      <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{hint}</p>
    </>
  );
}

export function ActionGuide() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTION);
  const [channel, setChannel] = useState<Channel>("own");
  const [who, setWho] = useState<WhoFirst>("you");

  // Step 4 — packaging classification.
  const [weights, setWeights] = useState<Record<MaterialKey, string>>({
    paper: "120",
    plastic: "35",
    glass: "",
    metal: "",
    wood: "",
    composite: "",
  });
  const [shipments, setShipments] = useState("2000");
  const [levels, setLevels] = useState<PackLevel[]>(["sales", "ecom"]);
  const [audience, setAudience] = useState<Audience>("household");
  const [reuse, setReuse] = useState<Reuse>("single");
  const [copied, setCopied] = useState(false);

  const applyScenario = (s: Scenario) => {
    setSelected(s.state.selected);
    setChannel(s.state.channel);
    setWho(s.state.who);
    setWeights(s.state.weights);
    setShipments(s.state.shipments);
    setLevels(s.state.levels);
    setAudience(s.state.audience);
    setReuse(s.state.reuse);
  };

  const toggle = (code: string) =>
    setSelected((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));

  const toggleLevel = (l: PackLevel) =>
    setLevels((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const kgPerYear = useMemo(() => kgPerYearFrom(weights, shipments), [weights, shipments]);
  const totalKg = MATERIALS.reduce((sum, m) => sum + kgPerYear[m], 0);
  const hasPlastic = (Number(weights.plastic) || 0) > 0;

  const cls: Classification = useMemo(
    () => ({ levels, audience, reuse, hasPlastic, kgPerYear, totalKg }),
    [levels, audience, reuse, hasPlastic, kgPerYear, totalKg],
  );

  const plans = useMemo(
    () =>
      countries
        .filter((c) => selected.includes(c.code))
        .map((c) => buildPlan(c, channel, who, cls)),
    [selected, channel, who, cls],
  );

  // Deep-link payload for the full calculator.
  const encodedWeights = MATERIALS.filter((m) => (Number(weights[m]) || 0) > 0)
    .map((m) => `${m}:${weights[m]}`)
    .join(",");

  const channelLabel =
    channel === "own"
      ? lv.guide.channelOwn
      : channel === "marketplace"
        ? lv.guide.channelMarketplace
        : lv.guide.channelB2b;
  const whoLabel =
    who === "you"
      ? lv.guide.whoYou
      : who === "importer"
        ? lv.guide.whoImporter
        : lv.guide.whoPlatform;

  const buildPlanText = () => {
    const lines: string[] = [
      lv.guide.planHeader,
      lv.guide.planSummaryLine(plans.length, totalKg.toFixed(1)),
      `${lv.guide.planChannelLabel}: ${channelLabel} · ${lv.guide.planWhoLabel}: ${whoLabel}`,
      "",
    ];
    for (const p of plans) {
      lines.push(
        `=== ${p.country.code} ${p.country.name} — ${p.costLabel ?? lv.guide.costUnknown}`,
      );
      lines.push(
        `${p.obligationYou ? lv.guide.obligationYou : lv.guide.obligationOther}: ${p.obligationNote}`,
      );
      lines.push(`${lv.guide.tasksTitle}:`);
      for (const t of p.tasks) {
        lines.push(
          `  [ ] (${levelText(t.level)}) ${t.label}${t.detail ? ` — ${t.detail}` : ""}${t.url ? ` ${t.url}` : ""}`,
        );
      }
      if (p.notes.length) {
        for (const n of p.notes) lines.push(`  • ${n}`);
      }
      if (p.evidence.length) {
        lines.push(`${lv.guide.evidenceTitle}: ${p.evidence.join("; ")}`);
      }
      if (p.flags.length) {
        lines.push(`${lv.guide.flagsTitle}:`);
        for (const f of p.flags) lines.push(`  ! ${f}`);
      }
      lines.push("");
    }
    lines.push(lv.guide.disclaimer);
    return lines.join("\n");
  };

  const handleCopyPlan = async () => {
    try {
      await navigator.clipboard.writeText(buildPlanText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="celvedis"
          kicker={lv.guide.kicker}
          title={lv.guide.title}
          lead={lv.guide.lead}
        />

        {/* Scenario library */}
        <Press delay={0.04} className="mt-14 print:hidden">
          <StepHead
            label={lv.guide.scenariosTitle}
            title={lv.guide.scenariosTitle}
            hint={lv.guide.scenariosHint}
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => applyScenario(s)}
                className="block border-2 border-dashed border-border-strong px-4 py-3 text-left transition-all hover:border-primary active:scale-[0.98]"
              >
                <span className="data-value block text-sm font-bold">{s.title}</span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>
        </Press>

        {/* Step 1 — countries */}
        <Press delay={0.05} className="mt-14 print:hidden">
          <StepHead
            label={lv.guide.step1Label}
            title={lv.guide.step1Title}
            hint={lv.guide.step1Hint}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {countries.map((c) => {
              const on = selected.includes(c.code);
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => toggle(c.code)}
                  aria-pressed={on}
                  className={cn(
                    "data-value border px-2 py-1 text-xs uppercase tracking-[0.1em] transition-all active:scale-95",
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border-strong text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {c.code}
                </button>
              );
            })}
          </div>
        </Press>

        {/* Step 2 — channel */}
        <Press delay={0.06} className="mt-14 print:hidden">
          <StepHead
            label={lv.guide.step2Label}
            title={lv.guide.step2Title}
            hint={lv.guide.step2Hint}
          />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <OptionCard
              active={channel === "own"}
              title={lv.guide.channelOwn}
              desc={lv.guide.channelOwnDesc}
              onClick={() => setChannel("own")}
            />
            <OptionCard
              active={channel === "marketplace"}
              title={lv.guide.channelMarketplace}
              desc={lv.guide.channelMarketplaceDesc}
              onClick={() => setChannel("marketplace")}
            />
            <OptionCard
              active={channel === "b2b"}
              title={lv.guide.channelB2b}
              desc={lv.guide.channelB2bDesc}
              onClick={() => setChannel("b2b")}
            />
          </div>
        </Press>

        {/* Step 3 — who first */}
        <Press delay={0.07} className="mt-14 print:hidden">
          <StepHead
            label={lv.guide.step3Label}
            title={lv.guide.step3Title}
            hint={lv.guide.step3Hint}
          />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <OptionCard
              active={who === "you"}
              title={lv.guide.whoYou}
              desc={lv.guide.whoYouDesc}
              onClick={() => setWho("you")}
            />
            <OptionCard
              active={who === "importer"}
              title={lv.guide.whoImporter}
              desc={lv.guide.whoImporterDesc}
              onClick={() => setWho("importer")}
            />
            <OptionCard
              active={who === "platform"}
              title={lv.guide.whoPlatform}
              desc={lv.guide.whoPlatformDesc}
              onClick={() => setWho("platform")}
            />
          </div>
        </Press>

        {/* Step 4 — packaging classification */}
        <Press delay={0.08} className="mt-14 print:hidden">
          <StepHead
            label={lv.guide.step4Label}
            title={lv.guide.step4Title}
            hint={lv.guide.step4Hint}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <span className="form-label">{lv.guide.classMaterialsTitle}</span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {MATERIALS.map((m) => (
                  <label key={m} className="block border border-border-strong px-3 py-2">
                    <span className="form-label block truncate">{lv.materials[m]}</span>
                    <input
                      inputMode="decimal"
                      value={weights[m]}
                      onChange={(e) =>
                        setWeights((w) => ({
                          ...w,
                          [m]: e.target.value.replace(/[^\d.]/g, ""),
                        }))
                      }
                      placeholder="0"
                      className="data-value mt-1 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground focus:text-primary"
                      aria-label={lv.materials[m]}
                    />
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <span className="form-label">{lv.guide.classShipmentsLabel}</span>
                <input
                  inputMode="numeric"
                  value={shipments}
                  onChange={(e) => setShipments(e.target.value.replace(/[^\d]/g, ""))}
                  className="data-value mt-2 w-full border-b-2 border-foreground bg-transparent pb-2 text-2xl outline-none focus:border-primary focus:text-primary"
                  aria-label={lv.guide.classShipmentsLabel}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="form-label">{lv.guide.classLevelsTitle}</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip
                    active={levels.includes("sales")}
                    label={lv.guide.levelSales}
                    onClick={() => toggleLevel("sales")}
                  />
                  <Chip
                    active={levels.includes("grouped")}
                    label={lv.guide.levelGrouped}
                    onClick={() => toggleLevel("grouped")}
                  />
                  <Chip
                    active={levels.includes("transport")}
                    label={lv.guide.levelTransport}
                    onClick={() => toggleLevel("transport")}
                  />
                  <Chip
                    active={levels.includes("ecom")}
                    label={lv.guide.levelEcom}
                    onClick={() => toggleLevel("ecom")}
                  />
                </div>
              </div>
              <div>
                <span className="form-label">{lv.guide.classAudienceTitle}</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip
                    active={audience === "household"}
                    label={lv.guide.audienceHousehold}
                    onClick={() => setAudience("household")}
                  />
                  <Chip
                    active={audience === "commercial"}
                    label={lv.guide.audienceCommercial}
                    onClick={() => setAudience("commercial")}
                  />
                </div>
              </div>
              <div>
                <span className="form-label">{lv.guide.classReuseTitle}</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip
                    active={reuse === "single"}
                    label={lv.guide.reuseSingle}
                    onClick={() => setReuse("single")}
                  />
                  <Chip
                    active={reuse === "reusable"}
                    label={lv.guide.reuseReusable}
                    onClick={() => setReuse("reusable")}
                  />
                </div>
              </div>
              <div className="border-t border-dashed border-border-strong pt-4">
                <span className="form-label">{lv.calculator.totalWeightLabel}</span>
                <p className="data-value mt-1 text-2xl">
                  {totalKg.toLocaleString("lv-LV", { maximumFractionDigits: 1 })} kg
                </p>
              </div>
            </div>
          </div>
        </Press>

        {/* Result */}
        <Press delay={0.09} className="mt-16">
          <div className="flex items-baseline gap-4">
            <span className="form-label">→</span>
            <span className="h-px flex-1 border-t border-dashed border-border-strong" />
          </div>
          <h3 className="mt-4 text-2xl md:text-3xl">{lv.guide.resultTitle}</h3>
          {plans.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">{lv.guide.resultEmpty}</p>
          ) : (
            <>
              <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
                {lv.guide.resultLead(plans.length)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                <button
                  type="button"
                  onClick={handleCopyPlan}
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {copied ? lv.guide.copied : lv.guide.copyPlan}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {lv.guide.printPlanBtn}
                </button>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {plans.map((plan, i) => (
                  <motion.div
                    key={plan.country.code}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...PRESS_SPRING, delay: Math.min(i * 0.04, 0.3) }}
                    className="border-2 border-foreground bg-card p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="data-value text-3xl font-bold leading-none">
                          {plan.country.code}
                        </span>
                        <span className="form-label ml-3">{plan.country.name}</span>
                      </div>
                      {!plan.country.verified ? <UnverifiedStamp short /> : null}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        title={
                          plan.costPartial ? lv.guide.costPartialTitle : lv.guide.costChipTitle
                        }
                        className={cn(
                          "border px-2 py-1 font-mono text-[11px]",
                          plan.costPartial
                            ? "border-primary text-primary"
                            : "border-border-strong text-foreground",
                        )}
                      >
                        {plan.costLabel ?? lv.guide.costUnknown}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "mt-4 border-l-2 py-1 pl-3 text-xs leading-relaxed",
                        plan.obligationYou
                          ? "border-primary text-foreground"
                          : "border-border-strong text-muted-foreground",
                      )}
                    >
                      <span className="form-label block">
                        {plan.obligationYou ? lv.guide.obligationYou : lv.guide.obligationOther}
                      </span>
                      <span className="mt-1 block">{plan.obligationNote}</span>
                    </div>

                    {/* Tasks */}
                    <p className="form-label mt-5">{lv.guide.tasksTitle}</p>
                    <ul className="mt-3 space-y-2">
                      {plan.tasks.map((t) => (
                        <li key={t.key} className="flex items-start gap-2">
                          <span aria-hidden className="mt-[3px] text-muted-foreground">
                            ☐
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-baseline gap-2">
                              <span className="text-sm leading-snug">
                                {t.url ? (
                                  <a
                                    href={t.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary underline decoration-dashed underline-offset-4"
                                  >
                                    {t.label}
                                  </a>
                                ) : (
                                  t.label
                                )}
                              </span>
                              <span
                                className={cn(
                                  "border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em]",
                                  LEVEL_STYLE[t.level],
                                )}
                              >
                                {levelText(t.level)}
                              </span>
                            </span>
                            {t.detail ? (
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {t.detail}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Classification notes */}
                    {plan.notes.length ? (
                      <ul className="mt-4 space-y-1">
                        {plan.notes.map((n) => (
                          <li
                            key={n}
                            className="border-l-2 border-border pl-2 text-xs leading-snug text-muted-foreground"
                          >
                            {n}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* Evidence */}
                    {plan.evidence.length ? (
                      <>
                        <p className="form-label mt-5">{lv.guide.evidenceTitle}</p>
                        <ul className="mt-2 space-y-1">
                          {plan.evidence.map((e) => (
                            <li key={e} className="text-xs leading-snug text-muted-foreground">
                              · {e}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {/* Flags */}
                    {plan.flags.length ? (
                      <>
                        <p className="form-label mt-5">{lv.guide.flagsTitle}</p>
                        <ul className="mt-2 space-y-1">
                          {plan.flags.map((f) => (
                            <li
                              key={f}
                              className="border-l-2 border-dashed border-border-strong pl-2 text-xs leading-snug text-muted-foreground"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <Link
                      to="/valstis/$code"
                      params={{ code: plan.country.code }}
                      className="form-label mt-5 inline-block text-primary underline decoration-dashed underline-offset-4"
                    >
                      {lv.guide.openCountry} →
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/"
                hash="kalkulators"
                search={{
                  w: encodedWeights || undefined,
                  ship: shipments || undefined,
                  cc: selected.join(",") || undefined,
                }}
                className="data-value mt-8 inline-flex items-center border-2 border-foreground px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:border-primary hover:text-primary print:hidden"
              >
                {lv.guide.openCalculator} →
              </Link>
            </>
          )}
          <p className="mt-8 border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {lv.guide.disclaimer}
          </p>
        </Press>
      </div>
    </section>
  );
}
