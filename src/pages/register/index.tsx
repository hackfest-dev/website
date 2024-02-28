import RegisterProfile from "~/components/forms/registerProfile";
import TeamDetails from "~/components/forms/teamInfo";
import Progress from "~/components/registrationProgress";
import IdeaSubmitForm from "~/components/forms/ideaSubmitForm";
import FormButtons from "~/components/formButtons";
import NotLoggedIn from "~/components/notLoggedIn";
import Registered from "~/components/registered";
import { Button } from "~/components/ui/button";
import { LogoutButton } from "~/components/profile/logout";
import { FaDiscord } from "react-icons/fa";
import { BookOpen } from "lucide-react";
import CreateTeam from "~/components/forms/createTeam";
import ProgressProvider from "~/components/progressProvider";
import { api } from "~/utils/api";
import RootLayout from "~/components/layout";

export default function RegisterPage() {
  const { data: user } = api.user.getUserWithTeam.useQuery();

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
    <RootLayout>
      <main
        className={`relative overflow-hidden bg-[url("/images/blue-grainy.png")] bg-cover bg-center`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-black/20"></div>

        <div className="mx-5 flex min-h-screen max-w-screen-2xl items-center justify-center md:mx-20 lg:mx-48">
          <div className="z-10 mb-20 mt-32 flex w-full flex-col items-center justify-center rounded-3xl border border-white/20 bg-black/50 p-4 pb-8 pt-12 md:px-16 md:py-12 lg:px-24">
            <ProgressProvider initialStep={currentStep}>
              {currentStep !== 3 && (
                <div className="mb-10 flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
                  <h1 className="text-xl lg:text-2xl">Register to Hackfest</h1>

                  <div className="flex flex-wrap items-center justify-center gap-5">
                    <a
                      href="https://bit.ly/reg_guidelines"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="w-max gap-3">
                        <span className="hidden md:flex">Read Guidelines</span>
                        <BookOpen size="16" />
                      </Button>
                    </a>

                    <div className="flex gap-5">
                      <a href="https://discord.gg/d9hQV8Hcv6">
                        <Button>
                          <FaDiscord className="text-blue-500" size="20" />
                        </Button>
                      </a>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              )}
              {currentStep < 3 ? (
                <>
                  <div className="flex w-full flex-col gap-5 md:gap-8">
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
    </RootLayout>
  );
}
