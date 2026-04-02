"use client";

// This file only imports React Three Fiber when it's actually rendered client-side
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ThreeViewer = dynamic(
  async () => {
    // Dynamically import the actual Three.js component
    return import("./InstrumentViewer3DContent");
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  },
);

export default function InstrumentViewer3DClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[400px] bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ThreeViewer />
    </Suspense>
  );
}
