import { type Game } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import BGMIRules from "~/components/gameRules/bgmiRules";
import ValoRules from "~/components/gameRules/valoRules";
import Layout from "~/components/layout";
import Spinner from "~/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Modal } from "~/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/utils/api";
import NotFound from "../404";

const GamingEvent: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const [teamName, setTeamName] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");
  const [game, setGame] = useState<Game>("VALORANT");

  const {
    data: userGameTeam,
    refetch: refetchUserGameTeam,
    isLoading: userGameTeamIsLoading,
  } = api.gamefest.getUserTeam.useQuery();

  const createTeam = api.gamefest.createTeam.useMutation({
    onSuccess: async () => {
      await refetchUserGameTeam();
      toast.dismiss();
      toast.success("Team created successfully");
    },

    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const joinTeam = api.gamefest.joinTeam.useMutation({
    onSuccess: async () => {
      await refetchUserGameTeam();
      toast.dismiss();
      toast.success("Team joined successfully");
    },

    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const confirmTeam = api.gamefest.confirmTeam.useMutation({
    onSuccess: async () => {
      await refetchUserGameTeam();
      toast.dismiss();
      toast.success("Team confirmed successfully");
    },

    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const deleteTeam = api.gamefest.deleteTeam.useMutation({
    onSuccess: async () => {
      await refetchUserGameTeam();
      toast.dismiss();
      toast.success("Deleted team successfully");
    },

    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const leaveTeam = api.gamefest.leaveTeam.useMutation({
    onSuccess: async () => {
      await refetchUserGameTeam();
      toast.dismiss();
      toast.success("Left team successfully");
    },

    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  if (sessionStatus === "loading")
    return (
      <Layout>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[url('/images/noise.svg'),linear-gradient(180deg,#060e3c_0%,#052d4f_30%,#001933_100%)] bg-repeat">
          <div>
            <Spinner size={"large"} />
            <h3 className="mt-5 text-3xl font-semibold">Reloading gun...</h3>
          </div>
        </div>
      </Layout>
    );

  if (!session) return <NotFound />;

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[url('/images/noise.svg'),linear-gradient(180deg,#060e3c_0%,#052d4f_30%,#001933_100%)] bg-repeat p-4 pt-20">
        <h1 className="text-center text-6xl font-bold">Overtime</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <Modal
            title="Valorant Rules"
            buttonContent="Valorant Rules"
            customizable
            className="max-h-[75vh] overflow-scroll bg-gray-600 text-white"
          >
            <ValoRules />
          </Modal>
          <Modal
            title="BGMI Rules"
            buttonContent="BGMI Rules"
            customizable
            className="max-h-[75vh] overflow-scroll bg-gray-600 text-white"
          >
            <BGMIRules />
          </Modal>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          {userGameTeamIsLoading ? (
            <Card className="flex size-96 flex-col items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <Spinner size="large" />
              </CardContent>
              <CardFooter>Loading...</CardFooter>
            </Card>
          ) : userGameTeam ? (
            <Card className="flex min-h-96 w-96 flex-col items-center justify-center">
              <CardHeader>
                <CardTitle>Team Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 items-center justify-center gap-3">
                <div>Team Name</div>
                <div>{userGameTeam.name}</div>
                <div>Team Id</div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"sm"}
                        onClick={async () => {
                          await navigator.clipboard.writeText(userGameTeam.id);
                          toast.success("Copied to clipboard");
                        }}
                      >
                        Copy
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{userGameTeam.id}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div>Playing</div>
                <div>{userGameTeam.game}</div>
                <div className="col-span-2 text-lg font-semibold">Members</div>
                <div className="col-span-2 grid grid-cols-2 items-center justify-center gap-3 rounded-md border border-white p-3">
                  {userGameTeam.members.map((member, idx) => {
                    return (
                      <>
                        <div key={idx}>{member.name}</div>
                        <Avatar>
                          {member.image && <AvatarImage src={member.image} />}
                          <AvatarFallback>PFP</AvatarFallback>
                        </Avatar>
                      </>
                    );
                  })}
                </div>
                {!userGameTeam.isConfirmed && (
                  <div className="col-span-2 text-red-500">
                    Note: Once confirmed team cannot be edited
                  </div>
                )}
                {session.user.isGameLeader ? (
                  userGameTeam.isConfirmed ? (
                    <Badge className="bg-green-600 text-white">
                      Team Confirmed
                    </Badge>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          toast.loading("Confirming team...");
                          confirmTeam.mutate();
                        }}
                      >
                        Confirm Team
                      </Button>
                      <Button
                        onClick={() => {
                          toast.loading("Deleting team...");
                          deleteTeam.mutate();
                        }}
                      >
                        Delete Team
                      </Button>
                    </>
                  )
                ) : (
                  <Button
                    onClick={() => {
                      toast.loading("Leaving team...");
                      leaveTeam.mutate();
                    }}
                  >
                    Leave Team
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="flex size-96 flex-col items-center justify-center">
                <CardHeader>
                  <CardTitle>Create Team</CardTitle>
                  <CardDescription>Create a team as leader</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-3">
                  <Input
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                    }}
                  />
                  <Select
                    onValueChange={(value) => {
                      setGame(value as "VALORANT" | "BGMI");
                    }}
                    defaultValue="VALORANT"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Game" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VALORANT">Valorant</SelectItem>
                      <SelectItem value="BGMI">BGMI</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => {
                      toast.loading("Creating team...");
                      createTeam.mutate({ teamName: teamName, game: game });
                    }}
                  >
                    Create Team
                  </Button>
                </CardContent>
              </Card>
              <Card className="flex size-96 flex-col items-center justify-center">
                <CardHeader>
                  <CardTitle>Join Team</CardTitle>
                  <CardDescription>Join team as member</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-3">
                  <Input
                    placeholder="Team Id"
                    value={teamId}
                    onChange={(e) => {
                      setTeamId(e.target.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      toast.loading("Joining team");
                      joinTeam.mutate({ teamId });
                    }}
                  >
                    Join Team
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GamingEvent;
