import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/src/app/globals.css";
import { userInfo } from "@/src/lib/session";
import FaqAdmin from "@/src/components/faq/faqAdmin";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const metadata: Metadata = {
  title: "Hackfest - Admin Dashboard",
  description: "Admin Dashboard",
};

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userInfo();

  if (user !== null && user.role === "ADMIN") {
    return (
      <html lang="en">
        <body className={`${poppins.className} bg-black text-white`}>
          {children}
          <div className="sticky bottom-5 ml-5">
            <FaqAdmin />
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={`${poppins.className} bg-black text-white`}>
          <h1>Unauthorized</h1>
        </body>
      </html>
    );
  }
}
