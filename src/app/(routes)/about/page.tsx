import Image from "next/image";
export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#060e3c] to-[#06133f]">
      <div className=" flex flex-col md:gap-16 gap-y-2 w-[80vw] mx-auto pt-[10rem]">
        <span className="text-base md:text-lg xl:text-xl text-secondary-100">
          <div className="flex md:flex-row flex-col justify-between items-center gap-8">
            <Image
              src={`/logos/NMAMITLogo.png`}
              alt="image"
              loading="lazy"
              className="object-contain h-full object-center top-0 md:w-1/3 w-3/4"
              height={500}
              width={500}
            />
            <div className="max-w-3xl text-justify">
              Nitte Mahalinga Adyantaya Memorial Institute of Technology
              (NMAMIT), Nitte, established in 1986 and recognized by the All
              India Council for Technical Education, New Delhi, has been a
              constituent college of Nitte University, Mangaluru, since June
              2022. Ranked 175 in the National Institutional Ranking Framework
              (NIRF) 2022 by MHRD, GoI among the engineering colleges in India,
              the College has been placed under the &apos;Platinum&apos;
              category for having high industry linkages by the AICTE-CII Survey
              of Industry-Linked Technical Institutes 2020. For details, visit{" "}
              <a
                href="https://nmamit.nitte.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                www.nmamit.nitte.edu.in
              </a>
            </div>
          </div>
        </span>

        <span className="text-base md:text-lg xl:text-xl text-secondary-100">
          <div className="flex md:flex-row flex-col justify-between items-center gap-8">
            <Image
              src={`/logos/flcLogo.png`}
              alt="image"
              loading="lazy"
              className="object-contain md:h-[32rem] h-[15rem] object-center top-0 md:w-1/3 w-3/4"
              height={400}
              width={400}
            />
            <div className="max-w-3xl text-justify">
              Finite Loop Club (FLC) is the premier coding club at NMAMIT,
              dedicated to realising and inspiring ideas. FLC provides
              opportunities to work with the latest trending tech stacks, access
              workshops, secure internships, engage in peer-to-peer learning,
              attend guest lectures by renowned experts, and collaborate on
              real-time projects. Our coding contests enhance analytical and
              problem-solving skills.
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
