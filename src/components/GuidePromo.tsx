import { Link } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { CropMarks, Press } from "@/components/primitives";

export function GuidePromo() {
  return (
    <section id="celvedis" className="scroll-mt-24 border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Press>
          <div className="relative border-2 border-foreground bg-card p-6 md:p-10">
            <CropMarks />
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="min-w-0">
                <span className="form-label">{lv.guide.promoKicker}</span>
                <h2 className="mt-5 text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">
                  {lv.guide.promoTitle}
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                  {lv.guide.promoLead}
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    lv.guide.promoBullet1,
                    lv.guide.promoBullet2,
                    lv.guide.promoBullet3,
                  ].map((b, i) => (
                    <li
                      key={b}
                      className="border-l-2 border-primary pl-3 text-sm leading-snug"
                    >
                      <span className="form-label block">{`0${i + 1}`}</span>
                      <span className="mt-1 block">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/celvedis"
                className="data-value inline-flex shrink-0 items-center justify-center border-2 border-foreground bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-background transition-colors hover:bg-background hover:text-foreground"
              >
                {lv.guide.promoCta} →
              </Link>
            </div>
          </div>
        </Press>
      </div>
    </section>
  );
}
