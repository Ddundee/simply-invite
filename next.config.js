/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import NextBundlerAnalyzer from "@next/bundle-analyzer";

/** @type {import("next").NextConfig} */
const coreConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
            {
                source: "/ingest/decide",
                destination: "https://us.i.posthog.com/decide",
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

const withBundleAnalyzer = NextBundlerAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(coreConfig);
