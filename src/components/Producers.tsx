import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import lv from "@/i18n/lv";
import { CropMarks, Press, SectionHead } from "@/components/primitives";
import { MicroMatrix, RefText, TwoHatsInfographic } from "@/components/producers/parts";
import { RoleWizard } from "@/components/producers/RoleWizard";
import { cn } from "@/lib/utils";

interface CaseGroup {
  kind: "list" | "para" | "action" | "warning";
  heading?: string;
  items?: string[];
  text?: string;
}
interface CaseDef {
  id: string;
  title: string;
  subtitle?: string;
  roles?: string;
  groups: CaseGroup[];
}

const CASES = lv.producers.cases as unknown as CaseDef[];

/* ---------- Hero ---------- */

function ProducersHero() {
  const h = lv.producers.hero;
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Press className="flex items-center gap-4">
          <span className="form-label">{h.kicker}</span>
          <span className="h-px flex-1 border-t border-dashed border-border-strong" />
        </Press>
        <Press delay={0.05}>
          <h1 className="mt-6 max-w-[18ch] text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">
            {h.title}
          </h1>
        </Press>
        <Press delay={0.1}>
          <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            {h.sub}
          </p>
        </Press>
        <Press delay={0.15} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#vednis"
            className="data-value inline-flex items-center border-2 border-foreground bg-foreground px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-background transition-colors hover:bg-background hover:text-foreground"
          >
            {h.cta} →
          </a>
          <a
            href="#gadijumi"
            className="data-value inline-flex items-center border-2 border-foreground px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:border-primary hover:text-primary"
          >
            {h.ctaMatrix}
          </a>
        </Press>
      </div>
    </section>
  );
}

/* ---------- Two hats ---------- */

function TwoHats() {
  const t = lv.producers.twoHats;
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="divas-cepures" kicker={t.kicker} title={t.title} lead={t.intro} />
        <Press delay={0.1} className="mt-12">
          <TwoHatsInfographic />
        </Press>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Press delay={0.12}>
            <p className="text-sm leading-relaxed md:text-base">
              <span className="data-value font-bold">{t.mfrLabel}</span>{" "}
              <RefText>{t.mfrText}</RefText>
            </p>
          </Press>
          <Press delay={0.14}>
            <p className="text-sm leading-relaxed md:text-base">
              <span className="data-value font-bold text-primary">{t.producerLabel}</span>{" "}
              <RefText>{t.producerText}</RefText>
            </p>
          </Press>
        </div>
        <Press delay={0.16} className="mt-8">
          <p className="border-l-2 border-primary py-2 pl-4 text-sm font-medium leading-relaxed md:text-base">
            {t.formula}
          </p>
        </Press>
        <Press delay={0.18} className="mt-4">
          <p className="border-2 border-dashed px-4 py-3 text-sm leading-relaxed stamp-ink">
            <RefText>{t.cannotTransfer}</RefText>
          </p>
        </Press>
      </div>
    </section>
  );
}

/* ---------- Case matrix (accordion A–E) ---------- */

function CaseGroupView({ group }: { group: CaseGroup }) {
  if (group.kind === "warning") {
    return (
      <div className="mt-4 border-2 border-dashed px-4 py-3 text-sm leading-relaxed stamp-ink">
        {group.heading ? <span className="font-bold">⚠ {group.heading} </span> : null}
        <RefText>{group.text ?? ""}</RefText>
      </div>
    );
  }
  return (
    <div className="mt-4">
      {group.heading ? (
        <p
          className={cn(
            "text-sm font-semibold leading-snug",
            group.kind === "action" ? "text-primary" : "text-foreground",
          )}
        >
          <RefText>{group.heading}</RefText>
        </p>
      ) : null}
      {group.kind === "list" && group.items ? (
        <ul className="mt-2 space-y-2">
          {group.items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span aria-hidden className="mt-[3px] text-primary">
                ▪
              </span>
              <RefText>{it}</RefText>
            </li>
          ))}
        </ul>
      ) : null}
      {group.text ? (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          <RefText>{group.text}</RefText>
        </p>
      ) : null}
    </div>
  );
}

function CaseMatrix() {
  const [open, setOpen] = useState<string | null>(CASES[0]?.id ?? null);
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="gadijumi"
          kicker={lv.producers.matrix.kicker}
          title={lv.producers.matrix.title}
          lead={lv.producers.matrix.lead}
        />
        <div className="mt-12 border-t border-dashed border-border-strong">
          {CASES.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <Press key={c.id} delay={Math.min(i * 0.04, 0.2)}>
                <div className="border-b border-dashed border-border-strong">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:text-primary"
                  >
                    <span className="data-value flex h-9 w-9 shrink-0 items-center justify-center border-2 border-foreground text-base font-bold">
                      {c.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="data-value block text-base font-bold leading-snug md:text-lg">
                        {c.title}
                      </span>
                      {c.subtitle ? (
                        <span className="form-label mt-0.5 block normal-case tracking-normal">
                          {c.subtitle}
                        </span>
                      ) : null}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="text-lg leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="max-w-[80ch] pb-8 pl-0 md:pl-13">
                          {c.roles ? (
                            <p className="border-l-2 border-foreground py-1 pl-3 text-sm font-medium leading-relaxed">
                              <RefText>{c.roles}</RefText>
                            </p>
                          ) : null}
                          {c.groups.map((g, gi) => (
                            <CaseGroupView key={gi} group={g} />
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Press>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Micro-enterprise ---------- */

function Micro() {
  const m = lv.producers.micro;
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="mikrouznemumi" kicker={m.kicker} title={m.title} lead={m.def} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div>
            <Press>
              <p className="text-sm leading-relaxed md:text-base">
                <RefText>{m.rule}</RefText>
              </p>
            </Press>
            <Press delay={0.06} className="mt-6">
              <p className="form-label">{m.practiceTitle}</p>
              <ul className="mt-3 space-y-3">
                {m.practice.map((p, i) => (
                  <li key={i} className="border-l-2 border-primary pl-3 text-sm leading-relaxed">
                    <RefText>{p}</RefText>
                  </li>
                ))}
              </ul>
            </Press>
            <Press delay={0.1} className="mt-6">
              <p className="border-2 border-dashed px-4 py-3 text-sm leading-relaxed stamp-ink">
                <RefText>{m.warning}</RefText>
              </p>
            </Press>
          </div>
          <Press delay={0.12}>
            <MicroMatrix />
          </Press>
        </div>
      </div>
    </section>
  );
}

/* ---------- Action plan ---------- */

function ActionPlan() {
  const a = lv.producers.actionPlan;
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="rico-plans" kicker={a.kicker} title={a.title} lead={a.lead} />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {a.steps.map((s, i) => (
            <Press key={i} delay={Math.min(i * 0.03, 0.2)}>
              <li className="relative flex h-full gap-4 border border-border-strong bg-card p-4">
                <CropMarks />
                <span className="data-value text-3xl font-bold leading-none tracking-[-0.04em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="data-value block text-sm font-bold leading-snug">{s.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    <RefText>{s.text}</RefText>
                  </span>
                </span>
              </li>
            </Press>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Wizard ---------- */

function WizardSection() {
  const w = lv.producers.wizard;
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="vednis" kicker={w.kicker} title={w.title} lead={w.lead} />
        <Press delay={0.08} className="mt-12">
          <RoleWizard />
        </Press>
      </div>
    </section>
  );
}

/* ---------- Client package template ---------- */

function Template() {
  const t = lv.producers.template;
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Press>
          <div className="relative border-2 border-foreground bg-card p-6 md:p-10">
            <CropMarks />
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="min-w-0">
                <span className="form-label">{t.kicker}</span>
                <h2 className="mt-5 text-3xl leading-[0.95] tracking-[-0.035em] md:text-5xl">
                  {t.title}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                  {t.lead}
                </p>
                <p className="form-label mt-8">{t.contentsTitle}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {t.contents.map((c, i) => (
                    <li key={i} className="border-l-2 border-primary pl-3 text-sm leading-snug">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/ppwr-klienta-paketes-sablons.md"
                download
                className="data-value inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background transition-colors hover:bg-background hover:text-foreground"
              >
                {t.download} ↓
              </a>
            </div>
          </div>
        </Press>
      </div>
    </section>
  );
}

/* ---------- FAQ additions ---------- */

function ProducersFaq() {
  const f = lv.producers.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="buj-razotajiem" kicker={f.kicker} title={f.title} lead={f.lead} />
        <div className="mt-12 max-w-[80ch] border-t border-dashed border-border-strong">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Press key={i} delay={i * 0.04}>
                <div className="border-b border-dashed border-border-strong">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary"
                  >
                    <span className="data-value pt-1 text-[11px] tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="data-value flex-1 text-base leading-snug md:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="pt-1 text-lg leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pl-10 text-sm leading-relaxed text-muted-foreground md:text-base">
                          <RefText>{item.a}</RefText>
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Press>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sources ---------- */

function Sources() {
  const s = lv.producers.sources;
  const refs = s.refs as Record<string, { title: string; url: string }>;
  const entries = Object.entries(refs);
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="atsauces" kicker={s.kicker} title={s.title} lead={s.note} />
        <ol className="mt-12 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {entries.map(([id, r]) => (
            <li key={id} className="flex gap-3 border-t border-dashed border-border py-2 text-sm">
              <span className="data-value shrink-0 font-bold text-primary">{id}</span>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="leading-snug text-foreground underline decoration-dashed underline-offset-4 hover:text-primary"
              >
                {r.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export function Producers() {
  return (
    <>
      <ProducersHero />
      <TwoHats />
      <CaseMatrix />
      <Micro />
      <ActionPlan />
      <WizardSection />
      <Template />
      <ProducersFaq />
      <Sources />
    </>
  );
}
