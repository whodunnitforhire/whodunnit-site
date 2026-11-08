# whodunnit-site

The website for Whodunnit for Hire ([whodunnitforhire.com](https://whodunnitforhire.com)): a public page with updates, shows, reviews and an about section, and an admin dashboard at `/dashboard` for editing them.

Everything runs on one Cloudflare account, on the free plans:

| Piece | Cloudflare product | Name |
|---|---|---|
| Hosting | Workers, via [OpenNext](https://opennext.js.org/cloudflare) | Worker `whodunnit-site` |
| Database | D1 (SQLite) | `whodunnit` |
| Images | R2, served from `images.whodunnitforhire.com` | bucket `whodunnit-images` |
| Image resizing | Images (`/_next/image`) | binding `IMAGES` |
| Admin login | Zero Trust Access, email one-time PIN | team `odd-recipe-1885` |
| Analytics | Web Analytics (enabled on the zone, no code) | |

The code is [Next.js](https://nextjs.org) 16, [tRPC](https://trpc.io), [Prisma](https://prisma.io) with the D1 adapter, [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com).

## Local development

Needs Node 22 or newer.

```sh
npm install                      # also generates the Prisma client and Worker types
cp .dev.vars.example .dev.vars   # local settings, see below
npm run db:migrate:local         # create the tables in a local D1 database
npm run db:seed:local            # optional: a few sample rows
npm run dev                      # http://localhost:3000
```

`npm run dev` runs Next.js with local copies of D1 and R2, kept in `.wrangler/state`. Nothing local touches the real database or bucket.

`.dev.vars` is the only local settings file. It blanks the Cloudflare Access variables from `wrangler.jsonc` and sets `DEV_ADMIN_EMAIL`, so the dashboard works locally without logging in. Never set `DEV_ADMIN_EMAIL` in production. It is ignored anyway whenever the Access variables are set.

Locally uploaded images go into the local bucket but get the production `images.whodunnitforhire.com` URL, so their thumbnails don't load. That's expected.

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server with local bindings |
| `npm run preview` | Build for Workers and run the real Worker locally (http://localhost:8787) |
| `npm run deploy` | Build for Workers and deploy to Cloudflare |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run check:size` | Build for Workers and fail if the Worker is over the 3 MiB free-plan limit |
| `npm run typegen` | Regenerate the Prisma client, `cloudflare-env.d.ts` and Next's route types (runs on install; rerun after changing the schema or `wrangler.jsonc`) |
| `npm run db:migrate:local` / `db:migrate:remote` | Apply new files in `migrations/` to local / production D1 |
| `npm run db:seed:local` | Replace local data with sample rows |
| `npm run db:diff` | Print the SQL that turns local D1 into `prisma/schema.prisma` |
| `npm run db:studio` | Browse local D1 in Prisma Studio |

## Deploying

`npm run deploy` (after `npx wrangler login`). If the GitHub repo is connected to Workers Builds, pushing to `main` deploys automatically.

Before deploying a schema change, apply its migration with `npm run db:migrate:remote`.

## Changing the database schema

Wrangler owns the migrations. Prisma only writes the SQL.

1. Edit `prisma/schema.prisma`.
2. `npx wrangler d1 migrations create whodunnit <short_name>` creates an empty `migrations/000N_<short_name>.sql`.
3. `npm run db:diff`, then paste its output into that file. It diffs against local D1, so make sure local D1 is migrated first.
4. `npm run db:migrate:local` and `npm run typegen`, then try it with `npm run dev`.
5. Commit, run `npm run db:migrate:remote`, and deploy.

## Admin access

The dashboard (`/dashboard`), the tRPC API (`/api/trpc`) and image uploads (`/api/admin`) sit behind a Cloudflare Access application. Visitors to those paths get an email one-time PIN login, and only addresses in the application's Allow policy can get in. The app also verifies Access's signed JWT itself (`src/server/auth.ts`), so a request that somehow bypasses Access is still rejected.

- **Add or remove an admin:** Zero Trust → Access → Applications → the whodunnit application → Policies → edit the email list. No code change or deploy needed.
- **Add a hostname:** add it to `routes` in `wrangler.jsonc`, and add the same hostname with the paths `dashboard*`, `api/trpc*` and `api/admin*` to the Access application. Without the Access entry the dashboard shows "Access to this page is restricted."
- `workers_dev` and `preview_urls` are off in `wrangler.jsonc` on purpose. Those URLs would skip Access.

`CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` in `wrangler.jsonc` identify that Access application. The AUD tag is on the application's overview page. Neither is secret.

## Images

Uploads go to `POST /api/admin/images` (`src/app/api/admin/images/route.ts`). It accepts JPEG, PNG, WebP, GIF or AVIF up to 4 MB (SVG is refused because it can carry scripts) and stores the file in R2 under a random `<uuid>.<ext>` key, which is also the `Image` row's id. Deleting an image or using "delete unused images" in the dashboard removes both the row and the R2 object.

## Limits and backups

- **Worker size:** the free plan allows 3 MiB gzipped. The build is about 2.2 MiB, mostly Next.js plus Prisma's query compiler. `wrangler deploy --dry-run` prints the size. Prisma uses its "small" compiler build (`prisma/schema.prisma`) for this reason. If a new dependency pushes the size over, trim it rather than move to Workers Paid.
- **Free-plan quotas** (D1 reads/writes, R2 storage, 5,000 image transformations a month, 100,000 Worker requests a day) are far above what the site uses.
- **Backups:** D1 Time Travel can restore the database to any minute in the last 30 days (`npx wrangler d1 time-travel restore whodunnit --timestamp=…`). R2 has no versioning. Images are only deleted from the dashboard.

## Why `--webpack`

`dev` and `build` use webpack instead of Turbopack. The generated Prisma client loads its wasm query compiler with a Workers-only `import "….wasm?module"`, and the webpack hook in `next.config.js` turns that into a real wasm module for Workers (and reads it from disk under `next dev`). Turbopack bundles it in a way that can't run on Workers.
