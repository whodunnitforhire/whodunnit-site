import { string, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        rating: z.number().min(1).max(5),
        author: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.review.create({
        data: {
          rating: input.rating,
          author: input.author,
          content: input.content,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.review.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.review.findFirst({
      where: {
        id: input,
      },
    });
  }),

  editById: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        rating: z.number().min(1).max(5),
        author: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.review.update({
        where: {
          id: input.id,
        },
        data: {
          rating: input.rating,
          author: input.author,
          content: input.content,
        },
      });
    }),
});
