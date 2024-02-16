"use client";
import Image from "next/image";
import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { LampContainer } from "./lamp2";
import FadeIn from "../fadeInAnimation";
import { SectionHeading } from "../ui/sectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const config = {
  angle: 290,
  spread: 300,
  startVelocity: 40,
  elementCount: 50,
  dragFriction: 0.11,
  duration: 3020,
  stagger: 3,
  width: "8px",
  height: "14px",
  perspective: "503px",
  colors: ["#f00", "#0f0", "#00f", "#FFC700", "#FF0000", "#2E3191", "#41BBC7"],
};

const PrizePool = () => {
  const ref = useRef(null);
  // useEffect(() => {
  //   if (isInView) {
  //     ConfettiExplosion();
  //   }
  // }, [isInView]);

  useGSAP(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        onEnter: () => ConfettiExplosion(),
      },
    });
  });

  const [show, setShow] = useState(false);

  const ConfettiExplosion = () => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  };

  return (
    <>
      <div
        id="prizes"
        className="z-0  w-full flex flex-col items-center justify-center rounded-md py-10 md:py-16 xl:py-20 gap-6 md:gap-10 overflow-clip"
      >
        <div className="flex flex-col items-center justify-center">
          <SectionHeading title="Prize Pool" />
          <FadeIn delay={0.3}>
            <Image
              src="/images/airship.png"
              width={180}
              height={180}
              alt="UFO"
              className="object-contain object-center fly-up-down ease-in-out"
              onClick={() => ConfettiExplosion()}
            />
          </FadeIn>

          <Confetti active={show} config={config} />
        </div>

        {/* Card Components */}

        <div
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 md:space-x-4 z-0"
          ref={ref}
        >
          <FadeIn className="order-2 md:order-1 z-[1]" delay={0.3}>
            <div className="w-72 h-72 shadow-xl bg-gradient-to-r from-base-800/65 via-base-700/65 to-base-800/65 border border-gray-800 rounded-lg z-10 md:translate-x-5 pb-4 flex flex-col gap-4 justify-center items-center  backdrop-blur-sm">
              <h1 className="font-bold text-xl text-white  relative">
                Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500   text-center ">
                <span className="text-white font-bold text-4xl">₹30000</span>
              </p>
              <p className="font-normal text-sm text-slate-500  text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </FadeIn>
          <FadeIn className="order-1 md:order-2 z-[2]">
            <div className="w-72 h-72 md:w-80 md:h-80 shadow-xl  bg-gradient-to-r from-base-800/65 via-base-700/65 to-base-800/65 backdrop-blur-sm border border-gray-800 rounded-lg z-20 md:relative pb-4 flex flex-col gap-4 justify-center items-center">
              <h1 className="font-bold text-3xl text-white  relative text-center ">
                Winner
              </h1>
              <p className="font-normal text-base text-slate-500   text-center  ">
                <span className="text-white font-bold text-4xl md:text-5xl">
                  ₹50000
                </span>
              </p>
              <p className="font-normal text-base text-slate-500  text-center  ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </FadeIn>
          <FadeIn className="order-3 md:order-3 z-0" delay={0.6}>
            <div className="w-72 h-72 shadow-xl bg-gradient-to-r from-base-800/65 via-base-700/65 to-base-800/65 backdrop-blur-sm border border-gray-800 rounded-lg z-10 md:-translate-x-5 pb-4 flex flex-col gap-4 justify-center items-center">
              <h1 className="font-bold text-xl text-white  relative">
                Second Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500   text-center ">
                <span className="text-white font-bold text-4xl">₹20000</span>
              </p>
              <p className="font-normal text-sm text-slate-500  text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </FadeIn>
        </div>

        {/* <Lamp /> */}
        <LampContainer className="pt-5 md:pt-7">
          <FadeIn>
            <h1 className="bg-gradient-to-b from-cyan-300 to-cyan-50 py-4 bg-clip-text text-center text-7xl font-semibold tracking-tight text-transparent md:text-7xl">
              ₹50K
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="font-medium text-base text-white text-center py-4">
              For the best project in each of the 5 tracks* will be awarded with
              a cash prize of 10K
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-normal text-xs text-slate-400 text-center mt-4">
              * Out of 6 tracks except Open Innovation are eligible for this
              special prize of 10k.
            </p>
          </FadeIn>
        </LampContainer>
      </div>
    </>
  );
};

export default PrizePool;
