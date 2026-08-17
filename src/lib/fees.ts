/**
 * Shared EPR fee engine — the single source of truth for the indicative
 * cost model (spec §16). Both the Calculator and the Action guide read from
 * here so the numbers never diverge. All rates come from the canonical /data
 * via the ./data bridge; nothing is hardcoded.
 *
 * Coverage honesty (audit P0): a total is only meaningful when we know how
 * much of it we could actually price. `coverage` distinguishes:
 *   - "full"    — every material the user entered weight for has a rate
 *   - "partial" — some weighted materials priced, some not (total is a floor)
 *   - "none"    — no weighted material could be priced
 * An unknown rate is NEVER silently treated as 0 inside a "safe" total.
 */
import { MATERIALS, type CountryData, type MaterialKey } from "@/data";

/** Average of a scheme's published rates for a material, or null. */
export function rateFor(country: CountryData, material: MaterialKey): number | null {
  const values = country.pro
    .map((scheme) => scheme.rates?.[material])
    .filter((v): v is number => typeof v === "number");
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Sum of UNCONDITIONAL material-linked extra taxes (€/kg) for a material, or
 * null. Conditional taxes (e.g. the Spanish plastic excise, whose liability
 * for a foreign B2C distance seller is an open question) are deliberately
 * excluded here — they are surfaced separately as a "verify" flag instead of
 * being auto-added to the total.
 */
export function extraTaxFor(country: CountryData, material: MaterialKey): number | null {
  const values = country.extraTaxes
    .filter((t) => t.material === material && !t.conditional && typeof t.ratePerKg === "number")
    .map((t) => t.ratePerKg as number);
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0);
}

/**
 * Names of material-linked taxes that MIGHT apply to the materials the user
 * actually ships, but whose applicability is unresolved. These are shown as a
 * caveat, never folded into the numeric total.
 */
export function conditionalTaxesFor(
  country: CountryData,
  kgPerYear: Record<MaterialKey, number>,
): string[] {
  return country.extraTaxes
    .filter((t) => t.conditional && (t.material === null || (kgPerYear[t.material] ?? 0) > 0))
    .map((t) => t.name);
}

/** How much of the requested material mix we could actually price. */
export type Coverage = "full" | "partial" | "none";

export interface CountryCost {
  /** Variable packaging fee: Σ (rate + unconditional material tax) × kg. */
  variable: number;
  /** PRO fee = max(variable, minimum annual fee). */
  proFee: number;
  minFee: number | null;
  minApplied: boolean;
  regCost: number;
  /** Priced total = proFee + registration cost. A FLOOR when coverage≠"full". */
  total: number;
  /** True when there's anything concrete to show (rate, min fee, or reg cost). */
  known: boolean;
  /** Blended €/kg across the priced material weight, or null. */
  blended: number | null;
  /** Pricing completeness for the entered material mix. */
  coverage: Coverage;
  /** Materials the user entered weight for that we could price. */
  pricedMaterials: MaterialKey[];
  /** Materials the user entered weight for that we could NOT price. */
  unpricedMaterials: MaterialKey[];
  /** Names of taxes that may apply but are not included in `total`. */
  conditionalTaxes: string[];
}

/**
 * §16 full-cost model for one country: variable packaging fee → PRO fee
 * (greater of variable and the minimum annual fee) → + state registration
 * cost. The authorised-representative fee is deliberately NOT included here
 * (it's market-priced and flagged separately by callers).
 */
export function computeCountryCost(
  country: CountryData,
  kgPerYear: Record<MaterialKey, number>,
  totalKg: number,
): CountryCost {
  let variable = 0;
  let hasRate = false;
  const pricedMaterials: MaterialKey[] = [];
  const unpricedMaterials: MaterialKey[] = [];

  for (const m of MATERIALS) {
    const rate = rateFor(country, m);
    const tax = extraTaxFor(country, m);
    const weighted = (kgPerYear[m] ?? 0) > 0;
    // A material is "priced" only when it has an EPR rate; a standalone tax
    // without a base rate is not a complete price for that material.
    if (weighted) {
      if (rate !== null) pricedMaterials.push(m);
      else unpricedMaterials.push(m);
    }
    if (rate !== null) {
      variable += rate * kgPerYear[m];
      hasRate = true;
    }
    if (tax !== null) {
      variable += tax * kgPerYear[m];
      hasRate = true;
    }
  }

  const minFee = country.pro.find((p) => p.minAnnualFeeEur !== null)?.minAnnualFeeEur ?? null;
  const proFee = Math.max(variable, minFee ?? 0);
  const minApplied = minFee !== null && minFee > variable;
  const regCost = country.register.registrationCostEur ?? 0;
  const total = proFee + regCost;
  const known = hasRate || minFee !== null || regCost > 0;
  const blended = hasRate && totalKg > 0 ? variable / totalKg : null;

  // Coverage reflects only the materials the user actually entered weight for.
  const weightedCount = pricedMaterials.length + unpricedMaterials.length;
  const coverage: Coverage =
    weightedCount === 0 || unpricedMaterials.length === 0
      ? pricedMaterials.length > 0
        ? "full"
        : "none"
      : pricedMaterials.length > 0
        ? "partial"
        : "none";

  return {
    variable,
    proFee,
    minFee,
    minApplied,
    regCost,
    total,
    known,
    blended,
    coverage,
    pricedMaterials,
    unpricedMaterials,
    conditionalTaxes: conditionalTaxesFor(country, kgPerYear),
  };
}

/** Convert per-shipment gram weights + yearly shipment count into kg/year. */
export function kgPerYearFrom(
  weights: Record<MaterialKey, string>,
  shipments: string | number,
): Record<MaterialKey, number> {
  const n = Number(shipments) || 0;
  const out = {} as Record<MaterialKey, number>;
  for (const m of MATERIALS) out[m] = ((Number(weights[m]) || 0) * n) / 1000;
  return out;
}
