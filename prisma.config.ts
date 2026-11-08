import { readdirSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "prisma/config";

// The app reaches D1 through the driver adapter (src/server/db.ts) and wrangler applies the SQL
// migrations in ./migrations, so Prisma itself never touches the real database. Its datasource is
// the local D1 file that wrangler keeps under .wrangler/state (created by `npm run db:migrate:local`),
// which gives `npm run db:diff` the current schema to diff against and lets `npm run db:studio`
// browse local data.
function localD1() {
  const dir = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
  try {
    const file = readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
    return file && `file:${path.join(dir, file)}`;
  } catch {
    return undefined;
  }
}

const url = localD1();

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(url && { datasource: { url } }),
});
