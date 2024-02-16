"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { FaQuestionCircle } from "react-icons/fa";
import { getAllFaqs, deleteFaq } from "@/src/server/actions";
import { useEffect, useState } from "react";
import AnswerFaq from "./answerFaq";
import { toast } from "sonner";
import { IoTrashBin } from "react-icons/io5";

export default function FaqAdmin() {
  const [faqData, setFaqData] = useState<
    {
      id: number;
      question: string;
      answer: string;
      published: boolean;
    }[]
  >([]);
  useEffect(() => {
    getAllFaqs().then((data) => {
      setFaqData(data);
    });
  }, []);
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
                {faqData.map((faq, index) => {
                  if (!faq.published) {
                    return (
                      <TableRow key={index} className="text-black">
                        <TableCell>{faq.question}</TableCell>
                        <TableCell>
                          <AnswerFaq {...faq} />
                        </TableCell>
                        <TableCell>
                          <span
                            onClick={() => {
                              try {
                                deleteFaq(faq.id).then(() => {
                                  setFaqData((prev) => {
                                    return prev.filter(
                                      (item) => item.id !== faq.id
                                    );
                                  });
                                });
                                toast.success("FAQ Deleted");
                              } catch (e) {
                                toast.error("Error deleting FAQ");
                              }
                            }}
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
