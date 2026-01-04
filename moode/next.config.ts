/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import { NextConfig } from "next/dist/server/config-shared";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});
const nextConfig = {
  experimental: {
    turbopack: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

export default withPWA(nextConfig as NextConfig);
