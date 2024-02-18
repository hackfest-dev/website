import ContactCard from "@/src/components/contact";
import { SectionHeading } from "@/src/components/ui/sectionHeading";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

const contacts = [
  {
    name: "Dr. Shashank Shetty",
    designation: "Faculty Coordinator",
    email: "shashankshetty@nitte.edu.in",
    ph: "8197903771",
  },
  {
    name: "Mr. Puneeth R P",
    designation: "Faculty Coordinator",
    email: "Puneeth.rp@nitte.edu.in",
    ph: "9036366204",
  },

  {
    name: "Nagaraj Pandith",
    designation: "Organizer",
    email: "4nm20cs115@nmamit.in",
    ph: "9740689836",
  },

  {
    name: "Swasthik Shetty",
    designation: "Organizer",
    email: "4nm20cs195@nmamit.in",
    ph: "6364172219",
  },

  {
    name: "Prathama S J",
    designation: "Organizer",
    email: "4nm21cs115@nmamit.in",
    ph: "7411709904",
  },
];

export default function Contact() {
  return (
    <main
      style={{
        background:
          "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
      }}
      className="max-w-screen-2xl flex justify-start flex-col items-center min-h-screen mx-auto pt-20 sm:pt-20 md:pt-24 xl:pt-28 p-2 sm:p-6 md:p-10 xl:p-20 pb-8"
    >
      <SectionHeading title="CONTACT US" classname="text-5xl md:text-6xl xl:text-7xl mt-3 mb-5" />
      <div className="flex flex-col md:gap-10 gap-5 justify-center items-center">
        <div className="flex md:gap-8 gap-3 flex-wrap justify-center items-center w-full">
          {contacts.map((contact, idx) => {
            return (
              <div key={idx} className="max-w-xs md:max-w-sm w-full">
                <ContactCard {...contact} />
              </div>
            );
          })}
        </div>
        <div className="items-center justify-center flex flex-col max-w-sm md:max-w-xl w-full gap-2 md:gap-4">
          <div className=" w-full flex flex-col gap-1 text-sm md:text-base xl:text-lg bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl text-white px-5 py-2">
            <p>
              <span className="font-semibold">General queries: </span>
              <a href="mailto:admin@hackfest.dev">admin@hackfest.dev</a>
            </p>
          </div>
          <div className=" w-full flex flex-col gap-1 text-sm md:text-base xl:text-lg bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl text-white px-5 py-2">
            <p>
              <span className="font-semibold">Tech support: </span>
              <a href="mailto:tech@hackfest.dev">tech@hackfest.dev</a>
            </p>
          </div>
          <div className=" w-full flex flex-col gap-1 text-sm md:text-base xl:text-lg bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl text-white px-5 py-2">
            <p>
              <span className="font-semibold">Interested in sponsoring: </span>
              <a href="mailto:sponsor@hackfest.dev">sponsor@hackfest.dev</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
