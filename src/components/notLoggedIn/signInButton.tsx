'use client';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { FiLogIn } from 'react-icons/fi';

const SignInButton = () => {
  return (
    <div className="w-full flex justify-center">
      <Button
        onClick={() => signIn('google')}
        className="flex items-center gap-2 w-fit"
      >
        <FiLogIn size={16} />
        Sign in
      </Button>
    </div>
  );
};

export default SignInButton;
