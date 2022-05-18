/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'imagedelivery.net',
      'images.unsplash.com',
      'user-images.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
