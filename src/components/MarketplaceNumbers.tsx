import { Link } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { countries } from "@/data";
import { Press, SectionHead, UnverifiedStamp } from "@/components/primitives";

/** Countries whose register issues a producer number relevant to marketplaces:
 * either a known number format or a number that must appear on invoices. */
const rows = countries
  .filter(
    (c) =>
      c.register.numberFormat !== null || c.register.numberOnInvoices === true,
  )
  .sort((a, b) => {
    // countries with a concrete format first, then by code
    const af = a.register.numberFormat ? 0 : 1;
    const bf = b.register.numberFormat ? 0 : 1;
    return af - bf || a.code.localeCompare(b.code);
  });

function invoiceLabel(v: boolean | null): string {
  if (v === true) return lv.marketplace.yes;
  if (v === false) return lv.marketplace.no;
  return lv.marketplace.unknown;
}

export function MarketplaceNumbers() {
  return (
    <section className="border-b border-dashed border-border-strong">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          id="numuri"
          kicker={lv.marketplace.kicker}
          title={lv.marketplace.title}
          lead={lv.marketplace.lead}
        />

        <Press delay={0.08} className="mt-14">
          <div className="border-2 border-foreground bg-card">
            <div className="grid grid-cols-[3rem_minmax(0,1fr)_5rem] gap-3 border-b-2 border-foreground px-4 py-3 md:grid-cols-[4rem_minmax(0,14rem)_minmax(0,1fr)_6rem]">
              <span className="form-label">{lv.marketplace.colCountry}</span>
              <span className="form-label hidden md:block">
                {lv.marketplace.colRegister}
              </span>
              <span className="form-label">{lv.marketplace.colFormat}</span>
              <span className="form-label text-right">
                {lv.marketplace.colInvoice}
              </span>
            </div>

            <ul>
              {rows.map((c) => (
                <li
                  key={c.code}
                  className="grid grid-cols-[3rem_minmax(0,1fr)_5rem] items-start gap-3 border-b border-dashed border-border px-4 py-3 md:grid-cols-[4rem_minmax(0,14rem)_minmax(0,1fr)_6rem]"
                >
                  <Link
                    to="/valstis/$code"
                    params={{ code: c.code }}
                    className="data-value text-lg font-bold leading-none text-primary underline decoration-dashed underline-offset-4 transition-opacity hover:opacity-70 md:text-xl"
                  >
                    {c.code}
                  </Link>
                  <span className="data-value hidden truncate text-sm text-muted-foreground md:block">
                    {c.register.name ?? lv.marketplace.unknown}
                  </span>
                  <span className="data-value text-sm">
                    {c.register.numberFormat ?? (
                      <span className="text-muted-foreground">
                        {lv.marketplace.none}
                      </span>
                    )}
                    {!c.verified ? (
                      <span className="mt-1 block">
                        <UnverifiedStamp short />
                      </span>
                    ) : null}
                  </span>
                  <span className="form-label text-right">
                    {invoiceLabel(c.register.numberOnInvoices)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {lv.calculator.disclaimer}
          </p>
        </Press>
      </div>
    </section>
  );
}
