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
      "cache-backend-mcd.mcdonaldscupones.com",
      "d1csarkz8obe9u.cloudfront.net",
      "i.pinimg.com",
      "www.bizadmark.com",
      "s3-eu-central-1.amazonaws.com"
    ],
  },
});
