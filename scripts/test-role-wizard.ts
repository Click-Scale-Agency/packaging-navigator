/**
 * Deterministic scenario tests for the producer role wizard.
 * Run with: bun scripts/test-role-wizard.ts
 *
 * Guards the two properties the audit required:
 *  1. no mutually contradictory conclusion blocks ever co-occur;
 *  2. the micro-enterprise exception and the D2C/wholesale split resolve to the
 *     intended blocks across the seven representative answer combinations.
 */
import { resolveWizard, type Answers } from "../src/components/producers/wizard-logic";

/** Pairs that must never appear together in one resolved result. */
const CONTRADICTIONS: [string, string][] = [
  ["mfr_you", "mfr_is_supplier"],
  ["mfr_you", "micro_conditional"],
  ["doc_full", "mfr_is_supplier"],
  ["doc_full", "micro_conditional"],
  ["pl_client_is_mfr", "micro_trap_supplier"],
  ["no_doc_signing", "micro_trap_supplier"],
];

function answers(partial: Partial<Answers>): Answers {
  return { q1: [], q2: [], q3a: null, q3b: null, q4: null, ...partial };
}

interface Case {
  name: string;
  answers: Answers;
  expectPresent?: string[];
  expectAbsent?: string[];
}

const CASES: Case[] = [
  {
    name: "1. savs zīmols, ne-mikrouzņēmums",
    answers: answers({ q1: ["own_brand"], q2: ["sell_lv"], q3a: "micro_no" }),
    expectPresent: ["mfr_you", "doc_full", "epr_lv"],
    expectAbsent: ["mfr_is_supplier", "micro_conditional"],
  },
  {
    name: "2. savs zīmols, mikrouzņēmums, piegādātājs tajā pašā valstī",
    answers: answers({ q1: ["own_brand"], q2: ["sell_lv"], q3a: "micro_yes", q4: "same_country" }),
    expectPresent: ["mfr_is_supplier"],
    expectAbsent: ["mfr_you", "doc_full"],
  },
  {
    name: "2b. savs zīmols, mikrouzņēmums, piegādātājs nezināms → nosacīts",
    answers: answers({ q1: ["own_brand"], q2: ["sell_lv"], q3a: "micro_yes" }),
    expectPresent: ["micro_conditional"],
    expectAbsent: ["mfr_you", "doc_full"],
  },
  {
    name: "3. private label klients, kas nav mikrouzņēmums",
    answers: answers({ q1: ["client_brand"], q2: ["sell_lv"], q3b: "plmicro_no" }),
    expectPresent: ["supplier_art16", "pl_client_is_mfr", "no_doc_signing"],
    expectAbsent: ["micro_trap_supplier"],
  },
  {
    name: "4. private label mikrouzņēmuma klients Latvijā",
    answers: answers({ q1: ["client_brand"], q2: ["sell_lv"], q3b: "plmicro_yes" }),
    expectPresent: ["supplier_art16", "micro_trap_supplier"],
    expectAbsent: ["pl_client_is_mfr", "no_doc_signing"],
  },
  {
    name: "5. D2C pārdošana citā ES valstī",
    answers: answers({ q1: ["own_brand"], q2: ["i_export_d2c"], q3a: "micro_no" }),
    expectPresent: ["you_producer_abroad", "ar_warning"],
    expectAbsent: ["dealer_producer_note"],
  },
  {
    name: "6. wholesale pārdošana ārvalstu izplatītājam",
    answers: answers({ q1: ["own_brand"], q2: ["i_export_dealer"], q3a: "micro_no" }),
    expectPresent: ["dealer_producer_note"],
    expectAbsent: ["you_producer_abroad", "ar_warning"],
  },
  {
    name: "7. viens uzņēmums, vairāki biznesa modeļi",
    answers: answers({
      q1: ["own_brand", "client_brand", "no_brand"],
      q2: ["sell_lv", "client_exports", "i_export_d2c"],
      q3a: "micro_no",
      q3b: "plmicro_no",
    }),
    // Only the no-contradiction invariant is asserted for the mixed case.
  },
];

let failures = 0;

for (const c of CASES) {
  const keys = resolveWizard(c.answers).map((b) => b.key);
  const set = new Set(keys);
  const problems: string[] = [];

  for (const k of c.expectPresent ?? []) {
    if (!set.has(k)) problems.push(`expected present: ${k}`);
  }
  for (const k of c.expectAbsent ?? []) {
    if (set.has(k)) problems.push(`expected absent: ${k}`);
  }
  for (const [a, b] of CONTRADICTIONS) {
    if (set.has(a) && set.has(b)) problems.push(`contradiction: ${a} + ${b}`);
  }

  if (problems.length) {
    failures++;
    console.error(`✗ ${c.name}`);
    console.error(`    blocks: ${keys.join(", ")}`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    console.log(`✓ ${c.name}`);
  }
}

if (failures) {
  console.error(`\n${failures} scenario(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${CASES.length} scenarios passed.`);
