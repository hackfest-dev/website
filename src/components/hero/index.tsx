import CubeGrid from './CubeGrid';

const Hero: React.FC = () => {
  return (
    <main className="min-h-screen w-full mx-auto flex justify-center items-center overflow-hidden">
      <CubeGrid />
      <div className="max-w-7xl px-5 sm:px-7 lg:px-10">
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-black drop-shadow-2xl tracking-widest uppercase">
          Hackfest
        </h1>
      </div>
    </main>
  );
};

export default Hero;
