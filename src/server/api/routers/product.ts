import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        caption: z.optional(z.string().max(255)),
        imageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!await api.image.exists.query(input.imageId)) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Provided image doesn't exist" })
      }
      return ctx.db.product.create({
        data: { ...input, caption: input.caption ?? "" },
      });
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1).max(255),
        caption: z.optional(z.string().max(255)),
        imageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!await api.image.exists.query(input.imageId)) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Provided image doesn't exist" })
      }
      return ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: { ...input },
      });
    }),

  delete: privateProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.product.delete({
      where: {
        id: input,
      },
    });
  }),
});

