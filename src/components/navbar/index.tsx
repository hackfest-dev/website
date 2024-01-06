import Link from 'next/link';
import Image from 'next/image';
import { MobileNavbar } from './mobileNavbar';
import { RequestButton } from './request';

const links = [
  { url: '#', label: 'Home' },
  { url: '#', label: 'About' },
  { url: '#', label: 'Tracks' },
  { url: '#', label: 'Timeline' },
  { url: '#', label: 'Sponsors' },
  { url: '#', label: 'Prizes' },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-base-600 via-base-800 to-base-600 text-white backdrop-blur-lg bg-opacity-60">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          <Link href="/">
            <Image
              src="/logos/logo.png"
              alt="logo"
              width={72}
              height={72}
              className="select-none drop-shadow-lg"
            />
          </Link>
          <div className="hidden md:flex space-x-7 font-medium text-base cursor-pointer">
            {links.map(({ url, label }) => (
              <Link href={url} key={label}>
                {label}
              </Link>
            ))}
          </div>
          <div className="">
            <RequestButton />
          </div>
        </div>
        <MobileNavbar links={links} />
        {/* {menu && <MobileNavbar />} */}
      </div>
    </nav>
  );
};

export default Navbar;

// const MobileNavbar = () => {
//     return (
//       <div className="flex flex-col space-y-4 md:hidden text-right px-4 pb-4">
//         {links.map(({ url, label }) => (
//           <Link href={url} key={label} className="text-white hover:text-gray-300">
//             {label}
//           </Link>
//         ))}

//       </div>
//     );
//   }
