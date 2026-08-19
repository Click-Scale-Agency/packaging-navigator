import { Link, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import lv from "@/i18n/lv";
import { countries, MATERIALS, type MaterialKey } from "@/data";
import { computeCountryCost, kgPerYearFrom } from "@/lib/fees";
import { PRESS_SPRING, Press, SectionHead, UnverifiedStamp } from "@/components/primitives";
import { useRevealMotion } from "@/hooks/use-reveal-motion";

import { cn } from "@/lib/utils";

const DEFAULT_SELECTION = ["DE", "LV", "ES"];

/** Parse "paper:120,plastic:35" from a deep-link into a weights record. */
function parseWeights(raw?: string): Record<MaterialKey, string> | null {
  if (!raw) return null;
  const out = {} as Record<MaterialKey, string>;
  for (const m of MATERIALS) out[m] = "";
  let touched = false;
  for (const pair of raw.split(",")) {
    const [key, val] = pair.split(":");
    if (key && val && (MATERIALS as string[]).includes(key) && /^\d+(\.\d+)?$/.test(val)) {
      out[key as MaterialKey] = val;
      touched = true;
    }
  }
  return touched ? out : null;
}

function useCountUp(value: number) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const from = display;
    const start = performance.now();
    const dur = 700;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return display;
}

function Money({ value }: { value: number }) {
  const shown = useCountUp(value);
  return <span className="data-value tabular-nums">{shown.toFixed(2)}</span>;
}

export function Calculator() {
  const animateRows = useRevealMotion();
  // Optional deep-link params from the action guide (?w=…&ship=…&cc=…).

  const search = useSearch({ strict: false }) as {
    w?: string;
    ship?: string;
    cc?: string;
  };
  const seededWeights = parseWeights(search.w);
  const seededCc = search.cc
    ? search.cc
        .split(",")
        .map((c) => c.toUpperCase())
        .filter((c) => countries.some((x) => x.code === c))
    : null;

  const [weights, setWeights] = useState<Record<MaterialKey, string>>(
    seededWeights ?? {
      paper: "120",
      plastic: "35",
      glass: "",
      metal: "",
      wood: "",
      composite: "",
    },
  );
  const [shipments, setShipments] = useState(
    search.ship && /^\d+$/.test(search.ship) ? search.ship : "2000",
  );
  const [arFee, setArFee] = useState("400");
  // Per-country authorised-representative decision. Default "unknown" — the AR
  // fee is NEVER auto-added just because the data flags arRequired; the user
  // must mark a country "attiecas" for it to count.
  const [arApplies, setArApplies] = useState<Record<string, "yes" | "no" | "unknown">>({});
  const [selected, setSelected] = useState<string[]>(
    seededCc && seededCc.length ? seededCc : DEFAULT_SELECTION,
  );
  const [copied, setCopied] = useState(false);

  const arStateOf = (code: string): "yes" | "no" | "unknown" => arApplies[code] ?? "unknown";
  const setAr = (code: string, v: "yes" | "no" | "unknown") =>
    setArApplies((p) => ({ ...p, [code]: v }));

  const kgPerYear = useMemo(() => kgPerYearFrom(weights, shipments), [weights, shipments]);

  const totalKg = MATERIALS.reduce((sum, m) => sum + kgPerYear[m], 0);

  const rows = useMemo(
    () =>
      countries
        .filter((c) => selected.includes(c.code))
        .map((country) => {
          const cost = computeCountryCost(country, kgPerYear, totalKg);
          return {
            country,
            fee: cost.total,
            variable: cost.variable,
            proFee: cost.proFee,
            minFee: cost.minFee,
            minApplied: cost.minApplied,
            regCost: cost.regCost,
            hasRate: cost.known,
            blended: cost.blended,
            coverage: cost.coverage,
            basis: cost.basis,
            unpricedMaterials: cost.unpricedMaterials,
            conditionalTaxes: cost.conditionalTaxes,
            statutory: country.statutoryFallback,
            arRequired: country.register.arRequired === true,
            drsActive: country.drs?.active === true,
          };
        }),
    [selected, kgPerYear, totalKg],
  );

  const grandTotal = rows.reduce((sum, r) => sum + r.fee, 0);
  // Countries where the AR obligation is flagged in data (candidates for the fee).
  const arFlaggedCount = rows.filter((r) => r.arRequired).length;
  // Countries the user actually confirmed the AR applies to — only these count.
  const arConfirmedCount = rows.filter(
    (r) => r.arRequired && arStateOf(r.country.code) === "yes",
  ).length;
  const estTotal = (Number(arFee) || 0) * arConfirmedCount;
  const fullTotal = grandTotal + estTotal;
  // Countries where the material mix is only partially (or not) priced, so the
  // grand total is a FLOOR, not a complete figure.
  const partialCount = rows.filter(
    (r) => r.coverage === "partial" || (r.coverage === "none" && r.unpricedMaterials.length > 0),
  ).length;

  const toggle = (code: string) =>
    setSelected((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));

  const eur = (n: number) => n.toFixed(2);
  // A partial figure is a floor — prefix it with "no €" (from €).
  const feeText = (r: (typeof rows)[number]) =>
    r.hasRate ? `${r.coverage !== "full" ? `${lv.calculator.fromPrefix} ` : ""}${eur(r.fee)}` : "—";
  const coverageLabel = (r: (typeof rows)[number]) =>
    r.coverage === "full"
      ? "pilns"
      : r.coverage === "partial"
        ? "daļējs"
        : r.unpricedMaterials.length > 0
          ? "nav aprēķināms"
          : "—";
  const arDecisionLabel = (r: (typeof rows)[number]) =>
    !r.arRequired
      ? ""
      : arStateOf(r.country.code) === "yes"
        ? lv.calculator.arYes
        : arStateOf(r.country.code) === "no"
          ? lv.calculator.arNo
          : lv.calculator.arUnknown;
  const exportRows = () =>
    rows.map((r) => ({
      code: r.country.code,
      name: r.country.name,
      scheme: r.country.pro[0]?.name ?? "—",
      variable: eur(r.variable),
      minFee: r.minApplied && r.minFee !== null ? eur(r.minFee) : "",
      reg: r.regCost > 0 ? eur(r.regCost) : "",
      total: feeText(r),
      basis: r.basis === "statutory" ? (r.statutory?.name ?? "alternatīvā likme") : "",
      coverage: coverageLabel(r),
      condTax: r.conditionalTaxes.join(" / "),
      arDecision: arDecisionLabel(r),
      drs: r.drsActive ? "jā" : "nē",
    }));

  const buildCsv = () => {
    const head = [
      "Valsts",
      "Kods",
      "Shēma",
      "Iepakojuma maksa EUR/gadā",
      "Min. gada maksa EUR",
      "Reģistrācija EUR",
      "PRO+reģistrācija EUR/gadā",
      "Aprēķina bāze",
      "Seguma statuss",
      "Iespējams papildu nodoklis",
      "Pārstāvis (tavs lēmums)",
      "Depozīta sistēma",
    ];
    const body = exportRows().map((r) =>
      [
        r.name,
        r.code,
        r.scheme,
        r.variable,
        r.minFee,
        r.reg,
        r.total,
        r.basis,
        r.coverage,
        r.condTax,
        r.arDecision,
        r.drs,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(";"),
    );
    const totals = [
      `"KOPĀ aprēķinātā daļa (PRO+reģ)";;;;;;"${eur(grandTotal)}";;;;;`,
      `"Iespējamās pārstāvja izmaksas (atzīmētas ${arConfirmedCount})";;;;;;"${eur(estTotal)}";;;;;`,
      `"APTUVENĀS ZINĀMĀS IZMAKSAS 1. gadā";;;;;;"${eur(fullTotal)}";;;;;`,
    ];
    if (partialCount > 0) {
      totals.push(
        `"Piezīme: ${partialCount === 1 ? "vienai valstij" : `${partialCount} valstīm`} segums ir daļējs — summa ir zināmā daļa (no €X), nevis pilnās izmaksas.";;;;;;;;;;;`,
      );
    }
    totals.push(
      `"Piezīme: daļa tarifu un administratīvo izmaksu var nebūt publiski pieejama.";;;;;;;;;;;`,
    );
    return [head.join(";"), ...body, "", ...totals].join("\r\n");
  };

  const buildSummary = () =>
    [
      "PPWR iepakojuma EPR — indikatīvs izmaksu aprēķins",
      `Sūtījumi gadā: ${shipments} · kopējais materiāls: ${totalKg.toFixed(1)} kg`,
      "",
      ...exportRows().map(
        (r) =>
          `${r.code} ${r.name}: ${r.total} €/gadā (${r.scheme})` +
          `${r.basis ? ` · bāze: ${r.basis}` : ""}` +
          `${r.coverage !== "pilns" ? ` · segums: ${r.coverage}` : ""}` +
          `${r.minFee ? ` · min. maksa ${r.minFee} €` : ""}` +
          `${r.reg ? ` · reģistrācija ${r.reg} €` : ""}` +
          `${r.condTax ? ` · iespējams nodoklis: ${r.condTax} (jāpārbauda)` : ""}` +
          `${r.arDecision ? ` · pārstāvis: ${r.arDecision}` : ""}` +
          `${r.drs === "jā" ? " · depozīts" : ""}`,
      ),
      "",
      `Aprēķinātā daļa kopā: ${eur(grandTotal)} €`,
      ...(partialCount > 0
        ? [
            `(${partialCount === 1 ? "vienai valstij" : `${partialCount} valstīm`} segums ir daļējs — summa ir zināmā daļa "no €X", nevis pilnās izmaksas)`,
          ]
        : []),
      `Iespējamās pilnvarotā pārstāvja izmaksas (atzīmētas ${arConfirmedCount}): ${eur(estTotal)} €`,
      `Aptuvenās zināmās izmaksas 1. gadā: ${eur(fullTotal)} €`,
      "",
      "Indikatīvi. Nav juridiska konsultācija. Trūkstošās likmes netiek pieņemtas par nulli. Daļa tarifu un administratīvo izmaksu var nebūt publiski pieejama.",
    ].join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleCsv = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ppwr-izmaksu-aprekins.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="kalkulators"
          kicker={lv.calculator.kicker}
          title={lv.calculator.title}
          lead={lv.calculator.lead}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
          {/* inputs */}
          <Press className="space-y-8">
            <div>
              <span className="form-label">{lv.calculator.materialsLabel}</span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {MATERIALS.map((m) => (
                  <label key={m} className="block border border-border-strong px-3 py-2">
                    <span className="form-label block truncate">{lv.materials[m]}</span>
                    <input
                      inputMode="decimal"
                      value={weights[m]}
                      onChange={(e) =>
                        setWeights((w) => ({ ...w, [m]: e.target.value.replace(/[^\d.]/g, "") }))
                      }
                      placeholder="0"
                      className="data-value mt-1 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground focus:text-primary"
                      aria-label={lv.materials[m]}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="form-label">{lv.calculator.shipmentsLabel}</span>
              <input
                inputMode="numeric"
                value={shipments}
                onChange={(e) => setShipments(e.target.value.replace(/[^\d]/g, ""))}
                className="data-value mt-2 w-full border-b-2 border-foreground bg-transparent pb-2 text-3xl outline-none focus:border-primary focus:text-primary"
                aria-label={lv.calculator.shipmentsLabel}
              />
            </div>

            <div>
              <span className="form-label">{lv.calculator.arFeeLabel}</span>
              <input
                inputMode="numeric"
                value={arFee}
                onChange={(e) => setArFee(e.target.value.replace(/[^\d]/g, ""))}
                className="data-value mt-2 w-full border-b-2 border-foreground bg-transparent pb-2 text-3xl outline-none focus:border-primary focus:text-primary"
                aria-label={lv.calculator.arFeeLabel}
              />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {lv.calculator.arFeeHint}
              </p>
            </div>

            <div className="border-t border-dashed border-border-strong pt-4">
              <span className="form-label">{lv.calculator.totalWeightLabel}</span>
              <p className="data-value mt-1 text-2xl">
                {totalKg.toLocaleString("lv-LV", { maximumFractionDigits: 1 })} kg
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="form-label">{lv.calculator.countriesLabel}</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelected(countries.map((c) => c.code))}
                    className="form-label transition-colors hover:text-primary"
                  >
                    {lv.calculator.selectAll}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="form-label transition-colors hover:text-primary"
                  >
                    {lv.calculator.reset}
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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
            </div>
          </Press>

          {/* output */}
          <Press delay={0.08} className="min-w-0">
            <div className="border-2 border-foreground bg-card">
              <div className="grid grid-cols-[3.2rem_minmax(0,1fr)_auto] gap-3 border-b-2 border-foreground px-4 py-3 md:grid-cols-[4rem_minmax(0,1fr)_7rem_9rem]">
                <span className="form-label">{lv.calculator.tableCountry}</span>
                <span className="form-label">{lv.calculator.tableScheme}</span>
                <span className="form-label hidden md:block">{lv.calculator.tableRate}</span>
                <span className="form-label text-right">{lv.calculator.tableFee}</span>
              </div>

              {rows.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  {lv.calculator.noCountries}
                </p>
              ) : (
                <ul>
                  {rows.map((row, i) => (
                    <motion.li
                      key={row.country.code}
                      {...(animateRows
                        ? {
                            layout: true as const,
                            initial: { opacity: 0, x: -14 },
                            animate: { opacity: 1, x: 0 },
                            transition: { ...PRESS_SPRING, delay: Math.min(i * 0.03, 0.3) },
                          }
                        : {})}
                      className="grid grid-cols-[3.2rem_minmax(0,1fr)_auto] items-start gap-3 border-b border-dashed border-border px-4 py-3 md:grid-cols-[4rem_minmax(0,1fr)_7rem_9rem]"
                    >

                      <Link
                        to="/valstis/$code"
                        params={{ code: row.country.code }}
                        className="data-value text-lg font-bold leading-none text-primary underline decoration-dashed underline-offset-4 transition-opacity hover:opacity-70 md:text-xl"
                      >
                        {row.country.code}
                      </Link>
                      <span className="min-w-0">
                        <span className="data-value block truncate text-sm">
                          {row.country.pro[0]?.name ?? lv.countries.unknown}
                        </span>
                        <span className="form-label mt-1 block">
                          {row.country.register.exists
                            ? (row.country.register.name ?? lv.countries.unknown)
                            : lv.countries.noRegister}
                        </span>
                        {row.hasRate ? (
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            {row.variable > 0 ? (
                              <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {lv.calculator.breakdownVariable} €{row.variable.toFixed(0)}
                              </span>
                            ) : null}
                            {row.basis === "statutory" && row.statutory ? (
                              <span
                                title={lv.calculator.altRateTitle(
                                  row.statutory.name ?? "",
                                  row.statutory.appliesWhen ?? "",
                                )}
                                className="border border-primary px-1.5 py-0.5 font-mono text-[10px] text-primary"
                              >
                                {lv.calculator.altRateChip}
                              </span>
                            ) : null}
                            {row.minApplied ? (
                              <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {lv.calculator.breakdownMinApplied} €{row.minFee}
                              </span>
                            ) : null}
                            {row.regCost > 0 ? (
                              <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {lv.calculator.breakdownReg} €{row.regCost}
                              </span>
                            ) : null}
                            {row.drsActive ? (
                              <span
                                title={lv.calculator.drsChipTitle}
                                className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                              >
                                {lv.calculator.drsChip}
                              </span>
                            ) : null}
                          </span>
                        ) : null}
                        {row.coverage === "partial" ||
                        (row.coverage === "none" && row.unpricedMaterials.length > 0) ||
                        row.conditionalTaxes.length > 0 ? (
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            {row.coverage === "partial" ? (
                              <span
                                title={lv.calculator.partialTitle(
                                  row.unpricedMaterials.map((m) => lv.materials[m]).join(", "),
                                )}
                                className="border border-primary px-1.5 py-0.5 font-mono text-[10px] text-primary"
                              >
                                {lv.calculator.partialBadge}
                              </span>
                            ) : null}
                            {row.coverage === "none" && row.unpricedMaterials.length > 0 ? (
                              <span
                                title={lv.calculator.noneTitle}
                                className="border border-primary px-1.5 py-0.5 font-mono text-[10px] text-primary"
                              >
                                {lv.calculator.noneBadge}
                              </span>
                            ) : null}
                            {row.conditionalTaxes.length > 0 ? (
                              <span
                                title={lv.calculator.condTaxTitle(row.conditionalTaxes.join(", "))}
                                className="border border-primary px-1.5 py-0.5 font-mono text-[10px] text-primary"
                              >
                                {lv.calculator.condTaxChip}
                              </span>
                            ) : null}
                          </span>
                        ) : null}
                        {row.basis === "statutory" && row.statutory ? (
                          <span className="mt-2 block border-l-2 border-primary pl-2 text-[11px] leading-snug text-muted-foreground">
                            {lv.calculator.altRateNote(
                              row.statutory.name ?? "",
                              row.statutory.appliesWhen ?? "",
                            )}
                          </span>
                        ) : null}
                        {row.arRequired ? (
                          <span className="mt-2 block">
                            <span className="form-label block">{lv.calculator.arApplyQ}</span>
                            <span className="mt-1 flex flex-wrap gap-1">
                              {(["yes", "no", "unknown"] as const).map((opt) => {
                                const on = arStateOf(row.country.code) === opt;
                                const label =
                                  opt === "yes"
                                    ? lv.calculator.arYes
                                    : opt === "no"
                                      ? lv.calculator.arNo
                                      : lv.calculator.arUnknown;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setAr(row.country.code, opt)}
                                    aria-pressed={on}
                                    className={cn(
                                      "border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-all active:scale-95",
                                      on
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border-strong text-muted-foreground hover:border-primary hover:text-primary",
                                    )}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                            </span>
                          </span>
                        ) : null}
                        {!row.country.verified ? (
                          <span className="mt-2 block">
                            <UnverifiedStamp short />
                          </span>
                        ) : null}
                      </span>
                      <span className="data-value hidden text-sm md:block">
                        {row.blended !== null ? row.blended.toFixed(3) : lv.calculator.noRate}
                      </span>
                      <span className="data-value text-right text-base md:text-lg">
                        {row.hasRate ? (
                          <>
                            {row.coverage !== "full" ? (
                              <span className="text-sm text-muted-foreground">
                                {lv.calculator.fromPrefix}{" "}
                              </span>
                            ) : null}
                            <Money value={row.fee} /> €
                          </>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}

              <div className="border-t-2 border-foreground px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="form-label">{lv.calculator.safeTotal}</span>
                  <span className="data-value text-xl font-bold md:text-2xl">
                    {partialCount > 0 ? (
                      <span className="text-sm font-normal text-muted-foreground">
                        {lv.calculator.fromPrefix}{" "}
                      </span>
                    ) : null}
                    <Money value={grandTotal} /> €
                  </span>
                </div>
                {partialCount > 0 ? (
                  <p className="mt-2 border-l-2 border-primary pl-2 text-xs leading-snug text-primary">
                    {lv.calculator.partialSelectedNote(partialCount)}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                  <span className="form-label text-muted-foreground">
                    {lv.calculator.estTotalLabel}
                    {arConfirmedCount > 0
                      ? ` · ${lv.calculator.estCountriesNote(arConfirmedCount)}`
                      : ""}
                  </span>
                  <span className="data-value text-lg text-muted-foreground">
                    + <Money value={estTotal} /> €
                  </span>
                </div>
                {arFlaggedCount > 0 ? (
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {lv.calculator.arConfirmedNote(arConfirmedCount)}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3 border-t border-dashed border-border pt-3">
                  <span className="form-label">{lv.calculator.fullTotal}</span>
                  <span className="data-value text-2xl font-bold md:text-3xl">
                    <Money value={fullTotal} /> €
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                  {lv.calculator.fullTotalNote}
                </p>
              </div>
            </div>
            {rows.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {copied ? lv.calculator.copied : lv.calculator.copySummary}
                </button>
                <button
                  type="button"
                  onClick={handleCsv}
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {lv.calculator.downloadCsv}
                </button>
              </div>
            ) : null}
            <p className="mt-4 border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {lv.calculator.disclaimer}
            </p>
          </Press>
        </div>
      </div>
    </section>
  );
}
