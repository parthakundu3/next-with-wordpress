// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com', // for random Unsplash fallbacks
      'http://localhost:8080', // replace with your WP domain
      'secure.gravatar.com', // if WP uses gravatar images
      'images.unsplash.com', // if using direct Unsplash images
    ],
  },
};

module.exports = nextConfig;
