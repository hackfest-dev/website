"use client";
import { submitIdea } from "@/src/server/actions";
import { Modal } from "../../ui/modal";
import { Tracks } from "@prisma/client";
import { domains } from "@/src/constants";

import { useContext } from "react";
import { ProgressContext } from "../../progrssProvider";

export default function IdeaSubmitForm() {
  const tracks = domains.map((domain) => domain.name);
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);

  if (currentState !== 2) return <></>;

  return (
    // <Modal
    //   title="Submit Idea"
    //   description="Submit Idea"
    //   buttonContent={"Submit Idea"}
    //   footer={<></>}
    // >
    <div className="flex flex-col">
      <div className="">Submit Idea</div>
      <form
        action={submitIdea}
        className="flex flex-col "
        onSubmit={() => {
          setCurrentState(3);
          maxState <= 2 && setMaxState(3);
        }}
      >
        <textarea
          className="p-2 bg-cyan-50 rounded m-2"
          name="problemStatement"
          placeholder="Problem statement"
        />
        <select name="track" className="rounded p-2 m-2 text-black">
          {tracks.map((track, index) => {
            <option disabled={true}>select track</option>;
            return (
              <option key={index} value={track}>
                {track}
              </option>
            );
          })}
        </select>
        <input
          className="p-2 rounded m-2"
          placeholder="referral code"
          name="referralCode"
          type="text"
        />
        <input
          placeholder="upload ppt"
          name="ppt"
          type="file"
          className="p-2 "
        />
        <button
          type="submit"
          value={"Submit"}
          name="submit"
          className="p-2 rounded bg-black border border-white hover:scale-95"
        >
          submit
        </button>
      </form>
    </div>
    // </Modal>
  );
}
