/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['remark-gfm', '@ams-js/headless']); // pass the modules you would like to see transpiled
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    domains: [
      'imagedelivery.net',
      'images.unsplash.com',
      'user-images.githubusercontent.com',
    ],
  },
};

module.exports = withTM(nextConfig);
