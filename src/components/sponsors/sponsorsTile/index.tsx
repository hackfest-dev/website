import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  tileNumber: number;
  cellType: "bronze" | "silver" | "gold" | "diamond";
  noHoverEffect?: boolean;
  children?: React.ReactNode;
  webURL?: string;
} & (
  | {
      src: string;
      srcClassName?: string;
    }
  | {
      src?: undefined;
      srcClassName?: undefined;
    }
);

const sponsorMap = {
  bronze: {
    abbreviation: "al",
    tier: "BRONZE",
    styles: "bg-bronze",
  },
  silver: {
    abbreviation: "hr",
    tier: "SILVER",
    styles: "bg-silver",
  },
  gold: {
    abbreviation: "vr",
    tier: "GOLD",
    styles: "bg-gold",
  },
  diamond: {
    abbreviation: "sq",
    tier: "DIAMOND",
    styles: "bg-rainbow",
  },
};

const SponsorTile: FunctionComponent<Props> = ({
  tileNumber,
  cellType,
  noHoverEffect,
  src,
  children,
  webURL,
  srcClassName,
}) => (
  <div
    className={`relative bg-[#363645] group rounded-lg overflow-hidden ${cellType === "bronze" ? "aspect-[4/3]" : ""} `}
    style={{
      gridArea: `${sponsorMap[cellType].abbreviation + "-" + tileNumber}`,
    }}>
    {noHoverEffect ? (
      src ? (
        <Image src={src} fill={true} alt="sponsor" className={srcClassName} />
      ) : (
        children
      )
    ) : (
      <Link href={webURL || "#"} target="_blank">
        <div className="absolute w-full h-full opacity-0 group-hover:opacity-100">
          <div
            className={`absolute w-full h-full transition-all duration-200 ease-in z-40 group-hover:backdrop-blur-md group-hover:animate-hue-rotate`}></div>
          <div
            className={`absolute bg-transparent w-full h-full transition-all duration-200 ease-in z-50 flex flex-col justify-center items-center `}>
            <h3
              className={`${sponsorMap[cellType].styles} bg-[length:100vw_100vw] md:bg-[length:75vw_75vw] font-semibold text-2xl text-transparent bg-clip-text group-hover:animate-marquee`}>
              {sponsorMap[cellType].tier}
            </h3>
            <p className="text-white">{children}</p>
          </div>
        </div>
        {src && (
          <Image src={src} fill={true} alt="sponsor" className={srcClassName} />
        )}
      </Link>
    )}
  </div>
);

export default SponsorTile;
