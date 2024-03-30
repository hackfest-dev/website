import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
export const JudgeRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = ctx.session.user;
      if (user.role !== "JUDGE" && user.role !== "ADMIN")
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to perform this action",
        });
      const teams = await ctx.db.team.findMany({
        where: {
          teamNo: {
            not: null,
          },
        },
        include: {
          Remarks: true,
          ideaSubmission: true,
		  Scores: {
			where: {
			  userId: user.id,
			},
			include: {
			  score: true,
			},
		  },
        },
        orderBy: {
          teamNo: "asc",
        },
      });
      return teams;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }),
  getDay: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = ctx.session.user;
      if (user.role !== "JUDGE" && user.role !== "ADMIN")
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to perform this action",
        });

      const judges = await ctx.db.judges.findFirst({
        where: {
          User: {
            id: user.id,
          },
        },
        select: {
          type: true,
        },
      });
      return judges;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }),
  addRemark: protectedProcedure
    .input(
      z.object({
        teamid: z.string(),
        remark: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;
        if (user.role !== "JUDGE")
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not authorized to perform this action",
          });
        const team = await ctx.db.team.findUnique({
          where: {
            id: input.teamid,
          },
        });
        const judge = await ctx.db.judges.findUnique({
          where: {
            userId: user.id,
          },
        });
        if (!judge)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Judge not found",
          });
        if (!team)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found",
          });
        const remark = await ctx.db.remarks.create({
          data: {
            remarks: input.remark,
            team: {
              connect: {
                id: input.teamid,
              },
            },
            judge: {
              connect: {
                id: judge.id,
              },
            },
          },
        });
        return remark;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),
  getRemarksByteam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;
        if (user.role !== "JUDGE")
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not authorized to perform this action",
          });
        const team = await ctx.db.team.findUnique({
          where: {
            id: input.teamId,
          },
        });
        if (!team)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found",
          });
        const remarks = await ctx.db.remarks.findMany({
          where: {
            teamId: input.teamId,
          },
        });
        return remarks;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),
  setScore: protectedProcedure
    .input(
      z.object({
        score: z.number().min(1).max(10), //todo: set limits
        teamId: z.string(),
        criteriaId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        //Check if user is validator
        const user = ctx.session.user;
        const judge = await ctx.db.judges.findFirst({
          where: {
            userId: user.id,
          },
        });
        if (!judge || judge?.type !== "DAY2")
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not a day 2 judge!",
          });

        //Check if score already exists
        const scoreExists = await ctx.db.scoresByJudge.findFirst({
          where: {
            teamId: input.teamId,
            judgesId: judge.id,
            score: {
              criteriaId: input.criteriaId,
            },
          },
        });

        if (scoreExists) {
          await ctx.db.scoresByJudge.update({
            where: {
              id: scoreExists.id,
            },
            data: {
              score: {
                update: {
                  score: input.score.toString(),
                },
              },
            },
          });
        } else
          await ctx.db.scoresByJudge.create({
            data: {
              score: {
                create: {
                  score: input.score.toString(),
                  criteria: {
                    connect: {
                      id: input.criteriaId,
                    },
                  },
                },
              },
              Team: {
                connect: {
                  id: input.teamId,
                },
              },
              Judges: {
                connect: {
                  id: judge.id,
                },
              },
              userId: user.id, //Don't know why this is needed
            },
          });

        //Get total score by this judge for this team
        const scoresByjudge = await ctx.db.scoresByJudge.findMany({
          where: {
            teamId: input.teamId,
            userId: user.id,
          },
          include: {
            score: true,
          },
        });

        //Calculate total score
        let totalScore = 0;
        scoresByjudge.forEach((score) => {
          totalScore += parseInt(score.score.score);
        });

        //Update team score
        await ctx.db.team.update({
          where: {
            id: input.teamId,
          },
          data: {
            JudgeTotalScore: totalScore / 4, // there are 4 judges
          },
        });
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
