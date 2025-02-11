/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add jspdf as an external module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        canvas: false,
        'canvas-renderer': false
      };
    }
    return config;
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
