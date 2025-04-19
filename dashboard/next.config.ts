import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Only use static export in production
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',  // Static HTML export for production only
    // Disable server-side features in production
    images: {
      unoptimized: true,
    },
  } : {}),
};

export default nextConfig;
