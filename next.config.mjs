/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export disabled temporarily - dynamic routes need special handling
  // output: 'export',
  // Base path for subdirectory deployment (if deploying in /portfolio subdirectory)
  // If you want it at root domain, remove basePath and use different Passenger config
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Empty for root, '/portfolio' for subdirectory
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
