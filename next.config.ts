import { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  reactStrictMode: false,

  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
  },

  webpack(config: any) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },

  images: {
    domains: [
      "storage.googleapis.com",
      "res.cloudinary.com",
      "https://www.google.com",
    ],
  },
});

export default nextConfig;
