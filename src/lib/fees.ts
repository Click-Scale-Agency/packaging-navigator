/**
 * Shared EPR fee engine — the single source of truth for the indicative
 * cost model (spec §16). Both the Calculator and the Action guide read from
 * here so the numbers never diverge. All rates come from the canonical /data
 * via the ./data bridge; nothing is hardcoded.
 */
import { MATERIALS, type CountryData, type MaterialKey } from "@/data";

/** Published rate for a material from the country's reference (first) scheme,
 * or null. Canonical data attaches the same country-level rate table to every
 * scheme, so the reference scheme is representative; we deliberately do NOT
 * average across schemes (that would silently blend distinct schemes if real
 * per-scheme rates were ever added). */
export function rateFor(country: CountryData, material: MaterialKey): number | null {
  for (const scheme of country.pro) {
    const v = scheme.rates?.[material];
    if (typeof v === "number") return v;
  }
  return null;
}

/**
 * Statutory per-material tax rate (€/kg) for a material, or null.
 *
 * Uses only the explicit `materialRatesEur` table (e.g. LV DRN) — these are
 * confirmed per-material statutory rates that stand in for a missing PRO
 * tariff. A single-material `material` tag alone (e.g. the ES plastic excise,
 * whose applicability to foreign distance sellers is an open question, see
 * CLAUDE.md §6) is deliberately NOT summed into the indicative cost.
 */
export function extraTaxFor(country: CountryData, material: MaterialKey): number | null {
  let sum = 0;
  let found = false;
  for (const t of country.extraTaxes) {
    const v = t.materialRatesEur?.[material];
    if (typeof v === "number") {
      sum += v;
      found = true;
    }
  }
  return found ? sum : null;
}

export interface CountryCost {
  /** Variable packaging fee: Σ (rate + material-linked tax) × kg. */
  variable: number;
  /** PRO fee = max(variable, minimum annual fee). */
  proFee: number;
  minFee: number | null;
  minApplied: boolean;
  regCost: number;
  /** First-year safe total = proFee + registration cost. */
  total: number;
  /** True when there's anything concrete to show (rate, min fee, or reg cost). */
  known: boolean;
  /** Blended €/kg across all selected material weight, or null. */
  blended: number | null;
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
  for (const m of MATERIALS) {
    const rate = rateFor(country, m);
    const tax = extraTaxFor(country, m);
    if (rate !== null) {
      variable += rate * kgPerYear[m];
      hasRate = true;
    }
    if (tax !== null) {
      variable += tax * kgPerYear[m];
      hasRate = true;
    }
  }
  const minFee =
    country.pro.find((p) => p.minAnnualFeeEur !== null)?.minAnnualFeeEur ?? null;
  const proFee = Math.max(variable, minFee ?? 0);
  const minApplied = minFee !== null && minFee > variable;
  const regCost = country.register.registrationCostEur ?? 0;
  const total = proFee + regCost;
  const known = hasRate || minFee !== null || regCost > 0;
  const blended = hasRate && totalKg > 0 ? variable / totalKg : null;
  return { variable, proFee, minFee, minApplied, regCost, total, known, blended };
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
