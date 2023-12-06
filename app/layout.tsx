import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Hackfest 2024',
  description:
    'Hackfest is a 36h long National level Hackathon at NMAMIT, Nitte coupled with a lot of Interactive Activities & Tech Conference talks!',
};

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
