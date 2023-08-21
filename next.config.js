/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  // swcMinify: true,
  compiler: {
    // * remove console logs except for error logs
    removeConsole:
        process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
})

module.exports = nextConfig;
