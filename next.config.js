const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/:path*',
        destination: 'http://3.39.24.91:3000/:path*'
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
