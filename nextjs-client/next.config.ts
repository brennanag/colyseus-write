const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable double-mounting in development
  turbopack: {
    root: path.join(__dirname), // Sets root to nextjs-client directory
  },
};

module.exports = nextConfig;
