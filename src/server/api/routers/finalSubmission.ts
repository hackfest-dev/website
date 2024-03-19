import { TRPCClientError } from "@trpc/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {z} from 'zod';
import { TRPCError } from "@trpc/server";
import { finalSubmissionZ, resumeSubmissionZ } from "~/server/schema/zod-schema";
export const finalSubmissionRoute = createTRPCRouter({
    resumeUpload: protectedProcedure
    .input(resumeSubmissionZ)
    .mutation(async ({ctx, input}) => {
        if(!ctx.session.user.isLeader){
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You are not a team leader'
            })
        }
        try{
            const user = await ctx.db.user.update({
                where: {
                    id: input.userId
                },
                data: {
                    resume: input.resumeUrl
                }
            })
        }catch(e){
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong'
            })
        }
    }),
    finalSubmission: protectedProcedure
    .input(finalSubmissionZ)
    .mutation(async ({ctx,input}) =>{
        if(!ctx.session.user.isLeader){
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You are not a team leader'
            })
        }
        try{
            const team = await ctx.db.team.update({
                where: {
                    id: input.teamId
                },
                data:{
                    paymentProof: input.paymentProof,
                    transactionId: input.paymentId
                }
            })
        }catch(e){
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong'
            })
        }
    }),
    verifyPaymentStatus: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async ({ctx,input}) => {
        if(ctx.session.user.role !== 'ORGANISER' && ctx.session.user.role !== 'ADMIN'){
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You cannot perform this action'
            })
        }

        const updatedTeam = await ctx.db.team.update({
            where: {
                id: input.teamId
            },
            data: {
                paymentStatus: "PAID"
            }
        })
    }),
    resetPaymentStatus: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .mutation(async ({ctx,input}) => {
        if(ctx.session.user.role !== 'ORGANISER' && ctx.session.user.role !== 'ADMIN'){
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You cannot perform this action'
            })
        }

        const updatedTeam = await ctx.db.team.update({
            where: {
                id: input.teamId
            },
            data: {
                paymentStatus: "PENDING",
                paymentProof: null,
                transactionId: null
            }
        })
    }),

})