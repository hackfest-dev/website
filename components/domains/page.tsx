import { domains } from "../constants/page";
import { motion } from "framer-motion";
import { FaQuestion } from "react-icons/fa6";

const Domains = () => {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen mx-4 transition-all">
        <div className="flex justify-center w-full">
          <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
        </div>
        <motion.section
          className="text-center space-y-4 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.h1
            whileHover={{
              textShadow: "0px 0px 8px rgb(243, 188, 31)",
            }}
            transition={{
              duration: 0.3,
            }}
            className="lg:text-9xl md:text-8xl text-[#f3bc1f] sm:text-7xl text-5xl font-anton inline-block"
          >
            DOMAINS
          </motion.h1>
        </motion.section>
        <section className="flex flex-wrap lg:gap-12 md:gap-10 gap-8 lg:mx-20 md:mx-12 mx-6 justify-center py-12">
          {domains.map((domain, index) => (
            <motion.div
              initial={{ rotateY: 180, opacity: 0, x: -500 }}
              animate={{ rotateY: 180, opacity: 1, x: 0 }}
              whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              style={{ transformStyle: "preserve-3d" }}
              key={index}
              className="bg-[#f1f1f1] rounded-3xl px-8 pt-8 pb-12 flex justify-center items-center text-black text-center space-y-6 md:h-[30rem] h-[15rem] md:w-[15rem] w-[10rem]"
            >
              <FaQuestion size={75} />
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Domains;
