"use client";

import { useEffect, useRef, useState, MouseEvent, TouchEvent } from "react";
import { useWindowSize } from "../customHooks/page";

const NeonGrid = () => {
  const boxes = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const windowSize = useWindowSize();
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const size = (windowSize.width + windowSize.height) / 2;
    setBoxSize({
      width: size / (10 * Math.cos(Math.PI / 9)),
      height: size / (10 * Math.cos(Math.PI / 9)),
    });
  }, [windowSize]);

  // Perspective of the grid for different screen sizes
  let perspective = 250;
  if (windowSize.width < 800) perspective = 300;
  else if (windowSize.height < 900) perspective = 300;
  else if (windowSize.height < 1000) perspective = 350;
  else if (windowSize.height < 1100) perspective = 450;
  else if (windowSize.height < 1200) perspective = 450;
  else perspective = 550;

  const temp = new Array(20).fill(0); // temporary array to map the grid

  const colorMap = [
    ["#EB24B6", "#F05CC8", "#F594DB"],
    ["#F26868", "#F68E8E", "#F9B4B4"],
    ["#FFB85C", "#FFCA85", "#FFDCAD"],
  ];

  const handleHover = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const position = {
      x: (e.target as HTMLDivElement).offsetLeft,
      y: (e.target as HTMLDivElement).offsetTop,
    };
    const color = colorMap[Math.floor(Math.random() * colorMap.length)];
    boxes.current.map((row) => {
      row.map((box) => {
        if (box) {
          // box.style.boxShadow = "0 0 0px 0px #fff";
          // Giving a 3D effect to boxes adjacent to the hovered box including diagonal boxes
          if (
            Math.sqrt(
              (box.offsetLeft - position.x) ** 2 +
                (box.offsetTop - position.y) ** 2
            ) <=
            (Math.SQRT2 * boxSize.width) / Math.cos(Math.PI / 9)
          ) {
            box.style.transform = "perspective(100px) translateZ(-10px)";
            box.style.boxShadow = `0 0 10px 5px ${color[1]}`;
          }
          // Giving a 3D effect to boxes second adjacent to the hovered box (diagonal boxes excluded)
          else if (
            Math.sqrt(
              (box.offsetLeft - position.x) ** 2 +
                (box.offsetTop - position.y) ** 2
            ) <=
            (2 * boxSize.width) / Math.cos(Math.PI / 9)
          ) {
            box.style.transform = "perspective(100px) translateZ(-5px)";
            box.style.boxShadow = `0 0 10px 5px ${color[2]}`;
          }
          // Removing 3D effect from all other boxes
          // else {
          //   box.style.transform = "perspective(100px) translateZ(-0px)";
          // }
        }
      });
    });
    // Giving a 3D effect to the hovered box
    if (e.target && e.target instanceof HTMLDivElement) {
      e.target.style.transform = "perspective(100px) translateZ(-20px)";
      e.target.style.boxShadow = `0 0 15px 10px ${color[0]}`;
    }
  };

  const handleMouseLeave = () => {
    boxes.current.map((row) => {
      row.map((box) => {
        if (box) {
          box.style.transform = "perspective(100px) translateZ(-0px)";
          box.style.boxShadow = "0 0 0px 0px #fff";
        }
      });
    });
  };

  return (
    <>
      <div className="overflow-hidden bg-primary-300">
        <div style={{ perspective }}>
          <div
            className="h-screen relative"
            style={{
              transformOrigin: "center",
              transform: "rotateX(18deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Grid container */}
            <div className="flex gap-1 justify-center items-center flex-col relative -translate-y-1/3">
              {temp.map((itm, i) => {
                boxes.current[i] = [];
                return (
                  <>
                    {/* Grid rows */}
                    <div
                      className="flex gap-1 justify-center items-center"
                      key={i}
                    >
                      {temp.map((itm, j) => {
                        return (
                          <>
                            {/* Grid boxes */}
                            <div
                              onTouchStart={(e) => handleHover(e)}
                              onTouchEnd={() => handleMouseLeave()}
                              onMouseEnter={(e) => handleHover(e)}
                              onMouseLeave={() => handleMouseLeave()}
                              className="flex gap-1 justify-center items-center relative bg-gray-900 transition-all duration-300 ease-linear"
                              key={j}
                              style={{
                                height: boxSize.height - 4,
                                width: boxSize.width - 4,
                                transformStyle: "preserve-3d",
                              }}
                              ref={(ref) => (boxes.current[i][j] = ref)}
                            ></div>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeonGrid;
