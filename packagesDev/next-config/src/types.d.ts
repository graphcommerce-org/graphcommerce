declare module 'next-transpile-modules' {
  export default function (
    modules: string[],
    options?: {
      resolveSymlinks?: boolean
      debug?: boolean
      __unstable_matcher?: (path: string) => boolean
    },
  ): (nextConfig) => nextConfig
}
