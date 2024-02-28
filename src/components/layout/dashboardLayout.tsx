import { Poppins } from "next/font/google";
import "../globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import NotFound from "../not-found";
import ProgressBarProvider from "../progressBarProvider";
import { useSession } from "next-auth/react";

const obscura = localFont({
  src: "../../../public/fonts/camera-obscura.otf",
  display: "swap",
  variable: "--font-obscura",
});

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const metadata = {
  title: "Hackfest - Dashboard",
  description: "Dashboard",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();
  const headersList = headers();
  const pathname = headersList.get("x-pathname");

  if (user !== null) {
    if (user?.data?.user.role === "ORGANISER" && pathname === "/organiser") {
      return (
        <html lang="en" className={`${obscura.variable}`}>
          <body className={`dark bg-black text-white ${poppins.className}`}>
            <ProgressBarProvider>
              <Toaster richColors expand={true} position="top-center" />
              {children}
            </ProgressBarProvider>
          </body>
        </html>
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <NotFound />;
  }
}
