"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getAllFaqs } from "@/src/server/actions";
import { useEffect, useState } from "react";
import AnswerFaq from "./answerFaq";

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
        <DialogTrigger>Open</DialogTrigger>
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
