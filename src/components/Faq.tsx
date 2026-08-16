import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import lv from "@/i18n/lv";
import { Press, SectionHead } from "@/components/primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="buj" kicker={lv.faq.kicker} title={lv.faq.title} />

        <div className="mt-12 max-w-[80ch] border-t border-dashed border-border-strong">
          {lv.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Press key={item.q} delay={i * 0.05}>
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
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pl-10 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {item.a}
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
