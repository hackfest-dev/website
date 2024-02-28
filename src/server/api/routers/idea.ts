import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { submitIdeaZ } from "~/server/schema/zod-schema";
import { uploadFile } from "~/utils/cloudinary";

export const ideaRouter = createTRPCRouter({
  submitIdea: protectedProcedure
    .input(submitIdeaZ)
    .mutation(async ({ input, ctx }) => {
      if (input.ppt?.type !== "application/pdf") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only pdf files are allowed",
        });
      }

      if (!input.ppt || input.ppt?.size > 5 * 1024 * 1024) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Upload only pdf of less than 5MB",
        });
      }

      try {
        const user = ctx.session.user;
        if (!user?.isLeader)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only leader may submit the idea",
          });

        const team = await ctx.db.team.findUnique({
          where: {
            id: user.team?.id,
          },
          include: {
            ideaSubmission: true,
          },
        });
        if (team?.ideaSubmission)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Idea already submitted",
          });

        const pptUrl = await uploadFile({
          file: input.ppt,
          folder: "ppts",
        });

        if (input.referralCode === "")
          await ctx.db.team.update({
            data: {
              ideaSubmission: {
                create: {
                  problemStatement: input.problemStatement,
                  pptUrl,
                  track: input.track,
                },
              },
              members: {
                updateMany: {
                  where: {
                    teamId: user.team?.id,
                  },
                  data: {
                    profileProgress: "COMPLETE",
                  },
                },
              },
            },
            where: {
              id: user.team?.id,
            },
          });
        else {
          const referral = await ctx.db.referral.findUnique({
            where: {
              code: input.referralCode,
            },
            include: {
              college: true,
            },
          });

          if (!referral)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid referral code",
            });

          const dbUser = await ctx.db.user.findUnique({
            where: {
              id: user.id,
            },
            include: {
              college: true,
            },
          });
          if (referral.college?.id !== dbUser?.college?.id)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid referral code",
            });

          await ctx.db.team.update({
            data: {
              ideaSubmission: {
                create: {
                  problemStatement: input.problemStatement,
                  pptUrl,
                  track: input.track,
                },
              },
              members: {
                updateMany: {
                  where: {
                    teamId: user.team?.id,
                  },
                  data: {
                    profileProgress: "COMPLETE",
                  },
                },
              },
              referral: {
                connect: {
                  code: input.referralCode,
                },
              },
            },
            where: {
              id: user.team?.id,
            },
          });
        }
        return { status: "success", message: "Idea has been submitted" };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
