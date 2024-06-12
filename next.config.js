const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  images: {
    domains: ['oh-sense.s3.ap-northeast-2.amazonaws.com']
  },
  reactStrictMode: false
}

module.exports = nextConfig
