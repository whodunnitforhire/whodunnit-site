// @ts-check
import path from "node:path";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import("next").NextConfig} */
const config = {
  // Next 16's `next dev` otherwise writes an AGENTS.md into the repo when an AI agent runs it.
  agentRules: false,
  // `dev` and `build` run with --webpack because of this hook. Turbopack bundles the Prisma wasm
  // with a Node `fs` loader that can't run on Workers.
  webpack: (config, { isServer, dev }) => {
    // The generated Prisma client (runtime = "cloudflare") loads its query compiler with
    // `import("./query_compiler_small_bg.wasm?module")`, which only Workers understand.
    // - build: leave the import in place with an absolute path; OpenNext and wrangler then
    //   upload the file as a Workers wasm module.
    // - dev: Next runs in Node, so compile the same file from disk instead.
    if (isServer) {
      config.externals.push(
        /** @param {{ request?: string, context?: string }} data @param {(err?: Error | null, result?: string) => void} callback */
        ({ request, context }, callback) => {
          if (!request?.endsWith(".wasm?module") || !context) return callback();
          const file = path.resolve(context, request.replace(/\?module$/, ""));
          if (dev) {
            return callback(
              null,
              `var new WebAssembly.Module(process.getBuiltinModule("node:fs").readFileSync(${JSON.stringify(file)}))`,
            );
          }
          callback(null, `import ${file}?module`);
        },
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      // R2 bucket `whodunnit-images` (see src/lib/images.ts). On Workers, /_next/image is served
      // by OpenNext through the Cloudflare Images binding (`IMAGES` in wrangler.jsonc).
      {
        protocol: "https",
        hostname: "images.whodunnitforhire.com",
        pathname: "/**",
      },
    ],
  },
};

export default config;

// Gives `next dev` the local D1/R2 bindings and vars (wrangler.jsonc + .dev.vars) through
// getCloudflareContext().
initOpenNextCloudflareForDev();
