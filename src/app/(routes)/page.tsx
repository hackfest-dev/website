import Hero from "@/src/components/hero";
import AboutHackfest from "@/src/components/aboutHackfest";
import Domains from "@/src/components/domains";
import Sponsors from "@/src/components/sponsors";
import About from "@/src/components/about";
import PrizePool from "@/src/components/prizePool";
import { FAQ } from "@/src/components/faq";
import TimelineTape from "@/src/components/timelineTape";
import { domains } from "@/src/constants";
import Speakers from "@/src/components/speakers";

export default async function Home() {
  return (
    <main className="mx-auto">
      <Hero />
      <AboutHackfest />
      <PrizePool />
      <Domains domainList={domains} />
      <div className="md:pb-80 pb-16 scale-75 -translate-y-48">
        <TimelineTape />
      </div>
      <Sponsors />
      <Speakers />
      <FAQ />
      <About />
    </main>
  );
}
