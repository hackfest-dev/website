import { prisma } from "@/src/lib/db";
import TeamInfo from "./teamInfo";

export default async function TeamDetails({ teamid }: { teamid: string }) {
  const teamdata = await prisma.team.findUnique({
    where: { id: teamid },
    include: { members: true },
  });
  return <>{teamdata && <TeamInfo teamdata={teamdata} />}</>;
}
