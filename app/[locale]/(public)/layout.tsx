"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="h-screen bg-black" />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
