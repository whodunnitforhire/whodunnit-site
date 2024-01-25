import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const updateRouter = createTRPCRouter({ 
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.update.findMany({
      include: {
        image: true
      }
    });
  }),
});
