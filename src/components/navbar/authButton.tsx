"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";

const AuthButton = () => {
  return (
    <SessionProvider>
      <SessionButton />
    </SessionProvider>
  );
};

const SessionButton = () => {
  const { data: session } = useSession();

  return (
    <div className="pl-4 flex justify-center">
      {session ? (
        <>
          {session?.user?.profileProgress !== "COMPLETE" ? (
            <>
              <Link href={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/profile"}>
                <Image
                  src={session.user?.image as string}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full"
                />
              </Link>
            </>
          )}
        </>
      ) : (
        <Button
          onClick={() => signIn("google")}
          color="white"
          className="flex items-center gap-2"
        >
          <FiLogIn />
          Login
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
