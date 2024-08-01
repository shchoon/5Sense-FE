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
        source: '/students',
        has: [
          {
            type: 'query',
            key: 'take',
            value: '(?<take>.*)'
          },
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)'
          },
          {
            type: 'query',
            key: 'searchBy',
            value: '(?<searchBy>.*)'
          }
        ],
        destination: `http://43.203.231.217:3000/students?take=:take&page=:page&serchBy=:searchBy*`
      },
      {
        source: '/lessons/:path*',
        destination: `http://43.203.231.217:3000/lessons/:path*`
      },
      {
        source: '/centers/:path*',
        destination: `http://43.203.231.217:3000/centers/:path*`
      },
      {
        source: '/auth/:path*',
        destination: 'http://43.203.231.217:3000/auth/:path*'
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
