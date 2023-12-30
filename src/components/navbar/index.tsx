import Link from "next/link";
import Image from "next/image";
import { BiMenuAltRight,BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const links= [
    {url: '#', label: 'Home'},
    {url: '#', label: 'About'},
    {url: '#', label: 'Tracks'},
    {url: '#', label: 'Timeline'},
    {url: '#', label: 'Sponsors'},
    {url: '#', label: 'Prizes'},
]

const Navbar = () =>{
    const [menu, setMenu] = useState(false);
    const changeMenu = () => {
        setMenu(!menu);
      };
    
return(
<nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-primary-600 via-primary-800 to-primary-600 text-white backdrop-blur-lg bg-opacity-60">
    <div className="max-w-6xl mx-auto">
    <div className="flex justify-between items-center h-16 px-4">
    <Link href="/">
    <Image src="/logos/logo.png" alt="logo" width={72} height={72} className="select-none drop-shadow-lg"/>
    </Link>     
    <div className="hidden md:flex space-x-7 font-medium text-base cursor-pointer">
        {links.map(({url, label}) => (
            <Link href={url} key={label}>{label}</Link>
        ))}
    </div>
    <div className="">
    <button  onClick = {()=>signIn("google")} className="hidden md:block text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2 drop-shadow-lg">Register</button>
    </div>
    <div className="flex items-center space-x-4 md:hidden">
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
    </div>
    {menu && <MobileNavbar />}
    </div>
</nav>
)
}

export default Navbar;


const MobileNavbar = () => {
    return (
      <div className="flex flex-col space-y-4 md:hidden text-right px-4 pb-4">
        {links.map(({ url, label }) => (
          <Link href={url} key={label} className="text-white hover:text-gray-300">
            {label}
          </Link>
        ))}

      </div>
    );
  }
