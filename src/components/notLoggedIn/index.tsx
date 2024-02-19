'use client';
import Image from 'next/image';
import SignInButton from './signInButton';
import { usePathname } from 'next/navigation';

const NotLoggedIn = () => {
  const pathname = usePathname();
  return (
    <div
      className={`px-5 py-40 md:p-40 bg-[url("/images/blue-grainy.png")] bg-cover bg-center relative overflow-hidden min-h-screen flex justify-center items-center`}
    >
      <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black/20"></div>

      {pathname === '/register' ? (
        <>
          <div className="z-10 bg-black/50 py-10 px-5 flex justify-center items-center flex-col border border-white/20 w-full rounded-3xl">
            <div className="text-center flex justify-center flex-col">
              <div className="relative w-full h-full group flex justify-center items-center">
                <Image
                  src="/logos/logo.png"
                  alt="Hackfest_Logo"
                  width={180}
                  height={180}
                />
                <div className="group-hover:brightness-125 transition-all duration-300 absolute h-full -z-10 w-full bg-gradient-radial from-yellow-300/50 via-transparent to-transparent blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                Hey there! 👋🏻
              </h1>
              <p className="mt-4 text-gray-300 mb-5 text-md">
                Please sign in and you are all set to Register. Happy Coding.
              </p>
              <SignInButton />
            </div>
          </div>
        </>
      ) : (
        <div className="z-10 bg-black/50 py-10 px-5 flex justify-center items-center flex-col border border-white/20 w-full rounded-3xl">
          <div className="text-center flex justify-center flex-col">
            <h1 className="text-7xl md:text-9xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Oops!
            </h1>

            <p className="mt-4 text-gray-300 mb-5 text-sm md:text-md">
              You need to be logged in to view this page
            </p>

            <SignInButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotLoggedIn;
