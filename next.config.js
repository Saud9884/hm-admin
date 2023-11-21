/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "doo4xkltp",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "e527gdsc"
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
