/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.9', '192.168.0.*', 'localhost', '0.0.0.0'],
  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
