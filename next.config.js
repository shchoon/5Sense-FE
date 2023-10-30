/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
        {
            source: "/:path*",
            destination: "http://13.209.77.49:4000/:path*",
        },
        ];
    },
}

module.exports = nextConfig
