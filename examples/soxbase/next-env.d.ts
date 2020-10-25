/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

// eslint-disable-next-line react/no-typos
import 'react'

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
