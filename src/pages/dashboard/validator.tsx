import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { inferRouterOutputs } from "@trpc/server";
import { teamRouter } from "~/server/api/routers/team";
import { Scores, Team, Tracks, User } from "@prisma/client";
import { Dialog, DialogTrigger, DialogContent } from "~/components/ui/dialog";
import DashboardLayout from "~/components/layout/dashboardLayout";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import PDFModal from "~/components/validatorDashboard/pdfModal";




export default function Validator() {
  const submitScore = api.validator.setScore.useMutation({
    onSuccess: () => {
      toast.success('Score submitted');
      teamData.refetch()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const teamData = api.team.getTeamsList.useQuery();
  const user = useSession();

  

  

  return (
    !teamData.isLoading && <DashboardLayout>
      <div className="rounded-md border">
      
      <Table>
        <TableHeader>
          
          <TableRow>
            <TableHead>
              Sl. No.
            </TableHead>
            <TableHead>
              Team Name
            </TableHead>
            <TableHead>
              PPT
            </TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {
            teamData.data?.filter(team=>team.ideaSubmission ? true : false).map((team,index) => {
              return(
                <TableRow key={index}>
                  <TableCell>
                    {index+1}
                  </TableCell>
                  <TableCell>
                    {team.name}
                  </TableCell>
                  <TableCell>
                  <PDFModal team={team}/>
                    </TableCell>
                    <TableCell>
                    <button
                      className={`${team?.Scores[0]?.userId === user?.data?.user.id && team?.Scores[0]?.score.score === '5' ? 'bg-green-700 text-white' : 'bg-white text-black'} px-4 py-2 rounded-lg` }
                      onClick={() => {
                        submitScore.mutateAsync({
                          teamId: team.id,
                          score: '5',
                        });
                      }}
                    >
              Good
            </button>
                    </TableCell>
                    
                    <TableCell>
                    <button
            
            className={`${team?.Scores[0]?.userId === user?.data?.user.id && team?.Scores[0]?.score.score === '10' ? 'bg-green-700 text-white' : 'bg-white text-black'} px-4 py-2 rounded-lg` }
              onClick={() => {
                submitScore.mutateAsync({
                  teamId: team.id,
                  score: '10',
                });
              }}
            >
              Better
            </button>
                    </TableCell>

                    <TableCell>
                    <button
            
            className={`${team?.Scores[0]?.userId === user?.data?.user.id && team?.Scores[0]?.score.score === '15' ? 'bg-green-700 text-white' : 'bg-white text-black'} px-4 py-2 rounded-lg` }
              onClick={() => {
                submitScore.mutateAsync({
                  teamId: team.id,
                  score: '15',
                });
              }}
            >
              Best
            </button>
                    </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

      
    </div>
    </DashboardLayout>
  );
}
