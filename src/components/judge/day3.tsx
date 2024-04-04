import { useSession } from "next-auth/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "~/components/ui/carousel"
import { api } from "~/utils/api";
import Spinner from "../spinner";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
  
export default function DAY3(){
    const { data, status } = useSession();
    const teamsQuery = api.judges.getTeams.useQuery();
    const judgeDay = api.judges.getDay.useQuery().data;
    const teams = teamsQuery.data;
    const changeProgress = api.judges.changeTeamProgress.useMutation({
        onSuccess: async () => {
            await teamsQuery.refetch();
            toast.success("Team updated");
        }
    });
    return(
        <>
        {
            teamsQuery.status === "loading" && (
                            <div className="flex h-screen w-screen items-center justify-center">
                                <Spinner />
                            </div>
                        )
        }
            {
                teamsQuery.status === "success" && (
                <div className="flex w-full justify-center items-center">
                    <Carousel className="w-[80vw] m-auto flex justify-center items-center h-screen">
                    <CarouselContent>
                    {
                        teams?.map((team, index) => {
                            return(
                                <CarouselItem key={index}>
                                    <Card className="h-[80dvh]">
                                            <CardContent className="flex flex-col items-center justify-between h-full p-8">
                                                <div className="flex flex-col gap-5 justify-center items-center h-[40%] border-b w-full">
                                                    <h1 className="text-5xl font-bold border rounded-full w-20 text-center h-20 items-center flex justify-center">{team.teamNo}</h1>
                                                    <h1 className="text-5xl font-semibold">{team.name}</h1>
                                                    <h3 className="text-3xl">{team.ideaSubmission?.track.toUpperCase()}</h3>
                                                </div>

                                                <div className="w-full grid grid-cols-2 h-[60%] pt-8">
                                                    <div className="border-r flex flex-col gap-4">
                                                        <h3 className="text-3xl">Action on Team</h3>
                                                        <div className="flex flex-col w-full justify-center items-center h-full gap-6">
                                                            <Button className={team.teamProgress === 'TOP15' ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'TOP15'
                                                                    });
                                                                }}
                                                            >
                                                                Top 15
                                                            </Button>
                                                            <Button className={team.teamProgress === 'WINNER' ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'WINNER'
                                                                    });
                                                                }}
                                                            >
                                                                Winner
                                                            </Button>
                                                            <Button className={team.teamProgress === 'RUNNER' ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'RUNNER'
                                                                    });
                                                                }}
                                                            >
                                                                Runner up
                                                            </Button>
                                                            <Button className={team.teamProgress === 'SECOND_RUNNER' ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'SECOND_RUNNER'
                                                                    });
                                                                }}
                                                            >
                                                                Second Runner Up
                                                            </Button>
                                                            <Button className={team.teamProgress === 'TRACK' ? 'bg-green-500 text-white' : 'bg-white text-black'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'TRACK'
                                                                    });
                                                                }}
                                                            >
                                                                Track Winner
                                                            </Button>
                                                            <Button variant={'destructive'}
                                                                onClick={async () => {
                                                                    await changeProgress.mutateAsync({
                                                                        teamId: team.id,
                                                                        progress: 'SELECTED'
                                                                    });
                                                                }}
                                                            >
                                                                Reset
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="pl-8 overflow-y-auto">
                                                        <h3 className="text-3xl">Remarks</h3>
                                                        <div className="flex flex-col gap-4 pt-6">
                                                            {
                                                                api.judges.getRemarksByteam.useQuery({teamId: team.id}).data?.map((remark, index) => {
                                                                    return(
                                                                        <div key={index} className="bg-slate-900 p-3 rounded-xl flex flex-col gap-3">
                                                                            <Badge className={`w-fit ${judgeDay?.type === 'DAY1' ? 'bg-blue-500' : 'bg-green-500'}`}
                                                                            >
                                                                                {remark.judge.type === 'DAY1' ? 'MENTOR' : 'JUDGE'}</Badge>
                                                                            <span>
                                                                                {remark.remarks}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                </CarouselItem>
                            )
                        })
                    }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                </div>
                )
            }
        </>
    )
}