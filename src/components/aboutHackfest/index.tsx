"use client";

import { RefObject, useRef } from "react";
import { GiDiamonds } from "react-icons/gi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GridTile from "../gridTile";
import Image from "next/image";
import JumpingCube from "../jumpingCube";
import Cursor from "../cursor";
import { Button } from "../ui/button";

const AboutHackfest = () => {
  const childRef36 = useRef<HTMLDivElement>(null);
  const childRef50 = useRef<HTMLDivElement>(null);

  const counterAnimation = (
    childRef: RefObject<HTMLElement>,
    target: number,
    duration: number = 2,
    delay: number = 0.3
  ) => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      ease: "power3.out",

      duration: duration,
      delay: delay,
      onUpdate: () => {
        if (childRef.current)
          childRef.current.innerText = `${counter.value.toFixed(0)}`.padStart(
            2,
            "0"
          );
      },
    });
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: childRef36.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          counterAnimation(childRef36, 36);
        },
        onEnterBack: () => {
          counterAnimation(childRef36, 36);
        },
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: childRef50.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          counterAnimation(childRef50, 50);
        },
        onEnterBack: () => {
          counterAnimation(childRef50, 50);
        },
      },
    });
  }, []);

  return (
    <>
      <style jsx>{`
        #sponsor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(8, minmax(0, 1fr));
          grid-template-areas:
            "c11-1 c21-3"
            "c11-6 c21-3"
            "c12-1 c12-1"
            "c11-3 c11-4"
            "c22-1 c22-1"
            "c22-1 c22-1"
            "c12-2 c12-2"
            "c12-3 c12-3";
        }

        @media (min-width: 640px) {
          #sponsor-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-template-rows: repeat(5, minmax(0, 1fr));
            grid-template-areas:
              "c11-1 c11-2 c12-1 c12-1"
              "c22-1 c22-1 c11-3 c11-4"
              "c22-1 c22-1 c11-5 c21-1"
              "c21-2 c12-2 c12-2 c21-1"
              "c21-2 c12-3 c12-3 c11-6";
          }
        }

        @media (min-width: 1024px) {
          #sponsor-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            grid-template-rows: repeat(4, minmax(0, 1fr));
            grid-template-areas:
              "c11-1 c11-2 c21-1 c12-1 c12-1"
              "c22-1 c22-1 c21-1 c11-3 c11-4"
              "c22-1 c22-1 c12-2 c12-2 c21-2"
              "c11-5 c12-3 c12-3 c11-6 c21-2";
          }
        }
      `}</style>
      <section
        id="about"
        className={`relative flex flex-col justify-center items-center xl:py-20`}
      >
        <div
          id="sponsor-grid"
          className="grid gap-2 w-screen 2xl:max-w-screen-2xl px-2 py-2"
        >
          {/* Cell 1x1 */}
          <GridTile cellType="c11" cellNo={1}>
            <div className="w-full h-full flex justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-cente">
                <h1 className="text-4xl lg:text-6xl font-bold font-obscura tracking-wider text-center">
                  APRIL
                </h1>
                <p className="w-full flex items-center justify-between text-lg lg:text-2xl font-semibold tracking-wider">
                  5th
                  <GiDiamonds />
                  6th
                  <GiDiamonds />
                  7th
                </p>
              </div>
              <div className="flex flex-col items-center justify-center font-semibold text-xl leading-5 sm:max-xl:hidden">
                <div>2</div>
                <div>0</div>
                <div>2</div>
                <div>4</div>
              </div>
            </div>
          </GridTile>

          <GridTile cellType="c11" cellNo={2} className="hidden sm:block">
            <div className="relative w-full h-full">
              <Image
                src="/logos/logo.png"
                alt="Hackfest_Logo"
                fill
                className="object-contain"
              />
            </div>
          </GridTile>

          <GridTile cellType="c11" cellNo={3}>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <span className="text-3xl md:text-4xl font-bold pr-1">
                <div
                  ref={childRef50}
                  className="inline-block -mr-1 min-w-12 max-w-12 md:min-w-14 md:max-w-14"
                >
                  50
                </div>
                <span className="font-obscura tracking-wider">Hrs</span>
              </span>
              <span className="flex items-center justify text-base md:text-lg lg:text-xl font-semibold self-center">
                On-Site Event
              </span>
            </div>
          </GridTile>

          <GridTile cellType="c11" cellNo={4}>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <span className="text-3xl md:text-4xl font-bold pr-1">
                <div
                  ref={childRef36}
                  className="inline-block -mr-1 min-w-12 max-w-12 md:min-w-14 md:max-w-14"
                >
                  36
                </div>
                <span className="font-obscura tracking-wider">Hrs</span>
              </span>
              <span className="flex items-center justify text-base md:text-lg lg:text-xl font-semibold self-center text-center">
                Intense Hackathon
              </span>
            </div>
          </GridTile>

          <GridTile cellType="c11" cellNo={5} className="hidden sm:block">
            <div className="w-full h-full">
              <JumpingCube />
            </div>
          </GridTile>

          <GridTile cellType="c11" cellNo={6}>
            <div className="relative w-full h-full">
              <Image
                src="/logos/flc_logo_crop.png"
                alt="FLC_Logo"
                fill
                className="object-contain"
              />
            </div>
          </GridTile>

          {/* Cell 1x2 */}
          <GridTile cellType="c12" cellNo={1}>
            <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl lg:text-4xl 2xl:text-5xl font-semibold text-center">
              <span className="font-extrabold pr-1">3</span>
              <span className="font-obscura">Day Long Tech-Fest</span>
            </div>
          </GridTile>

          <GridTile cellType="c12" cellNo={2}>
            <div className="w-full h-full flex flex-col justify-center items-center px-6 gap-2">
              <h3 className="font-bold text-xl md:text-2xl lg:text-5xl">
                <span className="font-extrabold pr-1">5</span>
                <span className="font-obscura tracking-wider">Tracks</span>
              </h3>
              <p className="text-lg sm:text-lg lg:text-xl text-justify w-auto font-semibold">
                Five diverse tracks, to craft and code solutions for thier
                choosen problem statement.
              </p>
            </div>
          </GridTile>

          <GridTile cellType="c12" cellNo={3}>
            <div className="w-full h-full flex flex-col justify-center items-center text-base md:text-lg xl:text-2xl">
              <h1>NMAM Institute of Technology, Nitte</h1>
              <p>Karkala, Udupi District, Karnataka</p>
            </div>
          </GridTile>

          {/* Cell 2x1 */}
          <GridTile cellType="c21" cellNo={1} className="hidden sm:block">
            <div className="relative w-full h-full">
              <Cursor />
            </div>
          </GridTile>

          <GridTile cellType="c21" cellNo={2} className="hidden sm:block">
            <div className="w-full h-full flex justify-center items-center">
              <h2></h2>
              {/* TODO: change file location */}
              <a href="/logos/logo.png" download="Hackfest_Brochure.pdf">
                <Button variant={"secondary"}>Download Brochure</Button>
              </a>
            </div>
          </GridTile>

          <GridTile cellType="c21" cellNo={3} className="block sm:hidden">
            <div className="relative w-full h-full">
              <Image
                src="/logos/logo.png"
                alt="Hackfest_Logo"
                fill
                className="object-contain"
              />
            </div>
          </GridTile>

          {/* Cell 2x2 */}
          <GridTile cellType="c22" cellNo={1}>
            <div className="w-full h-full p-3 sm:p-4 md:p-5 lg:p-7 xl:p-10 flex flex-col justify-center items-center gap-3">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-obscura">
                What is HackFest?
              </div>
              <div className="flex justify-center items-center text-sm lg:text-lg text-justify">
                NMAM Institute of Technology presents a three-day National Tech
                Fest featuring a 36-hour hackathon, tech conferences, and
                networking. Our vision is to bring together 60 teams from
                leading Indian engineering colleges, fostering innovation. The
                event spans 50 hours, including a 36-hour hackathon, providing a
                platform for participants to showcase their skills. The proposal
                outlines dates, goals, budget, format, logistics, and expected
                outcomes.
              </div>
            </div>
          </GridTile>
        </div>
      </section>
    </>
  );
};

export default AboutHackfest;
