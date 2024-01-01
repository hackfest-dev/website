import LandingPage from "@/src/components/landingPage";
import AboutHackfest from "@/src/components/aboutHackfest";
import Domains from "@/src/components/domains";
import Sponsors from "@/src/components/sponsors";
import About from "@/src/components/about";
import PrizePool from "@/src/components/prizePool";
import { FAQ } from "@/src/components/faq";
import TimelineTape from "@/src/components/timelineTape";

export default async function Home() {
  return (
    <main className="flex flex-col gap-20">
      <LandingPage />
      <AboutHackfest />
      <PrizePool />
      <Domains
        domainList={[
          {
            name: "Metaverse",
            image: "/images/metaverse.svg",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
            prize: 10000,
          },
          {
            name: "Open Innovation",
            image: "/images/metaverse.svg",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
            prize: 10000,
          },
          {
            name: "Healthcare",
            image: "/images/metaverse.svg",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
            prize: 10000,
          },
        ]}
      />
      <div className="flex flex-col items-center justify-center h-screen">
        <TimelineTape />
      </div>

      <Sponsors />
      <FAQ />
      <About />
    </main>
  );
}
