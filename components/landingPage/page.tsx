const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen relative">
        <div className="flex justify-between lg:px-32 lg:py-12 md:px-20 md:py-10 sm:px-6 sm:py-4 p-4 items-center">
          <img
            src="/assets/flcLogo.png"
            alt="flcLogo"
            className="lg:h-24 md:h-20 lg:w-64 md:w-56 sm:w-42 sm:h-16 w-32 h-12"
          />
          <img
            src="/assets/NMAMITLogo.png"
            alt="flcLogo"
            className="lg:h-16 md:h-12 lg:w-80 md:w-72 sm:h-8 sm:w-48 h-6 w-32"
          />
        </div>

        <div className="flex flex-col justify-center lg:pt-24 md:pt-28 sm:pt-44 pt-60 space-y-6">
          <h1 className="text-center lg:text-6xl md:text-4xl sm:text-3xl text-2xl font-nunito font-bold">
            PROPOSAL FOR
          </h1>
          <div className="relative bg-[url('/assets/textMaterial.jpg')] bg-fixed inline-block bg-center bg-contain font-anton bg-clip-text text-transparent text-center lg:text-[16rem] md:text-[12rem] md:leading-[12rem] sm:text-[10rem] text-[4rem] leading-[4rem] sm:leading-[10rem] lg:leading-[16rem] overflow-hidden">
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
          </div>

          <div
            className={`lg:text-5xl md:text-3xl sm:text-2xl text-xl  font-nunito text-center font-bold`}
          >
            36 HOURS NATIONAL LEVEL HACKATHON
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
