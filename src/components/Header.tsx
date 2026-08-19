import { Link } from "@tanstack/react-router";

import lv from "@/i18n/lv";

const REPO = "https://github.com/Click-Scale-Agency/packaging-navigator";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-border-strong bg-background/90 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-3 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="data-value text-[13px] font-bold uppercase tracking-[0.06em]">
            {lv.brand.name}
          </span>
          <span className="form-label hidden md:inline">{lv.brand.subtitle}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <Link
            to="/celvedis"
            className="form-label hidden transition-colors hover:text-primary sm:inline"
          >
            {lv.nav.guide}
          </Link>
          <Link
            to="/razotajiem"
            className="form-label hidden transition-colors hover:text-primary sm:inline"
          >
            {lv.producers.nav}
          </Link>
          {[
            { href: "#kalkulators", label: lv.nav.calculator },
            { href: "#valstis", label: lv.nav.countries },
            { href: "#numuri", label: lv.nav.numbers },
            { href: "#laika-linija", label: lv.nav.timeline },
            { href: "#video", label: lv.nav.video },
            { href: "#buj", label: lv.nav.faq },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="form-label hidden transition-colors hover:text-primary sm:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="form-label border border-border-strong px-2 py-1 transition-colors hover:border-primary hover:text-primary"
          >
            {lv.nav.repo}
          </a>
        </nav>
      </div>
    </header>
  );
}
