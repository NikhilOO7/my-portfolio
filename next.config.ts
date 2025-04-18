import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        domains: ["example.com"], // Add domains for external images if needed
    },
};

export default nextConfig;