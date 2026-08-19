import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import lv from "@/i18n/lv";
import { PRESS_SPRING } from "@/components/primitives";
import { RefBadges } from "@/components/producers/parts";
import {
  answersValid,
  questions,
  resolveWizard,
  type Answers,
  type ResolvedBlock,
} from "@/components/producers/wizard-logic";
import { cn } from "@/lib/utils";

const KIND_LABELS = lv.producers.wizard.kindLabels as Record<string, string>;

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

function QuestionHead({
  label,
  text,
  hint,
}: {
  label: string;
  text: string;
  hint?: string | undefined;
}) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="form-label">{label}</span>
        <span className="h-px flex-1 border-t border-dashed border-border-strong" />
      </div>
      <h3 className="mt-4 text-xl md:text-2xl">{text}</h3>
      {hint ? <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{hint}</p> : null}
    </>
  );
}

/** Reveal wrapper for conditional questions. */
function Reveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---- component ---- */

export function RoleWizard() {
  const w = lv.producers.wizard;
  const [q1, setQ1] = useState<string[]>([]);
  const [q2, setQ2] = useState<string[]>([]);
  const [q3a, setQ3a] = useState<string | null>(null);
  const [q3b, setQ3b] = useState<string | null>(null);
  const [q4, setQ4] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const ownBrand = q1.includes("own_brand");
  const clientBrand = q1.includes("client_brand");
  const showQ3a = ownBrand || clientBrand;
  const showQ3b = clientBrand;
  const showQ4 = ownBrand && q3a === "micro_yes";

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const single = (
    current: string | null,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    value: string,
  ) => setter(current === value ? null : value);

  const raw: Answers = useMemo(() => ({ q1, q2, q3a, q3b, q4 }), [q1, q2, q3a, q3b, q4]);

  const valid = answersValid(raw);
  const blocks: ResolvedBlock[] = useMemo(() => (valid ? resolveWizard(raw) : []), [valid, raw]);

  const showTemplate = blocks.some(
    (b) => b.key === "data_pack_offer" || b.key === "supplier_art16",
  );
  const showCalculator =
    q2.includes("i_export_d2c") ||
    q2.includes("i_export_dealer") ||
    q2.includes("i_export_enduser");

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

  // Group blocks under their kind label (footer/disclaimer handled apart).
  const groups: { kind: string; label: string; items: ResolvedBlock[] }[] = [];
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
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Questions */}
      <div className="space-y-12">
        <div>
          <QuestionHead label="1. jautājums" text={questions.q1.text} hint={w.q1Hint} />
          <div className="mt-5 grid gap-3">
            {Object.entries(questions.q1.options).map(([key, label]) => (
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
          <QuestionHead label="2. jautājums" text={questions.q2.text} hint={w.q2Hint} />
          <div className="mt-5 grid gap-3">
            {Object.entries(questions.q2.options).map(([key, label]) => (
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

        <Reveal show={showQ3a}>
          <QuestionHead label="3. jautājums" text={questions.q3a.text} hint={questions.q3a.hint} />
          <div className="mt-5 grid gap-3">
            {Object.entries(questions.q3a.options).map(([key, label]) => (
              <OptionButton
                key={key}
                multi={false}
                active={q3a === key}
                label={label}
                onClick={() => single(q3a, setQ3a, key)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal show={showQ3b}>
          <QuestionHead label="3.b jautājums" text={questions.q3b.text} />
          <div className="mt-5 grid gap-3">
            {Object.entries(questions.q3b.options).map(([key, label]) => (
              <OptionButton
                key={key}
                multi={false}
                active={q3b === key}
                label={label}
                onClick={() => single(q3b, setQ3b, key)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal show={showQ4}>
          <QuestionHead label="Piegādātāja atrašanās vieta" text={questions.q4.text} />
          <div className="mt-5 grid gap-3">
            {Object.entries(questions.q4.options).map(([key, label]) => (
              <OptionButton
                key={key}
                multi={false}
                active={q4 === key}
                label={label}
                onClick={() => single(q4, setQ4, key)}
              />
            ))}
          </div>
        </Reveal>
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
  );
}
