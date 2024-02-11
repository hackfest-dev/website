import React, { FunctionComponent, useEffect, useState } from "react";

type Props = {
  word: string;
};

const LetterByLetterAnimator: FunctionComponent<Props> = ({ word }) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("im called");
      setCurrIndex((prev) => (prev + 1) % word.length);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div className="absolute flex justify-center items-center w-full h-full text-5xl md:text-7xl text-white">
      {word[currIndex]}
    </div>
  );
};

export default LetterByLetterAnimator;
