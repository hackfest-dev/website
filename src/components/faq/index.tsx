import { SectionHeading } from '../ui/sectionHeading';
import { Tabpanel } from './tabPanel';
import { TabFaq } from './tabs';
import faq from './faq';

export const FAQ: React.FC<{}> = () => {
  return (
    <section className="flex gap-20 flex-col md:p-12 p-4">
      <SectionHeading title="Frequently Asked Questions"></SectionHeading>
      <TabFaq
        generalTab={<Tabpanel faq={faq.general}></Tabpanel>}
        foodTab={<Tabpanel faq={faq.food}></Tabpanel>}
        stayTab={<Tabpanel faq={faq.stay}></Tabpanel>}
        travelTab={<Tabpanel faq={faq.travel}></Tabpanel>}
      ></TabFaq>
    </section>
  );
};
