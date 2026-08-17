// Validates /data against the canonical schema + project rules that the schema
// alone cannot express. Requires ajv + ajv-formats (CI installs them with
// `npm i --no-save ajv ajv-formats`).
//
// Rules beyond the JSON schema:
//   R1  countries/{cc}.json filename must equal lowercase `code`
//   R2  verified:true requires at least one sources[].official === true
//   R3  any non-null pro.rates value requires pro.tariffYear
//   R4  no duplicate country codes
//   R5  any provenance with status "official" requires a sourceUrl
//   R6  provenance.validTo (if present) must be >= validFrom
//   R7  exactly 27 country files must exist (all EU member states)
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const Ajv = (await import("ajv/dist/2020.js")).default;
const addFormats = (await import("ajv-formats")).default;

const root = new URL("..", import.meta.url).pathname;
const dataDir = join(root, "data");
const schema = JSON.parse(
  readFileSync(join(dataDir, "schema", "country.schema.json"), "utf8"),
);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const errors = [];
const seenCodes = new Set();
const countryFiles = readdirSync(join(dataDir, "countries")).filter((f) =>
  f.endsWith(".json"),
);

if (countryFiles.length === 0) errors.push("no country files found in data/countries");

for (const file of countryFiles) {
  const path = join(dataDir, "countries", file);
  let country;
  try {
    country = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${file}: invalid JSON — ${e.message}`);
    continue;
  }

  if (!validate(country)) {
    for (const err of validate.errors) {
      errors.push(`${file}: ${err.instancePath || "/"} ${err.message}`);
    }
  }

  if (country.code) {
    if (basename(file, ".json") !== country.code.toLowerCase()) {
      errors.push(`${file}: R1 — filename must be '${country.code.toLowerCase()}.json'`);
    }
    if (seenCodes.has(country.code)) {
      errors.push(`${file}: R4 — duplicate country code ${country.code}`);
    }
    seenCodes.add(country.code);
  }

  if (country.verified === true) {
    const hasOfficial = (country.sources ?? []).some((s) => s.official === true);
    if (!hasOfficial) {
      errors.push(`${file}: R2 — verified:true requires at least one official source`);
    }
  }

  const rates = country.pro?.rates ?? {};
  const hasRate = Object.values(rates).some((v) => typeof v === "number");
  if (hasRate && typeof country.pro?.tariffYear !== "number") {
    errors.push(`${file}: R3 — non-null rates require pro.tariffYear`);
  }

  // R5/R6 — provenance integrity across every fact that can carry it.
  const provenances = [
    ["register.provenance", country.register?.provenance],
    ["register.arProvenance", country.register?.arProvenance],
    ["pro.ratesProvenance", country.pro?.ratesProvenance],
    ["drs.provenance", country.drs?.provenance],
    ...(country.extraTaxes ?? []).map((t, i) => [`extraTaxes[${i}].provenance`, t.provenance]),
  ];
  for (const [where, p] of provenances) {
    if (!p) continue;
    if (p.status === "official" && !p.sourceUrl) {
      errors.push(`${file}: R5 — ${where} status "official" requires a sourceUrl`);
    }
    if (p.validFrom && p.validTo && p.validTo < p.validFrom) {
      errors.push(`${file}: R6 — ${where} validTo (${p.validTo}) is before validFrom (${p.validFrom})`);
    }
  }
}

// R7 — the dataset must cover exactly the 27 EU member states.
if (countryFiles.length !== 27) {
  errors.push(`R7 — expected exactly 27 country files, found ${countryFiles.length}`);
}

// regulation.json / cn-codes.json: JSON well-formedness only (no schema yet)
for (const extra of ["regulation.json", "cn-codes.json"]) {
  try {
    JSON.parse(readFileSync(join(dataDir, extra), "utf8"));
  } catch (e) {
    errors.push(`${extra}: invalid JSON — ${e.message}`);
  }
}

if (errors.length > 0) {
  console.error(`✗ data validation failed (${errors.length} error(s)):\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ ${countryFiles.length} country file(s) + regulation.json + cn-codes.json valid`);
