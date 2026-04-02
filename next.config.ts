import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.externals.push("canvas", "jsdom");
    return config;
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {},
};

export default nextConfig;
