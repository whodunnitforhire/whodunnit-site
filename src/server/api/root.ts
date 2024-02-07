import { aboutRouter } from "@/server/api/routers/about";
import { createTRPCRouter } from "@/server/api/trpc";
import { reviewRouter } from "./routers/review";
import { updateRouter } from "./routers/update";
import { imageRouter } from "./routers/image";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  about: aboutRouter,
  review: reviewRouter,
  update: updateRouter,
  image: imageRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
