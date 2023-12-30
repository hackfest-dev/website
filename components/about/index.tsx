'use client'
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="flex justify-center w-full">
          <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="lg:text-9xl md:text-8xl text-[#f3bc1f] sm:text-7xl text-5xl font-anton inline-block"
        >
          ABOUT
        </motion.h1>

        <motion.div
          initial={{ opacity: 1, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/60 space-y-6 p-6 rounded-3xl mx-4"
        >
          <div className="flex md:flex-row flex-col justify-between gap-10 items-center ">
            <a href="https://nmamit.nitte.edu.in/" target="_blank">
              <motion.img
                whileTap={{ scale: 0.9 }}
                src="/assets/NMAMITLogo.png"
                alt="NMAMITLogo"
                className="h-12 w-72"
              />
            </a>

            <p className=" max-w-2xl font-roboto font-bold md:text-lg text-sm text-justify">
              Nitte Mahalinga Adyantaya Memorial Institute of Technology
              (NMAMIT), Nitte, established in 1986 and recognized by the All
              India Council for Technical Education, New Delhi, has been a
              constituent college of Nitte University, Mangaluru, since June
              2022. Ranked 175 in the National Institutional Ranking Framework
              (NIRF) 2022 by MHRD, GoI among the engineering colleges in India,
              the College has been placed under the &quot;Platinum&quot;
              category for having high industry linkages by the AICTE-CII Survey
              of Industry-Linked Technical Institutes 2020. For details, visit
              www.nmamit.nitte.edu.in
            </p>
          </div>

          <div className="flex justify-center w-full">
            <hr className="w-[50vw] bg-transparent border-gray-700 border rounded-full " />
          </div>

          <div className="flex md:flex-row flex-col justify-between gap-10 items-center ">
            <a href="https://finiteloop.co.in" target="_blank">
              <motion.img
                whileTap={{ scale: 0.9 }}
                src="/assets/flcLogo.png"
                alt="FLCLogo"
                className="h-24 w-64"
              />
            </a>

            <p className="max-w-2xl font-roboto font-bold md:text-lg text-sm text-justify">
              Finite Loop is a Coding Club, which aims to give a good
              perspective of development, and encourages students to realize
              their ideas. We encourage students to participate in competitive
              programming and thus, inspire the next.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;
