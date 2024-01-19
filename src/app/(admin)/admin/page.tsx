import TeamsList from "@/src/components/admin/teamDetails";
import DownloadDataButton from "@/src/components/downloadData";
import ParticipantsTable from "@/src/components/participantsTable";
import { prisma } from "@/src/lib/db";

export default async function Admin() {
  const res = await prisma.team.findMany({
    include: {
      members: {
        include: { college: true },
      },
      ideaSubmission: true,
      referral: true,
    },
  });

  return (
    <>
      <div className="w-full border-b">
        <h1 className="text-4xl font-bold text-center my-10">Admin</h1>
      </div>
      <div className="overflow-x-scroll my-4 m-auto md:max-w-[70%]">
        <h1 className="text-2xl font-bold text-center my-10">Participants</h1>
        <DownloadDataButton data={res} />
        <ParticipantsTable data={res} />
      </div>
      <div>
        <TeamsList
          teams={res.map((team) => {
            return { id: team.id, teamName: team.name };
          })}
        />
      </div>
    </>
  );
}
