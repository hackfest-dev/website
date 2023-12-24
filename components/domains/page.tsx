"use client";

import { MouseEvent, TouchEvent, useRef, useState } from "react";
import { cubicBezier, useAnimate } from "framer-motion";
import Image from "next/image";

type DomainProps = {
  name: string;
  image: string;
  prize: number | null;
  description: string;
};

// import { domains } from "../constants/page";
// import { motion } from "framer-motion";
// import { FaQuestion } from "react-icons/fa6";

// const Domains = () => {
//   return (
//     <>
//       <div className="flex flex-col justify-center min-h-screen mx-4 transition-all">
//         <div className="flex justify-center w-full">
//           <hr className="w-[90vw] mb-16 bg-transparent border-gray-700 border rounded-full   " />
//         </div>
//         <motion.section
//           className="text-center space-y-4 "
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1.2 }}
//         >
//           <motion.h1
//             whileHover={{
//               textShadow: "0px 0px 8px rgb(243, 188, 31)",
//             }}
//             transition={{
//               duration: 0.3,
//             }}
//             className="lg:text-9xl md:text-8xl text-[#f3bc1f] sm:text-7xl text-5xl font-anton inline-block"
//           >
//             DOMAINS
//           </motion.h1>
//         </motion.section>
//         <section className="flex flex-wrap lg:gap-12 md:gap-10 gap-8 lg:mx-20 md:mx-12 mx-6 justify-center py-12">
//           {domains.map((domain, index) => (
//             <motion.div
//               initial={{ rotateY: 180, opacity: 0, x: -500 }}
//               animate={{ rotateY: 180, opacity: 1, x: 0 }}
//               whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               whileHover={{ scale: 1.1 }}
//               style={{ transformStyle: "preserve-3d" }}
//               key={index}
//               className="bg-[#f1f1f1] rounded-3xl px-8 pt-8 pb-12 flex justify-center items-center text-black text-center space-y-6 md:h-[30rem] h-[15rem] md:w-[15rem] w-[10rem]"
//             >
//               <FaQuestion size={75} />
//             </motion.div>
//           ))}
//         </section>
//       </div>
//     </>
//   );
// };

// export default Domains;

const Domains = ({ domainList }: { domainList: DomainProps[] }) => {
  const domains = useRef<Array<HTMLDivElement | null>>([]);
  const [contents, setContents] = useState<DomainProps>({
    name: "",
    image: "",
    prize: null,
    description: "",
  });

  const [scope, animate] = useAnimate();
  const domainPosRef = useRef(null);
  const contentRef = useRef(null);

  const enterAnimation = async (e: MouseEvent | TouchEvent) => {
    if (e.target && e.target instanceof HTMLDivElement) {
      e.target.style.zIndex = "40";
      setContents(domainList[parseInt(e.target.dataset.id as string)]);

      const domainPos =
        domainPosRef.current &&
        (domainPosRef.current as HTMLDivElement).getBoundingClientRect();
      const currentPos = e.target.getBoundingClientRect();

      // Enter animation
      const blockAnimate = animate(
        "#bgBlock",
        { opacity: 1 },
        { ease: "linear", duration: 0.5, delay: 0.5 }
      );
      const contentAnimate = animate(
        "#contents",
        { opacity: 1 },
        { ease: "linear", duration: 0.5, delay: 1 }
      );
      const promises = domains.current.map((domain) => {
        if (domain !== e.target && domain) {
          return animate(
            domain,
            { opacity: 0.8, scale: 0.75 },
            { ease: "linear", duration: 1 }
          );
        }
      });
      const translateAnimate = await animate(
        e.target as any,
        {
          x: domainPos ? (domainPos as DOMRect).x - currentPos.x : 0,
          y: domainPos ? (domainPos as DOMRect).y - currentPos.y : 0,
          scale: 2,
        },
        { ease: cubicBezier(1, 0, 0.7, 1), duration: 1 }
      );
      document.body.style.overflow = "hidden";

      if (contentRef.current)
        (contentRef.current as HTMLDivElement).style.pointerEvents = "all";

      promises.push(blockAnimate, translateAnimate, contentAnimate);
      await Promise.all(promises);
    }
  };

  const exitAnimaiton = async () => {
    const contentAnimate = animate(
      "#contents",
      { opacity: 0 },
      { ease: "linear", duration: 0.5 }
    );
    const blockAnimate = animate(
      "#bgBlock",
      { opacity: 0 },
      { ease: "linear", duration: 0.5 }
    );
    const promises = domains.current.map((domain) => {
      if (domain) {
        return animate(
          domain,
          { opacity: 1, scale: 1, x: 0, y: 0 },
          { ease: cubicBezier(1, 0, 0.7, 1), duration: 1 }
        );
      }
    });
    document.body.style.overflow = "visible";
    if (contentRef.current)
      (contentRef.current as HTMLDivElement).style.pointerEvents = "none";

    setTimeout(() => {
      domains.current.map((domain) => {
        if (domain) {
          domain.style.zIndex = "39";
        }
        document.body.style.overflow = "visible";
      });
    }, 1000);

    promises.push(blockAnimate, contentAnimate);
    await Promise.all(promises);
  };

  return (
    <>
      <section className="" ref={scope}>
        <div
          id="contents"
          ref={contentRef}
          className="fixed inset-0 z-50 bg-transparent"
          style={{
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <div
            className="absolute top-3 right-3 z-10"
            onClick={() => exitAnimaiton()}
          >
            X
          </div>
          {/* Position of domain image when viewing contents */}
          <div
            ref={domainPosRef}
            className="opacity-0 absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
          />
          {/* Contents go here */}
          <div className="p-5 top-0 left-0 h-full absolute w-1/2 flex flex-col justify-center items-center gap-6">
            <h1 className="text-4xl font-bold">{contents.name}</h1>
            <div className="flex flex-col gap-3">
              <p className="text-xl">{contents.description}</p>
              <p className="text-xl">{contents.prize}</p>
            </div>
          </div>
        </div>
        {/* Div to block background */}
        <div
          id="bgBlock"
          className="inset-0 fixed bg-gray-800 z-40 pointer-events-none"
          style={{ opacity: 0 }}
        ></div>
        {/* Grids */}
        <div className="flex flex-wrap">
          {domainList.map((domain, index) => {
            return (
              <div key={index} className="relative">
                <div
                  data-id={index}
                  className="flex justify-center items-baseline w-40 h-40 bg-gradient-to-tr from-primary-400 to-secondary-800 rounded-xl shadow-xl relative z-39"
                  ref={(ref) => (domains.current[index] = ref)}
                  onClick={(e) => enterAnimation(e)}
                >
                  <Image
                    src={domain.image}
                    alt={domain.name}
                    fill
                    className="object-center object-contain pointer-events-none"
                  />
                  <p className="mb-3">{domain.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Domains;
