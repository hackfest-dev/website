import Image from "next/image";

const Speakers = () => {
  return (
    <div className="bg-slate-900 h-screen p-12 w-full">
      <h1 className="text-6xl font-bold text-white">Talks and Speakers</h1>
      <div className="">
        <div className="flex flex-row justify-center items-center border-2 border-gray-700 rounded-2xl p-4 max-w-6xl mx-auto bg-gradient-to-tl from-primary to-slate-950 shadow-xl shadow-gray-950">
          <div className="border-2 bg-slate-950 border-gray-500 rounded-2xl -translate-y-8">
            <Image
              className="p-2 -translate-y-10"
              src="/images/happyman.png"
              priority
              alt="Logo - Speaker"
              width={180}
              height={100}
            />
          </div>
          <div className="flex flex-col justify-center w-full gap-4">
            <p className="text-3xl font-medium text-center">Topic Name goes here hahaha yeah should be long</p>
            <div className="flex flex-row justify-evenly items-center">
              <h2 className="border-2 border-gray-500 rounded-lg text-lg font-medium p-1">Speaker Name</h2>
              <h2 className="border-2 border-gray-500 rounded-lg text-lg font-medium p-1">Designation & Company Name</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
