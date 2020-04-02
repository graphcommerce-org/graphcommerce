/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

import 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}

declare global {
  interface Navigator {
    connection: {
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
      addEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
      ): void
      addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
      ): void
      removeEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
      ): void
      removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
      ): void
    }
  }
}
