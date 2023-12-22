"use client";

import React, { useRef } from "react";
import styles from "./style.module.css";
import type { HTMLAttributes } from "react";
import { useContainerSize } from "@/components/customHooks/page";

type Props = HTMLAttributes<HTMLDivElement> & {
  varient?: "primary" | "secondary";
  borderFace?: "default" | "inverted";
  parentClassName?: string;
};

const BorderedContainer = (props: Props) => {
  const ref = useRef(null);
  const { width, height } = useContainerSize(ref);

  const gradients = {
    primary: "from-primary-600 to-secondary-500",
    secondary: "from-tertiary-600 to-quaternary-500",
  };
  const borderFaces = {
    default: "rotate-0",
    inverted: "rotate-180",
  };
  const { varient, borderFace, className, parentClassName, ...rest } = props;
  return (
    <div
      ref={ref}
      className={`${parentClassName}`}
      style={{
        margin: `${borderFace === "inverted" ? (height * 17) / 100 : 0}px 0 ${
          borderFace !== "inverted" ? (height * 17) / 100 : 0
        }px 0`,
      }}
    >
      <div {...rest} className="relative ">
        <div
          className={
            styles.containerBorder +
            " " +
            (varient ? gradients[varient] : gradients.primary) +
            " " +
            (borderFace ? borderFaces[borderFace] : borderFaces.default) +
            " bg-gradient-to-tl h-[117.24%] w-full absolute inset-0"
          }
        ></div>
        <div className={`${className}`}>{props.children}</div>
      </div>
    </div>
  );
};

export default BorderedContainer;
