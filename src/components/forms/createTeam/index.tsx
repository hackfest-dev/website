"use client";
import { checkName, createTeam, joinTeam } from "@/src/server/actions";
import { useContext, useEffect, useState } from "react";
import { ProgressContext } from "../../progrssProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function CreateTeam() {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);

  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [Error, setError] = useState("");
  const [Message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWaiting) setTimeout(() => setIsWaiting(false), 200);
  }, [isWaiting]);

  const nameHandler = async (name: string) => {
    if (!isWaiting && name.length > 3) {
      const res = await checkName(name);
      if (
        res.status === "success" &&
        (res.message === true || res.message === false)
      ) {
        console.log(res.message);
        setIsNameAvailable(res.message);
      } else {
        setError(res.message as string);
      }
    } else setIsNameAvailable(false);
  };

  useEffect(() => {
    if (Error) setTimeout(() => setError(""), 2000);
    if (Message) setTimeout(() => setMessage(""), 2000);
  }, [Error, Message]);

  if (currentState !== 1) return <></>;

  return (
    <>
    <Card>
      <CardHeader>
      <CardTitle>Team management</CardTitle>

      </CardHeader>
      <CardContent className="px-2">

    <div className="flex rounded-lg flex-col justify-evenly m-auto">
      {(Error || Message) && (
        <p
          className={`text-center ${
            !Error ? "text-green-500" : "text-red-500"
          }`}
        >
          {Error || Message}
        </p>
      )}
      <div className="flex flex-col justify-center items-center gap-3 my-4">
        <form
          className="grid text-center border p-4 rounded"
          onSubmit={async (e) => {
            setLoading(true);
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const res = await createTeam(formData);
            if (res.status === "error") setError(res.message);
            if (res.status === "success") {
              setMessage(res.message);
              setCurrentState(2);
              maxState <= 2 && setMaxState(2);
            }
            setLoading(false);
          }}
        >
          <h1>Create a Team</h1>

          <input
            onChange={(e) => nameHandler(e.target.value)}
            type="text"
            placeholder="Team Name"
            className={`text-center border rounded m-2 p-2  ${
              isNameAvailable ? "bg-green-500" : "bg-red-700"
            }`}
            name="teamname"
            required
          />
          <button
            type="submit"
            className={`border rounded p-2 mt-6 hover:bg-blue-700 font-semibold ${
              !isNameAvailable && "cursor-not-allowed"
            }`}
            disabled={!isNameAvailable}
          >
            Create Team
          </button>
        </form>

        <form
          className="grid text-center border p-4 rounded"
          onSubmit={async (e) => {
            setLoading(true);
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const res = await joinTeam(formData);
            if (res.status === "error") setError(res.message);
            if (res.status === "success") setMessage(res.message);
            setLoading(false);
          }}
        >
          <h1>Join a Team</h1>
          <input
            onChange={(e) => nameHandler(e.target.value)}
            type="text"
            className=" border rounded m-2 p-2" /* Todo: change border according to name availability*/
            placeholder="Team Id"
            name="teamid"
            required
          />
          <button
            type="submit"
            className=" border rounded p-2 mt-6 hover:bg-blue-700 font-semibold"
            value=""
          >
            Join Team
          </button>
        </form>
      </div>
    </div>
      </CardContent>
    </Card>
    </>
  );
}
