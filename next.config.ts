import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React 19.2 native View Transitions for route changes (DECISION-LOG 2026-06-10)
    viewTransition: true,
  },
};

export default nextConfig;
