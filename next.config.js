const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oh-sense.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },

  reactStrictMode: false
}

module.exports = nextConfig
