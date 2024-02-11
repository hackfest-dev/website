"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const lamp = useRef<HTMLDivElement | null>(null);
  const light = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      lamp.current,
      {
        scaleX: 0.65,
      },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: lamp.current,
          toggleActions: "play none none reset",
        },
      }
    );
    gsap.fromTo(
      light.current,
      {
        scale: 0.75,
      },
      {
        scale: 1,
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: light.current,
          toggleActions: "play none none reset",
        },
      }
    );
  }, [lamp, light]);

  return (
    <div
      className={cn(
        "relative flex flex-col w-full z-0 overflow-clip",
        className
      )}
    >
      <div
        ref={light}
        className="absolute z-0 h-36 w-[28rem] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"
      ></div>

      {/* Blue stick */}
      <div className="absolute z-[1] top-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
        <div
          ref={lamp}
          className="h-0.5 w-[75vw] max-w-[30rem] bg-cyan-400"
        ></div>
      </div>

      <div className="relative z-5 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
