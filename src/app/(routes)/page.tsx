import Hero from "@/src/components/hero";
import AboutHackfest from "@/src/components/aboutHackfest";
import Domains from "@/src/components/domains";
import Sponsors from "@/src/components/sponsors";
import About from "@/src/components/about";
import PrizePool from "@/src/components/prizePool";
import { FAQ } from "@/src/components/faq";
import TimelineTape from "@/src/components/timelineTape";
import { domains } from "@/src/constants";

export default async function Home() {
  return (
    <main className="mx-auto">
      <Hero />
      <AboutHackfest />
      <PrizePool />
      <Domains
        domainList={[
          {
            name: "Fintech",
            image: "/images/metaverse.svg",
            description:
              "Crafting the future of finance by creating solutions that revolutionize the way we manage, invest and trasact in the financial realm",
            prize: 10000,
          },
          {
            name: "Sustainable Development",
            image: "/images/metaverse.svg",
            description:
              "Driving innovation towards a greener, more sustainable world, where technology harmonizes with the environment",
            prize: 10000,
          },
          {
            name: "Healthcare",
            image: "/images/metaverse.svg",
            description:
              "Heal through code!!! Your innovative solutions have the power to bridge gaps, save lives, and pave the way for a healthier world",
            prize: 10000,
          },
          {
            name: "Metaverse",
            image: "/images/metaverse.svg",
            description:
              "Shape the future of immersive experiences through digital spaces that captivate and connect people in ways never thought possible",
            prize: 10000,
          },
          {
            name: "Logistics",
            image: "/images/metaverse.svg",
            description:
              "Redifine logistics and contribute to a world  where movement of goods is faster, smarter and also sustainable",
            prize: 10000,
          },
          {
            name: "Open Innovation",
            image: "/images/metaverse.svg",
            description:
              "Your Innovation knows no bounds !!! Push the boundaries and Break free from traditional barriers with code",
            prize: null,
          },
        ]}
      />
      {/* <div className="flex flex-col items-center justify-center h-screen">
        <TimelineTape />
      </div> */}

      <Sponsors />
      <FAQ />
      <About />
    </main>
  );
}
