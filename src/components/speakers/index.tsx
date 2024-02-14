import Image from "next/image";
import { SectionHeading } from "../ui/sectionHeading";

const speakerData = [
  {
    topic: "Topic Name goes here hahaha yeah should be long",
    speakerName: "Speaker Name",
    designation: "Designation & Company Name",
  },
  {
    topic: "Topic Name goes here hahaha yeah should be long",
    speakerName: "Speaker Name",
    designation: "Designation & Company Name",
  },
];

const Speakers = () => {
  return (
    <div className="bg-slate-900 h-full p-12 w-full">
      <SectionHeading title="Talks and Speakers" />
      <div className="mt-16">
        {speakerData.map((data, index) => {
          return (
            <div
              className="flex flex-col md:flex-row justify-center items-center mt-16 md:mt-12 border-gray-700 rounded-2xl p-4 max-w-6xl mx-auto bg-gradient-to-tl from-primary to-slate-950 shadow-xl shadow-gray-950"
              key={index}
            >
              <div className=" bg-slate-900 border-gray-500 rounded-2xl -translate-y-8  shadow-2xl shadow-gray-950">
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
                <p className="text-3xl font-medium text-center">{data.topic}</p>
                <div className="flex flex-col md:flex-row justify-between md:justify-evenly items-center gap-4">
                  <h2 className="border-2 w-full md:w-1/3 border-gray-500 rounded-lg text-lg font-medium p-1">
                    {data.speakerName}
                  </h2>
                  <h2 className="border-2 w-full md:w-1/3 border-gray-500 rounded-lg text-lg font-medium p-1">
                    {data.designation}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Speakers;
