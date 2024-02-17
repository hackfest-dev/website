import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { useState, useEffect } from "react";

export default function QnaAccordion({
  faqs,
}: {
  faqs: {
    id: number;
    question: string;
    answer: string;
    category: "GENERAL" | "FOOD" | "STAY" | "TRAVEL";
    published: boolean;
  }[];
}) {
  // const [faqData, setFaqData] = useState<
  // {
  //   id: number;
  //   question: string;
  //   answer: string;
  //   category: "GENERAL" | "FOOD" | "STAY" | "TRAVEL";
  //   published: boolean;
  // }[]
  // >([]);
  // useEffect(() => {
  //   getAllFaqs().then((data) => {
  //     setFaqData(data);
  //   });
  // }, []);
  return (
    <>
      <div className="flex flex-col">
        {faqs.map((faq, index) => {
          return (
            <Accordion
              type="single"
              collapsible
              key={index}
              className="md:w-[50vw] w-[80vw]"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}
