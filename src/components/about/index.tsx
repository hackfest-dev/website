import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex w-full justify-center">
          <hr className="mb-16 w-[90vw] rounded-full border border-gray-700 bg-transparent   " />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-anton inline-block text-5xl text-[#f3bc1f] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          ABOUT
        </motion.h1>

        <motion.div
          initial={{ opacity: 1, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-4 space-y-6 rounded-3xl bg-black/60 p-6"
        >
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row ">
            <a href="https://nmamit.nitte.edu.in/" target="_blank">
              <motion.img
                whileTap={{ scale: 0.9 }}
                src="/logos/NMAMITLogo.png"
                alt="NMAMITLogo"
                className="h-12 w-72"
              />
            </a>

            <p className=" font-roboto max-w-2xl text-justify text-sm font-bold md:text-lg">
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

          <div className="flex w-full justify-center">
            <hr className="w-[50vw] rounded-full border border-gray-700 bg-transparent " />
          </div>

          <div className="flex flex-col items-center justify-between gap-10 md:flex-row ">
            <a href="https://finiteloop.co.in" target="_blank">
              <motion.img
                whileTap={{ scale: 0.9 }}
                src="/logos/flcLogo.png"
                alt="FLCLogo"
                className="h-24 w-64"
              />
            </a>

            <p className="font-roboto max-w-2xl text-justify text-sm font-bold md:text-lg">
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
