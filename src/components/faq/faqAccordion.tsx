export default function faqAccordion({
  faqs,
}: {
  faqs: {
    id: number;
    question: string;
    answer: string;
    published: boolean;
    category: "GENERAL" | "FOOD" | "STAY" | "TRAVEL";
  }[];
}) {
  return (
    <>
      {faqs.map((faq, index: number) => {
        return <div key={index}>Hello</div>;
      })}
    </>
  );
}
