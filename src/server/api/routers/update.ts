import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const updateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.update.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // TODO: private procedure
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        caption: z.optional(z.string().max(255)),
        content: z.string().min(1),
        imageId: z.string(),
        buttonName: z.string().min(1).max(255),
        buttonLink: z.string().min(1).max(2083),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.update.create({
        data: { ...input, caption: input.caption ?? "" },
      });
    }),

  // TODO: private procedure
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1).max(255),
        caption: z.optional(z.string().max(255)),
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
        data: { ...input },
      });
    }),

  // TODO: private procedure
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.update.delete({
      where: {
        id: input,
      },
    });
  }),
});
