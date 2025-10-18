import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  // optional: turn off telemetry when build container
  telemetry: false,
}

export default nextConfig
