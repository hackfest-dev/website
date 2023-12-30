'use client';
import LandingPage from '@/src/components/landingPage';
import AboutHackfest from '@/src/components/aboutHackfest';
import Footer from '@/src/components/footer';
import Domains from '@/src/components/domains';
import Sponsors from '@/src/components/sponsors';
import About from '@/src/components/about';
import Navbar from '@/src/components/navbar';
import PrizePool from '@/src/components/prizePool';

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Navbar />
      <LandingPage />
      <AboutHackfest />
      <PrizePool />
      <Domains
        domainList={[
          {
            name: 'Metaverse',
            image: '/images/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
          {
            name: 'Open Innovation',
            image: '/images/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
          {
            name: 'Healthcare',
            image: '/images/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
        ]}
      />
      <Sponsors />
      <About />
      <Footer />
    </main>
  );
}
