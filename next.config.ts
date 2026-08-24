import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      // Canonicalize www -> apex. Framework-level redirect instead of
      // Proxy/Middleware: Next 16's Proxy always runs on the Node.js
      // runtime, which @opennextjs/cloudflare doesn't support.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fintech5group.com' }],
        destination: 'https://fintech5group.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
