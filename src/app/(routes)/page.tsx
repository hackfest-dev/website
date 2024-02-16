import Hero from "@/src/components/hero";
import AboutHackfest from "@/src/components/aboutHackfest";
import Domains from "@/src/components/domains";
import Sponsors from "@/src/components/sponsors";
import About from "@/src/components/about";
import PrizePool from "@/src/components/prizePool";
import { FAQ } from "@/src/components/faq";
import TimelineTape from "@/src/components/timelineTape";
import Timeline from "@/src/components/timeline";
import { domains } from "@/src/constants";
import Speakers from "@/src/components/speakers";

export default async function Home() {
  return (
    <main className="mx-auto relative overflow-y-clip">
      <div
        className="absolute h-full w-full -z-50 mt-[100vh] bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933]"
        style={{
          background:
            "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
        }}
      ></div>
      <div className="h-40 absolute w-full top-[100vh] -translate-y-1/2 bg-gradient-to-b from-transparent via-[#060e3c] to-transparent z-50"></div>
      <Hero />
      <AboutHackfest />
      <PrizePool />
      <Domains domainList={domains} />
      {/* <div className="md:pb-80 pb-16 scale-75 -translate-y-48">
        <TimelineTape />
      </div> */}
      <Timeline events={events} />
      <Sponsors />
      {/* <Speakers /> */}
      <FAQ />
      {/* <About /> */}
    </main>
  );
}

const events = [
  {
    day: 1,
    title: "Check-in",
    time: "10-11AM",
  },
  {
    day: 1,
    title: "Onboarding",
    time: "11AM-12PM",
  },
  {
    day: 1,
    title: "Lunch",
    time: "12-1PM",
  },
  {
    day: 1,
    title: "Inaugural",
    time: "1-4PM",
  },
  {
    day: 1,
    title: "Snacks",
    time: "4-4:30PM",
  },
  {
    day: 1,
    title: "Hackathon Starts",
    time: "5PM",
  },

  {
    day: 2,
    title: "Breakfast",
    time: "8-9AM",
  },
  {
    day: 2,
    title: "Engagement Activities",
    time: "From 9AM",
  },
  {
    day: 2,
    title: "Lunch",
    time: "1-2PM",
  },
  {
    day: 2,
    title: "Cool Off",
    time: "3-4PM",
  },
  {
    day: 2,
    title: "Snacks",
    time: "4-4:30PM",
  },
  {
    day: 2,
    title: "Dinner & judging",
    time: "",
  },

  {
    day: 3,
    title: "Hackathon ends",
    time: "7AM",
  },
  {
    day: 3,
    title: "Breakfast + Top 15",
    time: "From 9:30AM",
  },
  {
    day: 3,
    title: "Top 3 Selection",
    time: "From 11:30AM",
  },
  {
    day: 3,
    title: "Lunch",
    time: "12-1PM",
  },
  {
    day: 3,
    title: "Valedictory",
    time: "1PM",
  },
  {
    day: 3,
    title: "Checkout",
    time: "3PM",
  },
];
