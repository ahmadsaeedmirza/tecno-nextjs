"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const criticalImages = [
  "/hero-slide-1.jpg",
  "/hero-slide-2.jpg",
  "/hero-slide-3.jpg",
  "/hero-slide-4.jpg",
];

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

const preloadVideo = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.oncanplaythrough = () => resolve();
    video.onerror = () => resolve();
    // Timeout fallback for mobile browsers that block video preload
    const timer = setTimeout(() => resolve(), 4000);
    video.oncanplaythrough = () => {
      clearTimeout(timer);
      resolve();
    };
    video.src = src;
  });

// Glitter particle component
const GlitterParticles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 2 + 1.5,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(24, 85%, 65%) 0%, hsl(32, 90%, 55%) 50%, transparent 100%)`,
          }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const LoadingScreen = ({
  onComplete = () => {},
}: {
  onComplete?: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const totalAssets = useRef(0);
  const loadedAssets = useRef(0);

  useEffect(() => {
    // Hard timeout: never stay on loading screen longer than 8 seconds
    const maxTimeout = setTimeout(() => {
      setAssetsReady(true);
    }, 8000);

    const loadAssets = async () => {
      try {
        const imageSrcs = criticalImages;
        const heroVideoSrc = "/hero-video.mp4";

        const allTasks = [
          ...imageSrcs.map((src) => preloadImage(src)),
          preloadVideo(heroVideoSrc),
        ];
        totalAssets.current = allTasks.length;

        const tracked = allTasks.map((p) =>
          p.then(() => {
            loadedAssets.current += 1;
            setProgress(
              Math.round((loadedAssets.current / totalAssets.current) * 100),
            );
          }),
        );

        await Promise.all(tracked);
      } catch {
        // If anything fails, proceed anyway
      }
      setAssetsReady(true);
    };

    loadAssets();

    return () => clearTimeout(maxTimeout);
  }, []);

  useEffect(() => {
    if (assetsReady) {
      // Ensure progress bar shows 100%
      setProgress(100);
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 800);
      }, 400);
    }
  }, [assetsReady, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
        >
          {/* Glitter background */}
          <GlitterParticles />

          {/* Subtle radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(24, 60%, 12%) 0%, transparent 60%)",
            }}
          />

          {/* TECNO text */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.35em] uppercase"
            style={{
              color: "hsl(24, 85%, 48%)",
              textShadow:
                "0 0 40px hsl(24, 85%, 48% / 0.3), 0 0 80px hsl(24, 85%, 48% / 0.1)",
            }}
          >
            TECNO
          </motion.h1>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 relative z-10 flex flex-col items-center gap-3"
          >
            <div className="w-40 sm:w-52 md:w-64 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(24, 85%, 42%), hsl(24, 85%, 55%), hsl(32, 90%, 58%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.span
              className="text-[10px] tracking-[0.25em] font-medium tabular-nums"
              style={{ color: "hsl(24, 85%, 48% / 0.5)" }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
