/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // No base path needed - using custom domain renaym.com
  basePath: '',

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;

