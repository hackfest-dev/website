import { cardContent } from "../constants/page";
import { motion } from "framer-motion";

const AboutHackfest = () => {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen mx-4 transition-all ">
        <div className="flex justify-center w-full">
          <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
        </div>
        <motion.section
          className="text-center space-y-4 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-anton inline-block">
            WHAT IS <span className="text-[#f3bc1f]">HACKFEST</span>?
          </h1>
          <h3 className="lg:text-3xl md:text-2xl sm:text-xl font-nunito font-bold">
            3 Day Long Fun-Filled Technical Fest at NMAMIT, Nitte!
          </h3>
        </motion.section>

        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-10 gap-8 lg:mx-20 md:mx-12 mx-6 justify-center py-12">
          {cardContent.map((card, index) => (
            <motion.div
              initial={{ rotateY: 180, opacity: 0, x: -500 }}
              animate={{ rotateY: 180, opacity: 1, x: 0 }}
              whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              style={{ transformStyle: "preserve-3d" }}
              key={index}
              className="bg-[#f1f1f1] rounded-3xl px-8 pt-8 pb-12 flex flex-col text-black text-center space-y-6"
            >
              <img src={card.img} alt={"cardImage"} />
              <div className="space-y-4">
                <h1 className="lg:text-4xl md:text-3xl text-2xl font-anton">
                  {card.header}
                </h1>
                <p className="lg:text-2xl md:text-xl text-lg font-nunito">
                  {card.content}
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
};

export default AboutHackfest;
