"use client"
import { BiMenuAltRight,BiX } from "react-icons/bi";
import {FC, useState } from "react";
import Link from "next/link";


export const MobileNavbar:FC <{links:{url:string,label:string}[]}>= ({links}) => {
    const [menu, setMenu] = useState(false);
    const changeMenu = () => {
        setMenu(!menu);
      };
    
return (
    <>
    <div className="flex fixed right-3 top-5 items-center space-x-4 md:hidden">
            {menu ? (
                <BiX
                className="h-6 w-6 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                onClick={changeMenu}
              />
              
            ) : (
                <BiMenuAltRight
                className=" text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] h-6 w-6 "
                onClick={changeMenu}
              />
            )}
          </div>
    {menu && 
        <div className="flex flex-col space-y-4 md:hidden text-right px-4 pb-4">
            {links.map(({ url, label }) => (
            <Link href={url} key={label} className="text-white hover:text-gray-300">
                {label}
            </Link>
            ))}

        </div>}
    </>
);
}