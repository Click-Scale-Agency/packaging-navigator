import lv from "@/i18n/lv";
import { Barcode, Perforation, Press } from "@/components/primitives";

const REPO = "https://github.com/Click-Scale-Agency/eu-packaging-hub";

export function Footer() {
  return (
    <footer className="bg-background">
      <Perforation className="opacity-60" />
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <Press className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="data-value text-sm font-bold uppercase tracking-[0.08em]">
              {lv.brand.name}
            </p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
              {lv.footer.dataProduct}
            </p>
          </div>
          <div>
            <span className="form-label">Repozitorijs</span>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="data-value mt-2 block text-sm text-primary underline decoration-dashed underline-offset-4"
            >
              {lv.footer.repo}
            </a>
            <span className="form-label mt-6 block">Licence</span>
            <p className="data-value mt-2 text-sm">{lv.footer.licence}</p>
          </div>
          <div>
            <span className="form-label">Uzturētājs</span>
            <p className="data-value mt-2 text-sm">{lv.footer.credit}</p>
            <div className="mt-6 h-10">
              <Barcode seed="CLICKSCALE" className="h-full opacity-70" />
            </div>
          </div>
        </Press>

        <p className="mt-12 border-t border-dashed border-border-strong pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {lv.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
