import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import lv from "@/i18n/lv";
import { countries, type CountryData } from "@/data";
import { PRESS_SPRING, Press, SectionHead, UnverifiedStamp } from "@/components/primitives";
import { cn } from "@/lib/utils";

type Channel = "own" | "marketplace" | "b2b";
type WhoFirst = "you" | "importer" | "platform";
type Level = "required" | "conditional" | "info";

interface Task {
  key: string;
  label: string;
  detail?: string;
  url?: string;
  level: Level;
}

interface Plan {
  country: CountryData;
  obligationYou: boolean;
  obligationNote: string;
  tasks: Task[];
  evidence: string[];
  flags: string[];
}

const DEFAULT_SELECTION = ["DE", "FR", "ES"];

function proNames(country: CountryData): string {
  const names = country.pro.map((p) => p.name);
  return names.length ? names.join(", ") : "";
}

/** Derive the concrete, per-country action plan from the canonical data + the
 * three answers. Everything here reads from /data via the ./data bridge —
 * no country facts are hardcoded. */
function buildPlan(country: CountryData, channel: Channel, who: WhoFirst): Plan {
  const tasks: Task[] = [];
  const evidence: string[] = [];
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

    // 4 — reporting
    tasks.push({ key: "report", label: lv.guide.taskReport, level: "required" });
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
    // The platform may cover this channel only — direct sales stay the seller's duty.
    tasks.push({ key: "plat-report", label: lv.guide.taskReport, level: "conditional" });
  }

  // Flags — always honest about verification + channel nuance.
  if (!country.verified) flags.push(lv.guide.flagUnverified(country.code));
  if (channel === "marketplace") flags.push(lv.guide.flagMarketplace);
  if (channel === "b2b") flags.push(lv.guide.flagB2b);
  flags.push(lv.guide.flagWhoFirst);

  return { country, obligationYou, obligationNote, tasks, evidence, flags };
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

export function ActionGuide() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTION);
  const [channel, setChannel] = useState<Channel>("own");
  const [who, setWho] = useState<WhoFirst>("you");

  const toggle = (code: string) =>
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );

  const plans = useMemo(
    () =>
      countries
        .filter((c) => selected.includes(c.code))
        .map((c) => buildPlan(c, channel, who)),
    [selected, channel, who],
  );

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="celvedis"
          kicker={lv.guide.kicker}
          title={lv.guide.title}
          lead={lv.guide.lead}
        />

        {/* Step 1 — countries */}
        <Press delay={0.05} className="mt-14">
          <div className="flex items-baseline gap-4">
            <span className="form-label">{lv.guide.step1Label}</span>
            <span className="h-px flex-1 border-t border-dashed border-border-strong" />
          </div>
          <h3 className="mt-4 text-xl md:text-2xl">{lv.guide.step1Title}</h3>
          <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{lv.guide.step1Hint}</p>
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
        <Press delay={0.06} className="mt-14">
          <div className="flex items-baseline gap-4">
            <span className="form-label">{lv.guide.step2Label}</span>
            <span className="h-px flex-1 border-t border-dashed border-border-strong" />
          </div>
          <h3 className="mt-4 text-xl md:text-2xl">{lv.guide.step2Title}</h3>
          <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{lv.guide.step2Hint}</p>
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
        <Press delay={0.07} className="mt-14">
          <div className="flex items-baseline gap-4">
            <span className="form-label">{lv.guide.step3Label}</span>
            <span className="h-px flex-1 border-t border-dashed border-border-strong" />
          </div>
          <h3 className="mt-4 text-xl md:text-2xl">{lv.guide.step3Title}</h3>
          <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{lv.guide.step3Hint}</p>
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

        {/* Result */}
        <Press delay={0.08} className="mt-16">
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

                    <div
                      className={cn(
                        "mt-4 border-l-2 py-1 pl-3 text-xs leading-relaxed",
                        plan.obligationYou
                          ? "border-primary text-foreground"
                          : "border-border-strong text-muted-foreground",
                      )}
                    >
                      <span className="form-label block">
                        {plan.obligationYou
                          ? lv.guide.obligationYou
                          : lv.guide.obligationOther}
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
