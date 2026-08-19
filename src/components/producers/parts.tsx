import type { ReactNode } from "react";

import lv from "@/i18n/lv";
import { cn } from "@/lib/utils";

/** Source reference map — the single [S#] → {title,url} lookup for this section. */
const REFS = lv.producers.sources.refs as Record<string, { title: string; url: string }>;

/** One numbered source reference rendered as a small superscript link. */
export function RefLink({ id }: { id: string }) {
  const r = REFS[id];
  if (!r) return <sup className="font-mono text-[9px] text-muted-foreground">[{id}]</sup>;
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      title={r.title}
      className="ml-0.5 align-super font-mono text-[9px] font-semibold text-primary no-underline hover:underline"
    >
      {id}
    </a>
  );
}

/** Renders a copy string, turning inline `[S1][S2]` tokens into linked refs. */
export function RefText({ children, className }: { children: string; className?: string }) {
  const parts = children.split(/(\[S\d+\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = p.match(/^\[(S\d+)\]$/);
        return m ? <RefLink key={i} id={m[1] ?? ""} /> : <span key={i}>{p}</span>;
      })}
    </span>
  );
}

/** A trailing cluster of reference links (used where refs are a separate list). */
export function RefBadges({ ids }: { ids?: readonly string[] | undefined }) {
  if (!ids || ids.length === 0) return null;
  return (
    <span className="ml-1 inline-flex gap-0.5">
      {ids.map((id) => (
        <RefLink key={id} id={id} />
      ))}
    </span>
  );
}

/** Small stamp-style icon marks for the two-hats cards. */
function StampMark({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-current font-mono text-lg font-bold"
      style={{ borderRadius: 2 }}
    >
      {children}
    </span>
  );
}

/** Infographic #1 — "Divas cepures": izgatavotājs vs producer, side by side. */
export function TwoHatsInfographic() {
  const t = lv.producers.twoHats;
  const alt =
    "Salīdzinājums: izgatavotājs atbild par atbilstību visā ES pēc zīmola; ražotājs EPR izpratnē — par reģistrāciju un maksām katrā valstī pēc pirmās piegādes.";
  return (
    <div role="img" aria-label={alt} className="grid gap-4 md:grid-cols-2">
      <div className="relative border-2 border-foreground bg-card p-5">
        <div className="flex items-center gap-4">
          <StampMark>®</StampMark>
          <div>
            <span className="form-label block">Loma 1</span>
            <span className="data-value text-lg font-bold uppercase tracking-[-0.01em]">
              {t.mfrLabel}
            </span>
          </div>
        </div>
        <ul className="mt-5 space-y-2 border-t border-dashed border-border pt-4">
          {["Zīmols uz iepakojuma", "DoC + tehniskais fails", "1× visā ES"].map((r) => (
            <li key={r} className="data-value flex items-center gap-2 text-sm">
              <span aria-hidden className="text-primary">
                ▪
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative border-2 border-primary bg-card p-5">
        <div className="flex items-center gap-4 text-primary">
          <StampMark>◎</StampMark>
          <div>
            <span className="form-label block text-primary/80">Loma 2</span>
            <span className="data-value text-lg font-bold uppercase tracking-[-0.01em]">
              {t.producerLabel}
            </span>
          </div>
        </div>
        <ul className="mt-5 space-y-2 border-t border-dashed border-border pt-4">
          {["Pirmā piegāde valstī", "Reģistrācija + maksas", "Katrā valstī atsevišķi"].map((r) => (
            <li key={r} className="data-value flex items-center gap-2 text-sm">
              <span aria-hidden className="text-primary">
                ▪
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <p className="form-label md:col-span-2">
        Viens uzņēmums var nest abas cepures — vai tikai vienu.
      </p>
    </div>
  );
}

/** Infographic #4 — micro-enterprise 2×2 rule matrix. */
export function MicroMatrix() {
  const m = lv.producers.micro;
  return (
    <div role="img" aria-label={m.matrixAlt}>
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-center">
        <div />
        <span className="form-label self-end pb-2">{m.matrixCol1}</span>
        <span className="form-label self-end pb-2">{m.matrixCol2}</span>

        <span className="form-label flex items-center justify-end pr-2 text-right">
          {m.matrixRow1}
        </span>
        <MatrixCell label={m.cellSupplier} accent />
        <MatrixCell label={m.cellOwner} accent={false} />

        <span className="form-label flex items-center justify-end pr-2 text-right">
          {m.matrixRow2}
        </span>
        <MatrixCell label={m.cellOwner} accent={false} />
        <MatrixCell label={m.cellOwner} accent={false} />
      </div>
      <p className="mt-3 border-2 border-dashed px-3 py-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] stamp-ink">
        {m.matrixNote}
      </p>
    </div>
  );
}

function MatrixCell({ label, accent }: { label: string; accent: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-[72px] items-center justify-center border-2 p-3 text-center text-sm leading-snug",
        accent
          ? "border-[color:var(--stamp)] bg-card font-bold text-[color:var(--stamp)]"
          : "border-border-strong bg-card text-foreground",
      )}
    >
      {label}
    </div>
  );
}
