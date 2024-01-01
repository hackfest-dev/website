const CubeGrid = () => {
  return (
    <div>
      <div className="relative flex h-screen w-screen items-center justify-center">
        <div className="mx-auto grid w-full grid-cols-10 gap-2  skew-x-[20deg] translate-z-0">
          {new Array(200).fill(0).map((_, i) => (
            <div
              key={i}
              className="rounded-md border p-10 transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CubeGrid;
