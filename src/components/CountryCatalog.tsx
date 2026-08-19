import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import lv from "@/i18n/lv";
import { countries } from "@/data";
import { CropMarks, Press, SectionHead, UnverifiedStamp } from "@/components/primitives";
import { useIsMobile } from "@/hooks/use-mobile";

/** Keep the mobile document short — a 24k px page makes iOS Safari drop paint. */
const MOBILE_SLICE = 8;

export function CountryCatalog() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
    );
  }, [query]);

  const collapsed = isMobile && !expanded && !query.trim() && list.length > MOBILE_SLICE;
  const visible = collapsed ? list.slice(0, MOBILE_SLICE) : list;

  return (
    <section className="border-b border-dashed border-border-strong bg-paper-deep/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="valstis"
          kicker={lv.countries.kicker}
          title={lv.countries.title}
          lead={lv.countries.lead}
        />

        <Press className="mt-10 max-w-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lv.countries.searchPlaceholder}
            className="data-value w-full border-b-2 border-foreground bg-transparent pb-2 text-base outline-none placeholder:text-muted-foreground focus:border-primary"
            aria-label={lv.countries.searchPlaceholder}
          />
        </Press>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((c, i) => (
            <Press key={c.code} delay={Math.min(i * 0.02, 0.24)}>

              <Link
                to="/valstis/$code"
                params={{ code: c.code }}
                className="group relative block h-full border border-border-strong bg-card p-4 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-[6px_6px_0_0_var(--border)]"
              >
                <CropMarks />
                <div className="flex items-start justify-between gap-3">
                  <span className="data-value text-4xl font-bold leading-none tracking-[-0.04em]">
                    {c.code}
                  </span>
                  <span className="form-label text-right">{c.name}</span>
                </div>

                <div className="mt-5">
                  <Row label={lv.countries.layerRegister}>
                    {c.register.exists
                      ? (c.register.name ?? lv.countries.unknown)
                      : lv.countries.noRegister}
                  </Row>
                  <Row label={lv.countries.layerPro}>
                    {c.pro.length
                      ? c.pro.map((p) => p.name).join(" · ")
                      : lv.countries.unknown}
                  </Row>
                  <Row label={lv.countries.layerTaxes}>
                    {c.extraTaxes.length
                      ? c.extraTaxes.map((t) => t.name).join(" · ")
                      : lv.countries.none}
                  </Row>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-border pt-3">
                  {c.verified ? (
                    <span className="form-label">{lv.badge.verified}</span>
                  ) : (
                    <UnverifiedStamp short />
                  )}
                  <span className="form-label text-primary transition-transform group-hover:translate-x-1">
                    {lv.countries.open} →
                  </span>
                </div>
              </Link>
            </Press>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-dashed border-border py-2">
      <span className="form-label">{label}</span>
      <p className="data-value mt-1 line-clamp-2 text-[13px] leading-snug">{children}</p>
    </div>
  );
}
