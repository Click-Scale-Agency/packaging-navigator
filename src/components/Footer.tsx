import { Link } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { Barcode, Perforation, Press } from "@/components/primitives";

const REPO = "https://github.com/Click-Scale-Agency/packaging-navigator";
const CHANGELOG = `${REPO}/blob/main/CHANGELOG.md`;
const AGENCY = "https://clickscale.agency";

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
            <span className="form-label mt-6 block">{lv.footer.resourcesLabel}</span>
            <Link
              to="/metodologija"
              className="data-value mt-2 block text-sm text-primary underline decoration-dashed underline-offset-4"
            >
              {lv.footer.methodology}
            </Link>
            <a
              href={CHANGELOG}
              target="_blank"
              rel="noreferrer"
              className="data-value mt-1 block text-sm text-primary underline decoration-dashed underline-offset-4"
            >
              {lv.footer.changelog}
            </a>
          </div>
          <div>
            <span className="form-label">Uzturētājs</span>
            <a
              href={AGENCY}
              target="_blank"
              rel="noreferrer"
              className="data-value mt-2 block text-sm text-primary underline decoration-dashed underline-offset-4"
            >
              {lv.footer.credit}
            </a>
            <div className="mt-6 h-10">
              <Barcode seed="CLICKSCALE" className="h-full opacity-70" />
            </div>
          </div>
        </Press>

        <Press className="mt-12 border-t border-dashed border-border-strong pt-8">
          <span className="form-label">{lv.footer.sourcesLabel}</span>
          <ul className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-8">
            {lv.footer.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="data-value text-[13px] text-primary underline decoration-dashed underline-offset-4"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Press>

        <p className="mt-10 border-t border-dashed border-border-strong pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {lv.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
