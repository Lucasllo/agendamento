// Configuration options for Next.js

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: true, // Remove console.log in production
  },
};

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
