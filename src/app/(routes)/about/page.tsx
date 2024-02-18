import Image from 'next/image';
import { SectionHeading } from '@/src/components/ui/sectionHeading';
import FadeIn from '@/src/components/fadeInAnimation';
import { Button } from '@/src/components/ui/button';
import { FiExternalLink } from 'react-icons/fi';
export default function About() {
  return (
    <div
      className="bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933]"
      style={{
        background:
          "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
      }}
    >
      <div className=" flex flex-col md:gap-8 gap-y-6 w-[80vw] mx-auto pt-20 sm:pt-20 md:pt-24 xl:pt-28">
        <div className="flex w-full justify-center items-center">
          <SectionHeading
            title="ABOUT US"
            classname="text-5xl md:text-6xl xl:text-7xl mt-3"
          />
        </div>
        <span className="text-xs md:text-base xl:text-lg bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl md:px-10 px-6  py-6 text-white">
          <div className="flex md:flex-row flex-col justify-between items-center gap-8">
            <Image
              src={`/logos/NMAMITLogo.png`}
              alt="image"
              loading="lazy"
              className="object-contain h-full object-center top-0 md:w-1/3 w-5/6"
              height={600}
              width={600}
            />
            <div className="max-w-3xl text-justify flex flex-col items-center justify-between gap-5">
              <p>
                Nitte Mahalinga Adyantaya Memorial Institute of Technology
                (NMAMIT), Nitte, established in 1986 and recognized by the All
                India Council for Technical Education, New Delhi, has been a
                constituent college of Nitte University, Mangaluru, since June
                2022. Ranked 175 in the National Institutional Ranking Framework
                (NIRF) 2022 by MHRD, GoI among the engineering colleges in
                India, the College has been placed under the
                &apos;Platinum&apos; category for having high industry linkages
                by the AICTE-CII Survey of Industry-Linked Technical Institutes
                2020.
              </p>
              <a
                href="https://nmamit.nitte.edu.in/"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-max gap-3" size={'sm'}>
                  <span>Visit Website</span>
                  <FiExternalLink />
                </Button>
              </a>
            </div>
          </div>
        </span>

        <span className="text-xs md:text-base xl:text-lg bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl md:px-10 px-6  py-6 text-white">
          <div className="flex md:flex-row flex-col justify-between items-center gap-8">
            <Image
              src={`/logos/flcLogo.png`}
              alt="image"
              loading="lazy"
              className="object-contain h-full object-center top-0 md:w-1/3 w-5/6"
              height={400}
              width={400}
            />
            <div className="max-w-3xl text-justify flex flex-col items-center justify-between gap-5">
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
                <Button className="w-max gap-3" size={'sm'}>
                  <span>Visit Website</span>
                  <FiExternalLink />
                </Button>
              </a>
            </div>
          </div>
        </span>

        <span className="flex flex-col gap-8 md:pb-24 pb-12">
          <div className="flex w-full justify-center items-center">
            <SectionHeading title="SUPPORTING BODIES" classname="text-5xl md:text-6xl xl:text-7xl" />
          </div>

          <div className=" flex justify-center items-center w-full">
            <span className="flex md:flex-row flex-col items-center justify-center md:gap-8 gap-4 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl md:px-10 px-6  py-6">
              <Image
                src="/logos/csi-logo.png"
                alt="Logo: CSI"
                width={200}
                height={300}
              />

              <h3 className=" xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-center flex flex-col space-y-4">
                <span>Computer Society of India</span>
                <span className="xl:text-4xl lg:text-3xl md:text-2xl text-xl text-center flex flex-col">
                  NMAMIT Branch
                </span>
              </h3>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
