/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: undefined,
  },
  trailingSlash: false,
  output: undefined, // Ensure we're not in export mode
  async redirects() {
    return [
      {
        source: '/',
        destination: '/complaint',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig