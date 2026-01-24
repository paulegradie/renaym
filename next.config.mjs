const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Base path for GitHub Pages subdirectory (paulgradie.com/Renaime)
  // Only apply in production, so local dev works at localhost:3000/
  basePath: isProd ? '/Renaime' : '',

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;

