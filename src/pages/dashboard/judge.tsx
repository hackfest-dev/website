import DashboardLayout from "~/components/layout/dashboardLayout";
import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Spinner from "~/components/spinner";
import { useSession } from "next-auth/react";
import NotFound from "~/components/not-found";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export default function Judge() {
 
  const { data, status } = useSession();
  const teamsQuery = api.judges.getTeams.useQuery();
  const teams = teamsQuery.data;


  if (status === "loading")
    return (
      <DashboardLayout>
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      </DashboardLayout>
    );

  if (
    !data ||
    !data.user ||
    (data.user.role !== "JUDGE")
  ) {
    return <NotFound />;
  }

  return (
    <DashboardLayout>
      <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Team No
                    </TableHead>
                    <TableHead>
                        Team Name
                    </TableHead>
                    <TableHead>
                        Track
                    </TableHead>
                    <TableHead>
                        Remarks
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {teamsQuery.status === "loading" && (
                    <TableRow>
                        <td colSpan={4}>
                            <Spinner />
                        </td>
                    </TableRow>
                )}
                {teamsQuery.status === "error" && (
                    <TableRow>
                        <td colSpan={4}>
                            <div className="text-red-500">Error fetching teams</div>
                        </td>
                    </TableRow>
                )}
                {teamsQuery.status === "success" && (
                    <>
                        {teams?.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.teamNo}</TableCell>
                                <TableCell>{team.name}</TableCell>
                                <TableCell>{team.ideaSubmission?.track}</TableCell>
                                <TableCell>
                                    {/* <input
                                        type="text"
                                        placeholder="Add remarks"
                                    /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </Table>
      </>
    </DashboardLayout>
  );
}
