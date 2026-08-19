import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calculator as CalculatorIcon,
  FileText,
  Globe2,
  Home,
  Menu,
  X,
} from "lucide-react";

import lv from "@/i18n/lv";

const REPO = "https://github.com/Click-Scale-Agency/packaging-navigator";

type Primary = {
  key: string;
  label: string;
  icon: typeof Home;
  to: "/" | "/celvedis";
  hash?: string;
};

const PRIMARY: Primary[] = [
  { key: "home", label: lv.nav.home, icon: Home, to: "/" },
  { key: "guide", label: lv.nav.guide, icon: FileText, to: "/celvedis" },
  { key: "calc", label: lv.nav.calculator, icon: CalculatorIcon, to: "/", hash: "kalkulators" },
  { key: "countries", label: lv.nav.countries, icon: Globe2, to: "/", hash: "valstis" },
];

const MORE_ROUTES = [
  { to: "/razotajiem" as const, label: lv.producers.nav },
  { to: "/metodologija" as const, label: lv.nav.methodology },
];

const MORE_SECTIONS = [
  { hash: "numuri", label: lv.nav.numbers },
  { hash: "laika-linija", label: lv.nav.timeline },
  { hash: "video", label: lv.nav.video },
  { hash: "buj", label: lv.nav.faq },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isActive = (item: Primary) => {
    if (item.to === "/celvedis") return pathname === "/celvedis";
    if (item.hash) return pathname === "/" && hash === item.hash;
    return pathname === "/" && !hash;
  };

  const itemClass = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2 ${
      active ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label={lv.nav.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/30"
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-dashed border-border-strong bg-background pb-[calc(env(safe-area-inset-bottom)+4.75rem)]">
            <div className="flex items-center justify-between px-5 py-3">
              <span className="form-label">{lv.nav.menu}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={lv.nav.close}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <ul className="border-t border-dashed border-border-strong">
              {MORE_ROUTES.map((item) => (
                <li key={item.to} className="border-b border-dashed border-border">
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="form-label block px-5 py-4 text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {MORE_SECTIONS.map((item) => (
                <li key={item.hash} className="border-b border-dashed border-border">
                  <Link
                    to="/"
                    hash={item.hash}
                    onClick={() => setOpen(false)}
                    className="form-label block px-5 py-4 text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="form-label block px-5 py-4 text-primary"
                >
                  {lv.nav.repo}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <nav
        aria-label={lv.nav.menu}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-dashed border-border-strong bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <div className="flex items-stretch">
          {PRIMARY.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                className={itemClass(active)}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={`h-[2px] w-5 ${active ? "bg-primary" : "bg-transparent"}`}
                />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={itemClass(open)}
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em]">{lv.nav.more}</span>
            <span
              aria-hidden
              className={`h-[2px] w-5 ${open ? "bg-primary" : "bg-transparent"}`}
            />
          </button>
        </div>
      </nav>
    </>
  );
}
