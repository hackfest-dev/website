import { SectionHeading } from "../ui/sectionHeading";
import { Tabpanel } from "./tabPanel";
import { TabFaq } from "./tabs";
import faq from "./faq";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export const FAQ: React.FC<{}> = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <Tabs defaultValue="GENERAL" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="GENERAL">Genral</TabsTrigger>
          <TabsTrigger value="FOOD">Food</TabsTrigger>
          <TabsTrigger value="STAY">Stay</TabsTrigger>
          <TabsTrigger value="TRAVEL">Travel</TabsTrigger>
        </TabsList>
        <TabsContent value="GENERAL">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="FOOD">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};
