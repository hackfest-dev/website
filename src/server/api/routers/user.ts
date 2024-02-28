import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  editProfileZ,
  updateProfileZ,
  updateUserZ,
} from "~/server/schema/zod-schema";
import { deleteFile, uploadFile } from "~/utils/cloudinary";

export const userRouter = createTRPCRouter({
  verifyUser: protectedProcedure
    .input(updateUserZ)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      try {
        await ctx.db.user.update({
          where: { id: input.userId },
          data: { isVerified: true },
        });
        return {
          status: "success",
          message: "User verified successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  updateProfile: protectedProcedure
    .input(updateProfileZ)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          college: true,
        },
      });

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (input.aadhaarFile) {
        if (!allowedTypes.includes(input.aadhaarFile.type)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only jpeg, jpg and png files are allowed",
          });
        }

        if (input.aadhaarFile.size > 2 * 1024 * 1024) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Uploads must be less than 2MB",
          });
        }
      }

      if (input.collegeIdFile) {
        if (!allowedTypes.includes(input.collegeIdFile.type)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only jpeg, jpg and png files are allowed",
          });
        }

        if (input.collegeIdFile.size > 2 * 1024 * 1024) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Uploads must be less than 2MB",
          });
        }
      }

      //If ID is already there remove the existing one from cloudinary
      if (input.aadhaarFile && user?.aadhaar) {
        await deleteFile(user.aadhaar.split(";")[1]!);
      }
      if (input.collegeIdFile && user?.college_id) {
        await deleteFile(user.college_id.split(";")[1]!);
      }

      // upload files only if they exist otherwise set to existing url
      const adhaarUrl = input.aadhaarFile
        ? await uploadFile({ file: input.aadhaarFile, folder: "ids" })
        : user?.aadhaar;

      const collegeIdUrl = input.collegeIdFile
        ? await uploadFile({ file: input.collegeIdFile, folder: "ids" })
        : user?.college_id;

      const hasNoChanges =
        user?.name === input.name &&
        user?.phone === input.phone &&
        adhaarUrl === user?.aadhaar &&
        collegeIdUrl === user?.college_id &&
        user?.college?.id === input.college &&
        user?.tShirtSize === input.tshirtSize &&
        user?.course === input.course;

      const isComplete =
        input.name &&
        input.phone &&
        adhaarUrl &&
        !adhaarUrl?.startsWith("undefined") &&
        collegeIdUrl &&
        !collegeIdUrl?.startsWith("undefined") &&
        input.college &&
        input.tshirtSize &&
        input.course
          ? true
          : false;

      if (!isComplete) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please fill all the required fields",
        });
      }

      if (hasNoChanges) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No changes made",
        });
      }

      await ctx.db.user.update({
        where: { id: ctx.session?.user.id },
        data: {
          profileProgress: isComplete ? "FORM_TEAM" : "FILL_DETAILS",
          name: input.name,
          phone: input.phone,
          aadhaar: adhaarUrl,
          college_id: collegeIdUrl,
          college: { connect: { id: input.college } },
          course: input.course,
          tShirtSize: input.tshirtSize,
        },
      });

      return { status: "success", message: "Profile updated successfully" };
    }),

  editProfile: protectedProcedure
    .input(editProfileZ)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          college: true,
        },
      });

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (input.aadhaarFile) {
        if (!allowedTypes.includes(input.aadhaarFile.type)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only jpeg, jpg and png files are allowed",
          });
        }

        if (input.aadhaarFile.size > 2 * 1024 * 1024) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Uploads must be less than 2MB",
          });
        }
      }

      if (input.collegeIdFile) {
        if (!allowedTypes.includes(input.collegeIdFile.type)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Only jpeg, jpg and png files are allowed",
          });
        }

        if (input.collegeIdFile.size > 2 * 1024 * 1024) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Uploads must be less than 2MB",
          });
        }
      }

      //If ID is already there remove the existing one from cloudinary
      if (input.aadhaarFile && user?.aadhaar) {
        await deleteFile(user.aadhaar.split(";")[1]!);
      }
      if (input.collegeIdFile && user?.college_id) {
        await deleteFile(user.college_id.split(";")[1]!);
      }

      // upload files only if they exist otherwise set to existing url
      const adhaarUrl = input.aadhaarFile
        ? await uploadFile({ file: input.aadhaarFile, folder: "ids" })
        : user?.aadhaar;

      const collegeIdUrl = input.collegeIdFile
        ? await uploadFile({ file: input.collegeIdFile, folder: "ids" })
        : user?.college_id;

      const hasNoChanges =
        user?.name === input.name &&
        user?.phone === input.phone &&
        adhaarUrl === user?.aadhaar &&
        collegeIdUrl === user?.college_id &&
        user?.college?.id === input.college &&
        user?.course === input.course;

      if (hasNoChanges) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No changes made",
        });
      }

      await ctx.db.user.update({
        where: { id: ctx.session?.user.id },
        data: {
          name: input.name,
          phone: input.phone,
          aadhaar: adhaarUrl,
          college_id: collegeIdUrl,
          college: { connect: { id: input.college } },
          course: input.course,
        },
      });

      return { status: "success", message: "Profile updated successfully" };
    }),

  updateProfileProgress: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.session.user;
    try {
      if (user?.profileProgress !== "SUBMIT_IDEA")
        await ctx.db.team.update({
          data: {
            members: {
              updateMany: {
                where: {
                  teamId: user?.team?.id,
                },
                data: {
                  profileProgress: "SUBMIT_IDEA",
                },
              },
            },
          },
          where: {
            id: user?.team?.id,
          },
        });
      else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already updated to SubmitIdea",
        });
      }

      return {
        status: "success",
        message: "Profile progress updated successfully",
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),

  getUserWithCollege: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        college: true,
      },
    });
  }),

  getUserWithTeam: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        team: {
          include: {
            ideaSubmission: true,
          },
        },
        college: true,
      },
    });
  }),
});
