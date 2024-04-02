import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const criteraRouter = createTRPCRouter({
  //TODO: get criteria based on type if they are different
  getCriteria: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.criteria.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
});
