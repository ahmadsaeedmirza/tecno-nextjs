import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tecno-t-logo.png" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-black`}
      >
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </body>
    </html>
  );
}
