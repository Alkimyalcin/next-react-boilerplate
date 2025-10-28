import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Electron için static export kapalı olmalı (API routes için)
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // Electron için webpack ayarları
  webpack: (config, { isServer }) => {
    // better-sqlite3 için externals ayarı
    if (isServer) {
      config.externals.push("better-sqlite3");
    }
    return config;
  },
};

export default nextConfig;
