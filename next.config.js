const API_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${API_ADDRESS}/:path*`
      }
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  reactStrictMode: false
}

module.exports = nextConfig
