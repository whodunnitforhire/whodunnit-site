import { z } from "zod";
import { UTApi } from 'uploadthing/server';

import { createTRPCRouter, publicProcedure, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const utapi = new UTApi()

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.image.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  exists: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return !!(await ctx.db.image.findFirst({
      where: {
        id: input,
      },
    }));
  }),

  getSizeAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.image.aggregate({
      _sum: {
        size: true,
      },
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        key: z.string().min(1),
        url: z.string().min(1),
        size: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.image.create({
        data: {
          id: input.key,
          url: input.url,
          size: input.size,
        },
      });
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const imageInUse = await ctx.db.image.findUnique({
        where: { id: input.id },
        include: {
          updates: true,
          Product: true,
        },
      });
      if (
        imageInUse &&
        (imageInUse.updates.length > 0 || imageInUse.Product.length > 0)
      ) {
        throw new TRPCError({
          message: "Cannot delete image because it is currently in use",
          code: "CONFLICT", 
        });
      }
      const result = await utapi.deleteFiles(input.id);
      if (!result.success) {
        throw new TRPCError({
          message: "Image service provider failed to delete images.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return ctx.db.image.delete({
        where: {
          id: input.id,
        },
      });
    }),

  prune: privateProcedure.mutation(async ({ ctx }) => {
    const unusedImages = await ctx.db.image.findMany({
      where: {
        NOT: {
          OR: [{ updates: { some: {} } }, { Product: { some: {} } }],
        },
      },
    });
    const unusedIds = unusedImages.map((i) => i.id);
    if (unusedIds.length > 0) {
      const result = await utapi.deleteFiles(unusedIds);
      if (!result.success) {
        throw new TRPCError({
          message: "Failed to delete files",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }
    return ctx.db.image.deleteMany({
      where: {
        id: {
          in: unusedIds,
        },
      },
    });
  }),
});
