import './Theme/types'
// eslint-disable-next-line react/no-typos
import 'react'

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
