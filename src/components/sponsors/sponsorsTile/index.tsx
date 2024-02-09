import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  tileNumber: number;
  cellType: "alone" | "horizontalRectangle" | "verticalRectangle" | "square";
  noHoverEffect?: boolean;
  children?: React.ReactNode;
  webURL?: string;
} & (
  | {
      src: string;
      className?: string;
    }
  | {
      src?: undefined;
      className?: undefined;
    }
);

const sponsorMap = {
  alone: { annotation: "al", tier: "Bronze", styles: "text-[#a25a3a]" },
  horizontalRectangle: {
    annotation: "hr",
    tier: "Silver",
    styles: "text-[#bababa]",
  },
  verticalRectangle: {
    annotation: "vr",
    tier: "Gold",
    styles: "text-[#e6b701]",
  },
  square: {
    annotation: "sq",
    tier: "Diamond",
    styles:
      "bg-rainbow text-2xl text-transparent bg-[length:600vw_600vw] bg-clip-text group-hover:animate-marquee",
  },
};

const SponsorTile: FunctionComponent<Props> = ({
  tileNumber,
  cellType,
  noHoverEffect,
  src,
  children,
  webURL,
  className,
}) => (
  <div
    className={`relative bg-[#363645] group rounded-lg overflow-hidden ${cellType === "alone" ? "aspect-[4/3]" : ""} `}
    style={{
      gridArea: `${sponsorMap[cellType].annotation + "-" + tileNumber}`,
    }}>
    <Link
      href={webURL || "#"}
      target="_blank"
      className={noHoverEffect ? "pointer-events-none" : ""}>
      {noHoverEffect ? (
        !src && children
      ) : (
        <div className="absolute w-full h-full opacity-0 group-hover:opacity-100">
          <div
            className={`absolute w-full h-full transition-all duration-200 ease-in z-40 group-hover:backdrop-blur-md group-hover:animate-hue-rotate`}></div>
          <div
            className={`absolute bg-transparent w-full h-full transition-all duration-200 ease-in z-50 flex flex-col justify-center items-center `}>
            <h3
              className={`${sponsorMap[cellType].styles} font-semibold md:text-xl`}>
              {sponsorMap[cellType].tier}
            </h3>
            <p className="text-white">{children}</p>
          </div>
        </div>
      )}
      {src && (
        <Image src={src} fill={true} alt="sponsor" className={className} />
      )}
    </Link>
  </div>
);

export default SponsorTile;
