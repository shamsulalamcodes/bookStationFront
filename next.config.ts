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
    allowedDevOrigins: [
        '192.168.0.176',
        'bookstationed.vercel.app'
    ],
}

export default nextConfig
