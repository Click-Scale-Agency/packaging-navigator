/**
 * Shape of the country data files in src/data/countries/*.json.
 *
 * These JSON files mirror the canonical GitHub repository
 * Click-Scale-Agency/eu-packaging-hub and are OVERWRITTEN by repo syncs.
 * Never hardcode country facts in components — read them from here only.
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
}
