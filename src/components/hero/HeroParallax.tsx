"use client";
import Image from "next/image";
import HeroForeground from "@/public/images/hero-foreground2.svg";
import HeroBackgroundSun from "@/public/images/hero-background-sun.svg";
import HeroBackgroundNoise from "@/public/images/hero-background-noise2.svg";
import HeroBackground from "@/public/images/hero-background.svg";
import HackfestFont from "@/public/images/hackfest-text.png";
import Reflection from "@/public/images/reflection_without_gap.svg";
import HoverBoard from "@/public/images/hoverboard.svg";
import { MouseEvent, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Countown from "./countdown";

const HeroParallax = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const titleText = useRef(null);
  const fgRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (titleText.current) {
        gsap.to(titleText.current, {
          y: 200,
          scale: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: 75,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          y: 75,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: ref }
  );

  const boxRef = useRef(null);

  const handleMouseMove = (e: MouseEvent) => {
    const xPercentage = e.clientX / window.innerWidth - 0.5;

    if (boxRef.current) {
      (boxRef.current as HTMLDivElement).style.transform = ` translateX(${
        xPercentage * 0.175 * window.innerWidth
      }px) rotateY(${-xPercentage * 0.175}deg)`;
    }
  };

  return (
    <div className="relative h-screen w-screen" ref={ref}>
      <div
        ref={titleText}
        className="absolute inset-0 z-10 flex justify-center items-center"
      >
        <Image className={`w-[800px]`} src={HackfestFont} alt="Hackfest Font" />
      </div>

      <div className="-z-20 h-2/3 -mb-2 mt-2 w-screen relative" ref={fgRef}>
        <Image
          src={HeroForeground}
          alt="Hero Foreground"
          className="object-cover w-full h-full object-bottom"
        />

        {/* <Image
          src={Reflection}
          alt="Reflection"
          className="object-cover w-full mx-auto object-bottom"
        /> */}
      </div>

      <div
        className="absolute bottom-[0%] w-screen h-[46%] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          perspective: "200px",
        }}
        ref={gridRef}
      >
        <div className='bg-[url("/images/grid-sm.svg"),linear-gradient(0deg,#060e3c_30%,#00c6af)] md:bg-[url("/images/grid1.svg"),linear-gradient(0deg,#060e3c_30%,#00c6af)] border-t-2 motion-safe:animate-move flex justify-center items-start rotate-x-45 w-[200%] h-[100%] left-[-50%] relative bg-repeat bg-center'></div>
      </div>

      <div className="absolute -z-30 inset-0">
        <Image
          src={HeroBackgroundSun}
          alt="Hero Background"
          className="h-screen w-screen object-cover object-top"
        />
      </div>
      {/* <div className="absolute -z-30 inset-0">
        <Image
          src={HeroBackground} 
          alt="Hero Background"
          className="h-screen w-screen object-cover object-top"
        />
      </div> */}
      <div className="absolute mx-3 max-w-6xl w-full left-1/2 md:top-24 top-1/4 -translate-x-1/2 -z-[29]">
        <div className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-[#c1f0a8] opacity-60">
          <Countown eventTime={new Date("2024-4-15")} />
        </div>
      </div>

      <div className="absolute -z-[28] inset-0">
        <Image
          src={HeroBackgroundNoise}
          alt="Hero Background"
          className="h-screen w-screen object-cover object-top opacity-50"
        />
      </div>

      <div
        ref={boxRef}
        style={{ perspective: 600 }}
        onMouseMove={(e) => handleMouseMove(e)}
        className={`z-40 absolute inset-0 flex justify-center items-end`}
      >
        <div>
          <Image
            width={200}
            height={200}
            src={HoverBoard}
            alt="Hover Board"
            className="fly-up-down ease-in-out"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-clip rotate-180 z-50 -mb-1">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block md:h-auto h-[150px] w-[calc(100% + 1.3px)]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-900"
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroParallax;
