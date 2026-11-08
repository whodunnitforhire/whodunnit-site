import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaD1 } from "@prisma/adapter-d1";
import { cache } from "react";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma client for the current request. D1 bindings only exist per request on Workers, so there
 * is no module-level singleton; `cache()` reuses one client within a single server render.
 */
export const getDb = cache(
  () =>
    new PrismaClient({
      adapter: new PrismaD1(getCloudflareContext().env.DB),
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    }),
);
