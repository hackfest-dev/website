"use server";
import { submitIdea } from "@/src/server/actions";
import { Modal } from "../../ui/modal";
import { Tracks } from "@prisma/client";

export default async function IdeaSubmitForm() {
  const tracks = Object.keys(Tracks);

  return (
    <Modal
      title="Submit Idea"
      description="Submit Idea"
      buttonContent={"Submit Idea"}
      footer={<></>}
    >
      <div>
        <form action={submitIdea} className="flex flex-col text-black">
          <textarea className="p-2 bg-cyan-50 rounded" name="problemStatement" placeholder="Problem statement" />
          <select name="track" >
          {tracks.map((track, index) => {
            return (
              <option key={index} value={track}>
                {track}
              </option>
            );
          })}
		  </select>
          <input className="p-2 rounded" placeholder="referral code" name="referralCode" type="text" />
          <input placeholder="upload ppt" name="ppt" type="file" />
		  <input type="submit" value={"Submit"}/>
        </form>
      </div>
    </Modal>
  );
}
