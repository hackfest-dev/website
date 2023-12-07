import { motion } from "framer-motion";
const AlertBanner = () => {
  return (
    <>
      <motion.div className="absolute w-full">
        <h3 className="md:text-2xl sm:text-xl text-lg font-nunito text-center font-bold bg-[#f3bc1f]/50 md:py-1">
          Dates to be announced soon!
        </h3>
      </motion.div>
    </>
  );
};

export default AlertBanner;
