const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/student',
        destination: 'https://www.naver.com'
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
