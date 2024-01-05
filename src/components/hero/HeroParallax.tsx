'use client';
import Image from 'next/image';
import HeroForeground from '@/public/images/hero-foreground.svg';
import HeroBackground from '@/public/images/hero-background.svg';
import HeroHoverboard from '@/public/images/hero-hoverboard.svg';
import HackfestFont from '@/public/images/hackfest-text.png';
import { MouseEvent, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

const HeroParallax = () => {
  const ref = useRef(null);
  const { RiveComponent: Synthwave } = useRive({
    src: `/rive/synthwave.riv/`,
    // stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });

  const { RiveComponent: Hoverboard } = useRive({
    src: `/rive/hoverboard.riv/`,
    // stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.BottomCenter,
    }),
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-150, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // const [x, setX] = useState(0);

  // const handleMouseMove = (e: MouseEvent) => {
  //   const x = e.clientX;
  //   setX(x === 0 ? 750 : x);
  // };

  return (
    <div ref={ref}>
      <Synthwave className="w-screen h-screen" />
      <Image
        src={HeroBackground}
        alt="Hero Background"
        className="h-full w-full absolute inset-0"
      />
      <Image
        src={HeroForeground}
        alt="Hero Foreground"
        className="h-full w-full absolute inset-0 mt-5"
      />
      <motion.div
        // style={{ y: y2 }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <Image className="w-[800px]" src={HackfestFont} alt="Hackfest Font" />
      </motion.div>
      {/* <div className="absolute inset-0 h-full w-full flex justify-center items-center">
        <Hoverboard className="h-[300px] w-[300px]" />
      </div> */}
    </div>
  );
};

export default HeroParallax;
