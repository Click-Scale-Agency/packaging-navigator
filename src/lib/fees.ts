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

/** Which rate set produced the variable fee. */
export type RateBasis = "pro" | "statutory" | "none";

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
  /**
   * Which rate set the variable fee came from: "pro" (published scheme rates),
   * "statutory" (statutory fallback, e.g. LV DRN full rates — used ONLY when no
   * PRO rate applies, never summed with PRO), or "none".
   */
  basis: RateBasis;
}

interface Priced {
  variable: number;
  hasRate: boolean;
  priced: MaterialKey[];
  unpriced: MaterialKey[];
}

/** Price the entered mix with a given per-material rate getter. */
function priceMix(
  country: CountryData,
  kgPerYear: Record<MaterialKey, number>,
  rateOf: (m: MaterialKey) => number | null,
): Priced {
  let variable = 0;
  let hasRate = false;
  const priced: MaterialKey[] = [];
  const unpriced: MaterialKey[] = [];
  for (const m of MATERIALS) {
    const rate = rateOf(m);
    const tax = extraTaxFor(country, m);
    const weighted = (kgPerYear[m] ?? 0) > 0;
    // A material is "priced" only when it has a base rate; a standalone tax
    // without a base rate is not a complete price for that material.
    if (weighted) {
      if (rate !== null) priced.push(m);
      else unpriced.push(m);
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
  return { variable, hasRate, priced, unpriced };
}

/**
 * §16 full-cost model for one country: variable packaging fee → PRO fee
 * (greater of variable and the minimum annual fee) → + state registration
 * cost. The authorised-representative fee is deliberately NOT included here
 * (it's market-priced and flagged separately by callers).
 *
 * When a country publishes no PRO rate for the entered materials but has a
 * statutory fallback (e.g. LV DRN full rates), the variable fee is computed
 * from the fallback instead — these two are mutually exclusive and are NEVER
 * summed together.
 */
export function computeCountryCost(
  country: CountryData,
  kgPerYear: Record<MaterialKey, number>,
  totalKg: number,
): CountryCost {
  const proPriced = priceMix(country, kgPerYear, (m) => rateFor(country, m));

  let priced = proPriced;
  let basis: RateBasis = "pro";
  const fb = country.statutoryFallback;
  // Fall back to statutory rates ONLY when PRO priced nothing for the weighted
  // set — never in addition to PRO.
  if (proPriced.priced.length === 0 && fb) {
    const fbPriced = priceMix(country, kgPerYear, (m) => fb.rates[m] ?? null);
    if (fbPriced.priced.length > 0) {
      priced = fbPriced;
      basis = "statutory";
    }
  }

  const { variable, hasRate, priced: pricedMaterials, unpriced: unpricedMaterials } = priced;

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
    basis: hasRate ? basis : "none",
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
