import SignInButton from './signInButton';

const NotLoggedIn = () => {
  return (
    <div
      className={`px-10 py-40 md:p-40 bg-[url("/images/blue-grainy.png")] bg-cover bg-center relative overflow-hidden min-h-screen flex justify-center items-center`}
    >
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <div className="z-0 absolute pointer-events-none inset-0 flex items-center justify-center bg-black/20"></div>

      <div className="grid place-content-center px-4 z-10">
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
    </div>
  );
};

export default NotLoggedIn;
