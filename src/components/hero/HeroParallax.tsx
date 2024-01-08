'use client';
import Image from 'next/image';
import HeroForeground from '@/public/images/hero-foreground2.svg';
import HeroBackground from '@/public/images/hero-background.svg';
import HackfestFont from '@/public/images/hackfest-text.png';
import Reflection from '@/public/images/reflection_without_gap.svg';
import HoverBoard from '@/public/images/hoverboard.svg';
import { MouseEvent, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRive, Alignment, Fit, Layout } from '@rive-app/react-canvas';

const HeroParallax = () => {
  const ref = useRef(null);

  const { RiveComponent: Hoverboard } = useRive({
    src: `/rive/hoverboard.riv/`,
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

  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.5,
    damping: 25,
    stiffness: 150,
  });

  const textSpeed = useTransform(smoothScroll, [0, 1], [-300, 300]);
  const fgSpeed = useTransform(smoothScroll, [0, 1], [-150, 150]);

  const textScale = useTransform(smoothScroll, [0, 1], [1.5, 0.5]);

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
        style={{ y: textSpeed, scale: textScale }}
        className="absolute inset-0 z-10 flex justify-center items-center"
      >
        <Image className={`w-[800px]`} src={HackfestFont} alt="Hackfest Font" />
      </motion.div>

      <motion.div
        style={{ y: fgSpeed }}
        className="-z-20 h-2/3 -mb-2 mt-2 w-screen relative"
      >
        <Image
          src={HeroForeground}
          alt="Hero Foreground"
          className="object-cover w-full h-full object-bottom"
        />

        {/* <Image
                            src={Reflection}
                            alt="Reflection"
                            className="object-cover w-full mx-auto object-bottom"
                            /> */}
      </motion.div>

      <motion.div
        className="absolute bottom-[0%] w-screen h-[46%] overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '200px',
          y: fgSpeed,
        }}
      >
        <div className='border-tertiary-400 bg-[url("/images/grid-sm.svg"),linear-gradient(0deg,#060e3c_30%,#00c6af)] md:bg-[url("/images/grid1.svg"),linear-gradient(0deg,#060e3c_30%,#00c6af)] border-t-2 motion-safe:animate-move flex justify-center items-start rotate-x-45 w-[200%] h-[100%] left-[-50%] relative bg-repeat bg-center'></div>
      </motion.div>

      <div className="absolute -z-30 inset-0">
        <Image
          src={HeroBackground}
          alt="Hero Background"
          className="h-screen w-screen object-cover object-top"
        />
      </div>

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
