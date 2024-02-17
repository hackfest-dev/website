"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgressContext } from "../progressProvider";
import { Progress } from "@prisma/client";
import { updateProfileProgress } from "@/src/server/actions";

const FormButtons = ({
  profileProgress,
  isComplete,
  isLeader,
}: {
  profileProgress: Progress;
  isComplete: boolean;
  isLeader: boolean;
}) => {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);
  let isDisabled = true;
  if (currentState === 0) {
    if (profileProgress === "FORM_TEAM") isDisabled = false;
  } else if (currentState === 1) {
    if (isLeader && isComplete) {
      isDisabled = false;
    }
  } else if (currentState === 2) {
    if (profileProgress === "SUBMIT_IDEA") isDisabled = true;
  } else isDisabled = true;

  return (
    <div className="flex justify-between items-center">
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
      <span className="text-xs ">
        {currentState === 1 && !isLeader && "Only leader can proceed"}
      </span>
      {currentState !== 2 && (
        <Button
          disabled={isDisabled}
          onClick={async () => {
            if (currentState === 0) {
              if (profileProgress === "FORM_TEAM")
                setCurrentState(currentState + 1);
            } else if (currentState === 1) {
              if (isLeader && isComplete) {
                await updateProfileProgress();
                setMaxState(2);
                setCurrentState(currentState + 1);
              }
            } else if (currentState === 2) {
              if (profileProgress === "SUBMIT_IDEA") return;
            } else return;
          }}
          className="flex items-center gap-2"
        >
          {/* {currentState === 2 ? "Submit" : "Next"} */}
          Next
          <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
