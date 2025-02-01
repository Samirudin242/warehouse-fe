import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
