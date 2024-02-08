import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/src/app/globals.css';
import { getServerSession } from 'next-auth';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const metadata: Metadata = {
  title: 'Hackfest - Admin Dashboard',
  description: 'Admin Dashboard',
};

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = (await getServerSession()) ?? { user: null };

  if (user !== null && user.role === 'ADMIN') {
    return (
      <html lang="en">
        <body className={`${poppins.className} bg-black text-white`}>
          {children}
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
