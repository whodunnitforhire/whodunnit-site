import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aboutRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.about.create({
        data: {
            content: input.content,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.about.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.about.findFirst({
      where: {
        id: input,
      },
    });
  }),

  findFirstId: publicProcedure.query(({ ctx }) => {
    return ctx.db.about.findFirst({
        select: { id: true }
    })
  }),

  editById: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.about.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    }),
});
