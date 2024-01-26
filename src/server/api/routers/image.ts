import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.image.findMany();
  }),

  exists: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return !!(await ctx.db.image.findFirst({
      where: {
        id: input,
      },
    }));
  }),

  // TODO: private procedure
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.image.delete({
      where: {
        id: input,
      },
    });
  }),
});
