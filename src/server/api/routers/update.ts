import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const updateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.update.findMany({
      include: {
        image: true,
      },
    });
  }),

  // TODO: implement auth and use private procedure
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1).max(255),
        caption: z.optional(z.string().min(1).max(255)),
        content: z.string().min(1),
        imageId: z.string(),
        buttonName: z.string().min(1).max(255),
        buttonLink: z.string().min(1).max(2083),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.update.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          caption: input.caption,
          content: input.content,
          imageId: input.imageId,
          buttonName: input.buttonName,
          buttonLink: input.buttonLink,
        },
      });
    }),
});
