// "use client";

import Image from "next/image";

// import LandingPage from "@/components/landingPage/page";
// import AboutHackfest from "@/components/aboutHackfest/page";
// import Footer from "@/components/footer/page";
// import Domains from "@/components/domains/page";
// import AlertBanner from "@/components/alertBanner/page";
// import Sponsors from "@/components/sponsors/page";
// import About from "@/components/about/page";

// export default function Home() {
//   return (
//     <main className="flex flex-col gap-20">
//       <AlertBanner />
//       <LandingPage />
//       <AboutHackfest />
//       <Domains />
//       <Sponsors />
//       <About />
//       <Footer />
//     </main>
//   );
// }

export default function Home() {
  return (
    <main className="w-screen h-screen relative flex justify-center items-center p-6">
      <Image
        src="/assets/bg 2.png"
        alt="background"
        className="object-fit object-cover -z-10"
        fill
        sizes="100vw"
      />
      <div className="absolute flex justify-between items-center top-0 w-full px-3 py-3 md:px-6 md:py-4">
        <div className="h-7 w-36 md:h-10 md:w-60 relative">
          <Image
            src={"/assets/NMAMITLogo.png"}
            className="object-contain object-center absolute"
            alt="NMAMIT logo"
            fill
          ></Image>
        </div>
        <div className="h-12 w-[7.5rem] md:h-20 md:w-36 relative">
          <Image
            src="/assets/flcLogo.png"
            fill
            className="object-contain object-center absolute"
            alt="FLC logo"
          ></Image>
        </div>
      </div>
      <div className=" font-spaceRave text-center flex flex-col gap-2">
        {/* <p className="text-5xl md:text-8xl lg:text-8xl text-transparent bg-gradient-to-b from-gray-800 to-gray-600  bg-clip-text px-2">
          Hackfest
        </p> */}
        <p className="text-4xl md:text-7xl lg:text-7xl bg-gradient-to-b from-gray-800 to-gray-600  bg-clip-text text-transparent px-2">
          Coming Soon
        </p>
      </div>
    </main>
  );
}
