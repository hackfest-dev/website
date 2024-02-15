"use client";
// Credits: Aniruddha Upadhya K

import React, { FunctionComponent, HTMLAttributes, useRef } from "react";
import styles from "./style.module.css";
import { useContainerSize } from "@/src/app/hooks/useContainerSize";

type Props = HTMLAttributes<HTMLDivElement> & {
  varient?: "base" | "supporting";
  borderFace?: "default" | "inverted";
  parentClassName?: string;
  children?: React.ReactNode;
};

const BorderedContainer: FunctionComponent<Props> = ({
  varient,
  borderFace,
  parentClassName,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const { width, height } = useContainerSize(ref);

  const gradients = {
    base: "from-base-600 to-supporting-500",
    supporting: "from-tertiary-600 to-quaternary-500",
  };
  const borderFaces = {
    default: "rotate-0",
    inverted: "rotate-180",
  };
  return (
    <div
      ref={ref}
      className={parentClassName}
      style={{
        margin: `${borderFace === "inverted" ? (height * 17) / 100 : 0}px 0 ${borderFace !== "inverted" ? (height * 17) / 100 : 0}px 0`,
      }}>
      <div {...rest} className="relative ">
        <div
          className={`${styles.containerBorder} ${varient ? gradients[varient] : gradients.base} ${borderFace ? borderFaces[borderFace] : borderFaces.default} bg-gradient-to-tl h-[117.24%] w-full absolute inset-0`}></div>
        {children}
      </div>
    </div>
  );
};

export default BorderedContainer;