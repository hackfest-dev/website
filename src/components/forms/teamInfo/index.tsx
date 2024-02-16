import { prisma } from '@/src/lib/db';
import TeamInfo from './teamInfo';

export default async function TeamDetails({
  teamid,
  userId,
}: {
  teamid: string;
  userId: string;
}) {
  const teamdata = await prisma.team.findUnique({
    where: { id: teamid },
    include: { members: true },
  });
  return <>{teamdata && <TeamInfo userId={userId} teamdata={teamdata} />}</>;
}
