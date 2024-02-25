// import CreateTeam from "@/src/components/forms/createTeam";
// import RegisterProfile from "@/src/components/forms/registerProfile";
// import TeamDetails from "@/src/components/forms/teamInfo";
import { getCurrentUser } from "@/src/lib/session";
// import ProgressProvider from "../../../components/progressProvider";
// import Progress from "@/src/components/registrationProgress";
// import IdeaSubmitForm from "@/src/components/forms/ideaSubmitForm";
// import FormButtons from "@/src/components/formButtons";
import NotLoggedIn from "@/src/components/notLoggedIn";
import Registered from "@/src/components/registered";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import dynamic from "next/dynamic";

const ProgressProvider= dynamic(() => import('../../../components/progressProvider'))
const Progress = dynamic(() => import('@/src/components/registrationProgress'))
const IdeaSubmitForm = dynamic(() => import('@/src/components/forms/ideaSubmitForm'))
const TeamDetails = dynamic(() => import('@/src/components/forms/teamInfo'))
const FormButtons = dynamic(() => import('@/src/components/formButtons'))
const RegisterProfile = dynamic(() => import('@/src/components/forms/registerProfile'))
const CreateTeam = dynamic(() => import('@/src/components/forms/createTeam'))


export default async function RegisterPage() {
  const user = await getCurrentUser();

  let currentStep = 0;

  if (!user) {
    return <NotLoggedIn />;
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
      className={`bg-[url("/images/blue-grainy.png")] bg-cover bg-center relative overflow-hidden`}
    >
      {/* <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black/20"></div>

      <div className="max-w-screen-2xl min-h-screen mx-5 md:mx-20 lg:mx-48 flex justify-center items-center">
        <div className="z-10 bg-black/50 p-4 md:px-16 lg:px-24 mt-32 mb-20 pt-12 pb-8 md:py-12 flex justify-center items-center flex-col border border-white/20 w-full rounded-3xl">
          <ProgressProvider initialStep={currentStep}>
            {currentStep < 3 ? (
              <>
                <div className="w-full flex flex-col gap-5 md:gap-8">
                  <Progress />
                  <RegisterProfile />
                  {user.team ? (
                    <TeamDetails
                      userId={user.id}
                      teamid={user.team.id}
                      userProgress={user.profileProgress}
                    />
                  ) : (
                    <CreateTeam />
                  )}
                  <IdeaSubmitForm />
                  <FormButtons
                    isComplete={user.team?.isComplete ? true : false}
                    profileProgress={user.profileProgress}
                    isLeader={user.isLeader}
                    isInTeam={user.team ? true : false}
                  />
                </div>
              </>
            ) : (
              <Registered />
            )}
          </ProgressProvider>
          
        </div>
      </div>
    </main>
  );
}
