import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createTeamZ, joinTeamZ } from "~/server/schema/zod-schema";

export const teamRouter = createTRPCRouter({
  checkName: protectedProcedure
    .input(createTeamZ)
    .query(async ({ input, ctx }) => {
      try {
        const team = await ctx.db.team.findFirst({
          where: {
            name: input.teamName,
          },
        });
        if (team?.id) {
          return { status: "success", message: false };
        }
        return { status: "success", message: true };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  createTeam: protectedProcedure
    .input(createTeamZ)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      if (user.team) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are already in a team",
        });
      }

      if (
        user.profileProgress !== "FORM_TEAM" &&
        user.profileProgress !== "SUBMIT_IDEA"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please complete your profile first",
        });
      }

      try {
        await ctx.db.user.update({
          where: {
            id: user.id,
          },
          data: {
            isLeader: true,
            team: {
              create: {
                name: input.teamName,
              },
            },
          },
        });
        return {
          status: "success",
          message: "Team created successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  joinTeam: protectedProcedure
    .input(joinTeamZ)
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;
        if (user?.team) {
          return { status: "error", message: "You are already in a team" };
        }

        if (
          user?.profileProgress !== "FORM_TEAM" &&
          user?.profileProgress !== "SUBMIT_IDEA"
        ) {
          return {
            status: "error",
            message: "Please complete your profile first",
          };
        }

        const team = await ctx.db.team.findFirst({
          where: {
            id: input.teamId,
          },
          include: {
            members: {
              include: { college: true },
            },
          },
        });
        if (!team) {
          return { status: "error", message: "Team not found" };
        }

        if (team.members.length >= 4) {
          return { status: "error", message: "Team is already full" };
        }

        const leader = team.members.find((member) => member.isLeader === true);
        if (user.college !== leader?.college?.name) {
          return {
            status: "error",
            message: "Team members should be from same college only",
          };
        }

        const res = await ctx.db.team.update({
          where: {
            id: input.teamId,
          },
          data: {
            members: {
              connect: {
                id: user?.id,
              },
            },
          },
          include: {
            members: true,
          },
        });

        const isComplete = res.members.length === 3 || res.members.length === 4;
        await ctx.db.team.update({
          where: {
            id: input.teamId,
          },
          data: {
            isComplete,
          },
        });
        return { status: "success", message: "Joined team successfully" };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
