// Fails if the built Worker is over the free plan's 3 MiB gzipped limit, or close to it.
// Run via `npm run check:size`, which builds first. See "Limits and backups" in the README.
import { execFileSync } from "node:child_process";

const LIMIT_KIB = 3 * 1024;
const WARN_KIB = 2.75 * 1024;

const out = execFileSync("npx", ["wrangler", "deploy", "--dry-run"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});
const match = out.match(/gzip:\s*([\d.]+)\s*KiB/);
if (!match) {
  console.error("Couldn't find the gzip size in `wrangler deploy --dry-run` output:\n" + out);
  process.exit(1);
}

const kib = Number(match[1]);
const summary = `Worker is ${(kib / 1024).toFixed(2)} MiB gzipped (limit 3 MiB).`;
if (kib > LIMIT_KIB) {
  console.error(`${summary} Over the free-plan limit, so deploy will fail.`);
  process.exit(1);
}
console.log(kib > WARN_KIB ? `${summary} Getting close.` : summary);
