import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.review.findMany();
  }),
  
  update: privateProcedure.input(
    z.object({
      id: z.string().min(1),
      rating: z.number().min(1).max(5),
      author: z.string().min(1).max(255),
      content: z.string().min(1)
    })
  ).mutation(async ({ ctx, input }) => {
    return ctx.db.review.update({
      where: {
        id: input.id,
      },
      data: {
        rating: input.rating,
        author: input.author,
        content: input.content
      }
    })
  })
});
