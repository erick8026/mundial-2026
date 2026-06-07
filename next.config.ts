import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: '/Users/erickmr/Documents/mundial',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
};

export default nextConfig;
