import { Poppins } from 'next/font/google';
import '../globals.css';
import { siteMetadata } from '@/src/constants';
import { headers } from 'next/headers';
import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import localFont from 'next/font/local';
import {Toaster} from "sonner"

const obscura = localFont({
  src: '../../../public/fonts/camera-obscura.otf',
  display: 'swap',
  variable: '--font-obscura',
});

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children, ...customMeta } = props;
  const headersList = headers();
  const pathname = headersList.get('x-url') || '';

  const meta = {
    title: `${
      pathname === ''
        ? ''
        : pathname.charAt(1).toUpperCase() + pathname.slice(2) + ' | '
    }${siteMetadata.title}`,
    description: siteMetadata.description,
    type: 'Website',
    canonicalUrl: `${siteMetadata.siteUrl}${pathname}`,
    isArticle: false,
    ...customMeta,
  };

  return (
    <html lang="en" className={`${obscura.variable}`}>
      <head>
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
        <meta property="og:image" content={'/logos/logo.png'} />
        {/* TODO: OG Image API */}
      </head>
      <body className={`dark bg-black text-white ${poppins.className}`}>
      <Toaster richColors position="top-center" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
