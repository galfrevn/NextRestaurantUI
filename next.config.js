const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: [
      "crombie.dev",
      "images.prismic.io",
      "upload.wikimedia.org",
      "media2.giphy.com",
      "media.graphassets.com"
    ],
  },
});