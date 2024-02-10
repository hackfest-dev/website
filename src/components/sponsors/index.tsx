"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/sectionHeading";
import { SponsorsTile } from "./sponsorTile";
import SponsorTile from "./sponsorsTile";
import Cursor from "../cursor";
import { useRef } from "react";
import Image from "next/image";

const Sponsors = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  if (1 === 1)
    return (
      <section
        id="sponsor"
        className="flex flex-col justify-center items-center transition-all bg-black">
        <style jsx>{`
          #sponsor-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-template-rows: repeat(8, minmax(0, 1fr));
            grid-template-areas:
              "al-1 hr-1 hr-1"
              "sq-1 sq-1 al-2"
              "sq-1 sq-1 al-3"
              "al-4 al-5 vr-1"
              "hr-2 hr-2 vr-1"
              "al-6 sq-2 sq-2"
              "vr-2 sq-2 sq-2"
              "vr-2 al-7 al-8";
          }

          @media (min-width: 768px) {
            #sponsor-grid {
              grid-template-columns: repeat(6, minmax(0, 1fr));
              grid-template-rows: repeat(4, minmax(0, 1fr));
              grid-template-areas:
                "al-1 sq-1 sq-1 hr-1 hr-1 vr-1"
                "al-2 sq-1 sq-1 al-3 al-4 vr-1"
                "vr-2 al-5 al-6 sq-2 sq-2 al-7"
                "vr-2 hr-2 hr-2 sq-2 sq-2 al-8";
            }
          }
        `}</style>
        <div
          id="sponsor-grid"
          className="grid gap-2 w-full md:w-5/6 py-28 px-0">
          <SponsorTile noHoverEffect tileNumber={1} cellType="bronze">
            <div className="relative h-full w-full">
              <Image
                src="/logos/logo.png"
                alt="HF"
                fill={true}
                className="object-contain"
              />
            </div>
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="bronze"
            src="/images/images (1).jpeg">
            2
          </SponsorTile>
          <SponsorTile noHoverEffect tileNumber={3} cellType="bronze">
            <Cursor />
          </SponsorTile>
          <SponsorTile
            tileNumber={4}
            cellType="bronze"
            src="/images/images (1).jpeg">
            4
          </SponsorTile>
          <SponsorTile noHoverEffect tileNumber={5} cellType="bronze">
            <Cursor />
          </SponsorTile>
          <SponsorTile
            tileNumber={6}
            cellType="bronze"
            src="/images/images (1).jpeg">
            6
          </SponsorTile>
          <SponsorTile
            tileNumber={7}
            cellType="bronze"
            src="/images/images (1).jpeg">
            7
          </SponsorTile>
          <SponsorTile
            noHoverEffect
            tileNumber={8}
            cellType="bronze"
            src="/logos/flc_logo_crop.png"
            srcClassName="object-contain">
            8
          </SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="silver"
            src="/images/images (1).jpeg">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="silver"
            src="/images/images (1).jpeg">
            2
          </SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="gold"
            src="/images/images (1).jpeg">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="gold"
            src="/images/images (1).jpeg">
            2
          </SponsorTile>
          <SponsorTile
            tileNumber={1}
            cellType="diamond"
            src="/images/images (1).jpeg">
            1
          </SponsorTile>
          <SponsorTile
            tileNumber={2}
            cellType="diamond"
            src="/images/images (1).jpeg">
            2
          </SponsorTile>
        </div>
      </section>
    );
  else
    return (
      <>
        <section className="flex flex-col justify-center transition-all">
          <div className="flex justify-center w-full">
            <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full" />
          </div>
          <motion.section
            className="text-center gap-20 flex flex-col items-center justify-center p-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}>
            <SectionHeading title="Sponsors"></SectionHeading>
            {/* <Tilt className="w-[80%] min-w-[280px]" tiltAxis='y' tiltMaxAngleY={5} gyroscope={true}>
                <div className={`w-full h-16 flex justify-around relative items-center from-supporting-600 to-supporting-400 bg-gradient-to-t rounded-sm
                before:content-[''] before:absolute before:-z-10 before:left-[calc(-2rem/1.414)] before:rounded-sm before:top-[9px] before:h-[calc(4rem/1.414)] before:w-[calc(4rem/1.414)] before:from-supporting-600 before:to-supporting-400 before:bg-gradient-to-tl before:rotate-45
                after:content-[''] after:absolute after:-z-10 after:left-[calc(+100%-2rem/1.414)] after:rounded-sm after:top-[9px] after:h-[2.82rem] after:w-[2.82rem] after:from-supporting-600 after:to-supporting-400 after:bg-gradient-to-tl after:rotate-45`}
                >
                    <Image src={"/images/bd.svg"} alt="" width={24} height={24}></Image>
                    <Image src={"/images/bd.svg"} alt="" width={32} height={32}></Image>
                    <Image src={"/images/bd.svg"} alt="" width={40} height={40}></Image>
                    <Image src={"/images/mockcompany.png"} alt="" width={108} height={24} className="rounded-sm border border-tertiary-400"></Image>
                    <Image src={"/images/bd.svg"} alt="" width={40} height={40}></Image>
                    <Image src={"/images/bd.svg"} alt="" width={32} height={32}></Image>
                    <Image src={"/images/bd.svg"} alt="" width={24} height={24}></Image>
                </div>
            </Tilt> */}
            <div className="flex gap-20 flex-col">
              <div className="flex flex-wrap gap-10 justify-center">
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="diamond"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="diamond"></SponsorsTile>
              </div>
              <div className="flex flex-wrap gap-10 justify-center">
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="platinum"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="platinum"></SponsorsTile>
              </div>
              <div className="flex flex-wrap gap-10 justify-center">
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="gold"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="gold"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="gold"></SponsorsTile>
              </div>
              <div className="flex flex-wrap gap-10 justify-center">
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="silver"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="silver"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="silver"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="silver"></SponsorsTile>
              </div>
              <div className="flex flex-wrap gap-10 justify-center">
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="bronze"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="bronze"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="bronze"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="bronze"></SponsorsTile>
                <SponsorsTile
                  src="/logos/mockcompany.png"
                  alt="mockcompany"
                  backcolor="bronze"></SponsorsTile>
              </div>
            </div>
          </motion.section>
        </section>
      </>
    );
};

export default Sponsors;
