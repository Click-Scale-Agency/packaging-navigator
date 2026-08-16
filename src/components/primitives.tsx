import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import lv from "@/i18n/lv";
import { cn } from "@/lib/utils";

/** Soft press spring — like a rubber stamp, never bouncy. */
export const PRESS_SPRING = { type: "spring", stiffness: 190, damping: 26, mass: 0.9 } as const;
export const REVEAL_DURATION = 0.55;
export const STAGGER_STEP = 0.07;

/** Section reveal: presses in from 1.02 → 1. */
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
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, scale: 1.02, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...PRESS_SPRING, delay }}
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
