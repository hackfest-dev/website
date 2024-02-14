import React, { FunctionComponent } from "react";

const JumpingCube: FunctionComponent = () => {
  return (
    <>
      <style jsx>{`
        #cube:after,
        #cube:before {
          content: "";
          will-change: transform;
          display: block;
          position: absolute;
          background: #333333;
          width: 48px;
          height: 48px;
        }

        #cube:before {
          transform: translateZ(48px);
        }
      `}</style>
      <div
        className="flex justify-center items-end md:items-center bg-[#c5bcb1] pb-1 md:pb-0 pt-0 md:pt-10 gap-4 w-full h-full min-h-full"
        style={{
          perspective: "20em",
          transform: "translateZ(0)",
        }}>
        <div className="animate-jump" style={{ transformStyle: "preserve-3d" }}>
          <div
            className="animate-scale origin-[100%_100%_0%]"
            style={{ transformStyle: "preserve-3d" }}>
            <div
              id="cube"
              className="w-[48px] h-[48px] animate-rotate"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(70deg) rotateZ(45deg)",
              }}>
              <div
                className="absolute w-[48px] h-[48px] bg-[#f7cb53] origin-[50%_0%]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(90deg)",
                }}></div>
              <div
                className="absolute w-[48px] h-[48px] bg-[#e35941] origin-[50%_0%]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(90deg) translateZ(-48px)",
                }}></div>
              <div
                className="absolute w-[48px] h-[48px] bg-[#289eaa] origin-[100%_0%]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(90deg) rotateY(-90deg)",
                }}></div>
              <div
                className="absolute w-[48px] h-[48px] bg-[#c3db6d] origin-[100%_0%]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(90deg) rotateY(-90deg) translateZ(48px)",
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JumpingCube;
