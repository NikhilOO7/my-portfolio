import type { NextConfig } from "next";
import { fileURLToPath } from 'url';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        domains: ["example.com"], // Add domains for external images if needed
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp3|wav|ogg)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]'
            }
        });
        return config;
    },
};

export default nextConfig;