import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  // optional: matikan telemetry saat build container
  telemetry: false,
}

export default nextConfig
