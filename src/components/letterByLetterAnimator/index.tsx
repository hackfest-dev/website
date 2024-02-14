import React, { FunctionComponent, useEffect, useRef, useState } from "react";

type Props = {
  word: string;
};

const LetterByLetterAnimator: FunctionComponent<Props> = ({ word }) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    const nextIndex = currIndex + 1;

    if (nextIndex >= word.length) {
      setTimeout(() => {
        setCurrIndex((prev) => -1);
      }, 4000);
    } else {
      setTimeout(() => {
        setCurrIndex((prev) => prev + 1);
      }, 300);
    }
  }, [currIndex]);

  return (
    <div className="absolute flex justify-center items-center w-full h-full text-white">
      {currIndex < 0 ? word[currIndex] : word}
    </div>
  );
};

export default LetterByLetterAnimator;
