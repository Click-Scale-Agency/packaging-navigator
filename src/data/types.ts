/**
 * UI-facing types for country data.
 *
 * The canonical data lives in /data/countries/{cc}.json at the repo root
 * (JSON-Schema-validated by CI) and is mapped into these types by ./index.ts.
 * Never hardcode country facts in components — read them from here only,
 * and never edit /data by hand inside Lovable.
 */

export type MaterialKey = "paper" | "plastic" | "glass" | "metal" | "wood" | "composite";

export const MATERIALS: MaterialKey[] = ["paper", "plastic", "glass", "metal", "wood", "composite"];

/**
 * Per-fact verification status. The country-level `verified` boolean is a blunt
 * rollup; this lets a single tariff or obligation carry its own truth so the UI
 * can distinguish an official statutory rate from an inferred obligation, a
 * non-public tariff, or an open question.
 */
export type FactStatus =
  | "official"
  | "operator_published"
  | "secondary_source"
  | "inferred"
  | "unverified"
  | "not_applicable"
  | "unknown";

/** Provenance for one fact: status + its specific source + validity window. */
export interface Provenance {
  status: FactStatus;
  sourceUrl: string | null;
  checkedAt: string | null;
  validFrom: string | null;
  validTo: string | null;
  note: string | null;
}

/** Layer 1 — the state producer register. */
export interface RegisterLayer {
  exists: boolean;
  name: string | null;
  url: string | null;
  /** e.g. "DE + 13 digits" */
  numberFormat: string | null;
  /** State/register registration fee in EUR. null = unknown / not published. */
  registrationCostEur: number | null;
  /** Authorised representative required for foreign sellers without local establishment. null = unverified. */
  arRequired: boolean | null;
  /** Must the register number appear on invoices/commercial docs? */
  numberOnInvoices: boolean | null;
  /** De-minimis / threshold text, e.g. "0 kg — first unit triggers duty". */
  deMinimis: string | null;
  note?: string | null;
  /** Provenance of the register facts (exists/name/url/format). */
  provenance?: Provenance | null;
  /** Provenance of the authorised-representative obligation. */
  arProvenance?: Provenance | null;
}

/** Layer 2 — producer responsibility organisation (PRO) scheme. */
export interface ProScheme {
  name: string;
  url: string | null;
  /** €/kg per material. null = not published / not verified. */
  rates: Record<MaterialKey, number | null>;
  tariffYear: number | null;
  membershipRequired: boolean;
  /** Minimum annual / minimum declaration fee in EUR. null = not published. */
  minAnnualFeeEur: number | null;
  note?: string | null;
  /** Provenance of the per-material rates (shared across a country's schemes). */
  ratesProvenance?: Provenance | null;
}

/** Layer 3 — separate national taxes, independent of EPR/PRO fees. */
export interface ExtraTax {
  name: string;
  /** €/kg where applicable. */
  ratePerKg: number | null;
  material: MaterialKey | null;
  /**
   * True when liability is unresolved for this portal's target user (e.g. the
   * Spanish plastic excise for a foreign B2C distance seller). Conditional
   * taxes are surfaced as a "verify" caveat and NEVER auto-added to a total.
   */
  conditional: boolean;
  url: string | null;
  note?: string | null;
  /** Provenance of this tax fact. */
  provenance?: Provenance | null;
}

export interface SourceRef {
  url: string;
  title: string;
  /** ISO date */
  checkedAt: string;
}

/**
 * Statutory per-material rates that apply as an ALTERNATIVE to a PRO contract
 * (e.g. LV DRN full rates without scheme membership). The calculator shows this
 * as a separate scenario and NEVER sums it together with PRO fees.
 */
export interface StatutoryFallback {
  name: string | null;
  appliesWhen: string | null;
  rates: Record<MaterialKey, number | null>;
  tariffYear: number | null;
  collectedBy: string | null;
  url: string | null;
  note: string | null;
  provenance?: Provenance | null;
}

/** How and when packaging volumes must be declared in a country. */
export interface Reporting {
  frequency: string | null;
  deadlines: string[];
  /** Must a nil return be filed even with zero volume? null = unknown. */
  zeroDeclaration: boolean | null;
  correction: string | null;
  note: string | null;
  provenance?: Provenance | null;
}

/** Deposit-return system for beverage containers (separate from packaging EPR). */
export interface Drs {
  active: boolean | null;
  operator: string | null;
  deposit: string | null;
  url: string | null;
  note: string | null;
  provenance?: Provenance | null;
}

export interface CountryData {
  /** ISO 3166-1 alpha-2 */
  code: string;
  /** Latvian country name */
  name: string;
  /** National competent authority / regulator (regulatory context). */
  competentAuthority?: string | null;
  /** National legal basis for packaging EPR. */
  legalBasis?: string | null;
  /** Deposit-return system (beverages). */
  drs?: Drs | null;
  /** Reporting cadence + deadlines. */
  reporting?: Reporting | null;
  /** Statutory alternative rates (e.g. LV DRN) — never summed with PRO. */
  statutoryFallback?: StatutoryFallback | null;
  register: RegisterLayer;
  pro: ProScheme[];
  extraTaxes: ExtraTax[];
  sources: SourceRef[];
  verified: boolean;
  /** ISO date */
  lastReviewed: string | null;
  /** Country-level caveats from the canonical data (not yet rendered everywhere). */
  notes?: string | null;
}

/* ---- Video briefings (public recordings + LV summaries) ---- */

export interface BriefingTopic {
  title: string;
  body: string;
}

export interface Briefing {
  id: string;
  title: string;
  source: {
    name: string;
    platform: string;
    videoId: string;
    url: string;
    startSeconds: number;
    publishedAt: string;
  };
  keyPoints: string[];
  topics: BriefingTopic[];
  disclaimer: string;
  lastReviewed: string | null;
}
