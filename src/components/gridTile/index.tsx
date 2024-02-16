import React, { FunctionComponent } from "react";

type Props = {
  cellType: "c11" | "c12" | "c21" | "c22";
  cellNo: number;
  className?: string;
  children?: React.ReactNode;
};

const GridTile: FunctionComponent<Props> = ({
  cellType,
  cellNo,
  className,
  children,
}) => (
  <div
    style={{
      gridArea: `${cellType}-${cellNo}`,
    }}
    className={`w-full h-full rounded-lg overflow-hidden shadow-[0_0_3px_1px_#b9b7b7ad] ${cellType === "c11" ? "aspect-[4/3]" : ""} ${className} backdrop-blur-[2px]`}>
    {children}
  </div>
);

export default GridTile;
