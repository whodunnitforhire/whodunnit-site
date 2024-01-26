import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

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
      if (!await api.image.exists.query(input.imageId)) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Provided image doesn't exist" })
      }
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
      if (!await api.image.exists.query(input.imageId)) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Provided image doesn't exist" })
      }
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

  // TODO: private procedure
  deleteAllButNewest: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const thresholdRecord = await ctx.db.update.findMany({
      take: input,
      orderBy: {
        createdAt: "desc",
      },
      skip: (input - 1),
    })
    if (!thresholdRecord || thresholdRecord.length === 0) {
      return;
    }
    const thresholdDate = thresholdRecord[0]?.createdAt;
    await ctx.db.update.deleteMany({
      where: {
        createdAt: {
          lt: thresholdDate
        }
      }
    })
  }),
});
