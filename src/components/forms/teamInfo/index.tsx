import TeamInfo from "./teamInfo";
import { type Progress } from "@prisma/client";
import { api } from "~/utils/api";

export default function TeamDetails({
  teamid,
  userId,
  userProgress,
}: {
  teamid: string;
  userId: string;
  userProgress: Progress;
}) {
  const teamdata = api.team.getTeamDetailsById.useQuery({
    teamId: teamid,
  });

  return (
    <>
      {teamdata && (
        <TeamInfo
          userId={userId}
          teamdata={teamdata.data}
          userProgress={userProgress}
        />
      )}
    </>
  );
}
