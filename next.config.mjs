/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['src'] // Only lint the 'src' directory
  }
};

export default nextConfig;