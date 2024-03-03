import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const validatorRouter = createTRPCRouter({
  setScore: protectedProcedure
    .input(
      z.object({
        score: z.string(),
        teamId: z.string(),
        criteriaId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        //Check if user is validator
        const user = ctx.session.user;
		const judge = await ctx.db.judges.findUnique({
			where:{
				id:user.id
			}
		})
        if (judge?.type !== "SUPER_VALIDATOR")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not allowed to perform this action",
          });

        const team = await ctx.db.team.findUnique({
          where: {
            id: input.teamId,
          },
          include: {
            Scores: {
              where: {
                userId: user.id,
              },
              include: {
                score: true,
              },
            },
          },
        });

        // If team already has a score just update it
        if (team && team?.Scores.length > 0) {
          const newTotalScore =
            team.ValidatorTotalScore -
            Number(team.Scores[0]?.score.score) +
            Number(input.score);
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
                  score: input.score,
                },
              },
            },
          });
          await ctx.db.team.update({
            where: {
              id: input.teamId,
            },
            data: {
              ValidatorTotalScore: newTotalScore,
            },
          });
        }
        // If team is not yet given a score
        else {
          // Check if criteria exists
          const judgingCriteria = await ctx.db.criteria.findUnique({
            where: {
				id:input.criteriaId
            },
          });
          // if no criteria create one
          if (!judgingCriteria) {
			  throw new TRPCError({
				  code:"BAD_REQUEST",
				  message:"Criteria not found"
			  })
          }

          // Update score for that team in validator criteria
          await ctx.db.scoresByJudge.create({
            data: {
              Judge: {
                connect: {
                  id: user.id,
                },
              },
              Team: {
                connect: {
                  id: input.teamId,
                },
              },
              score: {
                create: {
                  score: input.score ,
                  criteria: {
                    connect: {
                      id: judgingCriteria.id,
                    },
                  },
                },
              },
            },
          });
          await ctx.db.team.update({
            where: {
              id: input.teamId,
            },
            data: {
              SuperValidatorTotalScore: { increment: Number(input.score) * judgingCriteria.weight },
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
});
