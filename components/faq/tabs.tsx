"use client";
import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel, Key } from "react-aria-components";
export const TabFaq: React.FC<{
    foodTab: React.ReactNode;
    generalTab: React.ReactNode;
    stayTab: React.ReactNode;
    travelTab: React.ReactNode;
}> = ({ foodTab, generalTab, stayTab, travelTab }) => {
    const [selectedTab, setSelectedTab] = useState<Key>("tab-general");
    return (
        <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
            <TabList
                aria-label="Frequently Asked Questions"
                className="flex lg:gap-28 md:gap-10 gap-3 justify-center mb-5"
            >
                <Tab
                    id="tab-general"
                    className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-primary-300 rounded-full focus-visible:outline-none 
                    ${selectedTab=="tab-general"? "shadow-lg scale-105 font-bold":"text-white shadow-md"}`}
                >
                    General
                </Tab>
                <Tab id="tab-food" 
                    className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-primary-300 rounded-full focus-visible:outline-none 
                    ${selectedTab=="tab-food"? "shadow-lg scale-105 font-bold":"text-white shadow-md"}`}>
                    Food
                </Tab>
                <Tab id="tab-stay" 
                    className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-primary-300 rounded-full focus-visible:outline-none 
                    ${selectedTab=="tab-stay"? "shadow-lg scale-105 font-bold":"text-white shadow-md"}`}>
                    Stay
                </Tab>
                <Tab id="tab-travel" 
                    className={`cursor-pointer p-2 md:px-5 w-20 md:w-28 text-center shadow-primary-300 rounded-full focus-visible:outline-none 
                    ${selectedTab=="tab-travel"? "shadow-lg scale-105 font-bold":"text-white shadow-md"}`}>
                    Travel
                </Tab>
            </TabList>
            <TabPanel id="tab-general">{generalTab}</TabPanel>
            <TabPanel id="tab-food">{foodTab}</TabPanel>
            <TabPanel id="tab-stay">{stayTab}</TabPanel>
            <TabPanel id="tab-travel">{travelTab}</TabPanel>
        </Tabs>
    );
};
