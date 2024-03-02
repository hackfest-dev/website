import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const validatorRouter= createTRPCRouter({
  setScore: protectedProcedure
    .input(
      z.object({
        score: z.enum(["5", "10", "15"]),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        //Check if user is validator
        const user = ctx.session.user;
        if (user?.role === "VALIDATOR")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not a validator!",
          });

        const team = await ctx.db.team.findUnique({
          where: {
            id: input.teamId,
          },
          include: {
            Scores: true,
          },
        });

		// If team already has a score just update it
        if (team && team?.Scores.length > 0) {
          await ctx.db.scoresByJudge.update({
            where: {
              teamId_userId: {
                teamId: input.teamId,
                userId: user.id,
              },
            },
            data: {
              score: {
                update: {
                  score: input.score as string,
                },
              },
            },
          });
        } 
		// If team is not yet given a score
		else {
          // Check if criteria exists
          let validatorCriteria = await ctx.db.criteria.findFirst({
            where: {
              type: "VALIDATOR",
            },
          });
          // if no criteria create one
          if (!validatorCriteria) {
            validatorCriteria = await ctx.db.criteria.create({
              data: {
                name: "top100",
                type: "VALIDATOR",
              },
            });
          }

          // Update score for that team in validator criteria
          await ctx.db.scoresByJudge.update({
            where: {
              teamId_userId: {
                teamId: input.teamId,
                userId: user.id,
              },
            },
            data: {
              score: {
                create: {
                  criteria: {
                    connect: {
                      id: validatorCriteria.id,
                    },
                  },
                  score: input.score as string,
                },
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError && error.code === "BAD_REQUEST")
          throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  getScoresByTeam: protectedProcedure
    .input(
      z.object({
        score: z.enum(["5", "10", "15"]),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        //Check if user is validator

        const user = ctx.session.user;
        if (user?.role === "VALIDATOR")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not a validator!",
          });

        const team = await ctx.db.team.findUnique({
          where: {
            id: input.teamId,
          },
          include: {
            Scores: {
              include: {
                score: true,
              },
            },
          },
        });
        return team?.Scores;
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError && error.code === "BAD_REQUEST")
          throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
