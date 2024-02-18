"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { RouteChangeCustomEvent } from "@/src/components/routerEventsWorkAround/customLink";
import { usePathname } from "next/navigation";

const Loader: FunctionComponent<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const parentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);

  const openDoorCalled = useRef<boolean>(false);
  const canOpenDoor = useRef<boolean>(false);

  const closeDoor = () => {
    if (parentRef.current) parentRef.current.style.backgroundColor = "#000000";
    const tl = gsap.timeline({
      onComplete: rotateDoor,
    });

    tl.to(
      leftDoorRef.current,
      {
        keyframes: {
          "100": { left: 0 },
        },
        duration: 1,
      },
      0
    );

    tl.to(
      rightDoorRef.current,
      {
        keyframes: {
          "100": { right: 0 },
        },
        duration: 1,
      },
      0
    );
  };

  const rotateDoor = () => {
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        parentRef.current?.dispatchEvent(new Event("doorRotated"));
      },
    });

    tl.to(
      loaderRef.current,
      {
        rotate: 90,
      },
      0
    );
  };

  const openDoor = () => {
    if (parentRef.current)
      parentRef.current.style.backgroundColor = "#ffffff00";
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: loaderPostProcess,
    });

    tl.to(
      leftDoorRef.current,
      { left: -window.innerHeight / 2, duration: 1 },
      0
    );

    tl.to(
      rightDoorRef.current,
      { right: -window.innerHeight / 2, duration: 1 },
      0
    );
  };

  const loaderPostProcess = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (parentRef.current) parentRef.current.style.pointerEvents = "none";
        canOpenDoor.current = false;
        openDoorCalled.current = false;
      },
    });

    tl.to(
      leftDoorRef.current,
      { left: -(leftDoorRef.current?.clientWidth || 0), duration: 0 },
      0
    );

    tl.to(
      rightDoorRef.current,
      { right: -(rightDoorRef.current?.clientWidth || 0), duration: 0 },
      0
    );

    tl.to(
      loaderRef.current,
      {
        rotate: 0,
        duration: 0,
        delay: 0.1,
      },
      0
    );
  };

  const handleRouteChangeStart = (e: RouteChangeCustomEvent) => {
    if (pathname !== e.detail.href) {
      if (parentRef.current) parentRef.current.style.pointerEvents = "all";
      closeDoor();
    }
  };

  const handleDoorRotated = () => {
    canOpenDoor.current = true;
    if (openDoorCalled.current) openDoor();
  };

  const handleRouteChangeComplete = () => {
    openDoorCalled.current = true;
    if (canOpenDoor.current) openDoor();
  };

  useGSAP(() => {
    if (parentRef.current) parentRef.current.style.pointerEvents = "none";
    if (loaderRef.current) {
      loaderRef.current.style.height = `${
        2 * Math.max(window.innerHeight, window.innerWidth)
      }px`;
      loaderRef.current.style.width = `${
        2 * Math.max(window.innerHeight, window.innerWidth)
      }px`;
    }

    parentRef.current?.addEventListener("doorRotated", handleDoorRotated);

    window.addEventListener(
      "routeChangeStart",
      handleRouteChangeStart as EventListener
    );

    window.addEventListener("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      parentRef.current?.removeEventListener("doorRotated", handleDoorRotated);

      window.removeEventListener(
        "routeChangeStart",
        handleRouteChangeStart as EventListener
      );

      window.removeEventListener(
        "routeChangeComplete",
        handleRouteChangeComplete
      );
    };
  });

  return (
    <div
      ref={parentRef}
      className={`absolute left-0 top-0 z-[9999] ${className}`}>
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          ref={loaderRef}
          className="absolute flex flex-row top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <div className="relative h-full w-2/4">
            <div
              ref={leftDoorRef}
              className="absolute h-full w-full -left-full bg-gray-500"></div>
          </div>
          <div className="relative h-full w-2/4">
            <div
              ref={rightDoorRef}
              className="absolute h-full w-full -right-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
