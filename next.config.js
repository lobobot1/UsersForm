/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.cache = true
    }
    return config
  },
  output: 'standalone',
}

module.exports = nextConfig
