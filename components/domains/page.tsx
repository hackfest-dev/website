"use client";

import { MouseEvent, TouchEvent, useRef, useState } from "react";
import { cubicBezier, stagger, useAnimate, motion } from "framer-motion";
import Image from "next/image";
import { GiTronArrow } from "react-icons/gi";

type DomainProps = {
  name: string;
  image: string;
  prize: number | null;
  description: string;
};

const Domains = ({ domainList }: { domainList: DomainProps[] }) => {
  const domains = useRef<Array<HTMLDivElement | null>>([]);
  const [contents, setContents] = useState<DomainProps>({
    name: "",
    image: "",
    prize: null,
    description: "",
  });

  const activeDomain = useRef<HTMLDivElement | null>(null);
  const [scope, animate] = useAnimate();
  const domainPosRef = useRef(null);
  const contentRef = useRef(null);

  const enterAnimation = async (e: MouseEvent | TouchEvent) => {
    if (e.target && e.target instanceof HTMLDivElement) {
      setContents(domainList[parseInt(e.target.dataset.id as string)]);
      activeDomain.current = e.target;
      e.target.style.zIndex = "40";

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
      const translateAnimate = animate(
        e.target as any,
        {
          x: domainPos
            ? (domainPos as DOMRect).x - currentPos.x - currentPos.width / 2
            : 0,
          y: domainPos
            ? (domainPos as DOMRect).y - currentPos.y - currentPos.height / 2
            : 0,
          scale: 2.5,
        },
        { ease: cubicBezier(1, 0, 0.7, 1), duration: 1 }
      );

      document.body.style.overflow = "hidden";

      if (contentRef.current)
        (contentRef.current as HTMLDivElement).style.pointerEvents = "all";

      await Promise.all([translateAnimate]);
      await Promise.all([
        blockAnimate,
        contentAnimate,
        animate("h2", { y: 0, opacity: 1 }, { ease: "linear" }),
      ]);
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
    const translateAnimate = animate(
      activeDomain.current as any,
      { x: 0, y: 0, scale: 1 },
      { ease: cubicBezier(1, 0, 0.7, 1), duration: 1 }
    );
    document.body.style.overflow = "visible";
    if (contentRef.current)
      (contentRef.current as HTMLDivElement).style.pointerEvents = "none";

    setTimeout(() => {
      (activeDomain.current as HTMLDivElement).style.zIndex = "39";
      document.body.style.overflow = "visible";
      setContents({
        name: "",
        image: "",
        prize: null,
        description: "",
      });
    }, 1000);

    await Promise.all([
      translateAnimate,
      blockAnimate,
      contentAnimate,
      animate(
        "h2",
        { y: "100%", opacity: 0 },
        { ease: "easeInOut", delay: 0.5 }
      ),
    ]);
  };

  return (
    <>
      <section className="max-w-screen-xl p-12 mx-auto" ref={scope}>
        <div
          id="contents"
          ref={contentRef}
          className="fixed inset-0 z-50 bg-transparent max-w-screen-xl mx-auto"
          style={{
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          {/* Position of domain image when viewing contents */}
          <div
            ref={domainPosRef}
            className="opacity-0 absolute top-1/2 left-2/3 translate-x-1/2 -translate-y-1/2"
          />
          {/* Contents go here */}
          <div className="p-5 top-0 left-0 h-full absolute w-1/2 flex flex-col justify-center items-center gap-6">
            <div className="text-4xl font-bold flex flex-wrap overflow-clip">
              <h2
                style={{ transform: "translateY(100%)", opacity: 0 }}
                className="overflow-clip"
              >
                {contents.name}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl flex flex-wrap overflow-clip">
                <h2
                  style={{ transform: "translateY(100%)", opacity: 0 }}
                  className="overflow-clip"
                >
                  {contents.description}
                </h2>
              </div>
              <p className="text-xl">{contents && contents.prize}</p>
            </div>
            <div
              className="-scale-x-[2] rotate-12 cursor-pointer hover:text-secondary-500 transition-all duration-300 ease-in-out"
              onClick={() => exitAnimaiton()}
            >
              <GiTronArrow className="text-3xl" />
            </div>
          </div>
        </div>
        {/* Div to block background */}
        <div
          id="bgBlock"
          className="inset-0 bg-black/90 fixed z-40 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <Image
            src={"/domains-bg.jpg"}
            alt="background"
            fill
            className="object-center object-cover"
          />
          <div className="w-full h-full bg-black/30 absolute top-0 left-0"></div>
        </div>
        {/* Grids */}
        <div className="flex flex-col gap-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent w-fit">
            Domains
          </h1>
          <div className="flex flex-wrap gap-5 justify-center items-center">
            {domainList.map((domain, index) => {
              return (
                <div key={index} className="relative">
                  <div className="flex justify-center items-end w-52 h-40 rounded-xl relative z-39 cursor-pointer group mb-5">
                    <div
                      id="imgBorder"
                      className="h-full w-full flex justify-center relative lg:group-hover:scale-95 border-[6px] border-secondary-500 border-double rounded-xl transition-scale duration-300 ease-in-out"
                    >
                      <div
                        className="h-full w-full rounded-xl"
                        style={{ transformOrigin: "center center" }}
                        ref={(ref) => (domains.current[index] = ref)}
                        onClick={(e) => enterAnimation(e)}
                        data-id={index}
                      >
                        <Image
                          src={domain.image}
                          alt={domain.name}
                          fill
                          className="object-center object-contain pointer-events-none p-3 lg:group-hover:scale-125 transition-all duration-300 ease-in-out"
                        />
                      </div>
                      <div
                        id="domainName"
                        className="absolute top-full -translate-y-1/2 bg-secondary-950 border-2 border-secondary-500 p-2 rounded-lg "
                      >
                        <p className="text-xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent pointer-events-none">
                          {domain.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Domains;
