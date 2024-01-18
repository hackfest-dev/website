'use client';
import Image from 'next/image';
import Confetti from 'react-dom-confetti';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Lamp,LampContainer } from './lamp2';
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
    spread: 300,
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
    // <LampContainer>
    <>
      <motion.div className="  w-full z-15 flex flex-col items-center justify-center rounded-md py-20 bg-slate-950 overflow-clip"
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      >
        <div className="flex flex-col items-center justify-center py-4 z-50">
          
            <h1 className="text-5xl font-bold">Prize Pool</h1>
            <Image
              src="/images/airship.png"
              width={180}
              height={180}
              alt="UFO"
              className="flex justify-center items-center fly-up-down ease-in-out drop-shadow-xl z-50"
              onClick={() => ConfettiExplosion()}
            />
         

          <Confetti active={show} config={config} />

        </div>

        {/* Card Components */}

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 md:space-x-4" ref={ref}>
      <div className="w-72 h-72 shadow-xl bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800 rounded-lg z-10 md:translate-x-5 flex flex-col justify-center items-center order-3 md:order-none">
        <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center ">
                <span className="text-white font-bold text-4xl">₹30000</span>
              </p>
              <p className="font-normal text-sm text-slate-500 mb-4 z-50 text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
        
      </div>
      <div className="w-72 h-72 md:w-80 md:h-80 shadow-xl  bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800 rounded-lg z-20 md:relative flex flex-col justify-center items-center order-1 md:order-none">
        <h1 className="font-bold text-3xl text-white mb-4 relative z-50 text-center ">
                Winner
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center  ">
                <span className="text-white font-bold text-4xl md:text-5xl">₹50000</span>
              </p>
              <p className="font-normal text-base text-slate-500 mb-4 z-50 text-center  ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
      </div>
      <div className="w-72 h-72 shadow-xl bg-gradient-to-r from-base-800 via-base-700 to-base-800 border border-gray-800 rounded-lg z-10 md:-translate-x-5 flex flex-col justify-center items-center order-2 md:order-none">
        <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                Second Runner Up
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4  z-50 text-center ">
                <span className="text-white font-bold text-4xl">₹20000</span>
              </p>
              <p className="font-normal text-sm text-slate-500 mb-4 z-50 text-center ">
                Goodies + Swags + Certificates + Internship Opportunities
              </p>
      </div>
    </div>



        {/* <Lamp /> */}
      </motion.div>
        <LampContainer>
          <motion.h1
        initial={{ opacity: 0.5, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-[25rem] bg-gradient-to-br from-slate-200 to-slate-500 py-4 bg-clip-text text-center text-7xl font-semibold tracking-tight text-transparent md:text-7xl"
      >
        ₹50K 
      </motion.h1>
      <h1 className='font-medium text-base text-white text-center py-4'>For the best project in each of the 5 tracks* will be awarded with a cash prize of 10K</h1>
      <p className='font-normal text-xs text-slate-500 text-center mt-4'>* Out of 6 tracks except Open Innovation are eligible for this special prize of 10k.</p>
      <></>
      </LampContainer>
        </>
    // </LampContainer>
  );
};

export default PrizePool;
