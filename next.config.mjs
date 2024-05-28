/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    MONGODB_URI: process.env.MONGODB_URI || "",
    MONGODB_DB: process.env.MONGODB_DB || "",
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // Add the domain of your image source here
  },
};

export default nextConfig;
