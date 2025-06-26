import type { NextConfig } from "next";
import path from "path";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Allow importing .br files (Brotli-compressed Chromium)
    config.module.rules.push({
      test: /\.br$/,
      type: "asset/resource",
      generator: {
        filename: "static/chromium/[name][ext]",
      },
    });

    return config;
  },
  // Optional: If you want to include specific folders in the output
  experimental: {
    // This helps ensure certain node_modules are not excluded
    serverComponentsExternalPackages: ["@sparticuz/chromium"],
  },
};

export default nextConfig;