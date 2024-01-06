'use client';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

export const RequestButton = () => {
    return (
        <SessionProvider>
            <ReqButton />
        </SessionProvider>
    );
};


const ReqButton=()=>{
    const {data:user}=useSession()
    return (
      <button
        onClick={() => {user?signOut():signIn('google')}}
        className="hidden md:block text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2 drop-shadow-lg"
      >
        {user?"Logout":"Register"}
      </button>
    );
}