import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA)
  // distDir: 'build', // Changes the build output directory to `build`
  images: {
    remotePatterns: [new URL("https://randomuser.me/api/portraits/**")]
  }
}

export default nextConfig