import DownloadDataButtons from "~/components/downloadData";
import FaqAdmin from "~/components/faq/faqAdmin";
import DashboardLayout from "~/components/layout/dashboardLayout";
import ParticipantsTable from "~/components/participantsTable";
import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import ReferralsAdmin from "~/components/organiserDashboard/referralsAdmin";

export default function Organiser() {
  const res = api.team.getTeamsList.useQuery().data;
  return (
    <DashboardLayout>
      <Tabs defaultValue="teams" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="referrals">Referrals</TabsTrigger>
      </TabsList>
      <TabsContent value="teams">
      <div className="w-full border-b">
        <h1 className="py-10 text-center text-4xl font-bold">Organiser</h1>
      </div>
      <div className="m-auto  overflow-x-scroll md:max-w-[70%]">
        <h1 className="my-10 text-center text-2xl font-bold">Participants</h1>
        <DownloadDataButtons />
        <ParticipantsTable data={res} />
      </div>
      <div>
        {/* <TeamsList
          teams={res?.map((team) => {
            return { id: team.id, teamName: team.name };
          })}
        /> */}
      </div>
      <div className="sticky bottom-5 ml-5">
        <FaqAdmin />
      </div> 
      </TabsContent>


      <TabsContent value="referrals">
        <ReferralsAdmin />
      </TabsContent>
    </Tabs>
    </DashboardLayout>
  );
}

