/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["antd"],
  images: {
    deviceSizes: [36, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});
module.exports = withBundleAnalyzer({});
// images: {
// 	remotePatterns: [
// 	  {
// 		 protocol: 'https',
// 		 hostname: 'example.com',
// 		 port: '',
// 		 pathname: '/account123/**',
// 	  },
// 	],
//  },
