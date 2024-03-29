import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {z} from 'zod';
export const JudgeRouter = createTRPCRouter({
    getTeams: protectedProcedure
    .query(async ({ctx}) => {
        try {
            const user = ctx.session.user;
            if(user.role !== 'JUDGE' && user.role !== 'ADMIN' ) throw new TRPCError({
                code:"FORBIDDEN",
                message:"You are not authorized to perform this action"
            })
            const teams = await ctx.db.team.findMany({
                where : {
                    teamNo: {
                        not: null
                    }
                },
                include: {
                    Remarks: true,
                    ideaSubmission: true
                },
                orderBy: {
                    teamNo: 'asc'
                }
            });
            return teams;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    }),
    addRemark: protectedProcedure
    .input(z.object({
        teamid: z.string(),
        remark: z.string()
    }))
    .mutation(async ({input, ctx}) => {
        try {
            const user = ctx.session.user;
            if(user.role !== 'JUDGE') throw new TRPCError({
                code:"FORBIDDEN",
                message:"You are not authorized to perform this action"
            })
            const team = await ctx.db.team.findUnique({
                where: {
                    id: input.teamid
                }
            });
            const judge = await ctx.db.judges.findUnique({
                where: {
                    userId: user.id
                }
            });
            if(!judge) throw new TRPCError({
                code:"NOT_FOUND",
                message:"Judge not found"
            });
            if(!team) throw new TRPCError({
                code:"NOT_FOUND",
                message:"Team not found"
            });
            const remark = await ctx.db.remarks.create({
                data: {
                    remarks: input.remark,
                    team: {
                        connect: {
                            id: input.teamid
                        }
                    },
                    judge: {
                        connect: {
                            id: judge.id
                        }
                    }
                }
            });
            return remark;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    }),
    getRemarksByteam: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async ({input, ctx}) => { 
        try {
            const user = ctx.session.user;
            if(user.role !== 'JUDGE') throw new TRPCError({
                code:"FORBIDDEN",
                message:"You are not authorized to perform this action"
            })
            const team = await ctx.db.team.findUnique({
                where: {
                    id: input.teamId
                }
            });
            if(!team) throw new TRPCError({
                code:"NOT_FOUND",
                message:"Team not found"
            });
            const remarks = await ctx.db.remarks.findMany({
                where: {
                    teamId: input.teamId
                }
            });
            return remarks;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    })
})