import { Providers } from './providers'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Box, Button } from '@chakra-ui/react';
import AddButton from '@/components/AddButton';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Track Your Vinyl Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Providers>
            <AddButton />
            {children}
          </Providers>
        </body>

    </html>
  );
}
