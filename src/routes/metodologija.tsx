import { createFileRoute } from "@tanstack/react-router";

import lv from "@/i18n/lv";
import type { FactStatus } from "@/data";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Press, SectionHead, StatusTag } from "@/components/primitives";

const REPO = "https://github.com/Click-Scale-Agency/packaging-navigator";
const CHANGELOG = `${REPO}/blob/main/CHANGELOG.md`;

/** Statuses in trust order — matches the enum in the canonical schema. */
const STATUSES: FactStatus[] = [
  "official",
  "operator_published",
  "secondary_source",
  "inferred",
  "unverified",
  "not_applicable",
  "unknown",
];

export const Route = createFileRoute("/metodologija")({
  head: () => {
    const title = `${lv.methodology.metaTitle} — ${lv.brand.name}`;
    const description = lv.methodology.lead;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <SectionHead
          kicker={lv.methodology.kicker}
          title={lv.methodology.title}
          lead={lv.methodology.lead}
        />

        {/* Three layers */}
        <Press delay={0.06} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.methodology.layersTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
            {lv.methodology.layersLead}
          </p>
          <ul className="mt-6 border-t-2 border-foreground">
            {[lv.methodology.layerRegister, lv.methodology.layerPro, lv.methodology.layerTaxes].map(
              (line) => (
                <li
                  key={line}
                  className="border-b border-dashed border-border py-4 text-sm leading-relaxed"
                >
                  {line}
                </li>
              ),
            )}
          </ul>
        </Press>

        {/* Verification statuses */}
        <Press delay={0.07} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.methodology.statusesTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
            {lv.methodology.statusesLead}
          </p>
          <ul className="mt-6 border-t-2 border-foreground">
            {STATUSES.map((s) => (
              <li
                key={s}
                className="flex flex-col gap-2 border-b border-dashed border-border py-4 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="sm:w-48 sm:shrink-0">
                  <StatusTag status={s} />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {lv.statusDesc[s]}
                </span>
              </li>
            ))}
          </ul>
        </Press>

        {/* Calculator coverage */}
        <Press delay={0.08} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.methodology.coverageTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
            {lv.methodology.coverageLead}
          </p>
          <ul className="mt-6 border-t-2 border-foreground">
            {[
              lv.methodology.coverageFull,
              lv.methodology.coveragePartial,
              lv.methodology.coverageNone,
              lv.methodology.coverageConditional,
            ].map((line) => (
              <li
                key={line}
                className="border-b border-dashed border-border py-4 text-sm leading-relaxed"
              >
                {line}
              </li>
            ))}
          </ul>
        </Press>

        {/* Changelog */}
        <Press delay={0.08} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.methodology.changelogTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-sm text-muted-foreground">
            {lv.methodology.changelogLead}
          </p>
          <a
            href={CHANGELOG}
            target="_blank"
            rel="noreferrer"
            className="data-value mt-4 inline-block text-sm text-primary underline decoration-dashed underline-offset-4"
          >
            {lv.methodology.changelogLink} →
          </a>
        </Press>

        {/* Disclaimer */}
        <Press delay={0.09} className="mt-16">
          <h2 className="text-2xl md:text-3xl">{lv.methodology.disclaimerTitle}</h2>
          <p className="mt-4 max-w-[75ch] border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
            {lv.methodology.disclaimer}
          </p>
        </Press>
      </main>
      <Footer />
    </>
  );
}
