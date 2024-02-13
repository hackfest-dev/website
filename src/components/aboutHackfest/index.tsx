"use client";

import { RefObject, useRef } from "react";
import BorderedContainer from "../ui/borderedContainer";
import { GiDiamonds } from "react-icons/gi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AboutHackfest = () => {
  const parentRef36 = useRef<HTMLDivElement>(null);
  const parentRef50 = useRef<HTMLDivElement>(null);
  const childRef36 = useRef<HTMLSpanElement>(null);
  const childRef50 = useRef<HTMLSpanElement>(null);

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
          childRef.current.innerText = `${counter.value.toPrecision(2)}`;
      },
    });
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: parentRef36.current,
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
        trigger: parentRef50.current,
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
    <section
      className={`bg-[url("/images/blue-grainy.png")] bg-cover bg-center min-h-screen px-6 pt-20 md:px-20 flex flex-col justify-center items-center`}>
      <BorderedContainer>
        <div className="flex justify-center items-center pt-8 px-7 pb-5 gap-4">
          <div className="flex flex-col justify-center items-cente">
            <h1 className="text-7xl font-bold font-obscura tracking-wider">
              APRIL
            </h1>
            <p className="w-full flex items-center justify-between text-2xl font-semibold tracking-wider">
              5th
              <GiDiamonds />
              6th
              <GiDiamonds />
              7th
            </p>
          </div>
          <div className="flex flex-col items-center justify-center font-semibold text-xl leading-7">
            <div>2</div>
            <div>0</div>
            <div>2</div>
            <div>4</div>
          </div>
        </div>
      </BorderedContainer>

      <BorderedContainer>
        <div className="flex flex-col justify-start py-8 px-7 max-w-prose">
          <h3 className="pr-20 font-bold text-4xl">
            <span className="font-extrabold pr-1">5</span>
            <span className="font-obscura tracking-wider">Tracks</span>
          </h3>
          <p className="text-2xl font-medium">
            Five diverse tracks, to craft and code solutions for thier choosen
            problem statement.
          </p>
        </div>
      </BorderedContainer>

      <div className="flex flex-col justify-center items-center">
        <BorderedContainer>
          <div className="flex items-center justify-center py-8 px-7 text-2xl font-semibold">
            3 Day Long Tech-Fest
          </div>
        </BorderedContainer>

        <div className="flex flex-row justify-center items-center">
          <BorderedContainer>
            <div
              ref={parentRef50}
              className="flex flex-col justify-center items-center py-8 px-7">
              <span className="text-4xl font-bold pr-1">
                <span ref={childRef50} className="pr-1">
                  50
                </span>
                <span className="font-obscura tracking-wider">Hrs</span>
              </span>
              <span className="flex items-center justify-center">
                On-site Event
              </span>
            </div>
          </BorderedContainer>

          <BorderedContainer>
            <div
              ref={parentRef36}
              className="flex flex-col justify-center items-center py-8 px-7">
              <span className="text-4xl font-bold pr-1">
                <span ref={childRef36} className="pr-1">
                  36
                </span>
                <span className="font-obscura tracking-wider">Hrs</span>
              </span>
              <h2 className="flex items-center justify-center">
                Intense Hackathon
              </h2>
            </div>
          </BorderedContainer>
        </div>
      </div>
      <BorderedContainer>
        <div className="flex justify-center items-center pt-8 px-7 pb-3 max-w-prose">
          NMAM Institute of Technology presents a three-day National Tech Fest
          featuring a 36-hour hackathon, tech conferences, and networking. Our
          vision is to bring together 60 teams from leading Indian engineering
          colleges, fostering innovation. The event spans 50 hours, including a
          36-hour hackathon, providing a platform for participants to showcase
          their skills. The proposal outlines dates, goals, budget, format,
          logistics, and expected outcomes.
        </div>
      </BorderedContainer>

      <div>
        <h1>NMAM Institute of Technology, Nitte</h1>
        <p>Karkala, Udupi District, Karnataka</p>
      </div>
    </section>
  );
};

export default AboutHackfest;
