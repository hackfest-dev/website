import { type States } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCollegeZ } from "~/server/schema/zod-schema";

export const criteraRouter = createTRPCRouter({
    
    getCriteria: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.criteria.findMany({
        select: {
            id: true,
            name: true,
            weight:true,
            scores:true,
            type:true,
        },
        });
    }),
});