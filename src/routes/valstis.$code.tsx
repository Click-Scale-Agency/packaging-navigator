import { Link, createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import { canonicalUrl, socialImageMeta } from "@/lib/seo";
import { MATERIALS, countryByCode } from "@/data";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  CropMarks,
  FormRow,
  Perforation,
  Press,
  ProvenanceLine,
  UnverifiedStamp,
} from "@/components/primitives";

export const Route = createFileRoute("/valstis/$code")({
  head: ({ params }) => {
    const code = (params.code ?? "").toUpperCase();
    const country = countryByCode(code);
    const title = country
      ? `${country.name} (${country.code}) — PPWR reģistrs, PRO shēmas un nodokļi`
      : `${code} — nav datu | ${lv.brand.name}`;
    const description = country
      ? `${country.name}: ražotāju reģistrs, ražotāju atbildības organizācijas un papildu nodokļi iepakojumam saskaņā ar PPWR. Ar avotiem un pārbaudes datumu.`
      : lv.meta.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl(`/valstis/${code}`) },
        ...socialImageMeta,
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/valstis/${code}`) }],
    };
  },
  component: CountryDetail,
});

function CountryDetail() {
  const { code } = Route.useParams();
  const country = countryByCode(code);

  const annualMin = country?.pro.find((p) => p.minAnnualFeeEur !== null)?.minAnnualFeeEur ?? null;
  const regCost = country?.register.registrationCostEur ?? null;

  if (!country) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[1400px] px-5 py-28 md:px-10">
          <h1 className="text-4xl md:text-6xl">{lv.detail.notFound}</h1>
          <Link to="/" className="form-label mt-8 inline-block text-primary">
            ← {lv.detail.back}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <Press>
          <Link to="/" className="form-label inline-block text-primary">
            ← {lv.detail.back}
          </Link>
        </Press>

        <Press delay={0.05} className="relative mt-8 border-2 border-foreground bg-card p-5 md:p-8">
          <CropMarks />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="form-label">{country.name}</span>
              <p className="data-value text-[18vw] font-bold leading-[0.85] tracking-[-0.05em] sm:text-8xl md:text-[8rem]">
                {country.code}
              </p>
            </div>
            <div className="text-right">
              {country.verified ? (
                <span className="form-label">{lv.badge.verified}</span>
              ) : (
                <UnverifiedStamp />
              )}
              <p className="form-label mt-3">
                {lv.detail.lastReviewed}: {country.lastReviewed ?? "—"}
              </p>
            </div>
          </div>
          <Perforation className="mt-6 opacity-70" />
        </Press>

        {/* Regulējums un reģistrācija */}
        <Press delay={0.06} className="mt-14">
          <h2 className="text-2xl md:text-3xl">{lv.detail.regContextTitle}</h2>
          <div className="mt-6 border-t-2 border-foreground">
            <FormRow label={lv.detail.competentAuthority}>
              {country.competentAuthority ?? lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.legalBasis}>
              {country.legalBasis ?? lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.registrationCost}>
              {regCost === 0
                ? lv.detail.free
                : regCost !== null
                  ? `€${regCost}`
                  : lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.annualMinFee}>
              {annualMin !== null ? `€${annualMin}` : lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.arRequired}>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  {country.register.arRequired === true
                    ? lv.detail.yes
                    : country.register.arRequired === false
                      ? lv.detail.no
                      : lv.countries.unknown}
                </span>
                <ProvenanceLine provenance={country.register.arProvenance ?? null} />
              </span>
            </FormRow>
            {country.register.numberOnInvoices !== null ? (
              <FormRow label={lv.detail.numberOnInvoices}>
                {country.register.numberOnInvoices ? lv.detail.yes : lv.detail.no}
              </FormRow>
            ) : null}
            {country.register.deMinimis ? (
              <FormRow label={lv.detail.deMinimis}>{country.register.deMinimis}</FormRow>
            ) : null}
          </div>
          {country.register.arRequired === true ? (
            <p className="mt-3 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
              {lv.detail.arHint}
            </p>
          ) : null}
        </Press>

        {/* Reporting */}
        {country.reporting ? (
          <Press delay={0.07} className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl md:text-3xl">{lv.detail.reportingTitle}</h2>
              <ProvenanceLine provenance={country.reporting.provenance ?? null} />
            </div>
            <div className="mt-6 border-t-2 border-foreground">
              {country.reporting.frequency ? (
                <FormRow label={lv.detail.reportingFrequency}>
                  {country.reporting.frequency}
                </FormRow>
              ) : null}
              {country.reporting.deadlines.length ? (
                <FormRow label={lv.detail.reportingDeadlines}>
                  <ul className="space-y-1">
                    {country.reporting.deadlines.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                </FormRow>
              ) : null}
              {country.reporting.zeroDeclaration !== null ? (
                <FormRow label={lv.detail.reportingZero}>
                  {country.reporting.zeroDeclaration ? lv.detail.yes : lv.detail.no}
                </FormRow>
              ) : null}
              {country.reporting.correction ? (
                <FormRow label={lv.detail.reportingCorrection}>
                  {country.reporting.correction}
                </FormRow>
              ) : null}
              {country.reporting.note ? (
                <FormRow label="Piezīme">{country.reporting.note}</FormRow>
              ) : null}
            </div>
          </Press>
        ) : null}

        {/* Layer 1 */}
        <Press delay={0.08} className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl md:text-3xl">{lv.detail.registerTitle}</h2>
            <ProvenanceLine provenance={country.register.provenance ?? null} />
          </div>
          <div className="mt-6 border-t-2 border-foreground">
            <FormRow label={lv.detail.exists}>
              {country.register.exists ? lv.detail.yes : lv.detail.no}
            </FormRow>
            <FormRow label={lv.detail.registerName}>
              {country.register.name ?? lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.registerFormat}>
              {country.register.numberFormat ?? lv.countries.unknown}
            </FormRow>
            <FormRow label={lv.detail.registerUrl}>
              {country.register.url ? (
                <a
                  href={country.register.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline decoration-dashed underline-offset-4"
                >
                  {country.register.url}
                </a>
              ) : (
                lv.countries.none
              )}
            </FormRow>
            {country.register.note ? (
              <FormRow label="Piezīme">{country.register.note}</FormRow>
            ) : null}
          </div>
        </Press>

        {/* Layer 2 */}
        <Press delay={0.08} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.detail.proTitle}</h2>
          {country.pro.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{lv.detail.noPro}</p>
          ) : (
            <>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {country.pro.map((scheme) => (
                  <div key={scheme.name} className="border border-border-strong bg-card p-4">
                    <p className="data-value text-base font-bold">{scheme.name}</p>
                    {scheme.url ? (
                      <a
                        href={scheme.url}
                        target="_blank"
                        rel="noreferrer"
                        className="data-value mt-1 block break-all text-xs text-primary underline decoration-dashed underline-offset-4"
                      >
                        {scheme.url}
                      </a>
                    ) : null}
                    <FormRow label={lv.detail.membership}>
                      {scheme.membershipRequired ? lv.detail.yes : lv.detail.no}
                    </FormRow>
                    <FormRow label={lv.detail.tariffYear}>
                      {scheme.tariffYear ?? lv.countries.unknown}
                    </FormRow>
                    {scheme.note ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {scheme.note}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Rates belong to the country's reference scheme, not to every
                  scheme — render them once, clearly attributed. */}
              {(() => {
                const ref = country.pro[0];
                const hasAnyRate = MATERIALS.some((m) => typeof ref?.rates?.[m] === "number");
                if (!ref || !hasAnyRate) return null;
                return (
                  <div className="mt-4 border border-border-strong bg-card p-4">
                    <span className="form-label">{lv.detail.ratesRefScheme(ref.name)}</span>
                    <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3">
                      {MATERIALS.map((m) => (
                        <li key={m} className="flex items-baseline justify-between gap-2">
                          <span className="form-label truncate">{lv.materials[m]}</span>
                          <span className="data-value text-sm">{ref.rates?.[m] ?? "—"}</span>
                        </li>
                      ))}
                    </ul>
                    {country.pro.length > 1 ? (
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {lv.detail.ratesRefNote}
                      </p>
                    ) : null}
                    {ref.ratesProvenance ? (
                      <span className="mt-3 block">
                        <ProvenanceLine provenance={ref.ratesProvenance} />
                      </span>
                    ) : !country.verified ? (
                      <span className="mt-3 block">
                        <UnverifiedStamp short />
                      </span>
                    ) : null}
                  </div>
                );
              })()}
            </>
          )}
        </Press>

        {/* Statutory fallback (e.g. LV DRN full rates) */}
        {country.statutoryFallback ? (
          <Press delay={0.08} className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl md:text-3xl">{lv.detail.statutoryTitle}</h2>
              <ProvenanceLine provenance={country.statutoryFallback.provenance ?? null} />
            </div>
            <p className="mt-3 max-w-[75ch] text-sm text-muted-foreground">
              {country.statutoryFallback.name}
            </p>
            <p className="mt-2 max-w-[75ch] border-l-2 border-primary pl-3 text-sm leading-relaxed text-primary">
              {lv.detail.statutoryScenarioNote}
            </p>
            <div className="mt-6 border-t-2 border-foreground">
              {country.statutoryFallback.appliesWhen ? (
                <FormRow label={lv.detail.statutoryAppliesWhen}>
                  {country.statutoryFallback.appliesWhen}
                </FormRow>
              ) : null}
              {country.statutoryFallback.tariffYear !== null ? (
                <FormRow label={lv.detail.statutoryTariffYear}>
                  {country.statutoryFallback.tariffYear}
                </FormRow>
              ) : null}
              <div className="border-t border-dashed border-border py-3">
                <span className="form-label">{lv.detail.statutoryRatesLabel}</span>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                  {MATERIALS.map((m) => (
                    <li key={m} className="flex items-baseline justify-between gap-2">
                      <span className="form-label truncate">{lv.materials[m]}</span>
                      <span className="data-value text-sm">
                        {country.statutoryFallback?.rates[m] ?? "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {country.statutoryFallback.note ? (
                <FormRow label="Piezīme">{country.statutoryFallback.note}</FormRow>
              ) : null}
              {country.statutoryFallback.url ? (
                <FormRow label={lv.detail.registerUrl}>
                  <a
                    href={country.statutoryFallback.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-primary underline decoration-dashed underline-offset-4"
                  >
                    {country.statutoryFallback.url}
                  </a>
                </FormRow>
              ) : null}
            </div>
          </Press>
        ) : null}

        {/* Layer 3 */}
        <Press delay={0.08} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.detail.taxesTitle}</h2>
          {country.extraTaxes.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{lv.detail.noTaxes}</p>
          ) : (
            <div className="mt-6 border-t-2 border-foreground">
              {country.extraTaxes.map((tax) => (
                <div key={tax.name} className="border-b border-dashed border-border py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="data-value text-base">{tax.name}</p>
                    <p className="data-value text-base">
                      {tax.ratePerKg !== null ? `${tax.ratePerKg} €/kg` : lv.countries.unknown}
                      {tax.material ? ` · ${lv.materials[tax.material]}` : ""}
                    </p>
                  </div>
                  {tax.provenance ? (
                    <span className="mt-2 block">
                      <ProvenanceLine provenance={tax.provenance} />
                    </span>
                  ) : null}
                  {tax.note ? (
                    <p className="mt-2 max-w-[70ch] text-sm text-muted-foreground">{tax.note}</p>
                  ) : null}
                  {tax.url ? (
                    <a
                      href={tax.url}
                      target="_blank"
                      rel="noreferrer"
                      className="data-value mt-2 block break-all text-xs text-primary underline decoration-dashed underline-offset-4"
                    >
                      {tax.url}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Press>

        {/* Deposit-return system */}
        {country.drs ? (
          <Press delay={0.08} className="mt-16">
            <h2 className="text-2xl md:text-3xl">{lv.detail.depositTitle}</h2>
            <div className="mt-6 border-t-2 border-foreground">
              <FormRow label={lv.detail.depositActive}>
                {country.drs.active === true
                  ? lv.detail.yes
                  : country.drs.active === false
                    ? lv.detail.no
                    : lv.countries.unknown}
              </FormRow>
              {country.drs.operator ? (
                <FormRow label="Operators">{country.drs.operator}</FormRow>
              ) : null}
              {country.drs.deposit ? (
                <FormRow label="Depozīts">{country.drs.deposit}</FormRow>
              ) : null}
              {country.drs.note ? <FormRow label="Piezīme">{country.drs.note}</FormRow> : null}
              {country.drs.provenance ? (
                <FormRow label={lv.detail.verification}>
                  <ProvenanceLine provenance={country.drs.provenance} />
                </FormRow>
              ) : null}
            </div>
            {country.drs.url ? (
              <a
                href={country.drs.url}
                target="_blank"
                rel="noreferrer"
                className="data-value mt-3 block break-all text-xs text-primary underline decoration-dashed underline-offset-4"
              >
                {country.drs.url}
              </a>
            ) : null}
          </Press>
        ) : null}

        {/* Sources */}
        <Press delay={0.08} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.detail.sourcesTitle}</h2>
          {country.sources.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{lv.detail.noSources}</p>
          ) : (
            <ul className="mt-6 border-t-2 border-foreground">
              {country.sources.map((source) => (
                <li
                  key={source.url}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-dashed border-border py-3"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="data-value text-sm text-primary underline decoration-dashed underline-offset-4"
                  >
                    {source.title}
                  </a>
                  <span className="form-label">
                    {lv.detail.checkedAt}: {source.checkedAt}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 border border-dashed border-border-strong px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {lv.calculator.disclaimer}
          </p>
        </Press>
      </main>
      <Footer />
    </>
  );
}
