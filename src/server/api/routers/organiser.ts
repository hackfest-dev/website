import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { addJudgeZ } from "~/server/schema/zod-schema";


export const organiserRouter = createTRPCRouter({
    getJudgesList: protectedProcedure
    .query(async ({ctx})=>{
        if(ctx.session.user.role !== 'ORGANISER'){
            throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You cannot perform this action' })
        }

        return await ctx.db.judges.findMany({
            include: {
                User: true
            }
        })
    }),
    addJudge: protectedProcedure
        .input(
            addJudgeZ
        )
        .mutation(async ({input, ctx}) => {
            if(ctx.session.user.role !== 'ORGANISER'){
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You cannot perform this action' })
            }

            const user = await ctx.db.user.findUnique({
                where: {
                    id: input.userId
                },
                include: {
                    Judges: true
                }
            })

            if(!user?.Judges){
                await ctx.db.user.update({
                    where: {
                        id: input.userId
                    },
                    data: {
                        role: input.type,
                    }
                })

                await ctx.db.judges.create({
                    data: {
                        userId: input.userId,
                        track: input.track,
                    },
                })


            }else{
                await ctx.db.user.update({
                    where: {
                        id: input.userId
                    },
                    data: {
                        role: input.type,
                    }
                })

                await ctx.db.judges.update({
                    where: {
                        userId: input.userId
                    },
                    data: {
                        type: input.type,
                        track: input.track,
                    }
                })
            }
        }),
    removeJudge: protectedProcedure
        .input(z.object({
            userId: z.string()
        }))
        .mutation(async ({input, ctx}) => {
            if(ctx.session.user.role !== 'ORGANISER'){
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You cannot perform this action' })
            }

            await ctx.db.judges.delete({
                where: {
                    userId: input.userId
                }
            })

            await ctx.db.user.update({
                where: {
                    id: input.userId
                },
                data: {
                    role: 'PARTICIPANT'
                }
            }) 
        })
})