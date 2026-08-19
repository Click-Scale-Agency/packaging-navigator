/**
 * Pure, framework-free rule engine for the producer role wizard.
 *
 * The decision tree, obligation blocks and mapping rules live in the
 * community-editable data/role-wizard.json. This module only evaluates them,
 * so it can be imported both by the React component (RoleWizard.tsx) and by the
 * deterministic scenario tests (scripts/test-role-wizard.ts) with no drift.
 *
 * Rules can both `add` and `remove` block keys. `remove` is what lets the
 * micro-enterprise exception REPLACE the categorical conclusions (e.g. hide
 * "you are the manufacturer" and show "your supplier is the manufacturer")
 * instead of stacking contradictory blocks on top of each other.
 */
import wizardData from "../../../data/role-wizard.json";

export interface WizardBlock {
  kind: string;
  title: string;
  text: string;
  refs?: string[];
}

export interface WizardQuestion {
  type: string;
  text: string;
  hint?: string;
  showIf?: string;
  options: Record<string, string>;
}

interface WizardRule {
  if: "always" | Record<string, string[] | string>;
  add: string[];
  remove?: string[];
}

interface WizardData {
  version: string;
  questions: Record<string, WizardQuestion>;
  blocks: Record<string, WizardBlock>;
  rules: WizardRule[];
  blockOrder: string[];
}

const data = wizardData as unknown as WizardData;

/** Which answer keys are multi-select (arrays) vs single-select (scalars). */
const MULTI_KEYS = new Set(["q1", "q2"]);

export interface Answers {
  q1: string[];
  q2: string[];
  q3a: string | null;
  q3b: string | null;
  q4: string | null;
}

export interface ResolvedBlock {
  key: string;
  block: WizardBlock;
}

function answerValue(a: Answers, key: string): string[] | string | null {
  return (a as unknown as Record<string, string[] | string | null>)[key] ?? null;
}

function ruleMatches(rule: WizardRule, a: Answers): boolean {
  if (rule.if === "always") return true;
  for (const [key, cond] of Object.entries(rule.if)) {
    const ans = answerValue(a, key);
    if (Array.isArray(cond)) {
      const arr = Array.isArray(ans) ? ans : [];
      if (!cond.every((v) => arr.includes(v))) return false;
    } else {
      if (ans !== cond) return false;
    }
  }
  return true;
}

/**
 * Coerce raw UI state into a consistent answer set:
 * - a supplier-location answer only counts when the micro-own-brand branch is
 *   active; when that branch is active but unanswered it defaults to "unknown"
 *   so the wizard shows the conditional (non-contradictory) result rather than
 *   a categorical one.
 */
export function normalizeAnswers(raw: Answers): Answers {
  const ownBrand = raw.q1.includes("own_brand");
  const clientBrand = raw.q1.includes("client_brand");
  const showQ3a = ownBrand || clientBrand;
  const showQ3b = clientBrand;

  const q3a = showQ3a ? raw.q3a : null;
  const q3b = showQ3b ? raw.q3b : null;

  const microOwn = ownBrand && q3a === "micro_yes";
  const q4 = microOwn ? (raw.q4 ?? "unknown") : null;

  return { q1: raw.q1, q2: raw.q2, q3a, q3b, q4 };
}

/** Accumulate add/remove across matching rules, then order by `blockOrder`. */
export function resolveWizard(raw: Answers): ResolvedBlock[] {
  const a = normalizeAnswers(raw);

  const added: string[] = [];
  const removed = new Set<string>();
  for (const rule of data.rules) {
    if (!ruleMatches(rule, a)) continue;
    for (const k of rule.add) if (!added.includes(k)) added.push(k);
    for (const k of rule.remove ?? []) removed.add(k);
  }

  const order = data.blockOrder;
  return added
    .filter((key) => !removed.has(key))
    .map((key) => ({ key, block: data.blocks[key] }))
    .filter((x): x is ResolvedBlock => Boolean(x.block))
    .sort((x, y) => {
      const ix = order.indexOf(x.block.kind);
      const iy = order.indexOf(y.block.kind);
      return (ix === -1 ? 99 : ix) - (iy === -1 ? 99 : iy);
    });
}

/** Is the answer set complete enough to produce a result? */
export function answersValid(raw: Answers): boolean {
  return raw.q1.length > 0 && raw.q2.length > 0;
}

export const questions = data.questions as {
  q1: WizardQuestion;
  q2: WizardQuestion;
  q3a: WizardQuestion;
  q3b: WizardQuestion;
  q4: WizardQuestion;
};
export const MULTI = MULTI_KEYS;
