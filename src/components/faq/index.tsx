"use client";
import QnaAccordion from "./qnaAccordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { addFaq } from "@/src/server/actions";
import { useState, useEffect } from "react";
import { SectionHeading } from "../ui/sectionHeading";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";

export const FAQ: React.FC<{}> = () => {
  const [faq, setFaq] = useState<{
    question: string;
    category: "GENERAL" | "FOOD" | "STAY" | "TRAVEL";
  }>({
    question: "",
    category: "GENERAL",
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center md:py-12 py-6 gap-y-12 ">
        <SectionHeading title="FAQ" />
        <div className="flex flex-col w-full justify-center items-center py-8 space-y-6">
          <Tabs
            defaultValue="GENERAL"
            className=" justify-center items-center flex flex-col"
          >
            <TabsList>
              <TabsTrigger value="GENERAL">General</TabsTrigger>
              <TabsTrigger value="FOOD">Food</TabsTrigger>
              <TabsTrigger value="STAY">Stay</TabsTrigger>
              <TabsTrigger value="TRAVEL">Travel</TabsTrigger>
            </TabsList>
            <TabsContent value="GENERAL">
              <QnaAccordion cat="GENERAL" />
            </TabsContent>
            <TabsContent value="FOOD">
              <QnaAccordion cat="FOOD" />
            </TabsContent>
            <TabsContent value="STAY">
              <QnaAccordion cat="STAY" />
            </TabsContent>
            <TabsContent value="TRAVEL">
              <QnaAccordion cat="TRAVEL" />
            </TabsContent>
          </Tabs>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-semibold">Drop your question</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Submit your question</DialogTitle>
              <div className="flex flex-col gap-2 ">
                <input
                  type="text"
                  className="bg-[#020817] border-2 rounded-lg p-2"
                  value={faq.question}
                  placeholder="Your Quesiton"
                  onChange={(e) => {
                    setFaq({ ...faq, question: e.target.value });
                  }}
                />

                <select
                  value={faq.category}
                  defaultValue={"General"}
                  onChange={(e) => {
                    setFaq({ ...faq, category: e.target.value as Category });
                  }}
                  className="bg-[#020817] border-2 rounded-lg p-2"
                >
                  <option value="GENERAL">General</option>
                  <option value="STAY">Stay</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="FOOD">Food</option>
                </select>

                <Button
                  onClick={() => {
                    try {
                      if (faq.question) {
                        addFaq(faq);
                        toast.success("Question submitted successfully!");
                        setFaq({ ...faq, question: "" });
                      } else {
                        toast.error("Please enter a question");
                      }
                    } catch (e) {
                      toast.error("Error submitting question");
                    }
                  }}
                  className="font-semibold"
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};
