"use client";

import NextLink from "next/link";
import React, { forwardRef } from "react";

interface RouteChangeCustomEvent extends CustomEvent {
  detail: {
    href: string;
  };
}

const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  ({ href, onClick, ...rest }, ref) => {
    const useLink = href && href.startsWith("/");
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(e) => {
          onClick && onClick(e);
          window.dispatchEvent(
            new CustomEvent("routeChangeStart", {
              detail: { href: new URL(href, window.location.href).pathname },
            } as RouteChangeCustomEvent)
          );
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Link;
export type { RouteChangeCustomEvent };
