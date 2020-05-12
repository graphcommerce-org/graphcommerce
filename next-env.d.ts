/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

import 'react'

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}

declare namespace Window {
  export interface ProcessEnv {
    NEXT_PUBLIC_GRAPHQL: string
    NEXT_PUBLIC_GRAPHQL_BEARER: string
    NEXT_PUBLIC_GOOGLE_MAPS_API: string
  }
}
