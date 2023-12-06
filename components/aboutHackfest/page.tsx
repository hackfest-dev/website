import { cardContent } from "../constants/page";

const AboutHackfest = () => {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen mx-4">
        <section className="text-center space-y-4">
          <h1 className="lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-anton">
            WHAT IS <span className="text-[#f3bc1f]">HACKFEST</span>?
          </h1>
          <h3 className="lg:text-3xl md:text-2xl sm:text-xl font-nunito font-bold">
            3 Day Long Fun-Filled Technical Fest at NMAMIT, Nitte!
          </h3>
        </section>

        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-10 gap-8 lg:mx-20 md:mx-12 mx-6 justify-center py-12">
          {cardContent.map((card, index) => (
            <div
              key={index}
              className="bg-[#f1f1f1] rounded-3xl px-8 pt-8 pb-16 flex flex-col text-black text-center space-y-6"
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
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default AboutHackfest;
