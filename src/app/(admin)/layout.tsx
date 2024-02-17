import { Poppins } from 'next/font/google';
import '../globals.css';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import ProgressBarProvider from '@/src/components/progressBarProvider';
import { Metadata } from 'next';
import NotFound from '../(routes)/not-found';
import FaqAdmin from '@/src/components/faq/faqAdmin';
import { userInfo } from '@/src/lib/session';

const obscura = localFont({
  src: '../../../public/fonts/camera-obscura.otf',
  display: 'swap',
  variable: '--font-obscura',
});

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const metadata: Metadata = {
  title: 'Hackfest - Admin Dashboard',
  description: 'Admin Dashboard',
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
};

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userInfo();

  if (user !== null && user.role === 'ADMIN') {
    return (
      <html lang="en" className={`${obscura.variable}`}>
        <body className={`dark bg-black text-white ${poppins.className}`}>
          <ProgressBarProvider>
            <Toaster richColors expand={true} position="top-center" />

            {children}
            <div className="sticky bottom-5 ml-5">
              <FaqAdmin />
            </div>
          </ProgressBarProvider>
        </body>
      </html>
    );
  } else {
    return <NotFound />;
  }
}
