import React, { FunctionComponent, useEffect, useRef } from "react";

const Cursor: FunctionComponent = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    window.dispatchEvent(new Event("mousemove", e));

    const parentRect =
      parentRef.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

    if (cursorRef.current) {
      const cursorRect = cursorRef.current.getBoundingClientRect();

      cursorRef.current.style.left = `${e.clientX - parentRect.left}px`;
      cursorRef.current.style.top = `${e.clientY - parentRect.top}px`;

      if (
        cursorRect.left <= parentRect.left ||
        cursorRect.right >= parentRect.right ||
        cursorRect.top <= parentRect.top ||
        cursorRect.bottom >= parentRect.bottom
      ) {
        cursorRef.current.style.opacity = "0";
        if (parentRef.current) parentRef.current.style.cursor = "initial";
      } else {
        cursorRef.current.style.opacity = "1";
        if (parentRef.current && window.innerWidth >= 768)
          parentRef.current.style.cursor = "none";

        const xPercentage =
          ((cursorRect.left - parentRect.left) / parentRect.width) * 100;
        const yPercentage =
          ((cursorRect.top - parentRect.top) / parentRect.height) * 100;
        cursorRef.current.style.translate = `-${xPercentage}% -${yPercentage}%`;
      }
    }
  };

  useEffect(() => {
    parentRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      parentRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={parentRef} className="relative hidden h-full w-full md:block">
      <div
        ref={cursorRef}
        className="absolute left-1/4 top-1/4 h-[30px] w-[30px] -rotate-90 transition-opacity"
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.001 512.001"
        >
          <path
            style={{ fill: "#1E0478" }}
            d="M503.841,8.338c7.902,7.97,10.28,19.397,6.187,29.853L331.722,494.207 c-4.282,10.955-14.427,17.79-25.881,17.79c-1.148,0-2.31-0.068-3.485-0.203c-12.86-1.54-22.653-11.198-24.382-24.031 l-30.055-222.868c-0.054-0.419-0.392-0.756-0.81-0.81L24.24,234.03c-12.833-1.729-22.491-11.522-24.031-24.382 c-1.54-12.846,5.525-24.652,17.587-29.366L473.813,1.976c10.455-4.093,21.883-1.716,29.853,6.187 c0.027,0.027,0.068,0.054,0.095,0.081C503.787,8.271,503.814,8.311,503.841,8.338z M306.557,484.373l166.824-426.65L273.827,257.277 c0.378,1.297,30.92,226.88,30.92,226.88c0.068,0.5,0.095,0.716,0.824,0.81C306.3,485.062,306.381,484.846,306.557,484.373z M254.727,238.177L454.28,38.623L27.631,205.447c-0.473,0.176-0.675,0.27-0.594,0.986c0.095,0.729,0.311,0.756,0.81,0.824 C27.847,207.257,253.43,237.799,254.727,238.177z"
          />
          <path
            style={{ fill: "#9B8CCC" }}
            d="M473.381,57.724l-166.824,426.65c-0.176,0.473-0.257,0.689-0.986,0.594s-0.756-0.311-0.824-0.81 c0,0-30.542-225.583-30.92-226.88L473.381,57.724z"
          />
          <path
            style={{ fill: "#94E7EF" }}
            d="M454.28,38.623L254.727,238.177c-1.297-0.378-226.88-30.92-226.88-30.92 c-0.5-0.068-0.716-0.095-0.81-0.824c-0.081-0.716,0.122-0.81,0.594-0.986L454.28,38.623z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Cursor;
