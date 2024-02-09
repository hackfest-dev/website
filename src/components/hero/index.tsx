// import HeroParallax from './HeroParallax';
import dynamic from "next/dynamic";
const HeroParallax = dynamic(() => import("./HeroParallax"), { ssr: false });

const Hero: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full mx-auto flex justify-center items-center overflow-hidden">
      <HeroParallax />
    </main>
  );
};

export default Hero;
