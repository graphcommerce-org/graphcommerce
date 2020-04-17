/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />
/// <reference path="./generated/graphql.d.ts" />

import 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
