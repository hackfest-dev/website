import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import RootLayout from "~/components/layout";
import { Button } from "~/components/ui/button";
import { SectionHeading } from "~/components/ui/sectionHeading";
export default function About() {
  return (
    <RootLayout>
      <div
        className="bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933]"
        style={{
          background:
            "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
        }}
      >
        <div className=" mx-auto flex w-[80vw] flex-col gap-y-6 pt-20 sm:pt-20 md:gap-8 md:pt-24 xl:pt-28">
          <div className="flex w-full items-center justify-center">
            <SectionHeading
              title="ABOUT US"
              classname="text-5xl md:text-6xl xl:text-7xl mt-3"
            />
          </div>
          <span className="rounded-2xl border-2 border-teal-600 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 px-6 py-6 text-xs text-white backdrop-blur-2xl md:px-10  md:text-base xl:text-lg">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <Image
                src={`/logos/NMAMITLogo.png`}
                alt="image"
                loading="lazy"
                className="top-0 h-full w-5/6 object-contain object-center md:w-1/3"
                height={600}
                width={600}
              />
              <div className="flex max-w-3xl flex-col items-center justify-between gap-5 text-justify">
                <p>
                  Nitte Mahalinga Adyantaya Memorial Institute of Technology
                  (NMAMIT), Nitte, established in 1986 and recognized by the All
                  India Council for Technical Education, New Delhi, has been a
                  constituent college of Nitte University, Mangaluru, since June
                  2022. Ranked 175 in the National Institutional Ranking
                  Framework (NIRF) 2022 by MHRD, GoI among the engineering
                  colleges in India, the College has been placed under the
                  &apos;Platinum&apos; category for having high industry
                  linkages by the AICTE-CII Survey of Industry-Linked Technical
                  Institutes 2020.
                </p>
                <a
                  href="https://nmamit.nitte.edu.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-max gap-3" size={"sm"}>
                    <span>Visit Website</span>
                    <FiExternalLink />
                  </Button>
                </a>
              </div>
            </div>
          </span>

          <span className="rounded-2xl border-2 border-teal-600 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 px-6 py-6 text-xs text-white backdrop-blur-2xl md:px-10  md:text-base xl:text-lg">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <Image
                src={`/logos/flcLogo.png`}
                alt="image"
                loading="lazy"
                className="top-0 h-full w-5/6 object-contain object-center md:w-1/3"
                height={400}
                width={400}
              />
              <div className="flex max-w-3xl flex-col items-center justify-between gap-5 text-justify">
                <p>
                  Finite Loop Club (FLC) is the premier coding club at NMAMIT,
                  dedicated to realising and inspiring ideas. FLC provides
                  opportunities to work with the latest trending tech stacks,
                  access workshops, secure internships, engage in peer-to-peer
                  learning, attend guest lectures by renowned experts, and
                  collaborate on real-time projects. Our coding contests enhance
                  analytical and problem-solving skills.
                </p>
                <a
                  href="https://www.finiteloop.co.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-max gap-3" size={"sm"}>
                    <span>Visit Website</span>
                    <FiExternalLink />
                  </Button>
                </a>
              </div>
            </div>
          </span>

          <span className="flex flex-col gap-8 pb-12 md:pb-24">
            <div className="flex w-full items-center justify-center">
              <SectionHeading
                title="SUPPORTING BODIES"
                classname="text-5xl md:text-6xl xl:text-7xl"
              />
            </div>

            <div className=" flex w-full items-center justify-center">
              <span className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-teal-600 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 px-6 py-6 backdrop-blur-2xl md:flex-row md:gap-8  md:px-10">
                <Image
                  src="/logos/csi-logo.png"
                  alt="Logo: CSI"
                  width={200}
                  height={300}
                />

                <h3 className=" flex flex-col space-y-4 text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  <span>Computer Society of India</span>
                  <span className="flex flex-col text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    NMAMIT Branch
                  </span>
                </h3>
              </span>
            </div>
          </span>
        </div>
      </div>
    </RootLayout>
  );
}
