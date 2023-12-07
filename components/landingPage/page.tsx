import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen relative">
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between lg:px-32 lg:py-12 md:px-20 md:py-10 sm:px-6 sm:py-4 p-4 items-center"
        >
          <img
            src="/assets/flcLogo.png"
            alt="flcLogo"
            className="lg:h-24 md:h-20 lg:w-64 md:w-56 sm:w-42 sm:h-16 w-32 h-12"
          />
          <img
            src="/assets/NMAMITLogo.png"
            alt="flcLogo"
            className="lg:h-16 md:h-12 lg:w-96 md:w-72 sm:h-8 sm:w-48 h-6 w-32"
          />
        </motion.div>

        <div className="flex flex-col justify-center lg:pt-36 md:pt-44 sm:pt-64 pt-80 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[url('/assets/textMaterial.jpg')]  inline-block bg-center bg-contain font-anton bg-clip-text text-transparent text-center lg:text-[16rem] md:text-[12rem] md:leading-[12rem] sm:text-[10rem] text-[4rem] leading-[4rem] sm:leading-[10rem] lg:leading-[16rem] overflow-hidden"
          >
            HACKFEST
            <span className="flex absolute top-0 left-1/4 animate-pulse">
              <img
                src="/assets/star.png"
                className="md:w-12 md:h-12 w-6 h-6 rotate-45 "
                alt=""
              />
            </span>
            <span className="flex absolute bottom-0 left-1/2 animate-pulse">
              <img
                src="/assets/star.png"
                className="md:w-12 md:h-12 w-6 h-6 rotate-45 "
                alt=""
              />
            </span>
            <span className="flex absolute top-0 left-2/3 animate-pulse">
              <img
                src="/assets/star.png"
                className="md:w-12 md:h-12 w-6 h-6 rotate-45 "
                alt=""
              />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex w-full justify-center `}
          >
            <h3
              className={`lg:text-5xl md:text-3xl sm:text-2xl text-xl  font-nunito text-center font-bold inline-block bg-[url('/assets/rockMaterial.png')]`}
            >
              36 HOURS NATIONAL LEVEL HACKATHON
            </h3>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
