import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import lv from "@/i18n/lv";

const SHOW_AT = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AT);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-5 z-50 border border-primary bg-background/90 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary shadow-sm backdrop-blur-[2px] transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-8 md:right-8"
          aria-label={lv.a11y.backToTop}
        >
          {lv.a11y.backToTop} ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
