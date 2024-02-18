import { Button } from '@/src/components/ui/button';
import { SectionHeading } from '@/src/components/ui/sectionHeading';
import React from 'react';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { Send } from 'lucide-react';

const Sponsors = () => {
  return (
    <div
      className="bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933]"
      style={{
        background:
          "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
      }}
    >
      <div className="w-full h-full min-h-screen pt-20 sm:pt-20 md:pt-24 xl:pt-28 sm:pb-6 md:pb-10 xl:pb-20 pb-8 flex flex-col justify-around items-center gap-y-4 transition-all">
        <SectionHeading
          title="SPONSORS"
          classname="text-5xl md:text-6xl xl:text-7xl mt-6"
        />

        <div className="flex flex-col w-full max-w-6xl xl:justify-around justify-center items-center md:gap-16 gap-4 xl:gap-4 px-4">
          <div
            className={`w-full sm:w-[40rem] md:w-[72rem] md:max-w-full p-6 md:p-7 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl mt-3 flex flex-col md:flex-row gap-16 justify-between items-center text-white`}
          >
            <div className="relative aspect-square w-2/3 mt-8 md:mt-0 md:w-80">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad] bg-white rounded-full"
                src="/logos/sponsors/EGHD.jpg"
                alt="EGHD"
                fill={true}
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
              <div className="flex flex-col justify-between items-center gap-2">
                <h2 className="text-3xl text-center">EGDK INDIA PVT. LTD</h2>
                <h3 className="text-xl text-center text-white/70">
                  Diamond Sponsor
                </h3>
              </div>
              <p className=" text-slate-300 text-sm md:text-base text-justify">
                EG is a Nordic vertical software company. A product-based
                company where we develop, deliver and service our own software
                for more than 30,000 customers in the private and public
                sectors. We are headquartered in Denmark. EG is 44 years old in
                the market and globally we are 2200+ employees and 30000+
                clients. EG has more than 100+ products in the Nordic region. We
                have our customers in the Nordic region and delivery centre in
                India, Poland, Iceland, Denmark, Sweden, Finland, and Norway. In
                India we are 180+ as of now and looking forward to building a
                team of 300+ employees in the coming year. In Mangalore we are
                in Bejai, Kapikad Ajanta Business centre.
              </p>
              <a href="https://global.eg.dk/" target="_blank" rel="noreferrer">
                <Button className="w-max gap-3" size={'lg'}>
                  <span>Visit Website</span>
                  <FiExternalLink />
                </Button>
              </a>
            </div>
          </div>

          <div
            className={`w-full sm:w-[40rem] md:w-[72rem] md:max-w-full p-6 md:p-7 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl mt-3 flex flex-col md:flex-row-reverse gap-16 justify-between items-center text-white`}
          >
            <div className="relative aspect-square w-2/3 mt-8 md:mt-0 md:w-80">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad] bg-white rounded-full"
                src="/logos/sponsors/Niveus.jpg"
                alt="Niveus"
                fill={true}
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
              <div className="flex flex-col justify-between items-center gap-2">
                <h2 className="text-3xl text-center">
                  Niveus Solutions Pvt. Ltd
                </h2>
                <h3 className="text-xl text-center text-white/70">
                  Platinum Sponsor
                </h3>
              </div>
              <p className="text-justify text-slate-300 text-sm md:text-base">
                Niveus Solutions Pvt. Ltd. is a cloud-born engineering services
                organization founded in 2013. The organization progressed
                rapidly over the years, with the company making a strategic
                decision in 2019 to exclusively partner with Google Cloud India
                and scaling up to be its &apos;Premier&apos; partner in less
                than 2 years. The company empowers enterprises to harness the
                power of cloud services and build resilient infrastructures that
                scale. Niveus recently won the 2023 Google Cloud &apos;Services
                Partner of the Year - Asia Pacific&apos; and &apos;Expansion
                Partner of the Year - Asia Pacific&apos; awards. Niveus
                specializes in application, infrastructure, data modernization,
                data management, cloud consulting, security, and managed
                services.
              </p>
              <a
                href="https://niveussolutions.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-max gap-3" size={'lg'}>
                  <span>Visit Website</span>
                  <FiExternalLink />
                </Button>
              </a>
            </div>
          </div>

          <div
            className={`w-full sm:w-[40rem] md:w-[72rem] md:max-w-full p-6 md:p-7 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl mt-3 flex flex-col md:flex-row gap-16 justify-between items-center text-white`}
          >
            <div className="relative aspect-square w-2/3 mt-8 md:mt-0 md:w-80">
              <Image
                className="shadow-[0_0_3px_1px_#b9b7b7ad] bg-white rounded-full"
                src="/logos/sponsors/The_Global_Point.png"
                alt="The_Global_Point"
                fill={true}
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
              <div className="flex flex-col justify-between items-center gap-2">
                <h2 className="text-3xl text-center">The Global Point</h2>
                <h3 className="text-xl text-center text-white/70">
                  Gold Sponsor
                </h3>
              </div>
              <p className="text-justify text-slate-300 text-sm md:text-base">
                The Global Point Overseas Study With Loan, situated at
                Hampankatta, Mangalore, Karnataka is an overseas educational
                consultant organization devoted towards providing good services
                to the students. We spread our services throughout the
                continents. We welcome you to study in Canada, Australia, UK,
                USA, Europe, and many more. Our job service is planned for
                students who wish to study and settle abroad. We market the
                profiles of our students to various universities in which he/she
                wants to study.
              </p>
              <a
                href="http://www.theglobalpoint.in/"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-max gap-3" size={'lg'}>
                  <span>Visit Website</span>
                  <FiExternalLink />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-10 bg-gradient-to-br from-teal-700/50 via-teal-300/50 to-teal-700/50 backdrop-blur-2xl border-2 border-teal-600 rounded-2xl shadow-[0_0_3px_1px_#b9b7b7ad] flex flex-row justify-center items-center w-full sm:w-[40rem] md:w-[72rem] max-w-[90vw] md:max-w-[90%] gap-10 xl:gap-20 mt-4 md:mt-8">
          <div className="relative h-52 aspect-square hidden md:flex">
            <Image src="/logos/logo.png" alt="Hackfest_Logo" fill />
          </div>
          <div className="h-40 w-1 bg-white rounded-full hidden md:flex"></div>
          <div className="flex flex-col justify-center items-center gap-5 p-6 xl:p-7 text-center">
            <p>Any event is incomplete without support and love</p>
            <h3 className="text-3xl font-semibold">
              Interested in sponsoring us?
            </h3>
            <a href="mailto:sponsor@hackfest.dev">
              <Button
                size={'lg'}
                className="text-lg flex items-center gap-2 group"
              >
                Reach Out To Us{' '}
                <Send
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
