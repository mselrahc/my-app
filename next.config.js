/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://191.96.57.123:8000/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
