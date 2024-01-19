"use client";

import { Team, User } from "@prisma/client";
import { Button } from "../../ui/button";
import { useContext } from "react";
import { ProgressContext } from "../../progrssProvider";

export default function TeamInfo({
  teamdata,
}: {
  teamdata: Team & { members: User[] };
}) {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);
  if (currentState !== 1) return <></>;
  return (
    <>
      <div className="p-6 md:p-auto m-auto min-h-screen md:flex self-center justify-evenly">
        <div className="flex flex-col justify-evenly m-auto my-4 sm:my-auto p-4 border rounded">
          <h1 className="text-xl text-center font-bold border-b-2">
            Team Details
          </h1>
          <p className="font-semibold text-center border-b-2 p-4">
            Team Name: {teamdata?.name || "Not Available"}
          </p>
          <p className="text-center border-b-2 p-4">
            Team ID: {teamdata?.id || "Not Available"}
          </p>
          <div className="p-4">
            <h2 className="text-center p-4 font-semibold">Team Members: </h2>
            {teamdata?.members?.map((member) => {
              return (
                <div key={member.id} className="border-b p-3">
                  <p>
                    Name: {member.name} {member.isLeader && "(Leader)"}
                  </p>
                  <p>Email: {member.email}</p>
                </div>
              );
            }) || "Not Available"}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <Button
              onClick={() => {
                setCurrentState(2);
                maxState <= 2 && setMaxState(2);
              }}
            >
              Next
            </Button>
            <Button
              onClick={() => {
                setCurrentState(0);
              }}
            >
              Previous
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
