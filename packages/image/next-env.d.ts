/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
/// <reference types="@reachdigital/next-ui/types" />

declare namespace NodeJS {
  interface Global {
    __NEXT_IMAGE_IMPORTED?: boolean
  }
}
