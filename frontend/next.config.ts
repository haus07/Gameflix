import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: false,
   images: {
    domains: ['placehold.co'], // thêm domain của ảnh bạn
  },
};

export default nextConfig;
