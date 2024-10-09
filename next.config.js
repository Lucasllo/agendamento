// Configuration options for Next.js

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {};

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
