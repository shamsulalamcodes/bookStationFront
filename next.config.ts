import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "covers.openlibrary.org"
            }, {
                protocol: "https",
                hostname: "dreieck.com"
            }
        ],
    },
}

export default nextConfig
