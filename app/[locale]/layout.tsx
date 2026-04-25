import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./../globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';



const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tecno-nextjs-production.up.railway.app"),
  title: "Tecno Industries - Precision Surgical Instruments",
  description:
    "Leading manufacturer of precision surgical instruments with global reach. ISO certified quality, advanced manufacturing technology, and commitment to healthcare excellence.",
  keywords:
    "surgical instruments, surgical scissors, forceps, needle holders, precision instruments, medical devices",
  authors: [{ name: "Tecno Industries" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tecnoindustries.com",
    siteName: "Tecno Industries",
    description:
      "Precision surgical instruments manufacturer with ISO certification and global distribution.",
    images: [
      {
        url: "/tecno-logo.png",
        width: 1200,
        height: 600,
        alt: "Tecno Industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecno Industries - Precision Surgical Instruments",
    description:
      "Leading manufacturer of precision surgical instruments with global reach.",
    images: ["/tecno-logo.png"],
  },
};

import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tecno-t-logo.png" />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased bg-white text-black`}
      >
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
