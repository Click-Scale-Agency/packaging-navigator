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
  MaterialKey,
  ProScheme,
  RegisterLayer,
  SourceRef,
} from "./types";
import { MATERIALS } from "./types";
import regulation from "../../data/regulation.json";

/* ---- canonical shapes (subset we consume; see /data/schema) ---- */

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
  };
  pro: {
    membershipRequired: boolean | string;
    schemes: { name: string; url: string; tariffUrl?: string }[];
    rates?: Partial<Record<MaterialKey, number | null>>;
    tariffYear?: number | null;
    minAnnualFeeEur?: number | null;
    ecoModulation?: string;
  };
  thresholds?: { deMinimis?: string };
  extraTaxes?: {
    name: string;
    summary: string;
    rate?: string;
    collectedBy?: string;
    url?: string;
  }[];
  drs?: {
    active?: boolean | null;
    operator?: string;
    deposit?: string;
    url?: string;
    note?: string;
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
  Object.fromEntries(MATERIALS.map((m) => [m, null])) as Record<
    MaterialKey,
    number | null
  >;

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
  };
}

function mapPro(c: CanonicalCountry): ProScheme[] {
  const rates = { ...emptyRates(), ...(c.pro.rates ?? {}) };
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
    note:
      typeof c.pro.membershipRequired === "string"
        ? c.pro.membershipRequired
        : null,
  }));
}

function mapExtraTaxes(c: CanonicalCountry): ExtraTax[] {
  return (c.extraTaxes ?? []).map((t) => {
    // Parse "€0.45/kg …" style rates; non-EUR rates (e.g. "2 RON/kg") stay null.
    const eur = t.rate?.match(/€\s*(\d+(?:[.,]\d+)?)\s*\/\s*kg/);
    const blob = `${t.name} ${t.summary} ${t.rate ?? ""}`.toLowerCase();
    const material = MATERIALS.find((m) => blob.includes(m)) ?? null;
    const noteParts = [t.summary];
    if (t.rate) noteParts.push(t.rate);
    if (t.collectedBy) noteParts.push(`Administrē: ${t.collectedBy}`);
    return {
      name: t.name,
      ratePerKg: eur?.[1] ? Number(eur[1].replace(",", ".")) : null,
      material,
      url: t.url ?? null,
      note: noteParts.join(" — "),
    };
  });
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
        }
      : null,
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

export const timeline: TimelineEntry[] = (
  regulation.timeline as CanonicalTimelineEntry[]
).map((t) => ({ date: t.date, label: t.title.lv, detail: t.summary.lv }));

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
