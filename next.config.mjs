/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["localhost:3000", "localhost:3001",'https://orange-space-happiness-wr97pgjvx5qxc9qwp-3000.app.github.dev/', 'https://orange-space-happiness-wr97pgjvx5qxc9qwp-3001.app.github.dev/'],
    },
    
  }
};

export default nextConfig;
