import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { siteMetadata } from "~/constants";
import Navbar from "../navbar";
import Footer from "../footer";
import ProgressBarProvider from "../progressBarProvider";
import Head from "next/head";
import { useRouter } from "next/router";

const obscura = localFont({
  src: "../../../public/fonts/camera-obscura.otf",
  display: "swap",
  variable: "--font-obscura",
});

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const pathname = router.pathname;

  const meta = {
    title: `${
      pathname === "/"
        ? ""
        : pathname.charAt(1).toUpperCase() + pathname.slice(2) + " | "
    }${siteMetadata.title}`,
    description: siteMetadata.description,
    type: "Website",
    canonicalUrl: `${siteMetadata.siteUrl}${pathname}`,
    isArticle: false,
    metadataBase: new URL(siteMetadata.siteUrl),
    openGraph: {
      images: `/opengraph.png`,
    },
    twitter: {
      images: `/opengraph.png`,
    },
    ...customMeta,
  };

  return (
    <html lang="en" className={`${obscura.variable}`}>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000"></meta>
        <meta
          name="msapplication-square150x150logo"
          content="/favicons/mstile-150x150.png"
        />
        <link rel="canonical" href={meta.canonicalUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:image"
          content={`${siteMetadata.siteUrl}/opengraph.png`}
        />
      </Head>
      <body className={`dark bg-black text-white ${poppins.className}`}>
        <ProgressBarProvider>
          <Toaster richColors expand={true} position="bottom-center" />
          <Navbar />
          {children}
          <Footer />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
