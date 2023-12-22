"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Event = {
  title: string;
  time: string;
};

const Timeline = ({ events }: { events: Event[] }) => {
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
  const divisions = events.length;
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
        ref={ref}
        style={{ zIndex: 2 }}
      >
        {/* Div which is sticky and spans the height of the viewport */}
        <div className="h-screen sticky top-0">
          {/* Wheel container */}
          <div className="absolute right-full top-1/2 w-[150vw] h-[150vw] min-w-[36rem] min-h-[36rem] max-w-7xl max-h-[80rem] translate-x-1/2 -translate-y-1/2 overflow-hidden flex justify-center items-center">
            {/* Wheel */}
            <motion.div
              style={{
                rotateZ: angle,
              }}
              className="relative origin-center bg-black rounded-full w-full h-full"
            >
              <Image
                src={"/cd.png"}
                fill
                alt="CD"
                className="object-center object-cover"
              />
              {/* Event */}
              {events.map((event, index) => {
                return (
                  <Event
                    key={index}
                    event={event}
                    position={{ angle: (2 * Math.PI) / divisions, index }}
                  />
                );
              })}
            </motion.div>
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
        className="absolute origin-center max-w-[23%]"
        style={{
          top: `${50 + 35 * Math.sin(position.index * position.angle)}%`,
          left: `${50 + 35 * Math.cos(position.index * position.angle)}%`,
          transform: `translate(-50%, -50%) rotate(${
            position.angle * position.index
          }rad)`,
        }}
      >
        {event.title}
      </div>
    </>
  );
};
