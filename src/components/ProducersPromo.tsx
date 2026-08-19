import { Link } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { Press } from "@/components/primitives";

export function ProducersPromo() {
  const p = lv.producers.promo;
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Press>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <span className="form-label">{p.kicker}</span>
              <h2 className="mt-5 text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">
                {p.title}
              </h2>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                {p.lead}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {[p.bullet1, p.bullet2, p.bullet3].map((b, i) => (
                  <li key={b} className="border-l-2 border-primary pl-3 text-sm leading-snug">
                    <span className="form-label block">{`0${i + 1}`}</span>
                    <span className="mt-1 block">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/razotajiem"
              className="data-value inline-flex shrink-0 items-center justify-center border-2 border-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-colors hover:border-primary hover:text-primary"
            >
              {p.cta} →
            </Link>
          </div>
        </Press>
      </div>
    </section>
  );
}
