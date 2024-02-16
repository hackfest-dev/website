import CreateTeam from "@/src/components/forms/createTeam";
import RegisterProfile from "@/src/components/forms/registerProfile";
import TeamDetails from "@/src/components/forms/teamInfo";
import { prisma } from "@/src/lib/db";
import { getCurrentUser } from "@/src/lib/session";
import ProgressProvider from "../../../components/progrssProvider";
import Progress from "@/src/components/registrationProgress";
import IdeaSubmitForm from "@/src/components/forms/ideaSubmitForm";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  // Y do we need this?
  const userInfo = user
    ? await prisma.user
        .findUniqueOrThrow({
          where: {
            email: user?.email ?? undefined,
          },
        })
        .catch(() => {
          return null;
        })
    : null;

  let currentStep = 0;

  if (!user) {
    return (
      <>
        <div className="pb-20 pt-32 h-screen flex justify-center items-center">
          Please login to continue
        </div>
      </>
    );
  } else if (user.profileProgress === "FILL_DETAILS") {
    currentStep = 0;
  } else if (user.profileProgress === "FORM_TEAM") {
    currentStep = 1;
  } else if (user.profileProgress === "SUBMIT_IDEA") {
    if (user.team?.ideaSubmission) {
      currentStep = 3;
    } else {
      currentStep = 2;
    }
  } else if (user.profileProgress === "COMPLETE") {
    currentStep = 3;
  }
  return (
    <main className="max-w-screen-2xl min-h-screen mx-auto flex justify-center items-center">
      <div className="p-4 md:px-16 lg:px-24 mt-24 mb-12 pt-12 pb-8 md:py-12 flex justify-center items-center flex-col border md:max-w-screen-sm lg:max-w-3xl rounded-3xl">
        <ProgressProvider initialStep={currentStep}>
          {currentStep < 3 ? (
            <>
              <div className="w-full flex flex-col gap-5 md:gap-8">
                <Progress />
                <RegisterProfile />
                {user.team ? (
                  <TeamDetails teamid={user.team.id} />
                ) : (
                  <CreateTeam />
                )}
                <IdeaSubmitForm />
              </div>
            </>
          ) : (
            <div>
              Successfully registered... Hope to see your team in top 60!
            </div>
          )}
        </ProgressProvider>
      </div>
    </main>
  );
}
