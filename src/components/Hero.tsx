import { motion } from "framer-motion";

import lv from "@/i18n/lv";
import { regulationApplies } from "@/data";
import { Barcode, CropMarks, PRESS_SPRING, Perforation } from "@/components/primitives";

// The application date is canonical (data/regulation.json), not hardcoded here.
const appliesDigits = regulationApplies.replace(/-/g, "").split("").join(" ");

const stamps = [
  { text: lv.hero.stamp1, rotate: -8, delay: 0.15 },
  { text: regulationApplies, rotate: 5, delay: 0.3 },
  { text: lv.hero.stamp3, rotate: -3, delay: 0.45 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-dashed border-border-strong">
      <div aria-hidden className="paper-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <motion.p
              className="form-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PRESS_SPRING, delay: 0.05 }}
            >
              {lv.brand.tagline}
            </motion.p>
            <motion.h1
              className="mt-6 text-[13vw] leading-[0.92] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.2rem]"
              initial={{ opacity: 0, scale: 1.02, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...PRESS_SPRING, delay: 0.12 }}
            >
              {lv.hero.headline}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-[54ch] text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PRESS_SPRING, delay: 0.22 }}
            >
              {lv.hero.sub}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PRESS_SPRING, delay: 0.3 }}
            >
              <a
                href="#kalkulators"
                className="group inline-flex items-center gap-3 border border-primary bg-primary px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-[2px]"
              >
                {lv.hero.ctaPrimary}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#valstis"
                className="inline-flex items-center gap-3 border border-border-strong px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
              >
                {lv.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* The label */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24, rotate: -0.4 }}
            animate={{ opacity: 1, y: 0, rotate: -0.4 }}
            transition={{ ...PRESS_SPRING, delay: 0.1 }}
          >
            <div className="relative border-2 border-foreground bg-card p-5 shadow-[10px_10px_0_0_var(--border)] md:p-7">
              <CropMarks />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="form-label">{lv.hero.refLabel}</span>
                  <p className="data-value mt-1 text-lg font-bold">{lv.hero.ref}</p>
                </div>
                <div className="data-value border border-border-strong px-2 py-1 text-[10px] uppercase tracking-[0.16em]">
                  EU / 2025/40
                </div>
              </div>

              <div className="mt-6 grid gap-0">
                <div className="border-t-2 border-foreground pt-3">
                  <span className="form-label">{lv.hero.senderLabel}</span>
                  <p className="data-value mt-1 text-base md:text-xl">{lv.hero.sender}</p>
                </div>
                <div className="mt-4 border-t border-dashed border-border-strong pt-3">
                  <span className="form-label">{lv.hero.recipientLabel}</span>
                  <p className="data-value mt-1 text-2xl font-bold md:text-4xl">
                    {lv.hero.recipient}
                  </p>
                </div>
              </div>

              <Perforation className="my-5 opacity-70" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="form-label">{lv.hero.weightLabel}</span>
                  <p className="data-value mt-1 text-sm">{lv.hero.weight}</p>
                </div>
                <div>
                  <span className="form-label">{lv.hero.classLabel}</span>
                  <p className="data-value mt-1 text-sm">{lv.hero.class}</p>
                </div>
              </div>

              {/* stamps pressing in */}
              <div className="relative mt-7 flex flex-wrap items-center gap-3">
                {stamps.map((s) => (
                  <motion.span
                    key={s.text}
                    className="inline-flex items-center border-2 border-dashed px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] stamp-ink"
                    initial={{ opacity: 0, scale: 1.6, rotate: s.rotate * 2 }}
                    whileInView={
                      { opacity: 1, scale: 1, rotate: s.rotate }
                    }
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: "spring", stiffness: 210, damping: 24, delay: s.delay }}
                  >
                    {s.text}
                  </motion.span>
                ))}
              </div>

              <div className="mt-7 h-16 border-t-2 border-foreground pt-4">
                <Barcode seed="PPWR2026LV" className="h-full" />
              </div>
              <p className="data-value mt-2 text-center text-[10px] tracking-[0.4em] text-muted-foreground">
                {appliesDigits}
              </p>
            </div>
            <p className="form-label mt-4 text-center">{lv.hero.scrollHint}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
