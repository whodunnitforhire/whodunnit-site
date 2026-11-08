import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Uploads go through POST /api/admin/images; the R2 object key is the Image id.
const bucket = () => getCloudflareContext().env.IMAGES_BUCKET;

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
      await bucket().delete(input.id);
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
    // R2 accepts at most 1000 keys per delete call.
    for (let i = 0; i < unusedIds.length; i += 1000) {
      await bucket().delete(unusedIds.slice(i, i + 1000));
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
