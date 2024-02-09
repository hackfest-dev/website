const AboutHackfest = () => {
  return (
    <div
      className={`bg-[url("/images/blue-grainy.png")] bg-cover bg-center h-screen flex gap-10 px-20 flex-col justify-center items-center`}
    >
      <div className="absolute w-full bg-gradien" />
      <h1 className="text-5xl md:text-9xl font-bold text-center font-obscura tracking-wider">
        About Section
      </h1>
      <p className="text-2xl md:text-3xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        explicabo possimus fugiat excepturi officia quas provident animi, nihil
        odit ducimus tempora neque eos ullam ab delectus, a cupiditate nobis
        sunt!
      </p>
    </div>
  );
};

export default AboutHackfest;
