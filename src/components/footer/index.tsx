import Image from "next/image";
import { social } from "../../constants";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col bottom-0 w-full px-4 h-full border-t border-gray-700 bg-gradient-to-b from-slate-900 to-slate-950  backdrop-blur-md">
        <div className="flex flex-col lg:flex-row h-full items-center justify-evenly space-y-12 p-4 py-8">
          <div className="flex flex-col  items-center gap-8">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-row justify-center items-center gap-2">
                <Image
                  src="/logos/logo.png"
                  priority
                  alt="Logo - Hackfest"
                  width={95}
                  height={50}
                />
                <Link href="https://www.finiteloop.co.in/" target="_blank">
                  <Image
                    src="/logos/flc_logo_crop.png"
                    priority
                    alt="Logo - Finite Loop Club"
                    width={75}
                    height={50}
                  />
                </Link>
              </div>
              <Link href="https://nmamit.nitte.edu.in/" target="_blank">
                <Image
                  src="/logos/NMAMITLogo.png"
                  priority
                  alt="Logo - NMAMIT"
                  width={180}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex flex-row items-center  gap-4 md:gap-4">
              <p className="text-base font-normal">Connect with us:</p>
              <ul className="flex  gap-4 md:gap-4">
                {social.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.link}
                      className="transition hover:text-gray-200/75 text-gray-100 text-2xl"
                      target="_blank"
                    >
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.6730533394866!2d74.93141407492217!3d13.183002587152156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb56415ad85e5b%3A0x10b77ac6f6afc7fa!2sN.M.A.M.%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1705002903689!5m2!1sen!2sin"
                  width="200"
                  height="150"
                  style={{ border: 0 }}
                  className="rounded-lg"
                  aria-hidden="false"
                ></iframe>
              </div>
              <div className="flex flex-col text-center gap-2">
                <h1 className="">NMAM Institute of Technology, Nitte</h1>
                <p className="">Karkala, Udupi District, Karnataka</p>
              </div>
            </div>
            <p className="text-base font-normal text-center">
              Interested to sponsor? Let us know{" "}
              <Link href="mailto:sponsor@hackfest.dev" className="underline">
                sponsor@hackfest.dev
              </Link>
            </p>
          </div>
        </div>
        <div className="font-normal text-center border-t-[0.5px] border-gray-800 py-5 w-full">
          <p>2024 &copy; Hackfest | All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
