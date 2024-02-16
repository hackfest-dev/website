import CreateTeam from '@/src/components/forms/createTeam';
import TeamDetails from '@/src/components/forms/teamInfo';
import { prisma } from '@/src/lib/db';
import { getCurrentUser } from '@/src/lib/session';
import { Profile } from '@/src/components/profile';

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
      <div className="pb-20 pt-32 bg-white text-black h-full flex self-center">
        Please login
      </div>
    );

  return (
    <div className="my-24 flex flex-col justify-center md:flex-row gap-2 w-full min-h-screen p-3 md:px-auto mx-auto max-w-5xl">
      {userInfo && <Profile user={userInfo} />}
      {!user.team?.id ? <CreateTeam /> : <TeamDetails teamid={user.team?.id} />}
    </div>
  );
}
