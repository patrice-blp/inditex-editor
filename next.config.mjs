/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@react-dnd",
    "dnd-core",
    "react-dnd",
    "react-dnd-html5-backend",
  ],
};

export default nextConfig;
