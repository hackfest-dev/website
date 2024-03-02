import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { api } from "~/utils/api";
import DashboardLayout from "~/components/layout/dashboardLayout";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import PDFModal from "~/components/validatorDashboard/pdfModal";




export default function Validator() {
  const submitScore = api.validator.setScore.useMutation({
    onSuccess: async () => {
      toast.dismiss('submitting-score');
      toast.success('Score submitted');
      await teamData.refetch()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const teamData = api.team.getTeamsList.useQuery();
  const user = useSession();

  if(submitScore.isLoading){
    toast.loading('Submitting score',{id: 'submitting-score'});
  }
  

  

  return (
    !teamData.isLoading && <DashboardLayout>
      <div className="flex flex-col gap-6 w-full py-4 justify-center items-center">
        <h1 className="md:text-5xl text-3xl font-semibold">Validator Dashboard</h1>
        <div className="flex flex-col gap-y-2 justify-center w-full items-center">
          <span className="text-xl">Hey there {user?.data?.user.name} 👋</span>
          <ul className="flex flex-col list-disc text-base text-slate-500">
            <li>You can cahnge your scores for a team</li>
            <li>Once you submit score for a team, the button turns green</li>
          </ul>
        </div>
      </div>
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
            <TableHead>
            </TableHead>
            <TableHead>Scores</TableHead> 
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
                      onClick={async () => {
                        await submitScore.mutateAsync({
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
              onClick={async () => {
                await submitScore.mutateAsync({
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
              onClick={async () => {
                await submitScore.mutateAsync({
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
