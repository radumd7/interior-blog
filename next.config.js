/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  experimental: {
    scrollRestoration: true
  }
}

module.exports = nextConfig
