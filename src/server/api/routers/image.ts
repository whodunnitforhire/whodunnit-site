import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.image.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.image.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
