import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import lv from "@/i18n/lv";
import { PRESS_SPRING } from "@/components/primitives";
import { RefBadges } from "@/components/producers/parts";
import { cn } from "@/lib/utils";
import wizardData from "../../../data/role-wizard.json";

/* ---- types for the community-editable logic file ---- */

interface WizardBlock {
  kind: string;
  title: string;
  text: string;
  refs?: string[];
}
interface WizardRule {
  if: "always" | Record<string, string[] | string>;
  add: string[];
}
interface WizardData {
  questions: {
    q1: { type: string; text: string; options: Record<string, string> };
    q2: { type: string; text: string; options: Record<string, string> };
    q3: { type: string; showIf: string; text: string; options: Record<string, string> };
  };
  blocks: Record<string, WizardBlock>;
  rules: WizardRule[];
  blockOrder: string[];
}

const data = wizardData as WizardData;
const KIND_LABELS = lv.producers.wizard.kindLabels as Record<string, string>;

/* ---- rule engine ---- */

interface Answers {
  q1: string[];
  q2: string[];
  q3: string | null;
}

function ruleMatches(rule: WizardRule, a: Answers): boolean {
  if (rule.if === "always") return true;
  for (const [q, cond] of Object.entries(rule.if)) {
    if (Array.isArray(cond)) {
      const ans = q === "q1" ? a.q1 : q === "q2" ? a.q2 : [];
      if (!cond.every((v) => ans.includes(v))) return false;
    } else {
      if (a.q3 !== cond) return false;
    }
  }
  return true;
}

/** Accumulate matching blocks, dedupe, order by `blockOrder` kinds. */
function resolveBlocks(a: Answers): { key: string; block: WizardBlock }[] {
  const keys: string[] = [];
  for (const rule of data.rules) {
    if (ruleMatches(rule, a)) {
      for (const k of rule.add) if (!keys.includes(k)) keys.push(k);
    }
  }
  const order = data.blockOrder;
  return keys
    .map((key) => ({ key, block: data.blocks[key] }))
    .filter((x): x is { key: string; block: WizardBlock } => Boolean(x.block))
    .sort((x, y) => {
      const ix = order.indexOf(x.block.kind);
      const iy = order.indexOf(y.block.kind);
      return (ix === -1 ? 99 : ix) - (iy === -1 ? 99 : iy);
    });
}

/* ---- option controls ---- */

function OptionButton({
  active,
  label,
  onClick,
  multi,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  multi: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-start gap-3 border-2 px-4 py-3 text-left transition-all active:scale-[0.99]",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border-strong hover:border-primary",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 text-[10px] leading-none",
          multi ? "" : "rounded-full",
          active ? "border-background bg-background text-foreground" : "border-current",
        )}
      >
        {active ? (multi ? "✓" : "•") : ""}
      </span>
      <span className="data-value text-sm leading-snug">{label}</span>
    </button>
  );
}

function QuestionHead({ n, text, hint }: { n: number; text: string; hint: string }) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="form-label">{`${n}. jautājums`}</span>
        <span className="h-px flex-1 border-t border-dashed border-border-strong" />
      </div>
      <h3 className="mt-4 text-xl md:text-2xl">{text}</h3>
      <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{hint}</p>
    </>
  );
}

/* ---- component ---- */

export function RoleWizard() {
  const w = lv.producers.wizard;
  const [q1, setQ1] = useState<string[]>([]);
  const [q2, setQ2] = useState<string[]>([]);
  const [q3, setQ3] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showQ3 = q1.includes("own_brand") || q1.includes("client_brand");
  const showMicroClients = q1.includes("client_brand");

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  // Keep q3 valid as q1 changes (e.g. micro_clients only while client_brand is on).
  const effectiveQ3 = showQ3 && (q3 !== "micro_clients" || showMicroClients) ? q3 : null;

  const answers: Answers = useMemo(() => ({ q1, q2, q3: effectiveQ3 }), [q1, q2, effectiveQ3]);

  const valid = q1.length > 0 && q2.length > 0;
  const blocks = useMemo(() => (valid ? resolveBlocks(answers) : []), [valid, answers]);

  const showTemplate = blocks.some(
    (b) => b.key === "data_pack_offer" || b.key === "supplier_art16",
  );
  const showCalculator = q2.includes("i_export");

  const buildSummary = () => {
    const lines: string[] = [w.planHeader, ""];
    let currentKind = "";
    for (const { block } of blocks) {
      if (block.kind !== currentKind) {
        currentKind = block.kind;
        const label = KIND_LABELS[block.kind];
        if (label) lines.push(`== ${label} ==`);
      }
      lines.push(`• ${block.title}`);
      if (block.text) lines.push(`  ${block.text}`);
      if (block.refs?.length) lines.push(`  [${block.refs.join(" ")}]`);
      lines.push("");
    }
    lines.push(w.disclaimer);
    return lines.join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Render blocks grouped under their kind label (footer/disclaimer handled apart).
  const groups: { kind: string; label: string; items: typeof blocks }[] = [];
  for (const entry of blocks) {
    if (entry.block.kind === "footer") continue;
    const last = groups[groups.length - 1];
    if (last && last.kind === entry.block.kind) last.items.push(entry);
    else
      groups.push({
        kind: entry.block.kind,
        label: KIND_LABELS[entry.block.kind] ?? "",
        items: [entry],
      });
  }

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Questions */}
        <div className="space-y-12">
          <div>
            <QuestionHead n={1} text={data.questions.q1.text} hint={w.q1Hint} />
            <div className="mt-5 grid gap-3">
              {Object.entries(data.questions.q1.options).map(([key, label]) => (
                <OptionButton
                  key={key}
                  multi
                  active={q1.includes(key)}
                  label={label}
                  onClick={() => toggle(setQ1, key)}
                />
              ))}
            </div>
          </div>

          <div>
            <QuestionHead n={2} text={data.questions.q2.text} hint={w.q2Hint} />
            <div className="mt-5 grid gap-3">
              {Object.entries(data.questions.q2.options).map(([key, label]) => (
                <OptionButton
                  key={key}
                  multi
                  active={q2.includes(key)}
                  label={label}
                  onClick={() => toggle(setQ2, key)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showQ3 ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <QuestionHead n={3} text={data.questions.q3.text} hint={w.q3Hint} />
                <div className="mt-5 grid gap-3">
                  {Object.entries(data.questions.q3.options)
                    .filter(([key]) => key !== "micro_clients" || showMicroClients)
                    .map(([key, label]) => (
                      <OptionButton
                        key={key}
                        multi={false}
                        active={effectiveQ3 === key}
                        label={label}
                        onClick={() => setQ3(effectiveQ3 === key ? null : key)}
                      />
                    ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Result */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-baseline gap-4">
            <span className="form-label">→ {w.resultTitle}</span>
            <span className="h-px flex-1 border-t border-dashed border-border-strong" />
          </div>

          {!valid ? (
            <p className="mt-6 border border-dashed border-border-strong px-4 py-6 text-sm text-muted-foreground">
              {w.validation}
            </p>
          ) : (
            <>
              <p className="mt-4 max-w-[60ch] text-sm text-muted-foreground">{w.resultIntro}</p>

              <div className="mt-6 space-y-6">
                {groups.map((group) => (
                  <div key={group.kind}>
                    {group.label ? <p className="form-label">{group.label}</p> : null}
                    <div className="mt-3 space-y-3">
                      {group.items.map(({ key, block }) => (
                        <motion.div
                          key={key}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={PRESS_SPRING}
                          className={cn(
                            "border-l-2 bg-card p-4",
                            block.kind === "special"
                              ? "border-[color:var(--stamp)]"
                              : block.kind === "action"
                                ? "border-primary"
                                : "border-border-strong",
                          )}
                        >
                          <p className="data-value text-sm font-bold leading-snug">
                            {block.title}
                            <RefBadges ids={block.refs ?? []} />
                          </p>
                          {block.text ? (
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {block.text}
                            </p>
                          ) : null}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {copied ? w.copied : w.copySummary}
                </button>
                {showTemplate ? (
                  <a
                    href="/ppwr-klienta-paketes-sablons.md"
                    download
                    className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                  >
                    {w.downloadTemplate}
                  </a>
                ) : null}
                <Link
                  to="/"
                  hash="valstis"
                  className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                >
                  {w.viewCountries}
                </Link>
                {showCalculator ? (
                  <Link
                    to="/"
                    hash="kalkulators"
                    className="form-label border border-border-strong px-3 py-2 transition-colors hover:border-primary hover:text-primary"
                  >
                    {w.openCalculator}
                  </Link>
                ) : null}
              </div>

              <p className="mt-6 border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground">
                {w.disclaimer}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
