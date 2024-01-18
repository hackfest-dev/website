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
  } else if (user.profileProgress === "COMPLETE") {
    if (user.team?.ideaSubmission) {
      currentStep = 3;
    } else {
      currentStep = 2;
    }
  }
  return (
    <main className="p-6 md:p-auto m-auto mt-20 text-black min-h-screen flex justify-center items-center flex-col">
      <ProgressProvider initialStep={currentStep}>
        {currentStep < 3 ? (
          <>
            <Progress />
            <RegisterProfile />
            {user.team ? <TeamDetails teamid={user.team.id} /> : <CreateTeam />}
            <IdeaSubmitForm />
          </>
        ) : (
          <div>Successfully registered... Hope to see your team in top 60!</div>
        )}
      </ProgressProvider>
    </main>
  );
}
