import { cardContent } from "../constants/page";
import { motion } from "framer-motion";

const AboutHackfest = () => {
  return (
    <>
      <div className="grid grid-cols-1 min-h-screen p-12 transition-all">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">About Hackfest</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="grid grid-rows-2 gap-8 w-2/3">
            <div className="border border-gray-300 rounded-3xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">APRIL</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="border border-gray-300 rounded-3xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">5 Tracks</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam recusandae aliquam facilis accusamus necessitatibus alias enim id ratione pariatur debitis?</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border border-gray-200 rounded-3xl p-4">
            <div className="border border-gray-200 rounded-3xl text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4"><h1>Map*</h1></div>
            <div className="grid grid-cols-1 gap-4">
              <h1 className="border border-gray-200 rounded-3xl text-2xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">3 Day Long Tech Fest</h1>
              <h1 className="border border-gray-200 rounded-3xl text-5xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">50<sup className="text-xl">Hrs</sup><span className="text-2xl">  On site Event</span></h1>
              <h1 className="border border-gray-200 rounded-3xl text-5xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">36<sup className="text-xl">Hrs</sup><span className="text-xl"> Intense Hackathon</span></h1>
              <div className="border border-gray-200 rounded-3xl text-xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">
                <h1>NMAM Institute of Technology, Nitte</h1>
                <p className="text-xl text-center">Karkala, Udupi District, Karnataka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHackfest;
