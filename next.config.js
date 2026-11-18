/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    // keep only error logs in production builds
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
})

module.exports = nextConfig
