'use server';
import LandingPage from '@/components/landingPage';
import AboutHackfest from '@/components/aboutHackfest';
import Footer from '@/components/footer';
import Domains from '@/components/domains';
import Sponsors from '@/components/sponsors';
import About from '@/components/about';
import Navbar from '@/components/navbar';
import PrizePool from '@/components/prizePool';
import { FAQ } from '@/components/faq';

export default async function Home() {
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
            image: '/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
          {
            name: 'Open Innovation',
            image: '/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
          {
            name: 'Healthcare',
            image: '/metaverse.svg',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!',
            prize: 10000,
          },
        ]}
      />
      <Sponsors />
      <FAQ/>
      <About />
      <Footer />
    </main>
  );
}
