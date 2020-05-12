/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

import 'react'

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
