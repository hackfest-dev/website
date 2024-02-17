"use client";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import Image from "next/image";
import Link from "next/link";

type Event = {
  day: number;
  title: string;
  time: string;
};

const Timeline = ({ events }: { events: Event[] }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#timeline",
          scrub: 0.2,
          start: "top top",
          end: "+=10000",
        },
      })
      .to("#disc", {
        rotation: -360 * 7,
        duration: 2,
        ease: "none",
      });
  }, [selectedDay]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["50% end", "end end"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.5,
    damping: 25,
    stiffness: 150,
  });
  const divisions = selectedDay === 1 ? 16 : 14;
  ``;
  const angle = useTransform(
    smoothScroll,
    [0, 1],
    ["0deg", `-${360 - 360 / divisions}deg`]
  );

  return (
    <>
      {/* Main div which spans entire scroll area for the animation */}
      <div
        className="h-[200vh] pointer-events-none"
        id="timeline"
        ref={ref}
        style={{ zIndex: 2, scrollBehavior: "smooth" }}
      >
        {/* Div which is sticky and spans the height of the viewport */}
        <div className="h-screen sticky top-0 flex overflow-x-clip">
          {/* Wheel container */}
          <div className="absolute right-full top-1/2 w-[150vw] h-[150vw] min-w-[36rem] min-h-[36rem] max-w-7xl max-h-[80rem] translate-x-1/2 -translate-y-1/2 overflow-hidden flex justify-center items-center">
            {/* Wheel */}
            <div
              className="relative origin-center  rounded-full w-full h-full"
              id="disc"
            >
              <Image
                src={"/images/realVinyl.png"}
                fill
                alt="CD"
                className="object-center object-cover"
              />
              {/* Event */}
              {events.map((event, index) => {
                if (event.day === selectedDay)
                  return (
                    <Event
                      key={index}
                      event={event}
                      position={{ angle: (4 * Math.PI) / divisions, index }}
                    />
                  );
              })}
            </div>
          </div>

          <div className="absolute left-full top-1/2 w-[150vw] h-[150vw] min-w-[36rem] min-h-[36rem] max-w-7xl max-h-[80rem] 2xl:-translate-x-[90%]  xl:-translate-x-[85%] lg:-translate-x-[75%] md:-translate-x-[63%] -translate-x-[59%] -translate-y-1/2 overflow-hidden flex justify-center items-center">
            {/* Wheel */}
            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="lg:text-8xl text-7xl font-obscura lg:block hidden">
                Day{" "}
                <span className="font-sans font-extrabold">{selectedDay}</span>
              </h1>
              <span className="flex gap-5 lg:flex-row flex-col ">
                {[1, 2, 3].map((day) => {
                  return (
                    <Link href="/#timeline" key={day}>
                      <button
                        className={`relative w-32 h-32 flex items-center justify-center pointer-events-auto ${day === selectedDay ? "scale-125" : "hover:scale-110 "} duration-300`}
                        // className="bg-gradient-to-br from-[#008080] via-black to-[#008080] backdrop-blur-xl border-2 border-[#008080] pointer-events-auto text-2xl rounded-xl w-16 h-16"
                        onClick={() => setSelectedDay(day)}
                      >
                        <Image
                          src="/images/realVinyl.png"
                          alt="disc"
                          width={100}
                          height={100}
                        />
                        <span className=" absolute text-3xl text-black brightness-200 font-bold">
                          {day}
                        </span>
                      </button>
                    </Link>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;

const Event = ({
  event,
  position,
}: {
  event: Event;
  position: { angle: number; index: number };
}) => {
  return (
    <>
      {/* Event title - in the direction Normal to the boundary of wheel */}
      <div
        className="absolute origin-center max-w-[20%] text-white md:text-3xl text-lg font-bold flex flex-col"
        style={{
          top: `${50 + 25 * Math.sin(position.index * position.angle)}%`,
          left: `${50 + 25 * Math.cos(position.index * position.angle)}%`,
          transform: `translate(-50%, -50%) rotate(${
            position.angle * position.index
          }rad)`,
        }}
      >
        <span>{event.title}</span>
        <span>{event.time}</span>
      </div>
    </>
  );
};
