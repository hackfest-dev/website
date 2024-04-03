import DashboardLayout from "~/components/layout/dashboardLayout";
import { api } from "~/utils/api";
import Spinner from "~/components/spinner";
import { useSession } from "next-auth/react";
import NotFound from "~/components/not-found";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "~/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { Card, CardContent } from "~/components/ui/card"

export default function Judge() {
  const { data, status } = useSession();
  const teamsQuery = api.judges.getTeams.useQuery();
  const judgeDay = api.judges.getDay.useQuery().data;
  const teams = teamsQuery.data;
  const criterias = api.criteria.getCriteria.useQuery().data;
  const updateScore = api.judges.setScore.useMutation();

  if (status === "loading")
    return (
      <DashboardLayout>
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      </DashboardLayout>
    );

  if (!data || !data.user || data.user.role !== "JUDGE") {
    return <NotFound />;
  }

  if (judgeDay?.type === "DAY1") {
    return (
      <DashboardLayout>
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team No</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Track</TableHead>
                <TableHead>Remarks</TableHead>
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
  } else if (judgeDay?.type === "DAY2") {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-5xl py-8 font-bold">Judge Dashboard</h1>
        <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {Array.from({ length:teams?.length?teams?.length:0 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-start p-8 h-full">
                 <div className="text-4xl font-bold capitalize">{teams?.[index]?.name}</div>
                 <div className="text-lg font-normal text-white italic mt-2">{teams?.[index]?.ideaSubmission?.track}Metaverse</div>
                 <div className="flex flex-wrap justify-center items-center p-4 mt-8">
                    {/* <th>Criterias</th>
                                  <th>Score</th> */}
                                  {criterias?.map((criteria, key) => (
                                    <tr key={key} className="p-4 flex flex-col gap-4 items-center justify-center">
                                      <td className="text-white text-2xl font-bold">
                                        {criteria.name}
                                      </td>
                                      <td>
                                        <input
                                          onBlur={async (e) => {
                                            if (e.target.value)
                                              await updateScore.mutateAsync({
                                                teamId: teams?.[index]?.id ?? "",
                                                criteriaId: criteria.id,
                                                score: Number(e.target.value),
                                              });
                                          }}
                                          defaultValue={teams?.[index]?.Scores.find(teamScore => teamScore.score.criteriaId === criteria.id)?.score.score ?? ""}
                                          
                                          type="number"
                                          name="score"
                                          id="score"
                                          className="  rounded-md h-8 w-12 border-gray-300 text-center text-gray-700 shadow-sm focus:border-black focus:ring-black sm:text-sm mt-8"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                 </div>
                 <div>
                  <input type="text" className="text-black rounded-md h-20 w-96 border-gray-300 text-center shadow-sm focus:border-black focus:ring-black sm:text-sm" placeholder="Remarks" />
                 </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </div>
      </DashboardLayout>
    );
  } else if (judgeDay?.type === "DAY3") {
    return (
      <DashboardLayout>
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team No</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Track</TableHead>
                <TableHead>Add Score</TableHead>
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
                            <button className="rounded-md bg-white px-4 py-2 text-black">
                              Add Score
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <div className="p-4">
                              <form>
                                <h1>Team Name: {team.name}</h1>
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
    );
  }
}
