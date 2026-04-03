import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
};

export default withNextIntl(nextConfig);
