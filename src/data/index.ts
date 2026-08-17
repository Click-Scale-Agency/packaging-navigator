/**
 * Adapter between the CANONICAL data layer and the UI types.
 *
 * Canonical source of truth: /data/countries/{cc}.json at the repo root
 * (validated against /data/schema/country.schema.json by CI). Those files
 * are edited by data-collection sessions and must NEVER be duplicated into
 * src/. This module maps the canonical shape into the UI-facing types in
 * ./types — if the UI needs a new field, extend the mapping here instead of
 * changing the canonical schema.
 */
import type {
  Briefing,
  BriefingTopic,
  CountryData,
  ExtraTax,
  FactStatus,
  MaterialKey,
  Provenance,
  ProScheme,
  RegisterLayer,
  Reporting,
  SourceRef,
  StatutoryFallback,
} from "./types";
import { MATERIALS } from "./types";
import regulation from "../../data/regulation.json";

/* ---- canonical shapes (subset we consume; see /data/schema) ---- */

interface CanonicalProvenance {
  status: FactStatus;
  sourceUrl?: string;
  checkedAt?: string;
  validFrom?: string;
  validTo?: string;
  note?: string;
}

interface CanonicalCountry {
  code: string;
  name: { lv: string; en: string; native?: string };
  competentAuthority?: string;
  legalBasis?: string;
  register: {
    exists: boolean;
    name?: string;
    url?: string;
    numberFormat?: string;
    numberOnInvoices?: boolean;
    arRequiredForForeignSellers?: boolean | null;
    registrationCostEur?: number | null;
    notes?: string;
    provenance?: CanonicalProvenance;
    arProvenance?: CanonicalProvenance;
  };
  pro: {
    membershipRequired: boolean | string;
    schemes: { name: string; url: string; tariffUrl?: string }[];
    rates?: Partial<Record<MaterialKey, number | null>>;
    tariffYear?: number | null;
    minAnnualFeeEur?: number | null;
    ecoModulation?: string;
    ratesProvenance?: CanonicalProvenance;
  };
  thresholds?: { deMinimis?: string };
  extraTaxes?: {
    name: string;
    summary: string;
    rate?: string;
    /** Explicit material the tax targets — preferred over text-guessing. */
    material?: MaterialKey | null;
    /** True = liability unresolved for the target user; never auto-summed. */
    appliesConditionally?: boolean;
    collectedBy?: string;
    url?: string;
    provenance?: CanonicalProvenance;
  }[];
  drs?: {
    active?: boolean | null;
    operator?: string;
    deposit?: string;
    url?: string;
    note?: string;
    provenance?: CanonicalProvenance;
  };
  reporting?: {
    frequency?: string;
    deadlines?: string[];
    zeroDeclaration?: boolean | null;
    correction?: string;
    note?: string;
    provenance?: CanonicalProvenance;
  };
  statutoryFallback?: {
    name: string;
    appliesWhen?: string;
    rates: Partial<Record<MaterialKey, number | null>>;
    tariffYear?: number | null;
    collectedBy?: string;
    url?: string;
    note?: string;
    provenance?: CanonicalProvenance;
  };
  notes?: string;
  sources: { url: string; title?: string; checkedAt: string }[];
  verified: boolean;
  lastReviewed: string;
}

const canonical = import.meta.glob("/data/countries/*.json", {
  eager: true,
  import: "default",
}) as Record<string, CanonicalCountry>;

/* ---- mapping ---- */

const emptyRates = (): Record<MaterialKey, number | null> =>
  Object.fromEntries(MATERIALS.map((m) => [m, null])) as Record<MaterialKey, number | null>;

function mapProvenance(p?: CanonicalProvenance): Provenance | null {
  if (!p) return null;
  return {
    status: p.status,
    sourceUrl: p.sourceUrl ?? null,
    checkedAt: p.checkedAt ?? null,
    validFrom: p.validFrom ?? null,
    validTo: p.validTo ?? null,
    note: p.note ?? null,
  };
}

function mapRegister(c: CanonicalCountry): RegisterLayer {
  return {
    exists: c.register.exists,
    name: c.register.name ?? null,
    url: c.register.url ?? null,
    numberFormat: c.register.numberFormat ?? null,
    registrationCostEur: c.register.registrationCostEur ?? null,
    arRequired: c.register.arRequiredForForeignSellers ?? null,
    numberOnInvoices: c.register.numberOnInvoices ?? null,
    deMinimis: c.thresholds?.deMinimis ?? null,
    note: c.register.notes ?? null,
    provenance: mapProvenance(c.register.provenance),
    arProvenance: mapProvenance(c.register.arProvenance),
  };
}

function mapPro(c: CanonicalCountry): ProScheme[] {
  const rates = { ...emptyRates(), ...(c.pro.rates ?? {}) };
  const ratesProvenance = mapProvenance(c.pro.ratesProvenance);
  // Canonical membershipRequired may be a string ("state-run", "de-facto…");
  // for the UI boolean, anything except an explicit false counts as required.
  const membershipRequired = c.pro.membershipRequired !== false;
  return c.pro.schemes.map((s) => ({
    name: s.name,
    url: s.url ?? null,
    rates,
    tariffYear: c.pro.tariffYear ?? null,
    membershipRequired,
    minAnnualFeeEur: c.pro.minAnnualFeeEur ?? null,
    note: typeof c.pro.membershipRequired === "string" ? c.pro.membershipRequired : null,
    ratesProvenance,
  }));
}

function mapExtraTaxes(c: CanonicalCountry): ExtraTax[] {
  return (c.extraTaxes ?? []).map((t) => {
    // Parse "€0.45/kg …" style rates; non-EUR rates (e.g. "2 RON/kg") stay null.
    const eur = t.rate?.match(/€\s*(\d+(?:[.,]\d+)?)\s*\/\s*kg/);
    // Prefer an explicit `material`; only fall back to a text guess when absent.
    // Text-guessing is fragile (English keys vs. LV/native summaries), so an
    // explicit field is the reliable path and avoids accidental (mis)matches.
    const material =
      t.material ??
      MATERIALS.find((m) => `${t.name} ${t.summary} ${t.rate ?? ""}`.toLowerCase().includes(m)) ??
      null;
    const noteParts = [t.summary];
    if (t.rate) noteParts.push(t.rate);
    if (t.collectedBy) noteParts.push(`Administrē: ${t.collectedBy}`);
    return {
      name: t.name,
      ratePerKg: eur?.[1] ? Number(eur[1].replace(",", ".")) : null,
      material,
      conditional: t.appliesConditionally === true,
      url: t.url ?? null,
      note: noteParts.join(" — "),
      provenance: mapProvenance(t.provenance),
    };
  });
}

function mapReporting(c: CanonicalCountry): Reporting | null {
  if (!c.reporting) return null;
  return {
    frequency: c.reporting.frequency ?? null,
    deadlines: c.reporting.deadlines ?? [],
    zeroDeclaration: c.reporting.zeroDeclaration ?? null,
    correction: c.reporting.correction ?? null,
    note: c.reporting.note ?? null,
    provenance: mapProvenance(c.reporting.provenance),
  };
}

function mapStatutoryFallback(c: CanonicalCountry): StatutoryFallback | null {
  const s = c.statutoryFallback;
  if (!s) return null;
  return {
    name: s.name ?? null,
    appliesWhen: s.appliesWhen ?? null,
    rates: { ...emptyRates(), ...(s.rates ?? {}) },
    tariffYear: s.tariffYear ?? null,
    collectedBy: s.collectedBy ?? null,
    url: s.url ?? null,
    note: s.note ?? null,
    provenance: mapProvenance(s.provenance),
  };
}

function mapSources(c: CanonicalCountry): SourceRef[] {
  return c.sources.map((s) => ({
    url: s.url,
    title: s.title ?? s.url,
    checkedAt: s.checkedAt,
  }));
}

export const countries: CountryData[] = Object.values(canonical)
  .map((c) => ({
    code: c.code,
    name: c.name.lv,
    competentAuthority: c.competentAuthority ?? null,
    legalBasis: c.legalBasis ?? null,
    drs: c.drs
      ? {
          active: c.drs.active ?? null,
          operator: c.drs.operator ?? null,
          deposit: c.drs.deposit ?? null,
          url: c.drs.url ?? null,
          note: c.drs.note ?? null,
          provenance: mapProvenance(c.drs.provenance),
        }
      : null,
    reporting: mapReporting(c),
    statutoryFallback: mapStatutoryFallback(c),
    register: mapRegister(c),
    pro: mapPro(c),
    extraTaxes: mapExtraTaxes(c),
    sources: mapSources(c),
    verified: c.verified,
    lastReviewed: c.lastReviewed ?? null,
    notes: c.notes ?? null,
  }))
  .sort((a, b) => a.code.localeCompare(b.code));

export const countryByCode = (code: string): CountryData | undefined =>
  countries.find((c) => c.code.toUpperCase() === code.toUpperCase());

/* ---- timeline (from canonical /data/regulation.json) ---- */

export interface TimelineEntry {
  date: string;
  label: string;
  detail: string;
}

interface CanonicalTimelineEntry {
  date: string;
  title: { lv: string; en: string };
  summary: { lv: string; en: string };
}

export const timeline: TimelineEntry[] = (regulation.timeline as CanonicalTimelineEntry[]).map(
  (t) => ({ date: t.date, label: t.title.lv, detail: t.summary.lv }),
);

/** Canonical PPWR application date (ISO), single source for UI copy. */
export const regulationApplies: string = (regulation as { regulation: { applies: string } })
  .regulation.applies;

export * from "./types";

/* ---- video briefings (from canonical /data/briefings/*.json) ---- */

interface CanonicalBriefing {
  id: string;
  title: { lv: string; en?: string };
  source: Briefing["source"];
  keyPoints: string[];
  topics: BriefingTopic[];
  disclaimer: string;
  lastReviewed?: string;
}

const canonicalBriefings = import.meta.glob("/data/briefings/*.json", {
  eager: true,
  import: "default",
}) as Record<string, CanonicalBriefing>;

export const briefings: Briefing[] = Object.values(canonicalBriefings)
  .map((b) => ({
    id: b.id,
    title: b.title.lv,
    source: b.source,
    keyPoints: b.keyPoints,
    topics: b.topics,
    disclaimer: b.disclaimer,
    lastReviewed: b.lastReviewed ?? null,
  }))
  .sort((a, b) => b.source.publishedAt.localeCompare(a.source.publishedAt));
