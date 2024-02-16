import { useEffect, useState } from "react";
import { answerFaq } from "@/src/server/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/src/components/ui/dialog";
export default function AnswerFaq(faq: {
  id: number;
  question: string;
  answer: string;
  published: boolean;
}) {
  const [answer, setAnswer] = useState("");
  return (
    <>
      <Dialog>
        <DialogTrigger>Answer</DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-black">{faq.question}</DialogTitle>
          <input
            type="text"
            className="text-black p-2 rounded-lg"
            placeholder="Answer this question"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
          <button
            className="bg-[#020817] text-white p-2 rounded-lg"
            onClick={async () => {
              try {
                if (answer) {
                  await answerFaq(faq.id, answer);
                  toast.success("Answered");
                } else {
                  toast.error("Answer cannot be empty");
                }
              } catch (e) {
                toast.error("Failed to answer");
              }
            }}
          >
            Submit
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
