"use client";
import Image from "next/image";
import { SectionHeading } from "../ui/sectionHeading";
import { Button } from "../ui/button";
import Link from "@/src/components/routerEventsWorkAround/customLink";
import { Send } from "lucide-react";

const Sponsors = () => {
  return (
    <>
      <section
        id="sponsors"
        className="min-h-screen py-20 flex flex-col justify-around items-center gap-2 transition-all">
        <SectionHeading
          title="Sponsors"
          classname="text-5xl md:text-6xl xl:text-7xl"
        />

        <div className="flex flex-col w-full xl:flex-row max-w-6xl xl:justify-around justify-center items-center gap-16 xl:gap-4">
          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl h-24 flex justify-center items-center text-center ">
              Powered By
            </h2>
            <Link href="/sponsors">
              <div className="relative aspect-square w-52 md:w-60 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl">
                <Image
                  className="rounded-2xl"
                  src="/logos/sponsors/EGHD.jpg"
                  alt="EGHD"
                  fill={true}
                />
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl h-24 flex justify-center items-center text-center">
              Co-Powered By
            </h2>
            <Link href="/sponsors">
              <div className="relative aspect-square w-52 md:w-60 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl">
                <Image
                  className="rounded-2xl"
                  src="/logos/sponsors/Niveus.jpg"
                  alt="Niveus"
                  fill={true}
                />
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-full xl:w-1/3">
            <h2 className="text-3xl font-semibold xl:text-4xl h-24 flex justify-center items-center text-center">
              Associate Sponsors
            </h2>
            <Link href="/sponsors">
              <div className="relative aspect-square w-52 md:w-60 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl">
                <Image
                  className="rounded-2xl p-6"
                  src="/logos/sponsors/The_Global_Point.png"
                  alt="The_Global_Point"
                  fill={true}
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="relative mt-16 mx-10 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl shadow-[0_0_3px_1px_#b9b7b7ad] flex flex-row justify-center items-center w-full sm:w-[40rem] md:w-[72rem] max-w-[90vw] md:max-w-[90%] gap-10 xl:gap-20 text-center">
          <div className="relative h-52 aspect-square hidden md:flex">
            <Image src="/logos/logo.png" alt="Hackfest_Logo" fill />
          </div>
          <div className="h-40 w-1 bg-white rounded-full hidden md:flex"></div>
          <div className="flex flex-col justify-center items-center gap-5 p-6 xl:p-7 ">
            <p>Any event is incomplete without support and love</p>
            <h3 className="text-3xl font-semibold">
              Interested in sponsoring us?
            </h3>
            <a href="mailto:sponsor@hackfest.dev">
              <Button
                size={"lg"}
                className="text-lg flex items-center gap-2 group">
                Reach Out To Us{" "}
                <Send
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sponsors;
