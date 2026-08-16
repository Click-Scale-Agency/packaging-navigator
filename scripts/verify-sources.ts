// Checks that every source URL in /data is alive and that no checkedAt is
// stale (> STALE_DAYS old). Run with: bun scripts/verify-sources.ts
// Prints a markdown report to stdout; exits 1 when problems are found
// (the monthly GitHub Action turns that report into an issue).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const STALE_DAYS = 90;
const TIMEOUT_MS = 15000;

type Source = { url: string; title?: string; checkedAt: string; official?: boolean };
type Problem = { file: string; url: string; kind: "dead" | "stale"; detail: string };

const root = new URL("..", import.meta.url).pathname;
const dataDir = join(root, "data");

function collectSources(): Array<{ file: string; source: Source }> {
  const out: Array<{ file: string; source: Source }> = [];
  const files = readdirSync(join(dataDir, "countries"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => join("countries", f));
  files.push("regulation.json", "cn-codes.json");
  for (const rel of files) {
    const doc = JSON.parse(readFileSync(join(dataDir, rel), "utf8"));
    for (const source of doc.sources ?? []) out.push({ file: `data/${rel}`, source });
  }
  return out;
}

async function checkUrl(url: string): Promise<string | null> {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          // Browser-like UA: several official sites (era.org.mt, eoan.gr, conai.org)
          // return 403 to non-browser agents even though the page is alive.
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
          accept: "text/html,application/xhtml+xml,*/*;q=0.8",
        },
      });
      if (res.ok) return null;
      if (method === "GET") return `HTTP ${res.status}`;
    } catch (e) {
      if (method === "GET") return e instanceof Error ? e.message : String(e);
    }
  }
  return "unreachable";
}

const entries = collectSources();
const problems: Problem[] = [];
const now = Date.now();

for (const { file, source } of entries) {
  const ageDays = Math.floor((now - Date.parse(source.checkedAt)) / 86_400_000);
  if (Number.isNaN(ageDays)) {
    problems.push({ file, url: source.url, kind: "stale", detail: `unparseable checkedAt '${source.checkedAt}'` });
  } else if (ageDays > STALE_DAYS) {
    problems.push({ file, url: source.url, kind: "stale", detail: `checkedAt ${source.checkedAt} (${ageDays} days old)` });
  }
  const deadReason = await checkUrl(source.url);
  if (deadReason) {
    problems.push({ file, url: source.url, kind: "dead", detail: deadReason });
  }
}

console.log(`# Source check — ${new Date().toISOString().slice(0, 10)}\n`);
console.log(`Checked ${entries.length} source link(s). Stale threshold: ${STALE_DAYS} days.\n`);
if (problems.length === 0) {
  console.log("All sources alive and fresh. ✓");
  process.exit(0);
}
console.log(`## Problems (${problems.length})\n`);
console.log("| File | URL | Type | Detail |");
console.log("|---|---|---|---|");
for (const p of problems) {
  console.log(`| ${p.file} | ${p.url} | ${p.kind} | ${p.detail.replaceAll("|", "\\|")} |`);
}
process.exit(1);
