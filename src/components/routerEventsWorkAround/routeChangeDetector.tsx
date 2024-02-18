"use client";
import { FunctionComponent, useEffect } from "react";
import { usePathname } from "next/navigation";

const RouteChangeDetector: FunctionComponent = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.dispatchEvent(new Event("routeChangeComplete"));
  }, [pathname]);

  return null;
};

export default RouteChangeDetector;
