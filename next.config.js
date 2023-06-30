const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        hostname: '**'
      }
    ]
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@img/*'] = path.resolve(__dirname, './public/imgs/*');
    return config;
  },
};

module.exports = nextConfig;
