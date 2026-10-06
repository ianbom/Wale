import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  images: {
    unoptimized: true,
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
