'use client';
import { useState } from 'react';
import { Tabs,TabsList,TabsContent, TabsTrigger } from '../ui/tabs';
export const TabFaq: React.FC<{
  foodTab: React.ReactNode;
  generalTab: React.ReactNode;
  stayTab: React.ReactNode;
  travelTab: React.ReactNode;
}> = ({ foodTab, generalTab, stayTab, travelTab }) => {
  const [selectedTab, setSelectedTab] = useState<string>('tab-general');
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList
        aria-label="Frequently Asked Questions"
        className="flex lg:gap-28 md:gap-10 gap-3 justify-center mb-5"
      >
        <TabsTrigger
          value="tab-general"
          className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-base-300 rounded-full focus-visible:outline-none 
                    ${
                      selectedTab == 'tab-general'
                        ? 'shadow-lg scale-105 font-bold'
                        : 'text-white shadow-md'
                    }`}
        >
          General
        </TabsTrigger>
        <TabsTrigger
          value="tab-food"
          className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-base-300 rounded-full focus-visible:outline-none 
                    ${
                      selectedTab == 'tab-food'
                        ? 'shadow-lg scale-105 font-bold'
                        : 'text-white shadow-md'
                    }`}
        >
          Food
        </TabsTrigger>
        <TabsTrigger
          value="tab-stay"
          className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-base-300 rounded-full focus-visible:outline-none 
                    ${
                      selectedTab == 'tab-stay'
                        ? 'shadow-lg scale-105 font-bold'
                        : 'text-white shadow-md'
                    }`}
        >
          Stay
        </TabsTrigger>
        <TabsTrigger
          value="tab-travel"
          className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-base-300 rounded-full focus-visible:outline-none 
                    ${
                      selectedTab == 'tab-travel'
                        ? 'shadow-lg scale-105 font-bold'
                        : 'text-white shadow-md'
                    }`}
        >
          Travel
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-general">{generalTab}</TabsContent>
      <TabsContent value="tab-food">{foodTab}</TabsContent>
      <TabsContent value="tab-stay">{stayTab}</TabsContent>
      <TabsContent value="tab-travel">{travelTab}</TabsContent>
    </Tabs>
  );
};
