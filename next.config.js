/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: dev,
  // The service worker precached every screenshot in public/ (129 files, most
  // of the site's bytes) on the first visit. Hashed assets still get precached;
  // pictures load from the HTTP cache, where they belong.
  publicExcludes: ['!**/*.jpg', '!**/*.jpeg', '!**/*.png', '!**/*.webp', '!**/*.avif'],
  cleanupOutdatedCaches: true,
})

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  // Next inlines its bootstrap script and the page data; framer-motion and
  // next-themes inline styles. Without nonces these two must stay inline.
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  // No frame-ancestors / X-Frame-Options: the site is previewed inside an
  // iframe on another origin, and clickjacking a portfolio buys nothing.
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Content-Security-Policy', value: csp },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // keep only error logs in production builds
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Variant filenames are not content-hashed, so a day of caching is the
        // honest maximum: replacing a screenshot must not stick for a year.
        source: '/:folder(case|projects)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
