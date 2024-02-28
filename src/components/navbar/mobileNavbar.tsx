'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthButtons from './authButton';
import { navLinks } from '@/src/constants';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed right-5 top-6 flex items-center space-x-4 lg:hidden z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="inline-flex items-center justify-center rounded-full p-2 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300/20"
        >
          {isOpen ? (
            <IoMdClose className="h-6 w-6" />
          ) : (
            <HiOutlineMenuAlt3 className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`flex w-full justify-center fixed top-20 mt-1 transition-transform duration-200 ${
          isOpen ? 'z-[60] translate-y-0' : '-translate-y-[30rem] z-0'
        } px-2 lg:hidden`}
      >
        <div
          className={`mt-2 z-[60] py-5 rounded-xl w-full space-y-3 border hover:border-white/40 border-white/30 bg-white/5 bg-clip-padding backdrop-blur-lg backdrop-filter lg:hidden 
               flex flex-col justify-center" 
            `}
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              onClick={() => setIsOpen(false)}
              className={`text-white pl-4 underline-offset-4 hover:underline text-lg text-center`}
            >
              {link.label}
            </Link>
          ))}

          <AuthButtons />
        </div>
      </div>
    </>
  );
};
