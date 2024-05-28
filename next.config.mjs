// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: "8tB65hyR3rpy5gxWI+Q9F/S+noG6d4NkB5AGf2PMbrM=",
  },
};

export default nextConfig;
