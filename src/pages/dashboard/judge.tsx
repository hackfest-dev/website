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
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function Judge() {
 
  const { data, status } = useSession();
  const teamsQuery = api.judges.getTeams.useQuery();
  const judgeDay=api.judges.getDay.useQuery().data;
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

  if(judgeDay?.type==="DAY1"){
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
  else if(judgeDay?.type==="DAY2"){
    return(
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
                          Add Score
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
                                      <Dialog>
                                          <DialogTrigger asChild>
                                              <button className="bg-white text-black px-4 py-2 rounded-md">Add Score</button>
                                          </DialogTrigger>
                                          <DialogContent>
                                              <div className="p-4">
                                                  <form>
                                                      {/* <div className="mb-4">
                                                          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
                                                          <input type="number" name="score" id="score" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                      </div> */}
                                                  </form>
                                              </div>
                                          </DialogContent>
                                      </Dialog>
  
                                  </TableCell>
                              </TableRow>
                          ))}
                      </>
                  )}
              </TableBody>
          </Table>
        </>
      </DashboardLayout>
    )
  }
  else if(judgeDay?.type==="DAY3"){
    return(
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
                          Add Score
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
                                      <Dialog>
                                          <DialogTrigger asChild>
                                              <button className="bg-white text-black px-4 py-2 rounded-md">Add Score</button>
                                          </DialogTrigger>
                                          <DialogContent>
                                              <div className="p-4">
                                                  <form>
                                                      {/* <div className="mb-4">
                                                          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
                                                          <input type="number" name="score" id="score" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                      </div> */}
                                                      
                                                  </form>
                                              </div>
                                          </DialogContent>
                                      </Dialog>
  
                                  </TableCell>
                              </TableRow>
                          ))}
                      </>
                  )}
              </TableBody>
          </Table>
        </>
      </DashboardLayout>
    )
  }
}

