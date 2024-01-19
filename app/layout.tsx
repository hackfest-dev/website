import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const font = localFont({
  src: "../public/fonts/SpaceRaveItalic-z8GoG.ttf",
  variable: "--font-spaceRave",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Hackfest 2024",
  description:
    "Hackfest is a 36h long National level Hackathon at NMAMIT, Nitte coupled with a lot of Interactive Activities & Tech Conference talks!",
};

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${font.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
