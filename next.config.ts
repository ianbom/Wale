import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  async redirects() {
    return [
      { source: "/en/703qix0x6", destination: "/tours/tangkoko", permanent: true },
      { source: "/tomohon-tour", destination: "/tours/minahasa-highlands", permanent: true },
      { source: "/tangkoko-tour", destination: "/tours/tangkoko", permanent: true },
      { source: "/bunaken-tour", destination: "/tours/bunaken", permanent: true },
    ];
  },
  images: {
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
