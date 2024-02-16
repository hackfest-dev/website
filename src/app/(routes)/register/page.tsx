import CreateTeam from "@/src/components/forms/createTeam";
import RegisterProfile from "@/src/components/forms/registerProfile";
import TeamDetails from "@/src/components/forms/teamInfo";
import { getCurrentUser } from "@/src/lib/session";
import ProgressProvider from "../../../components/progressProvider";
import Progress from "@/src/components/registrationProgress";
import IdeaSubmitForm from "@/src/components/forms/ideaSubmitForm";
import FormButtons from "@/src/components/formButtons";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  let currentStep = 0;

  if (!user) {
    return (
      <div className="pb-20 pt-32 h-screen flex justify-center items-center">
        Please login to continue
      </div>
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
    <main
      className={`bg-black/[0.96] antialiased bg-grid-white/[0.3] relative`}
    >
      <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-screen-2xl min-h-screen mx-5 md:mx-20 lg:mx-48 flex justify-center items-center">
        <div className="z-10 bg-black/80 p-4 md:px-16 lg:px-24 mt-32 mb-20 pt-12 pb-8 md:py-12 flex justify-center items-center flex-col border border-white/20 w-full rounded-3xl">
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
                  <FormButtons />
                </div>
              </>
            ) : (
              <div>
                Successfully registered... Hope to see your team in top 60!
              </div>
            )}
          </ProgressProvider>
        </div>
      </div>
    </main>
  );
}
