import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  tileNumber: number;
  cellType: "alone" | "horizontalRectangle" | "verticalRectangle" | "square";
  noBlur?: boolean;
  src?: string;
  children?: React.ReactNode;
  webURL?: string;
};

const sponsorMap = {
  alone: { annotation: "al", tier: "Bronze", color: "text-[#a25a3a]" },
  horizontalRectangle: {
    annotation: "hr",
    tier: "Silver",
    color: "text-[#bababa]",
  },
  verticalRectangle: {
    annotation: "vr",
    tier: "Gold",
    color: "text-[#e6b701]",
  },
  square: { annotation: "sq", tier: "Diamond", color: "text-[#15c3f8]" },
};

const SponsorTile: FunctionComponent<Props> = ({
  tileNumber,
  cellType,
  noBlur,
  src,
  children,
  webURL,
}) => (
  <div
    className={`relative ${cellType === "alone" ? "aspect-[4/3]" : ""} bg-[#363645] min-h-[100px] group rounded-xl overflow-hidden`}
    style={{
      gridArea: `${sponsorMap[cellType].annotation + "-" + tileNumber}`,
    }}>
    <Link href={webURL || "#"} target="_blank">
      <div
        className={`absolute inset-0 bg-[#000000]/60 w-full h-full z-50 opacity-0 flex flex-col justify-center items-center transition-all ease-in ${noBlur ? "opacity-100" : "group-hover:backdrop-blur-3xl group-hover:opacity-100"}`}>
        {!noBlur && (
          <h3
            className={`${sponsorMap[cellType].color} font-semibold md:text-xl`}>
            {sponsorMap[cellType].tier}
          </h3>
        )}
        <p className="text-white">{children}</p>
      </div>
      {src && (
        <Image src={src} fill={true} alt="sponsor" className="object-cover" />
      )}
    </Link>
  </div>
);

export default SponsorTile;
