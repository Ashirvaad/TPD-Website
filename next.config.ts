import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep dev output separate so `next build` can't overwrite a running dev server's files.
  // NEXT_DIST_DIR allows a throwaway build check without touching a running `next start`.
  distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "development" ? ".next-dev" : ".next"),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
