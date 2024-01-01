"use client";

import LandingPage from "@/components/landingPage/page";
import AboutHackfest from "@/components/aboutHackfest/page";
import Footer from "@/components/footer/page";
import Domains from "@/components/domains/page";
import { domains } from "@/components/constants/page";
import AlertBanner from "@/components/alertBanner/page";
import Sponsors from "@/components/sponsors/page";
import About from "@/components/about/page";
import Navbar from "@/components/navbar/page";
import NeonGrid from "@/components/hero/neonGrid";
import PrizePool from "@/components/prizePool/page";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Navbar />
      <LandingPage />
      <AboutHackfest />
      <PrizePool />
      <Domains domainList={domains} />
      <Sponsors />
      <About />
      <Footer />
    </main>
  );
}
