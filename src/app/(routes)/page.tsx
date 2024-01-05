import Hero from '@/src/components/hero';
import AboutHackfest from '@/src/components/aboutHackfest';
import Domains from '@/src/components/domains';
import Sponsors from '@/src/components/sponsors';
import About from '@/src/components/about';
import PrizePool from '@/src/components/prizePool';
import { FAQ } from '@/src/components/faq';
import TimelineTape from '@/src/components/timelineTape';
import { domains } from '@/src/constants';

export default async function Home() {
  return (
    <main className="mx-auto">
      <Hero />
      <AboutHackfest />
      <PrizePool />
      <Domains domainList={domains} />
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <TimelineTape />
      </div>
      <Sponsors />
      <FAQ />
      <About />
    </main>
  );
}
