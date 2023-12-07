import { motion } from "framer-motion";
const Sponsors = () => {
  return (
    <>
      <div className="flex flex-col justify-center mx-4 transition-all ">
        <div className="flex justify-center w-full">
          <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
        </div>
        <motion.section
          className="text-center space-y-4 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-anton inline-block">
            Interested in sponsoring{" "}
            <span className="text-[#f3bc1f]">HACKFEST</span>?
          </h1>
          <h3 className="lg:text-4xl md:text-3xl sm:text-2xl font-nunito font-bold">
            Contact us at{" "}
            <span className="text-[#f3bc1f] underline underline-offset-8">
              <a href="mailto:sponsor@hackfest.dev">sponsor@hackfest.dev</a>
            </span>{" "}
            Let&apos;s make it happen!
          </h3>
        </motion.section>
      </div>
    </>
  );
};

export default Sponsors;
