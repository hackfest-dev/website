import CreateTeam from '@/src/components/forms/createTeam';
import TeamDetails from '@/src/components/forms/teamInfo';
import { prisma } from '@/src/lib/db';
import { getCurrentUser } from '@/src/lib/session';
import { Profile } from '@/src/components/profile';
import NotLoggedIn from '@/src/components/notLoggedIn';

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

  if (!user) return <NotLoggedIn />;

  return (
    <div className="mb-10 md:mb-20 mt-28 flex flex-col justify-center gap-2 w-full min-h-screen p-3 md:px-auto mx-auto max-w-4xl">
      {userInfo && <Profile user={userInfo} />}
      {!user.team?.id ? (
        <CreateTeam />
      ) : (
        <TeamDetails userId={user.id} teamid={user.team?.id} />
      )}
    </div>
  );
}
