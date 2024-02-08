'use client';
import Image from 'next/image';
import HeroForeground from '@/public/images/hero-foreground2.svg';
import HeroBackground from '@/public/images/hero-background.svg';
import HackfestFont from '@/public/images/hackfest-text.png';
import Reflection from '@/public/images/reflection_without_gap.svg';
import HoverBoard from '@/public/images/hoverboard.svg';
import { MouseEvent, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { getRelativeCoordinates } from '../../lib/utils/getRelativeCoordinates';
import { useParallax } from '@/src/app/hooks/useParallax';

const HeroParallax = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    mass: 0.5,
    damping: 25,
    stiffness: 150,
  });

  const textSpeed = useParallax(smoothScroll, 300);
  const fgSpeed = useParallax(smoothScroll, 150);

  const textScale = useTransform(smoothScroll, [0, 1], [1.5, 0.5]);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    centerX: 0,
  });

  const boxRef = useRef(null);

  const handleMouseMove = (e: MouseEvent) => {
    // @ts-ignore
    const relativeCoordinates = getRelativeCoordinates(e, boxRef.current);

    const limitedX = Math.max(-200, Math.min(200, relativeCoordinates.x - 600));

    setMousePosition({
      x: limitedX,
      centerX: relativeCoordinates.centerX,
    });
  };

  return (
    <div className="relative h-screen w-screen" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ y: textSpeed, scale: textScale }}
        className="absolute inset-0 z-10 flex justify-center items-center"
      >
        <Image className={`w-[800px]`} src={HackfestFont} alt="Hackfest Font" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          // y: fgSpeed,
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

      <motion.div
        ref={boxRef}
        style={{ perspective: 600 }}
        onMouseMove={(e) => handleMouseMove(e)}
        animate={{
          rotateX: mousePosition.centerX * 20,
        }}
        className={`z-40 absolute inset-0 flex justify-center items-end`}
      >
        <motion.div
          animate={{
            x: mousePosition.x,
          }}
          transition={{ type: 'tween' }}
        >
          <Image
            width={200}
            height={200}
            src={HoverBoard}
            alt="Hover Board"
            className="fly-up-down ease-in-out"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180 z-50">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block md:h-auto h-[150px] w-[calc(100% + 1.3px)]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-900"
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroParallax;
