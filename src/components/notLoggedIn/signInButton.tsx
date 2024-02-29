import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";

const SignInButton = () => {
  return (
    <div className="flex w-full justify-center">
      <Button
        onClick={() => signIn("google")}
        className="flex w-fit items-center gap-2"
      >
        <FiLogIn size={16} />
        Sign in
      </Button>
    </div>
  );
};

export default SignInButton;
