import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import lv from "@/i18n/lv";
import { Press, SectionHead } from "@/components/primitives";

type FlatItem = { q: string; a: string; index: number };

const groups: { title: string; items: FlatItem[] }[] = (() => {
  let n = 0;
  return lv.faq.groups.map((g) => ({
    title: g.title,
    items: g.items.map((it) => ({ q: it.q, a: it.a, index: ++n })),
  }));
})();

export function Faq() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead id="buj" kicker={lv.faq.kicker} title={lv.faq.title} lead={lv.faq.lead} />

        <div className="mt-12 max-w-[80ch]">
          {groups.map((group, gi) => (
            <div key={group.title} className={gi === 0 ? "" : "mt-12"}>
              <h3 className="form-label text-muted-foreground">{group.title}</h3>

              <div className="mt-4 border-t border-dashed border-border-strong">
                {group.items.map((item, i) => {
                  const isOpen = open === item.index;
                  return (
                    <Press key={item.q} delay={i * 0.04}>
                      <div className="border-b border-dashed border-border-strong">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : item.index)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-primary"
                        >
                          <span className="data-value pt-1 text-[11px] tracking-[0.18em] text-muted-foreground">
                            {String(item.index).padStart(2, "0")}
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
          ))}
        </div>
      </div>
    </section>
  );
}
