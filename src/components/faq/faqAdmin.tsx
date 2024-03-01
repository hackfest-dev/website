import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { IoTrashBin } from "react-icons/io5";
import { api } from "~/utils/api";

export default function FaqAdmin() {
  const [answer, setAnswer] = useState("");
  const faqData = api.faq.getAllFaqs.useQuery();
  const answerFaq = api.faq.answerFaq.useMutation({
    onSuccess: async () => {
      toast.success("Faq answered");
      await faqData.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteFaq = api.faq.deleteFaq.useMutation({
    onSuccess: async () => {
      toast.success("Faq deleted");
      await faqData.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <FaQuestionCircle size={25} className="text-white" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqData.data?.map((faq, index) => {
                  if (!faq.published) {
                    return (
                      <TableRow key={index} className="text-black">
                        <TableCell>{faq.question}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger>Answer</DialogTrigger>
                            <DialogContent>
                              <DialogTitle className="text-black">
                                {faq.question}
                              </DialogTitle>
                              <input
                                type="text"
                                className="rounded-lg p-2 text-black"
                                placeholder="Answer this question"
                                value={answer}
                                onChange={(e) => {
                                  setAnswer(e.target.value);
                                }}
                              />
                              <button
                                className="rounded-lg bg-[#020817] p-2 text-white"
                                onClick={async () => {
                                  await answerFaq.mutateAsync({
                                    id: faq.id,
                                    answer,
                                  });
                                  setAnswer("");
                                }}
                              >
                                Submit
                              </button>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <span
                            onClick={async () => {
                              await deleteFaq.mutateAsync({ id: faq.id });
                            }}
                            className="cursor-pointer"
                          >
                            <IoTrashBin />
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
