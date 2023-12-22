import { cardContent } from "../constants/page";
import { motion } from "framer-motion";

const AboutHackfest = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen p-8 transition-all">
       <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">About Hackfest</h1>
       </div>
       <div className="flex flex-col md:flex-row items-center justify-center p-4 h-100 w-full space-x-8">
        <div className="flex flex-col items-center justify-center w-1/3 h-96 space-y-4">
          <div className="border rounded-3xl border-gray-200 p-8 w-full h-1/2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">APRIL</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
          <div className="border rounded-3xl border-gray-200 p-8 w-full h-1/2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">5 Tracks</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam recusandae aliquam facilis accusamus necessitatibus alias enim id ratione pariatur debitis?</p>
          </div>
        </div>
        <div className="flex flex-row border border-gray-200 rounded-3xl space-x-4 p-4">
          <div className="border border-gray-200 rounded-3xl text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4"><h1>Map*</h1></div>
          <div className="flex flex-col space-y-8">
            <h1 className="border border-gray-200 rounded-3xl text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">3 Day Long Tech Fest</h1>
            <h1 className="border border-gray-200 rounded-3xl text-6xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">50<sup className="text-xl">Hrs</sup><span className="text-2xl"> On site Event</span></h1>
            <h1 className="border border-gray-200 rounded-3xl text-6xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4">36<sup className="text-xl">Hrs</sup><span className="text-2xl"> Intense Hackathon</span></h1>
            <div className="border border-gray-200 rounded-3xl text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4"><h1>NMAM Institute of Technology, Nitte</h1>
            <p className="text-2xl text-center">Karkala, Udupi District, Karnataka</p>
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default AboutHackfest;
