import { motion } from "framer-motion";
import { SectionHeading } from "../ui/sectionHeading/page";
import { SponsorsTile } from "./sponsorTile";

const Sponsors = () => {
  return (
    <>
      <section className="flex flex-col justify-center transition-all">
        <div className="flex justify-center w-full">
          <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
        </div>
        <motion.section
          className="text-center gap-20 flex flex-col items-center justify-center p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
            <SectionHeading title="Sponsors"></SectionHeading>
            {/* <Tilt className="w-[80%] min-w-[280px]" tiltAxis='y' tiltMaxAngleY={5} gyroscope={true}>
                <div className={`w-full h-16 flex justify-around relative items-center from-secondary-600 to-secondary-400 bg-gradient-to-t rounded-sm 
                before:content-[''] before:absolute before:-z-10 before:left-[calc(-2rem/1.414)] before:rounded-sm before:top-[9px] before:h-[calc(4rem/1.414)] before:w-[calc(4rem/1.414)] before:from-secondary-600 before:to-secondary-400 before:bg-gradient-to-tl before:rotate-45
                after:content-[''] after:absolute after:-z-10 after:left-[calc(+100%-2rem/1.414)] after:rounded-sm after:top-[9px] after:h-[2.82rem] after:w-[2.82rem] after:from-secondary-600 after:to-secondary-400 after:bg-gradient-to-tl after:rotate-45`}
                >
                    <Image src={"/assets/bd.svg"} alt="" width={24} height={24}></Image>
                    <Image src={"/assets/bd.svg"} alt="" width={32} height={32}></Image>
                    <Image src={"/assets/bd.svg"} alt="" width={40} height={40}></Image>
                    <Image src={"/assets/mockcompany.png"} alt="" width={108} height={24} className="rounded-sm border border-tertiary-400"></Image>
                    <Image src={"/assets/bd.svg"} alt="" width={40} height={40}></Image>
                    <Image src={"/assets/bd.svg"} alt="" width={32} height={32}></Image>
                    <Image src={"/assets/bd.svg"} alt="" width={24} height={24}></Image>
                </div>
            </Tilt> */}
            <div className="flex gap-20 flex-col">
                <div className="flex flex-wrap gap-10 justify-center">
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="diamond"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="diamond"></SponsorsTile>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="platinum"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="platinum"></SponsorsTile>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="gold"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="gold"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="gold"></SponsorsTile>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="silver"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="silver"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="silver"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="silver"></SponsorsTile>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="bronze"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="bronze"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="bronze"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="bronze"></SponsorsTile>
                    <SponsorsTile src="/assets/mockcompany.png" alt="mockcompany" backcolor="bronze"></SponsorsTile>
                </div>
            </div>
        </motion.section>
      </section>
    </>
  );
};

export default Sponsors;
