'use client';
import Image from 'next/image';
import HeroForeground from '@/public/images/hero-foreground.svg';
import HeroBackground from '@/public/images/hero-background.svg';
import HeroHoverboard from '@/public/images/hero-hoverboard.svg';
import HackfestFont from '@/public/images/hackfest-text.png';
import { MouseEvent, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const HeroParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-150, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [style, setStyle] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    setStyle(x === 0 ? 750 : x);
  };

  return (
    <div ref={ref}>
      <motion.div
        style={{
          y: y,
        }}
        className="absolute inset-0 translate-y-0"
      >
        <Image
          src={HeroBackground}
          alt="Hero Background"
          className="h-full w-full"
        />
      </motion.div>
      <motion.div className="absolute inset-0">
        <Image
          className="w-full h-full"
          src={HeroForeground}
          alt="Hero Foreground"
        />
      </motion.div>
      {/* <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex justify-center items-center flex-col px-5 sm:px-7 lg:px-10"
      >
        <h1 className="text-9xl font-black text-shadow shadow-black tracking-widest uppercase">
          Hackfest
        </h1>
        <p className="text-3xl font-bold text-left text-shadow shadow-black">
          Hack the Time Stream!
        </p>
      </motion.div> */}

      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <Image className="w-[800px]" src={HackfestFont} alt="Hackfest Font" />
      </motion.div>

      <motion.div
        style={
          {
            // x: style - 750,
          }
        }
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setStyle(0)}
      >
        <Image
          className={`w-full h-full`}
          src={HeroHoverboard}
          alt="Hero Hoverboard"
        />
      </motion.div>
    </div>
  );
};

export default HeroParallax;
