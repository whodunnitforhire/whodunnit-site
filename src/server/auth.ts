import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createRemoteJWKSet, jwtVerify } from "jose";

/**
 * Admin auth is Cloudflare Access: an Access application in front of `/dashboard*`, `/api/trpc*`
 * and `/api/admin*` makes the visitor log in (email one-time PIN). Then it forwards the request
 * with a signed JWT in `cf-access-jwt-assertion`. Access already enforces who may log in. We verify
 * the JWT again here so that an Access misconfiguration or a route that bypasses it (e.g. a
 * workers.dev URL) can't reach admin code.
 *
 * `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` are set in wrangler.jsonc `vars`. Local development
 * has no Access in front of it, so .dev.vars blanks both and sets `DEV_ADMIN_EMAIL`; every request
 * then counts as that admin. `DEV_ADMIN_EMAIL` is ignored whenever the Access vars are set, and
 * with neither configured every request is rejected.
 */

export type AccessIdentity = { email: string | undefined };

/** Optional because .dev.vars may blank them, and DEV_ADMIN_EMAIL only exists locally. */
type AuthVars = {
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUD?: string;
  DEV_ADMIN_EMAIL?: string;
};

// Built on first use, because the vars only exist inside a request. jose caches the keys and
// refetches them when Access rotates them.
let access:
  { issuer: string; jwks: ReturnType<typeof createRemoteJWKSet> } | undefined;

function getAccess(teamDomain: string) {
  if (!access) {
    const host = teamDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const issuer = `https://${host}`;
    access = {
      issuer,
      jwks: createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`)),
    };
  }
  return access;
}

/** The Access identity of the request, or `null` if it isn't from a logged-in admin. */
export async function verifyAccess(
  headers: Headers,
): Promise<AccessIdentity | null> {
  const env = getCloudflareContext().env as AuthVars;
  if (!env.CF_ACCESS_TEAM_DOMAIN || !env.CF_ACCESS_AUD) {
    return env.DEV_ADMIN_EMAIL ? { email: env.DEV_ADMIN_EMAIL } : null;
  }
  const config = getAccess(env.CF_ACCESS_TEAM_DOMAIN);

  const token = headers.get("cf-access-jwt-assertion");
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, config.jwks, {
      issuer: config.issuer,
      audience: env.CF_ACCESS_AUD,
    });
    return {
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Whether the current request comes from a dashboard admin. Every admin-only server entry point
 * (tRPC `privateProcedure`, `POST /api/admin/images`, the dashboard page) goes through this.
 */
export async function isAdmin(headers: Headers): Promise<boolean> {
  return (await verifyAccess(headers)) !== null;
}
