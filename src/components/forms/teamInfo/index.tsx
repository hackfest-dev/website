import { prisma } from '@/src/lib/db';
import TeamInfo from './teamInfo';
import { Progress } from '@prisma/client';

export default async function TeamDetails({
  teamid,
  userId,
  userProgress,
}: {
  teamid: string;
  userId: string;
  userProgress: Progress;
}) {
  const teamdata = await prisma.team.findUnique({
    where: { id: teamid },
    include: { members: true },
  });
  return (
    <>
      {teamdata && (
        <TeamInfo
          userId={userId}
          teamdata={teamdata}
          userProgress={userProgress}
        />
      )}
    </>
  );
}
