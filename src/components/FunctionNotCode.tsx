import lv from "@/i18n/lv";
import { CropMarks, Press, SectionHead } from "@/components/primitives";

export function FunctionNotCode() {
  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="funkcija"
          kicker={lv.functionNotCode.kicker}
          title={lv.functionNotCode.title}
          lead={lv.functionNotCode.lead}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {lv.functionNotCode.points.map((p, i) => (
            <Press key={p.title} delay={i * 0.07}>
              <article className="relative h-full border border-border-strong bg-card p-5 md:p-6">
                <CropMarks />
                <span className="data-value text-xs tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl leading-tight md:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </article>
            </Press>
          ))}
        </div>
      </div>
    </section>
  );
}
