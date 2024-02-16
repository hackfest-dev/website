"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgressContext } from "../progressProvider";
import { Progress } from "@prisma/client";

const FormButtons = ({
  profileProgress,
  isComplete,
  isLeader,
}: {
  profileProgress: Progress;
  isComplete: boolean;
  isLeader: boolean;
}) => {
  const { currentState, maxState, setCurrentState } =
    useContext(ProgressContext);
  let buttonStatus = true;
  if (currentState === 0) {
    if (profileProgress === "FORM_TEAM") buttonStatus = false;
  } else if (currentState === 1) {
    if ((isComplete && isLeader) || profileProgress === "SUBMIT_IDEA")
      buttonStatus = false;
  }

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => {
          if (currentState === 0) return;
          setCurrentState(currentState - 1);
        }}
        disabled={currentState === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      <Button
        disabled={buttonStatus}
        onClick={() => {
          if (currentState === maxState) return;
          setCurrentState(currentState + 1);
        }}
        className="flex items-center gap-2"
      >
        {currentState === 2 ? "Submit" : "Next"}
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default FormButtons;
