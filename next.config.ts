import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    basePath: isProd ? '/silent-sort' : '',
    output: "export",
    images: {
        unoptimized: true,
    },
    reactStrictMode: false,
};

export default nextConfig;
