'use client';
import React, { useEffect, useRef } from 'react';
import NeonGrid from './neonGrid';

const Hero: React.FC = () => {
  const container = useRef(null);
  const stickyMask = useRef<HTMLDivElement>(null);

  const initialMaskSize = 0.8;
  const targetMaskSize = 30;

  useEffect(() => {
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    if (stickyMask.current && stickyMask.current instanceof HTMLDivElement) {
      stickyMask.current.style.maskSize =
        (initialMaskSize + maskSizeProgress) * 100 + '%';
    }
    requestAnimationFrame(animate);
  };

  const getScrollProgress = () => {
    let scrollProgress = 0;
    if (stickyMask.current && container.current)
      scrollProgress =
        stickyMask.current.offsetTop /
        ((container.current as HTMLDivElement).getBoundingClientRect().height -
          window.innerHeight);
    return scrollProgress;
  };

  return (
    <main className="">
      <div ref={container} className="relative h-[100vh]">
        <div className="absolute h-full w-full">
          <NeonGrid />
        </div>
        {/* <div
          ref={stickyMask}
          className="flex sticky overflow-hidden top-0 h-screen justify-center z-10 pointer-events-none"
          style={{
            maskImage: "url('/mask.svg')",
            maskPosition: "center center",
            maskRepeat: "no-repeat",
            maskSize: "80%",
          }}
        >
          <div className="h-full w-full bg-gray-600"></div>
        </div> */}
      </div>
    </main>
  );
};

export default Hero;
