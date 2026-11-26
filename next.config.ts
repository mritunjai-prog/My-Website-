import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Allow the sandbox preview host to load dev assets / HMR.
  allowedDevOrigins: ["*.e2b.app", "localhost:3000"],
  images: {
    qualities: [75, 82],
    formats: ["image/avif", "image/webp"],
  },
  // The old Vite build shipped a Supabase CMS at /login and /blog that was
  // never linked from the portfolio. Keep the URLs from 404-ing.
  async redirects() {
    return [
      { source: "/login", destination: "/", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
    ];
  },
  experimental: {
    // Smaller client payloads for the animation libraries.
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
