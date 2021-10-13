/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module '*.po' {
  const messages: Record<
    string,
    string | Array<string | Array<string | (string | undefined) | Record<string, unknown>>>
  >

  export const messages
}
