"use client";
import { SectionHeading } from "../ui/sectionHeading";
import SponsorTile from "./sponsorsTile";
import Cursor from "../cursor";
import { useEffect, useRef } from "react";
import Image from "next/image";
import JumpingCube from "../jumpingCube";
import LetterByLetterAnimator from "../letterByLetterAnimator";

const Sponsors = () => {
  const carFutureRef = useRef<HTMLImageElement>(null);
  const carRetroRef = useRef<HTMLImageElement>(null);

  const handleSwap = (e: Event) => {
    if (carFutureRef.current) {
      if (carFutureRef.current.style.opacity === "0") {
        carFutureRef.current.style.transitionDelay = "250ms";
        carFutureRef.current.style.opacity = "1";
      } else {
        carFutureRef.current.style.transitionDelay = "0ms";
        carFutureRef.current.style.opacity = "0";
      }
    }
    if (carRetroRef.current) {
      if (carRetroRef.current.style.opacity === "0") {
        carRetroRef.current.style.transitionDelay = "250ms";
        carRetroRef.current.style.opacity = "1";
      } else {
        carRetroRef.current.style.transitionDelay = "0ms";
        carRetroRef.current.style.opacity = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("swap", handleSwap);
    return () => {
      window.removeEventListener("swap", handleSwap);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        #sponsor-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: repeat(8, minmax(0, 1fr));
          grid-template-areas:
            "al-1 hr-1 hr-1"
            "sq-1 sq-1 al-2"
            "sq-1 sq-1 al-6"
            "al-4 al-5 vr-1"
            "hr-2 hr-2 vr-1"
            "al-3 sq-2 sq-2"
            "vr-2 sq-2 sq-2"
            "vr-2 al-7 al-8";
        }

        @media (min-width: 768px) {
          #sponsor-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-template-rows: repeat(4, minmax(0, 1fr));
            grid-template-areas:
              "al-1 sq-1 sq-1 hr-1 hr-1 al-7"
              "al-2 sq-1 sq-1 sq-2 sq-2 vr-1"
              "vr-2 al-5 al-6 sq-2 sq-2 vr-1"
              "vr-2 hr-2 hr-2 al-3 al-4 al-8";
          }
        }
      `}</style>
      <section
        id="sponsor"
        className="py-16 min-h-screen flex flex-col justify-center items-center transition-all bg-gradient-to-b from-[#06123e] to-[#045262]">
        <SectionHeading title="Sponsors" />
        <div
          id="sponsor-grid"
          className="grid gap-2 w-full pt-12 md:w-2/3 px-2">
          <SponsorTile noHoverEffect tileNumber={1} cellType="bronze">
            <JumpingCube />
          </SponsorTile>
          <SponsorTile tileNumber={2} cellType="bronze" noHoverEffect>
            <div
              className="w-full h-full bg-[#]"
              onClick={() => {
                window.dispatchEvent(new Event("swap"));
              }}>
              <Image
                ref={carRetroRef}
                src={"/svg/carRetro.svg"}
                alt={"car1"}
                fill={true}
                className="z-10 transition-all ease-in duration-300 !animate-click-me"
              />
              <Image
                src={"/svg/carRetroGhost.svg"}
                alt={"car2"}
                fill={true}
                className="opacity-20 z-0"
              />
            </div>
          </SponsorTile>
          <SponsorTile noHoverEffect tileNumber={3} cellType="bronze">
            <div
              className="w-full h-full"
              onClick={() => {
                window.dispatchEvent(new Event("swap"));
              }}>
              <Image
                ref={carFutureRef}
                src={"/svg/carFuture.svg"}
                alt={"car2"}
                fill={true}
                className="z-10 transition-all ease-in duration-300 !animate-click-me"
                style={{ opacity: 0 }}
              />
              <Image
                src={"/svg/carFutureGhost.svg"}
                alt={"car2"}
                fill={true}
                className="opacity-20 z-0"
              />
            </div>
          </SponsorTile>
          <SponsorTile
            tileNumber={4}
            cellType="bronze"
            src="/logos/mockcompany.png">
            4
          </SponsorTile>
          <SponsorTile noHoverEffect tileNumber={5} cellType="bronze">
            <div className="relative h-full w-full">
              <Image
                src="/logos/logo.png"
                alt="HF"
                fill={true}
                className="object-contain"
              />
            </div>
          </SponsorTile>
          <SponsorTile
            tileNumber={6}
            cellType="bronze"
            src="/logos/mockcompany.png">
            6
          </SponsorTile>
          <SponsorTile tileNumber={7} cellType="bronze" noHoverEffect>
            <LetterByLetterAnimator word={"SPONSORS"} />
            <Cursor />
          </SponsorTile>
          <SponsorTile
            noHoverEffect
            tileNumber={8}
            cellType="bronze"
            src="/logos/flc_logo_crop.png"
            srcClassName="object-contain"></SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="silver"
            src="/logos/mockcompany.png">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="silver"
            src="/logos/mockcompany.png">
            2
          </SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="gold"
            src="/logos/mockcompany.png">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="gold"
            src="/logos/mockcompany.png">
            2
          </SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="diamond"
            src="/logos/mockcompany.png">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="diamond"
            src="/logos/mockcompany.png">
            2
          </SponsorTile>
        </div>
      </section>
    </>
  );
};

export default Sponsors;
