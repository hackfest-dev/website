'use client';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  return (
    <div
      className={`px-5 py-40 md:p-40 bg-[url("/images/blue-grainy.png")] bg-cover bg-center relative overflow-hidden min-h-screen flex justify-center items-center`}
    >
      <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black/20"></div>

      <div className="z-10 bg-black/50 py-10 px-5 flex justify-center items-center flex-col border border-white/20 w-full rounded-3xl">
        <div className="text-center flex justify-center flex-col">
          <h1 className="text-7xl md:text-9xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Oops!
          </h1>

          <p className="mt-4 text-gray-300 mb-5 text-sm md:text-md">
            You have discovered a page that doesn&apos;t exist. Time to head
            back.
          </p>

          <Button variant={'default'} onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
