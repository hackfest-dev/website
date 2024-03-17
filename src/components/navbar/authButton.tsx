import { SessionProvider, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { LogoutButton } from "../profile/logout";

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
    <div className="flex justify-center pl-4">
      {session ? (
        <>
          <Link href={"/profile"}>
            <Image
              src={session.user.image!}
              width={40}
              height={40}
              alt="profile"
              className="rounded-full"
            />
          </Link>
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
