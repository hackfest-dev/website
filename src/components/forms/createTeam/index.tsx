import { useContext, useEffect, useState, useTransition } from "react";
import { ProgressContext } from "../../progressProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Loader2Icon, UserRoundPlus } from "lucide-react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

export default function CreateTeam() {
  const { currentState } = useContext(ProgressContext);

  const [teamId, setTeamId] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [Error, setError] = useState("");
  const [Message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [Loading1, setLoading1] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const router = useRouter();
  const [pending1, startTransition1] = useTransition();
  const [pending2, startTransition2] = useTransition();
  const createTeam = api.team.createTeam.useMutation();
  const joinTeam = api.team.joinTeam.useMutation();

  useEffect(() => {
    if (isWaiting) setTimeout(() => setIsWaiting(false), 200);
  }, [isWaiting]);

  const nameHandler = async (name: string) => {
    if (!isWaiting && name.length > 3) {
      const checkName = api.team.checkName.useQuery({
        teamName: name,
      });

      const res = checkName.data;

      if (
        res?.status === "success" &&
        (res?.message === true || res?.message === false)
      ) {
        console.log(res?.message);
        setIsNameAvailable(res?.message);
      } else {
        setError(res?.message as string);
      }
    } else setIsNameAvailable(false);
  };

  useEffect(() => {
    if (Error) setTimeout(() => setError(""), 2000);
    if (Message) setTimeout(() => setMessage(""), 2000);
  }, [Error, Message]);

  if (currentState !== 1) return <></>;

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle className="text-center">Team management</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="m-auto flex flex-col justify-evenly rounded-lg">
          <div className="flex w-full justify-center">
            {(Error || Message) && (
              <Badge
                className={`-mt-2 w-fit text-center ${
                  !Error ? "text-green-500" : "text-red-500"
                }`}
              >
                {Error || Message}
              </Badge>
            )}
          </div>

          <div className="my-4 flex flex-col items-center justify-center gap-3 lg:flex-row">
            <Card className="w-full p-5">
              <CardContent>
                <form
                  className="flex flex-col gap-2 text-center"
                  onSubmit={async (e) => {
                    setLoading1(true);
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const res = await createTeam.mutateAsync({
                      teamName: formData.get("teamname") as string,
                    });
                    if (res.status === "error") setError(res.message);
                    if (res.status === "success") {
                      setMessage(res.message);
                    }
                    startTransition1(() => {
                      router.refresh();
                    });
                    setLoading1(false);
                  }}
                >
                  <h1 className="text-xl font-bold">Create a Team</h1>

                  <Input
                    onChange={(e) => nameHandler(e.target.value)}
                    type="text"
                    placeholder="Team Name"
                    className={`rounded border p-2 text-center text-white ${
                      isNameAvailable ? "border-green-500" : "border-red-600"
                    }`}
                    name="teamname"
                    required
                  />
                  <Button
                    type="submit"
                    className={`flex items-center gap-2 ${
                      !isNameAvailable && "cursor-not-allowed hover:bg-gray-400"
                    }`}
                    disabled={!isNameAvailable}
                  >
                    {Loading1 || pending1 ? (
                      <>
                        <Loader2Icon size={16} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <UserRoundPlus size={16} />
                        Create Team
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="w-full p-5">
              <CardContent>
                <form
                  className="flex flex-col gap-2 text-center"
                  onSubmit={async (e) => {
                    setLoading2(true);
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const res = await joinTeam.mutateAsync({
                      teamId: formData.get("teamid") as string,
                    });
                    if (res.status === "error") setError(res.message);
                    if (res.status === "success") setMessage(res.message);
                    setLoading2(false);
                    startTransition2(() => {
                      router.refresh();
                    });
                  }}
                >
                  <h1 className="text-xl font-bold">Join a Team</h1>
                  <Input
                    onChange={(e) => setTeamId(e.target.value)}
                    value={teamId}
                    type="text"
                    className="rounded border p-2"
                    placeholder="Team ID"
                    name="teamid"
                    required
                  />
                  <Button type="submit" className="flex items-center gap-2">
                    {Loading2 || pending2 ? (
                      <>
                        <Loader2Icon size={16} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <UserRoundPlus size={16} />
                        Join Team
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
