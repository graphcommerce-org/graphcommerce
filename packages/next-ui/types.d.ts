/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

import './Theme/createTheme'
// eslint-disable-next-line react/no-typos
import 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    inert?: 'true'
  }
}

declare module '*.po' {
  const messages: Record<
    string,
    string | Array<string | Array<string | (string | undefined) | Record<string, unknown>>>
  >

  export const messages
}
