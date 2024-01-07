'use client';
import Image from 'next/image';
import HeroForeground from '@/public/images/hero-foreground2.svg';
import HeroBackground from '@/public/images/hero-background.svg';
import HackfestFont from '@/public/images/hackfest-text.png';
import { MouseEvent, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

const HeroParallax = () => {
  const ref = useRef(null);
  const { RiveComponent: Synthwave } = useRive({
    src: `/rive/synthwave2.riv/`,
    // stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.BottomCenter,
    }),
  });

  const { RiveComponent: Hoverboard } = useRive({
    src: `/rive/hoverboard.riv/`,
    // stateMachines: ['state-machine'],
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.BottomCenter,
    }),
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgSpeed = useTransform(scrollYProgress, [0, 1], [-150, 200]);
  const textSpeed = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const fgSpeed = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const swSpeed = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const [x, setX] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    setX(x);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-screen w-screen"
      ref={ref}
    >
      <motion.div
        style={{ y: textSpeed }}
        className="absolute inset-0 z-30 flex justify-center items-center"
      >
        <Image className="w-[800px]" src={HackfestFont} alt="Hackfest Font" />
      </motion.div>

      <motion.div
        style={{ y: fgSpeed }}
        className="h-2/3 -mb-2 mt-2  w-screen "
      >
        <Image
          src={HeroForeground}
          alt="Hero Foreground"
          className="object-cover -z-20  w-full h-full object-bottom "
        />
      </motion.div>

      <motion.div style={{ y: swSpeed }} className="z-30 h-1/3  w-screen ">
        <Synthwave className="z-10 w-full h-full" />
      </motion.div>

      <motion.div style={{ y: bgSpeed }} className="absolute -z-10 inset-0">
        <Image
          src={HeroBackground}
          alt="Hero Background"
          className="h-screen w-screen object-cover object-top"
        />
      </motion.div>

      <div
        className={`z-40 absolute h-[30rem] w-[30rem] bottom-0`}
        style={{ left: x }}
      >
        <Hoverboard className="w-full h-full" />
      </div>
    </div>
  );
};

export default HeroParallax;
