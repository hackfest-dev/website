import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ideaRouter = createTRPCRouter({
  setScore: protectedProcedure
    .input(
      z.object({
        score: z.enum(["5","10","15"]),
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
