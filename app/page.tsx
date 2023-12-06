import LandingPage from "@/components/landingPage/page";
import AboutHackfest from "@/components/aboutHackfest/page";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <main
    // className={`bg-[url('/assets/backgroundGraphic.png')] bg-center bg-fixed bg-cover `}
    >
      <LandingPage />
      <AboutHackfest />
      <Footer />
    </main>
  );
}
