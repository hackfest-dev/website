import { MutableRefObject, useEffect, useState } from "react";

export const useWindowSize = (): {
  width: number;
  height: number;
} => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const windowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", windowResize);

    windowResize();

    return () => window.removeEventListener("resize", windowResize);
  }, []);

  return windowSize;
};

export const useContainerSize = (
  ref: MutableRefObject<HTMLDivElement | null>
): {
  width: number;
  height: number;
} => {
  const [dimention, setDimention] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getDimention = () => ({
      width: ref.current ? ref.current.offsetWidth : 0,
      height: ref.current ? ref.current.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimention(getDimention());
    };

    ref.current && setDimention(getDimention());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return dimention;
};

export const useScroll = (): {
  scroll: number;
} => {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scroll };
};
