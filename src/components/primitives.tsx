import { motion } from "framer-motion";
import type { ReactNode } from "react";

import lv from "@/i18n/lv";
import type { FactStatus, Provenance } from "@/data";
import { useRevealMotion } from "@/hooks/use-reveal-motion";
import { cn } from "@/lib/utils";

/** Soft press spring — like a rubber stamp, never bouncy. */
export const PRESS_SPRING = { type: "spring", stiffness: 190, damping: 26, mass: 0.9 } as const;
export const REVEAL_DURATION = 0.55;
export const STAGGER_STEP = 0.07;

/** Section reveal: presses in from 1.02 → 1. Desktop only (see useRevealMotion). */
export function Press({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "tr";
}) {
  const animate = useRevealMotion();
  const Comp = motion[as] as typeof motion.div;
  if (!animate) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, scale: 1.02, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...PRESS_SPRING, delay }}
      onAnimationComplete={() => {
        /* release the composited layer once the reveal is done */
      }}
      style={{ willChange: "auto" }}
    >
      {children}
    </Comp>
  );
}


export function SectionHead({
  kicker,
  title,
  lead,
  id,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <Press className="flex items-center gap-4">
        <span className="form-label">{kicker}</span>
        <span className="h-px flex-1 border-t border-dashed border-border-strong" />
      </Press>
      <Press delay={0.05}>
        <h2 className="mt-6 text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">{title}</h2>
      </Press>
      {lead ? (
        <Press delay={0.1}>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            {lead}
          </p>
        </Press>
      ) : null}
    </div>
  );
}

/** Red stamp badge for unverified data. Red is reserved for this. */
export function UnverifiedStamp({
  short = false,
  className,
}: {
  short?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex -rotate-2 items-center border-2 border-dashed px-2 py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.12em] stamp-ink",
        className,
      )}
    >
      {short ? lv.badge.unverifiedShort : lv.badge.unverified}
    </span>
  );
}

/** Visual treatment per verification status (red stays reserved for the stamp). */
const STATUS_STYLE: Record<FactStatus, string> = {
  official: "border-primary text-primary",
  operator_published: "border-primary text-primary",
  secondary_source: "border-border-strong text-foreground",
  inferred: "border-dashed border-border-strong text-muted-foreground",
  unverified: "border-dashed border-border-strong text-muted-foreground",
  not_applicable: "border-border text-muted-foreground",
  unknown: "border-dashed border-border text-muted-foreground",
};

/** Small per-fact verification tag — shows the status of one tariff/obligation. */
export function StatusTag({ status, className }: { status: FactStatus; className?: string }) {
  return (
    <span
      title={lv.statusDesc[status]}
      className={cn(
        "inline-flex items-center border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
        STATUS_STYLE[status],
        className,
      )}
    >
      {lv.status[status]}
    </span>
  );
}

/**
 * Per-fact provenance line: a status tag plus an optional validity window and
 * "checked" date, so a rate/obligation carries its own truth in the UI.
 */
export function ProvenanceLine({
  provenance,
  className,
}: {
  provenance?: Provenance | null;
  className?: string;
}) {
  if (!provenance) return null;
  const { status, validFrom, validTo, checkedAt } = provenance;
  const validity =
    validFrom || validTo
      ? `${lv.status.validLabel}: ${validFrom ?? "…"}${validTo ? `–${validTo}` : "+"}`
      : null;
  return (
    <span className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      <StatusTag status={status} />
      {validity ? <span className="form-label">{validity}</span> : null}
      {checkedAt ? (
        <span className="form-label">
          {lv.detail.checkedAt}: {checkedAt}
        </span>
      ) : null}
    </span>
  );
}

/** Corner crop marks around a document block. */
export function CropMarks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((pos) => (
        <span key={pos} className={cn("absolute h-3 w-3 border-border-strong", pos)} />
      ))}
    </div>
  );
}

/** A labelled row from a customs form. */
export function FormRow({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1 border-t border-dashed border-border py-3", className)}>
      <span className="form-label">{label}</span>
      <div className="data-value text-sm text-foreground">{children}</div>
    </div>
  );
}

export function Perforation({ className }: { className?: string }) {
  return <div aria-hidden className={cn("perforation w-full", className)} />;
}

export function Barcode({ seed = "PPWR", className }: { seed?: string; className?: string }) {
  const bars = Array.from({ length: 58 }, (_, i) => {
    const n = (seed.charCodeAt(i % seed.length) * (i + 7)) % 11;
    return n < 4 ? 1 : n < 8 ? 2 : 3;
  });
  return (
    <div aria-hidden className={cn("flex h-full items-stretch gap-[2px]", className)}>
      {bars.map((w, i) => (
        <span key={i} style={{ width: w }} className="bg-foreground" />
      ))}
    </div>
  );
}
