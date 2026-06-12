// Make the field guide deployable: in dev, public/docs is a junction → ../docs-site/site and we
// leave it alone. In CI/production (no junction — git doesn't carry it), copy the built docs tree
// into public/docs so the same /docs/[lang]/... URLs work on the host. Run automatically by
// `npm run build` (prebuild). Skips quietly if docs-site isn't present (e.g. site-only checkout).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(here, "..", "public", "docs");
const src = path.join(here, "..", "..", "docs-site", "site");

let destStat = null;
try {
  destStat = fs.lstatSync(dest);
} catch {}

if (destStat?.isSymbolicLink()) {
  console.log("[copy-docs] public/docs is a junction (dev layout) — leaving it alone.");
  process.exit(0);
}
if (!fs.existsSync(src)) {
  if (destStat) {
    console.log("[copy-docs] docs-site/site not found; keeping existing public/docs copy.");
    process.exit(0);
  }
  console.warn("[copy-docs] WARNING: docs-site/site not found and public/docs missing — /docs links will 404.");
  process.exit(0);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
const count = fs.readdirSync(dest).length;
console.log(`[copy-docs] copied docs-site/site -> public/docs (${count} top-level entries).`);
