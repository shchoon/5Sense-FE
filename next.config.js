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
        source: 'https://5-sense-fe.vercel.app/students/:path*',
        destination: `${process.env.NEXT_PUBLIC_IP_ADDRESS}/students/:path*`
      },
      {
        source: 'https://5-sense-fe.vercel.app/lessons/:path*',
        destination: `${process.env.NEXT_PUBLIC_IP_ADDRESS}/lessons/:path*`
      },
      {
        source: 'https://5-sense-fe.vercel.app/centers/:path*',
        destination: `${process.env.NEXT_PUBLIC_IP_ADDRESS}/centers/:path*`
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
