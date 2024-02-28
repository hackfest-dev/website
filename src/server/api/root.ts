import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { teamRouter } from "./routers/team";
import { collegeRouter } from "./routers/college";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  team: teamRouter,
  college: collegeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
