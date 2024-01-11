import CreateTeam from "@/src/components/forms/createTeam";
import TeamDetails from "@/src/components/forms/teamInfo";
import { prisma } from "@/src/lib/db";
import { getCurrentUser } from "@/src/lib/session";
import { Profile } from "@/src/components/profile";
import IdeaSubmitForm from "@/src/components/forms/ideaSubmitForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  const userInfo = user
    ? await prisma.user
        .findUniqueOrThrow({
          where: {
            email: user?.email ?? undefined,
          },
          include: { college: true },
        })
        .catch(() => {
          return null;
        })
    : null;

  if (!user)
    return (
      <>
        <div className="pb-20 pt-32 bg-white text-black h-full flex self-center">
          Please login
        </div>
      </>
    );
  return (
    <>
      <div className="p-6 md:p-auto m-auto bg-white text-black min-h-screen md:flex self-center justify-evenly">
        <div className="flex w-full fixed justify-center items-center mt-80 overflow-hidden -z-10">
          <div className="grid grid-cols-2 gap-0 w-fit fixed opacity-80 mt-80 blur-sm">
            <div className="bg-black border-base-300 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-base-200 w-32 h-32 md:w-72 md:h-72 border mt-8 ml-8 animate-[flicker_10s_ease_infinite_1s]"></div>
            <div className="bg-black border-base-300 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-base-200 w-40 h-40 md:w-80 md:h-80 border animate-[flicker_16s_ease_infinite_3s]"></div>
            <div className="bg-black border-base-300 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-base-200 w-40 h-40 md:w-80 md:h-80 border animate-flicker"></div>
            <div className="bg-black border-base-300 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)] shadow-base-200 w-32 h-32 md:w-72 md:h-72 border animate-[flicker_6s_ease_infinite_5s]"></div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 m-auto text-black h-full md:flex justify-between self-center">
          <IdeaSubmitForm />
          {userInfo && <Profile user={userInfo}></Profile>}
          {!user.team?.id ? (
            <CreateTeam />
          ) : (
            <TeamDetails teamid={user.team?.id} />
          )}
          {/* <EditProfile /> */}
        </div>
      </div>
    </>
  );
}
