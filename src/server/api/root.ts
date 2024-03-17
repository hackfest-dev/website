import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { teamRouter } from "./routers/team";
import { collegeRouter } from "./routers/college";
import { ideaRouter } from "./routers/idea";
import { FAQRouter } from "./routers/faq";
import { referralRouter } from "./routers/referral";
import { validatorRouter } from "./routers/validator";
import { organiserRouter } from "./routers/organiser";
import { superValidatorRouter } from "./routers/super-validator";
import { finalSubmissionRoute } from "./routers/finalSubmission";



/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  team: teamRouter,
  college: collegeRouter,
  idea: ideaRouter,
  faq: FAQRouter,
  referrals: referralRouter,
  validator:validatorRouter,
  organiser: organiserRouter,
  superValidator: superValidatorRouter,
  finalSubmission: finalSubmissionRoute
});

// export type definition of API
export type AppRouter = typeof appRouter;
