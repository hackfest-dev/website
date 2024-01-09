'use client';
import Image from 'next/image';
import Confetti from 'react-dom-confetti';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Lamp,LampContainer } from './lamp';
import {motion} from 'framer-motion';
const PrizePool = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      ConfettiExplosion();
    }
  }, [isInView]);
  const config = {
    angle: 290,
    spread: 360,
    startVelocity: 40,
    elementCount: 50,
    dragFriction: 0.11,
    duration: 3020,
    stagger: 3,
    width: '8px',
    height: '14px',
    perspective: '503px',
    colors: [
      '#f00',
      '#0f0',
      '#00f',
      '#FFC700',
      '#FF0000',
      '#2E3191',
      '#41BBC7',
    ],
  };

  const [show, setShow] = useState(false);
  //   useEffect(() => {
  //     const ConfettiExplosion = () => {
  //       setShow(true);
  //       setTimeout(() => setShow(false), 1000);
  //     };
  //   }, []);

  const ConfettiExplosion = () => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  };

  return (
    <LampContainer>
      <motion.div className="min-h-screen relative w-full  flex flex-col items-center justify-center rounded-md py-20  "
      initial={{ opacity: 0.5, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      >
        <div className="w-full absolute inset-0 ">
        </div>
        <div className="flex flex-col  items-center p-12 space-y-16">
          <div>
            <h1 className="text-5xl font-bold">Prize Pool</h1>
            <Image
              src="/images/airship.png"
              width={250}
              height={200}
              alt="UFO"
              className="fly-up-down ease-in-out drop-shadow-xl z-50"
              onClick={() => ConfettiExplosion()}
            />
          </div>
          <Confetti active={show} config={config} />
        </div>

        <div
          className="flex flex-row justify-between items-center space-x-16 max-w-5xl"
          ref={ref}
        >
          {/* Iterate cards */}
          <div className="relative">
            {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-90 bg-red-500 rounded-full blur-3xl" /> */}
            <div className="relative shadow-xl bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-white mb-4 relative z-50">
                Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center ">
                <span className="text-white font-bold text-4xl">₹30000</span>
              </p>
              <p className="font-normal text-base text-slate-500 mb-4 z-50 text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </div>
          <div className="relative">
            {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-90 bg-red-500 rounded-full blur-3xl" /> */}
            <div className="relative shadow-xl bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800  px-4 py-12 h-full overflow-hidden rounded-2xl flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-white mb-4 relative z-50">
                Winner
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center ">
                <span className="text-white font-bold text-4xl">₹50000</span>
              </p>
              <p className="font-normal text-base text-slate-500 mb-4 z-50 text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </div>
          <div className="relative">
            {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-90 bg-red-500 rounded-full blur-3xl" /> */}
            <div className="relative shadow-xl bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-white mb-4 relative z-50">
                2nd Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center ">
                <span className="text-white font-bold text-4xl">₹20000</span>
              </p>
              <p className="font-normal text-base text-slate-500 mb-4 z-50 text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
            </div>
          </div>
        </div>
        {/* <Lamp /> */}
      </motion.div>
    </LampContainer>
  );
};

export default PrizePool;
