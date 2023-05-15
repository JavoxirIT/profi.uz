/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["antd"],
  //   Автоматическое копирование отслеживаемых файлов
  //   output: "standalone",
  //   outputFileTracingRoot: path.join(__dirname, "../../"),

  images: {
    deviceSizes: [36, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https//4biz.uz",
      },
    ],
  },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true,
// });
// module.exports = withBundleAnalyzer({});
