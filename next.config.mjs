/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  eslint: {
    // Warnings don't fail the build, only errors do — this makes warnings non-fatal
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
