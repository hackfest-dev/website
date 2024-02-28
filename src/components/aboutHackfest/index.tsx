'use client';

import { RefObject, useEffect, useRef } from 'react';
import { GiDiamonds } from 'react-icons/gi';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import GridTile from '../gridTile';
import Image from 'next/image';
import Cursor from '../cursor';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Button } from '../ui/button';
import styles from './style.module.css';
import FadeIn from '../fadeInAnimation';
import { Download, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const AboutHackfest = () => {
  const childRef36 = useRef<HTMLDivElement>(null);
  const childRef50 = useRef<HTMLDivElement>(null);
  const behindRef = useRef<HTMLDivElement>(null);
  const tagelinRef1 = useRef<HTMLDivElement>(null);
  const tagelinRef2 = useRef<HTMLDivElement>(null);
  const tagelinRef3 = useRef<HTMLDivElement>(null);
  const tagelinRef4 = useRef<HTMLDivElement>(null);
  const prizeParentRef = useRef<HTMLDivElement>(null);
  const prizeChildRef = useRef<HTMLDivElement>(null);

  const checkHover = (
    rect: DOMRect,
    e: MouseEvent,
    ref: RefObject<HTMLDivElement>
  ) => {
    if (rect && ref.current) {
      if (
        rect.left < e.clientX &&
        e.clientX < rect.right &&
        rect.top < e.clientY &&
        e.clientY < rect.bottom
      ) {
        ref.current.classList.add('bg-gold');
        ref.current.classList.remove('bg-white');
      } else {
        ref.current.classList.add('bg-white');
        ref.current.classList.remove('bg-gold');
      }
    }
  };

  const handleSecondMouseMove = (e: MouseEvent) => {
    if (
      tagelinRef1.current &&
      tagelinRef2.current &&
      tagelinRef3.current &&
      tagelinRef4.current
    ) {
      const rect1 = tagelinRef1.current.getBoundingClientRect();
      checkHover(rect1, e, tagelinRef1);
      const rect2 = tagelinRef2.current.getBoundingClientRect();
      checkHover(rect2, e, tagelinRef2);
      const rect3 = tagelinRef3.current.getBoundingClientRect();
      checkHover(rect3, e, tagelinRef3);
      const rect4 = tagelinRef4.current.getBoundingClientRect();
      checkHover(rect4, e, tagelinRef4);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleSecondMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleSecondMouseMove);
    };
  });

  gsap.registerPlugin(ScrollTrigger);

  const counterAnimation = (
    childRef: RefObject<HTMLElement>,
    target: number,
    padding: number = 2,
    duration: number = 2,
    delay: number = 0.3
  ) => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      ease: 'power3.out',
      duration: duration,
      delay: delay,
      onUpdate: () => {
        if (childRef.current)
          childRef.current.innerText = `${counter.value.toFixed(0)}`.padStart(
            padding,
            '0'
          );
      },
    });
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: childRef36.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          counterAnimation(childRef36, 36);
        },
        onEnterBack: () => {
          counterAnimation(childRef36, 36);
        },
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: childRef50.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          counterAnimation(childRef50, 50);
        },
        onEnterBack: () => {
          counterAnimation(childRef50, 50);
        },
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: prizeParentRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          counterAnimation(prizeChildRef, 200000, 6);
        },
        onEnterBack: () => {
          counterAnimation(prizeChildRef, 200000, 6);
        },
      },
    });
  }, []);

  return (
    <>
      <section
        id="about"
        className={`relative flex flex-col justify-center items-center mt-16 md:py-10 xl:py-20 px-2 md:px-6 xl:px-16`}
      >
        <div
          className={`${styles.bentoGrid} grid gap-2 md:gap-4 w-full 2xl:max-w-screen-2xl`}
        >
          {/* Cell 1x1 */}
          <GridTile cellType="c11" cellNo={1}>
            <FadeIn direction="right" className="w-full h-full">
              <div className="w-full h-full flex justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-cente">
                  <h1 className="text-4xl lg:text-6xl font-bold font-obscura tracking-wider text-center">
                    APRIL
                  </h1>
                  <p className="w-full flex items-center justify-between text-lg lg:text-2xl font-semibold tracking-wider">
                    5th
                    <GiDiamonds />
                    6th
                    <GiDiamonds />
                    7th
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center font-semibold text-xl leading-5 max-xl:hidden">
                  <div>2</div>
                  <div>0</div>
                  <div>2</div>
                  <div>4</div>
                </div>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c11" cellNo={2}>
            <FadeIn direction="up" delay={0.1} className="w-full h-full">
              <div className="relative w-full h-full group">
                <Image
                  src="/logos/logo.png"
                  alt="Hackfest_Logo"
                  fill
                  className="object-contain"
                />
                <div className="group-hover:brightness-125 transition-all duration-300 absolute h-full -z-10 w-full bg-gradient-radial from-teal-300 to-transparent blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c11" cellNo={3}>
            <FadeIn direction="down" delay={0.2} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold pr-1">
                  <div ref={childRef50} className="inline-block mr-1">
                    50
                  </div>
                  <span className="font-obscura tracking-wider">Hrs</span>
                </span>
                <span className="flex items-center justify text-base md:text-lg lg:text-xl font-semibold self-center">
                  On-Site Event
                </span>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c11" cellNo={4}>
            <FadeIn direction="down" delay={0.3} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold pr-1">
                  <div ref={childRef36} className="inline-block mr-1">
                    36
                  </div>
                  <span className="font-obscura tracking-wider">Hrs</span>
                </span>
                <span className="flex items-center justify text-base md:text-lg lg:text-xl font-semibold self-center text-center">
                  Intense Hackathon
                </span>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c11" cellNo={5}>
            <FadeIn direction="up" delay={0.4} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                <div
                  ref={prizeParentRef}
                  className="w-full flex flex-col justify-center items-center text-2xl xl:text-4xl gap-3"
                >
                  <div className="font-semibold">
                    &#8377;<span ref={prizeChildRef}>200000</span>+
                  </div>
                  <div>Prize Money</div>
                </div>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c11" cellNo={6}>
            <FadeIn direction="up" className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                <Image
                  src="/logos/FLC Logo - Full.png"
                  alt="FLC_Logo"
                  width={200}
                  height={200}
                />

                <div>
                  <a href="/about">
                    <Button className="font-medium mt-3 md:mt-5" size={'sm'}>
                      Read More
                    </Button>
                  </a>
                </div>
              </div>
            </FadeIn>
          </GridTile>

          {/* Cell 1x2 */}
          <GridTile cellType="c12" cellNo={1}>
            <FadeIn direction="right" delay={0.1} className="w-full h-full">
              <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl lg:text-4xl 2xl:text-5xl font-semibold text-center">
                <span className="font-extrabold pr-1">3</span>
                <span className="font-obscura">Day Long Tech-Fest</span>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c12" cellNo={2}>
            <FadeIn direction="right" delay={0.2} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center px-6 gap-2">
                <h3 className="font-bold text-3xl lg:text-5xl">
                  <span className="font-extrabold pr-1">6 </span>
                  <span className="font-obscura tracking-wider">Tracks</span>
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-center w-auto">
                  Six diverse tracks, to craft and code solutions for thier
                  choosen problem statement.
                </p>
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c12" cellNo={3}>
            <FadeIn direction="left" delay={0.3} className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center text-base md:text-lg xl:text-2xl">
                {/* <Image
                  src="/logos/NMAMITLogo.png"
                  alt="NMAM Logo"
                  width={250}
                  height={250}
                /> */}
                <div className="text-2xl md:text-3xl flex justify-center gap-2 items-center border rounded-full px-2 py-1 border-teal-300/30">
                  <MapPin /> Venue
                </div>
                <h1 className="mt-3">NMAM Institute of Technology, Nitte</h1>
                <p>Karkala, Udupi District, Karnataka</p>
              </div>
            </FadeIn>
          </GridTile>

          {/* Cell 2x1 */}
          <GridTile cellType="c21" cellNo={1} className="">
            <FadeIn direction="down" delay={0.4} className="w-full h-full">
              <div className="relative w-full h-full">
                <div
                  ref={behindRef}
                  className="absolute w-full h-full flex flex-col gap-1 md:gap-3 justify-center items-center text-3xl sm:text-4xl lg:text-5xl font-bold"
                >
                  <div
                    ref={tagelinRef1}
                    className="bg-white hover:bg-gradient hover:from-teal-300 bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent bg-clip-text animate-marquee"
                  >
                    Hack
                  </div>
                  <div
                    ref={tagelinRef2}
                    className="bg-white hover:bg-gradient hover:from-teal-300 bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent  bg-clip-text animate-marquee"
                  >
                    The
                  </div>
                  <div
                    ref={tagelinRef3}
                    className="bg-white hover:bg-gradient hover:from-teal-300 bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent  bg-clip-text animate-marquee"
                  >
                    Time
                  </div>
                  <div
                    ref={tagelinRef4}
                    className="bg-white hover:bg-gradient hover:from-teal-300 bg-[length:100vw_100vw] xl:bg-[length:75vw_75vw] text-transparent  bg-clip-text animate-marquee"
                  >
                    Stream
                  </div>
                </div>
                <Cursor />
              </div>
            </FadeIn>
          </GridTile>

          <GridTile cellType="c21" cellNo={2} className="">
            <FadeIn direction="left" className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="relative w-2/3 xl:w-2/4 2xl:w-3/5 aspect-[3/4]">
                  <Image
                    className="object-contain rounded-xl"
                    src="/images/Brochure_Preview.jpeg"
                    alt="Brochure_Preview"
                    fill
                  />
                </div>
                <h4 className="my-4 mx-1 text-center text-sm md:text-base">
                  For More Information
                </h4>
                {/* <p className="text-xs text-center mx-1">
                  Brochure will be released soon!
                </p> */}
                <a href="/brochure.pdf" download="Brochure.pdf">
                  <Button className=" text-sm md:text-base font-medium gap-2">
                    <Download /> Brochure
                  </Button>
                </a>
              </div>
            </FadeIn>
          </GridTile>

          {/* Cell 2x2 */}
          <GridTile cellType="c22" cellNo={1}>
            <FadeIn direction="right" delay={0.1} className="w-full h-full">
              <div className="w-full h-full p-5 lg:p-7 xl:p-10 flex flex-col justify-center items-center gap-3">
                <div className="text-3xl sm:text-4xl font-bold font-obscura">
                  What is HackFest?
                </div>
                <div className="flex justify-center items-center text-sm lg:text-lg text-justify">
                  NMAM Institute of Technology presents a three-day National
                  Tech Fest featuring a 36-hour hackathon, tech conferences, and
                  networking. Our vision is to bring together 60 teams from
                  leading Indian engineering colleges, fostering innovation. The
                  event spans 50 hours, including a 36-hour hackathon, providing
                  a platform for participants to showcase their skills.
                  Here&apos;s an overview that outlines dates, goals, budget,
                  format, logistics, and expected outcomes.
                </div>
              </div>
            </FadeIn>
          </GridTile>
        </div>
      </section>
    </>
  );
};

export default AboutHackfest;
