import DownloadDataButton from "~/components/downloadData";
import FaqAdmin from "~/components/faq/faqAdmin";
import DashboardLayout from "~/components/layout/dashboardLayout";
import ParticipantsTable from "~/components/participantsTable";
import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import ReferralsAdmin from "~/components/organiserDashboard/referralsAdmin";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import Spinner from "~/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export default function Organiser() {
  const res = api.team.getTeamsList.useQuery().data;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedTeams, setSelectedTeams] = useState(res);
  const [paymentQuery, setPaymentQuery] = useState("ALL");

  useEffect(() => {
    setSelectedTeams(() => {
      if (!res) return [];
      if (searchQuery === "" && paymentQuery === "ALL") return res;
      const newSearchQuery = searchQuery.trim().toLowerCase();
      const partiallyFiltered = res.filter((team) => {
        const teamName = team.name.toLowerCase();
        return (
          teamName.includes(newSearchQuery) || team.id.includes(newSearchQuery)
        );
      });
      if (paymentQuery === "ALL") return partiallyFiltered;
      return partiallyFiltered.filter(
        (team) => team.paymentStatus === paymentQuery,
      );
    });
  }, [res, searchQuery, paymentQuery]);

  return (
    <DashboardLayout>
      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="flex flex-row items-center justify-center">
          <TabsTrigger className="w-full" value="teams">
            Teams
          </TabsTrigger>
          <TabsTrigger className="w-full" value="referrals">
            Referrals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="teams">
          <div className="w-full border-b">
            <h1 className="py-10 text-center text-4xl font-bold">Organiser</h1>
          </div>
          <div className="my-4 flex w-full items-center justify-center">
            <FaqAdmin />
          </div>
          <div className="m-auto overflow-x-scroll md:max-w-screen-xl">
            <h1 className="my-8 text-center text-2xl font-bold">
              Participants
            </h1>
            <div className="my-4 flex h-full w-full items-center justify-around">
              <DownloadDataButton data={res} />
              <Input
                placeholder="Search Team ID/Name"
                className="w-52"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{paymentQuery}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Payment Staus</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={paymentQuery}
                    onValueChange={(value) => setPaymentQuery(value)}
                  >
                    <DropdownMenuRadioItem value="ALL">
                      All
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="PAID">
                      Paid
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="PENDING">
                      Pending
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="FAILED">
                      Failed
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {!res ? (
              <Spinner size="large" />
            ) : (
              <ParticipantsTable data={selectedTeams} />
            )}
          </div>
          <div>
            {/* <TeamsList
              teams={res?.map((team) => {
                return { id: team.id, teamName: team.name };
              })}
            /> */}
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralsAdmin />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
