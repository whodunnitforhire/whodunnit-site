import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";

export const aboutRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const record = await ctx.db.about.findFirst();
    if (record) {
      return record;
    }
    return ctx.db.about.create({
      data: {
        content: "About section...",
      },
    });
  }),

  update: privateProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let record = await ctx.db.about.findFirst();
      if (!record) {
        record = await ctx.db.about.create({
          data: {
            content: "About section...",
          },
        });
      }
      return ctx.db.about.update({
        where: {
          id: record.id,
        },
        data: {
          content: input.content,
        },
      });
    }),
});
