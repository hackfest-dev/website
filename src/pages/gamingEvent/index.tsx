import { type Game } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import BGMIRules from "~/components/gameRules/bgmiRules";
import ValoRules from "~/components/gameRules/valoRules";
import GameRules from "~/components/gameRules/valoRules";
import Layout from "~/components/layout";
import NotFound from "~/components/not-found";
import Spinner from "~/components/spinner";
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
import { Label } from "~/components/ui/label";
import { Modal } from "~/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/utils/api";

const GamingEvent: NextPage = () => {
  const { data: session, status: sessionLoading } = useSession();

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

  if (sessionLoading !== "loading" && !session) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[url('/images/noise.svg'),linear-gradient(180deg,#060e3c_0%,#052d4f_30%,#001933_100%)] bg-repeat pt-20">
        <h1 className="text-6xl font-bold">Hackfest - Gaming Event</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <Modal
            title="Valorant Rules"
            buttonContent="Valorant Rules"
            description="Rules to be followed for the gaming event"
          >
            <ValoRules />
          </Modal>
          <Modal
            title="BGMI Rules"
            buttonContent="BGMI Rules"
            description="Rules to be followed for the gaming event"
          >
            <BGMIRules />
          </Modal>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          {userGameTeamIsLoading ? (
            <Card className="flex size-96 flex-col items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center gap-3">
                <Spinner size="large" />
              </CardContent>
              <CardFooter>Loading...</CardFooter>
            </Card>
          ) : userGameTeam ? (
            <Card className="flex size-96 flex-col items-center justify-center">
              <CardHeader>
                <CardTitle>Team Details</CardTitle>
                <CardDescription>Your team Details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-3">
                <Label>Team Name : {userGameTeam?.name}</Label>
                <Label>Team Id : {userGameTeam?.id}</Label>
                <Label>Members:</Label>
                {userGameTeam.members.map((member, idx) => {
                  return <Label key={idx}>{member.name}</Label>;
                })}
                {session?.user.isLeader ? (
                  <Button
                    onClick={() => {
                      toast.loading("Deleting team...");
                      deleteTeam.mutate();
                    }}
                  >
                    Delete Team
                  </Button>
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
