/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface Global {
    __NEXT_IMAGE_IMPORTED?: boolean
  }
}
