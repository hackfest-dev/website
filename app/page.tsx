"use client";

import LandingPage from "@/components/landingPage/page";
import AboutHackfest from "@/components/aboutHackfest/page";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <LandingPage />
      <AboutHackfest />
      <Footer />
    </main>
  );
}
