// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly __NEXT_IMAGE_OPTS: {
      deviceSizes: number[]
      imageSizes: number[]
      loader: LoaderKey
      path: string
      domains?: string[]
    }
  }
}
