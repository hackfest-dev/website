import { social } from "../constants/page";

const Footer = () => {
  return (
    <>
      <footer className=" relative border-t border-gray-700">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <img
              src="/assets/flc_logo_crop.png"
              width={100}
              height={100}
              alt="flc_logo"
            />
            <a className="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
              Finite Loop Club
            </a>
          </div>

          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-black dark:text-gray-200">
            NMAM Institute of Technology, Nitte, SH1, Karkala, Karnataka,
            KARKALA, NMAMIT 574110, IN
          </p>

          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            {social.map((link, index) => (
              <li key={index}>
                <a
                  href={link.link}
                  className="text-black transition hover:text-gray-200/75 dark:text-gray-100"
                  target="_blank"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
