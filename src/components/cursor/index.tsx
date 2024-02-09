"use client";
import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const spotLightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (spotLightRef.current) {
      spotLightRef.current.style.left = `${e.clientX}px`;
      spotLightRef.current.style.top = `${e.clientY}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      ref={spotLightRef}
      className="fixed pointer-events-none w-32 h-32 bg-white z-50 -translate-x-2/4 -translate-y-2/4 rounded-full"
      style={{ mixBlendMode: "difference", pointerEvents: "none" }}></div>
  );
};

export default Cursor;
