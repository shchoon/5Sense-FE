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
  /* images: {
    domains: ['oh-sense.s3.ap-northeast-2.amazonaws.com']
  }, */
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  /* async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_IP_ADDRESS}/:path*`
      }
    ]
  }, */
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/student'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  },
  reactStrictMode: false
}

module.exports = nextConfig
