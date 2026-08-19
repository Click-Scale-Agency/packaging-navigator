import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import lv from "@/i18n/lv";
import { timeline } from "@/data";
import { Press, SectionHead } from "@/components/primitives";
import { useRevealMotion } from "@/hooks/use-reveal-motion";
import { cn } from "@/lib/utils";


export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  // Computed after hydration only: the server render happens at build time and
  // would otherwise disagree with the client about which date is "today".
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const currentIndex = today
    ? timeline.reduce(
        (acc, entry, i) => (new Date(entry.date) <= today ? i : acc),
        -1,
      )
    : -1;

  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="laika-linija"
          kicker={lv.timeline.kicker}
          title={lv.timeline.title}
          lead={lv.timeline.lead}
        />

        <div ref={ref} className="relative mt-16">
          <div className="relative h-px w-full border-t border-dashed border-border-strong">
            <motion.div style={{ width }} className="absolute -top-px left-0 h-[3px] bg-foreground" />
          </div>

          <ol className="mt-0 grid gap-8 md:grid-cols-5 md:gap-4">
            {timeline.map((entry, i) => {
              const isCurrent = i === currentIndex;
              return (
                <Press as="li" key={entry.date} delay={i * 0.06} className="relative pt-8">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-[7px] left-0 h-3 w-3 border-2",
                      isCurrent
                        ? "border-stamp bg-stamp"
                        : "border-border-strong bg-background",
                    )}
                  />
                  <span className="data-value block text-sm font-bold">{entry.date}</span>
                  <span className="mt-2 block text-lg leading-tight md:text-xl">
                    {entry.label}
                  </span>
                  <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                    {entry.detail}
                  </p>
                  {isCurrent ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 1.5, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 22 }}
                      className="mt-4 inline-flex border-2 border-dashed px-2 py-1 font-mono text-[10px] font-bold tracking-[0.18em] stamp-ink"
                    >
                      {lv.timeline.now}
                    </motion.span>
                  ) : null}
                </Press>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
