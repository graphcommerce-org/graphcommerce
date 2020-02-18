/// <reference types="next" />
/// <reference types="next/types/global" />
import 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
