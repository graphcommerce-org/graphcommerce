declare module 'next-transpile-modules' {
  import type { NextConfig } from 'next/dist/server/config'

  export default function (
    modules: string[],
    options?: {
      resolveSymlinks?: boolean
      debug?: boolean
      __unstable_matcher?: (path: string) => boolean
    },
  ): (nextConfig: NextConfig) => NextConfig
}
