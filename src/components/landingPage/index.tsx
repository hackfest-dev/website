import { motion } from 'framer-motion';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col justify-center md:h-[60dvh] h-[80dvh] space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[url('/images/textMaterial.jpg')] md:bg-fixed inline-block bg-center bg-contain font-anton bg-clip-text text-transparent text-center lg:text-[16rem] md:text-[12rem] md:leading-[12rem] sm:text-[10rem] text-[4rem] leading-[4rem] sm:leading-[10rem] lg:leading-[16rem] overflow-hidden"
          >
            HACKFEST
            <span className="flex absolute top-0 left-1/4 animate-pulse">
              <Image
                src="/images/star.png"
                width={12}
                height={12}
                className="md:w-12 md:h-12 w-6 h-6 rotate-45 "
                alt=""
              />
            </span>
            <span className="flex absolute bottom-0 left-1/2 animate-pulse">
              <Image
                width={12}
                height={12}
                src="/images/star.png"
                className="md:w-12 md:h-12 w-6 h-6 rotate-45 "
                alt=""
              />
            </span>
            <span className="flex absolute top-0 left-2/3 animate-pulse">
              <Image
                width={12}
                height={12}
                src="/images/star.png"
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
              className={`lg:text-5xl md:text-3xl sm:text-2xl text-xl text-center font-bold inline-block bg-[url('/images/rockMaterial.png')]`}
            >
              36 HOURS NATIONAL LEVEL HACKATHON
            </h3>
            <button
              onClick={() => {
                fetch('/api/payments/makePayment', { method: 'POST' });
              }}
            >
              Test
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
