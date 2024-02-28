import TeamsList from "~/components/admin/teamDetails";
import DownloadDataButton from "~/components/downloadData";
import FaqAdmin from "~/components/faq/faqAdmin";
import ParticipantsTable from "~/components/participantsTable";
import { api } from "~/utils/api";

export default function Organiser() {
  const res = api.team.getTeamsList.useQuery().data;

  return (
    <>
      <div className="w-full border-b">
        <h1 className="my-10 text-center text-4xl font-bold">Admin</h1>
      </div>
      <div className="m-auto my-4 overflow-x-scroll md:max-w-[70%]">
        <h1 className="my-10 text-center text-2xl font-bold">Participants</h1>
        <DownloadDataButton data={res} />
        <ParticipantsTable data={res} />
      </div>
      <div>
        <TeamsList
          teams={res?.map((team) => {
            return { id: team.id, teamName: team.name };
          })}
        />
      </div>
      <div className="sticky bottom-5 ml-5">
        <FaqAdmin />
      </div>
    </>
  );
}
