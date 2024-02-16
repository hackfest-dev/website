"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/sectionHeading";
import { Button } from "../ui/button";

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
      <section
        id="sponsors"
        className="min-h-screen py-20 flex flex-col justify-around items-center gap-20 transition-all"
      >
        <SectionHeading title="Sponsors" classname="text-6xl" />

        <div className="flex flex-col w-full xl:flex-row xl:w-2/3 xl:justify-around justify-center items-center gap-16 xl:gap-4">
          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent bg-rainbow bg-clip-text animate-marquee">
              Powered By
            </h2>
            <div className="relative aspect-square w-3/5">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad]"
                src="/logos/sponsors/EGHD.jpg"
                alt="EGHD"
                fill={true}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent bg-gold bg-clip-text animate-marquee">
              Co-Powered By
            </h2>
            <div className="relative aspect-square w-3/5">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad]"
                src="/logos/sponsors/The_Global_Point.jpg"
                alt="The_Global_Point"
                fill={true}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent bg-silver bg-clip-text animate-marquee">
              Associate Sponsors
            </h2>
            <div className="relative aspect-square w-3/5">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad]"
                src="/logos/sponsors/Niveus.jpg"
                alt="Niveus"
                fill={true}
              />
            </div>
          </div>
        </div>

        <div className="p-5 xl:p-7 mx-10 backdrop-blur-xl rounded-xl shadow-[0_0_3px_1px_#b9b7b7ad] flex flex-col justify-center items-center gap-7 -hue-rotate-15">
          <p>Any event is incomplete without support and love</p>
          <h3 className="text-3xl font-semibold">
            Intrested in sponsoring us?
          </h3>
          <a href="mailto:sponsor@hackfest.dev" className="self-start">
            <Button className="text-xl hover:hue-rotate-15 hover:scale-105 font-semibold">
              Email-us
            </Button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Sponsors;
