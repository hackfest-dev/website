import Image from "next/image";
import Link from "@/src/components/routerEventsWorkAround/customLink";
import AuthButtons from "./authButton";
import { navLinks } from "@/src/constants";
import { MobileNavbar } from "./mobileNavbar";

const Navbar = () => {
  return (
    <div className="flex justify-center mx-3">
      <nav className="border border-white/30 px-5 max-w-6xl w-full fixed rounded-full  mt-3 sm:mt-5 z-[60] bg-white/5 bg-clip-padding backdrop-blur-lg backdrop-filter">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href={"/"}
            className="flex items-center gap-3 font-semibold text-white">
            <div className="lg:w-30 lg:h-30">
              <Image
                className="w-auto "
                src="/logos/logo.png"
                priority
                alt="Logo - Hackfest"
                width={50}
                height={50}
              />
            </div>
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <Link
                  href={link.url}
                  className={`text-white hover:text-gray-300`}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden  lg:flex">
            <AuthButtons />
          </div>
        </div>
      </nav>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
