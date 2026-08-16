/**
 * UI-facing types for country data.
 *
 * The canonical data lives in /data/countries/{cc}.json at the repo root
 * (JSON-Schema-validated by CI) and is mapped into these types by ./index.ts.
 * Never hardcode country facts in components — read them from here only,
 * and never edit /data by hand inside Lovable.
 */

export type MaterialKey =
  | "paper"
  | "plastic"
  | "glass"
  | "metal"
  | "wood"
  | "composite";

export const MATERIALS: MaterialKey[] = [
  "paper",
  "plastic",
  "glass",
  "metal",
  "wood",
  "composite",
];

/** Layer 1 — the state producer register. */
export interface RegisterLayer {
  exists: boolean;
  name: string | null;
  url: string | null;
  /** e.g. "DE + 13 digits" */
  numberFormat: string | null;
  note?: string | null;
}

/** Layer 2 — producer responsibility organisation (PRO) scheme. */
export interface ProScheme {
  name: string;
  url: string | null;
  /** €/kg per material. null = not published / not verified. */
  rates: Record<MaterialKey, number | null>;
  tariffYear: number | null;
  membershipRequired: boolean;
  note?: string | null;
}

/** Layer 3 — separate national taxes, independent of EPR/PRO fees. */
export interface ExtraTax {
  name: string;
  /** €/kg where applicable. */
  ratePerKg: number | null;
  material: MaterialKey | null;
  url: string | null;
  note?: string | null;
}

export interface SourceRef {
  url: string;
  title: string;
  /** ISO date */
  checkedAt: string;
}

export interface CountryData {
  /** ISO 3166-1 alpha-2 */
  code: string;
  /** Latvian country name */
  name: string;
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
