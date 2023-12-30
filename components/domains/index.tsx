'use client';
import { MouseEvent, TouchEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { GiTronArrow } from 'react-icons/gi';
import styles from './style.module.css';

type DomainProps = {
  name: string;
  image: string;
  prize: number | null;
  description: string;
};

const Domains = ({ domainList }: { domainList: DomainProps[] }) => {
  const domains = useRef<Array<HTMLDivElement | null>>([]);
  const [contents, setContents] = useState<DomainProps>({
    name: '',
    image: '',
    prize: null,
    description: '',
  });

  const activeDomain = useRef<HTMLDivElement | null>(null);
  const domainPosRef = useRef(null);
  const contentRef = useRef(null);
  const bgBlockRef = useRef(null);
  const contentTitleRef = useRef(null);
  const contentDescriptionRef = useRef(null);
  const contentPrizeRef = useRef(null);

  const enterAnimation = async (e: MouseEvent | TouchEvent) => {
    if (e.target && e.target instanceof HTMLDivElement) {
      setContents(domainList[parseInt(e.target.dataset.id as string)]);
      activeDomain.current = e.target;

      const domainPos =
        domainPosRef.current &&
        (domainPosRef.current as HTMLDivElement).getBoundingClientRect();
      const currentPos = e.target.getBoundingClientRect();

      const x = domainPos
        ? (domainPos as DOMRect).x - currentPos.x - currentPos.width / 2
        : 0;
      const y = domainPos
        ? (domainPos as DOMRect).y - currentPos.y - currentPos.height / 2
        : 0;

      // Enter animation
      e.target.style.zIndex = '40';
      e.target.style.transform = `translate(${x}px, ${y}px) scale(2.5)`;

      bgBlockRef.current &&
        (bgBlockRef.current as HTMLDivElement).classList.add(
          `${styles.active}`
        );
      contentRef.current &&
        (contentRef.current as HTMLDivElement).classList.add(
          `${styles.active}`
        );
      contentTitleRef.current &&
        (contentTitleRef.current as HTMLDivElement).classList.add(
          `${styles.active}`
        );
      contentDescriptionRef.current &&
        (contentDescriptionRef.current as HTMLDivElement).classList.add(
          `${styles.active}`
        );
      contentPrizeRef.current &&
        (contentPrizeRef.current as HTMLDivElement).classList.add(
          `${styles.active}`
        );
      document.body.style.overflow = 'hidden';
    }
  };

  const exitAnimaiton = async () => {
    bgBlockRef.current &&
      (bgBlockRef.current as HTMLDivElement).classList.remove(
        `${styles.active}`
      );
    contentRef.current &&
      (contentRef.current as HTMLDivElement).classList.remove(
        `${styles.active}`
      );
    contentTitleRef.current &&
      (contentTitleRef.current as HTMLDivElement).classList.remove(
        `${styles.active}`
      );
    contentDescriptionRef.current &&
      (contentDescriptionRef.current as HTMLDivElement).classList.remove(
        `${styles.active}`
      );
    contentPrizeRef.current &&
      (contentPrizeRef.current as HTMLDivElement).classList.remove(
        `${styles.active}`
      );

    setTimeout(() => {
      (activeDomain.current as HTMLDivElement).style.zIndex = '39';
      document.body.style.overflow = 'visible';
    }, 1000);

    (
      activeDomain.current as HTMLDivElement
    ).style.transform = `translate(0, 0) scale(1)`;
  };

  return (
    <>
      <section className="max-w-screen-xl p-12 mx-auto">
        <div
          id="contents"
          ref={contentRef}
          className={
            styles.contents +
            ' fixed inset-0 z-50 bg-transparent max-w-screen-xl mx-auto'
          }
        >
          {/* Position of domain image when viewing contents */}
          <div
            ref={domainPosRef}
            className="opacity-0 absolute top-1/2 left-2/3 translate-x-1/2 -translate-y-1/2"
          />
          {/* Contents go here */}
          <div className="p-5 top-0 left-0 h-full absolute w-1/2 flex flex-col justify-center items-center gap-6">
            <div className="text-4xl font-bold flex flex-wrap overflow-clip">
              <div ref={contentTitleRef} className={styles.contentElements}>
                {contents.name}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl flex flex-wrap overflow-clip">
                <div
                  ref={contentDescriptionRef}
                  className={styles.contentElements}
                >
                  {contents.description}
                </div>
              </div>
              <div
                className={styles.contentElements + ' text-xl'}
                ref={contentPrizeRef}
              >
                {contents && contents.prize}
              </div>
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
          ref={bgBlockRef}
          id="bgBlock"
          className={
            styles.bgBlock +
            ` inset-0 bg-black/90 fixed z-40 pointer-events-none`
          }
        >
          <Image
            src={'/domains-bg.jpg'}
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
                        style={{
                          transformOrigin: 'center center',
                          transition:
                            'transform 1s cubic-bezier(1, 0, 0.7, 1) 0s',
                        }}
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
