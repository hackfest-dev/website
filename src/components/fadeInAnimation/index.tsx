"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: JSX.Element;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        delay: delay,
        duration: 0.5,
        scrollTrigger: {
          trigger: ref.current,
          toggleActions: "restart none none reset",
        },
      }
    );
  }, [ref]);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
