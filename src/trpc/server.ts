import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { appRouter } from "@/server/api/root";
import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

/**
 * Calls procedures directly, without an HTTP request, since Server Components always run on the
 * server: `await api.update.getAll()`.
 */
export const api = createCallerFactory(appRouter)(createContext);
