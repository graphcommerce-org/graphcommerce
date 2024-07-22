/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useForkRef, styled, SxProps, Theme } from '@mui/material'
import {
  LoaderValue,
  VALID_LOADERS,
  ImageConfigComplete,
  imageConfigDefault,
} from 'next/dist/shared/lib/image-config'
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime'
import Head from 'next/head'
import type { ImageLoaderProps, ImageLoader } from 'next/image'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import {
  ImageLoaderPropsWithConfig,
  akamaiLoader,
  cloudinaryLoader,
  configDeviceSizes,
  customLoader,
  defaultLoader,
  imgixLoader,
} from '../config/config'

if (typeof window === 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  ;(global as any).__NEXT_IMAGE_IMPORTED = true
}

export type { ImageLoaderProps, ImageLoader }

type ImageConfig = ImageConfigComplete & { allSizes: number[] }

type ImageLoaderWithConfig = (resolverProps: ImageLoaderPropsWithConfig) => string

const DEFAULT_SIZES: SizesRecord = { 0: '100vw', 1200: '50vw' }

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined] as const
type LoadingValue = (typeof VALID_LOADING_VALUES)[number]

const loaders = new Map<LoaderValue, (props: ImageLoaderPropsWithConfig) => string>([
  ['default', defaultLoader],
  ['imgix', imgixLoader],
  ['cloudinary', cloudinaryLoader],
  ['akamai', akamaiLoader],
  ['custom', customLoader],
])

const VALID_LAYOUT_VALUES = ['fill', 'responsive', 'intrinsic', 'fixed'] as const
type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined

type PlaceholderValue = 'blur' | 'empty'

interface StaticImageData {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

interface StaticRequire {
  default: StaticImageData
}

export type StaticImport = StaticRequire | StaticImageData

export function isStaticRequire(src: StaticRequire | StaticImageData): src is StaticRequire {
  return (src as StaticRequire).default !== undefined
}

export function isStaticImageData(src: StaticRequire | StaticImageData): src is StaticImageData {
  return (src as StaticImageData).src !== undefined
}

export function isStaticImport(src: string | StaticImport): src is StaticImport {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src))
}

export function srcToString(src: StaticImport | string) {
  return isStaticImport(src) ? (isStaticRequire(src) ? src.default : src).src : src
}

// // sort smallest to largest
// const allSizes = [...configDeviceSizes, ...configImageSizes]
// configDeviceSizes.sort((a, b) => a - b)
// allSizes.sort((a, b) => a - b)

function getWidths(
  config: ImageConfig,
  width: number | undefined,
  layout: LayoutValue,
  sizes = '',
): { widths: number[]; kind: 'w' | 'x' } {
  if ((sizes && layout === 'fill') || layout === 'responsive') {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g
    const percentSizes: number[] = []
    // eslint-disable-next-line no-cond-assign
    for (let match: string[] | null; (match = viewportWidthRe.exec(sizes)); match) {
      percentSizes.push(parseInt(match?.[2], 10))
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01

      return {
        widths: config.allSizes.filter((s) => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w',
      }
    }

    return { widths: config.allSizes, kind: 'w' }
  }
  if (typeof width !== 'number' || layout === 'fill') {
    return { widths: configDeviceSizes, kind: 'w' }
  }

  const widths = [
    ...new Set(
      // > This means that most OLED screens that say they are 3x resolution,
      // > are actually 3x in the green color, but only 1.5x in the red and
      // > blue colors. Showing a 3x resolution image in the app vs a 2x
      // > resolution image will be visually the same, though the 3x image
      // > takes significantly more data. Even true 3x resolution screens are
      // > wasteful as the human eye cannot see that level of detail without
      // > something like a magnifying glass.
      // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
      [width, width * 2 /* , width * 3*/].map(
        (w) => config.allSizes.find((p) => p >= w) || config.allSizes[config.allSizes.length - 1],
      ),
    ),
  ]
  return { widths, kind: 'x' }
}

type GenImgAttrsData = {
  src: string
  layout: LayoutValue
  loader: ImageLoaderWithConfig
  width?: number
  quality?: number
  sizes: string
  scale: number
  config: ImageConfig
}

function generateSrcSet(props: GenImgAttrsData): string {
  const { src, layout, width, quality = 52, sizes, loader, scale, config } = props
  const { widths, kind } = getWidths(config, width, layout, sizes)

  return `${widths
    .map(
      (w, i) =>
        `${loader({ config, src, quality, width: w })} ${
          kind === 'w' ? Math.round(w * scale) : i + 1
        }${kind}`,
    )
    .join(', ')}, data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 1w`
}

function defaultImageLoader(loaderProps: ImageLoaderPropsWithConfig) {
  const loaderKey = loaderProps.config?.loader || 'default'
  const load = loaders.get(loaderKey)
  if (load) {
    return load(loaderProps)
  }
  throw new Error(
    `Unknown "loader" found in "next.config.js". Expected: ${VALID_LOADERS.join(
      ', ',
    )}. Received: ${loaderKey}`,
  )
}

type SizesString =
  | `${number}vw`
  | `${number}px`
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions
  | `calc(${string})`
  | `min(${string})`
  | `max(${string})`
  | `clamp(${string})`
type SizesRecord = Record<number, SizesString>
export type Sizes = SizesString | SizesRecord | undefined

function isSizesRecord(sizes?: Sizes): sizes is SizesRecord {
  return typeof sizes === 'object'
}

function sizesEntries(sizes: Sizes): (readonly [number, SizesString | undefined])[] {
  if (isSizesRecord(sizes)) {
    return Object.entries(sizes)
      .map(([breakpoint, size]) => [Number(breakpoint), size] as const)
      .sort(([sizeA], [sizeB]) => sizeB - sizeA)
  }
  return [[0, sizes] as const]
}

function generateSizesString(sizes?: Sizes) {
  return sizesEntries(sizes)
    .map(([breakpoint, size]) => {
      if (breakpoint === 0) return size
      return `(min-width: ${breakpoint}px) ${size}`
    })
    .join(', ')
}

/** Since we're handling stuff ourselves we omit some stuff */
type IntrisincImage = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'sizes'
> & { loading?: LoadingValue }

export type ImageProps = IntrisincImage & {
  src: StaticImport | string
  blurDataURL?: string
  loader?: ImageLoader
  quality?: number
  unoptimized?: boolean
  dontReportWronglySizedImages?: boolean
  width?: number
  height?: number
  pictureProps?: JSX.IntrinsicElements['picture'] & { sx?: SxProps<Theme> }
  /**
   * Possible values:
   *
   * - `fixed`: the image dimensions will not change as the viewport changes (no responsiveness)
   *   similar to the native img element.
   * - `intrinsic`: the image will scale the dimensions down for smaller viewports but maintain the
   *   original dimensions (the width and height given) for larger viewports.
   * - `responsive`: the image will scale the dimensions down for smaller viewports and scale up for
   *   larger viewports.
   */
  layout?: LayoutValue

  placeholder?: PlaceholderValue
  /** Size the image is rendered on mobile */
  sizes?: SizesString | SizesRecord

  sx?: SxProps<Theme>
}

const Img = styled('img')({})
const Picture = styled('picture')({})

// eslint-disable-next-line no-underscore-dangle
const configEnv = process.env.__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      sizes: sizesincoming,
      unoptimized = false,
      loading,
      layout = 'responsive',
      quality,
      width,
      height,
      style,
      loader = defaultImageLoader,
      placeholder = 'empty',
      blurDataURL,
      dontReportWronglySizedImages,
      pictureProps,
      sx = [],
      ...imgProps
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLImageElement>(null)
    const combinedRef = useForkRef(ref, forwardedRef)

    const configContext = useContext(ImageConfigContext)
    const config: ImageConfig = useMemo(() => {
      const c = configEnv || configContext || imageConfigDefault
      const allSizes = [...c.deviceSizes, ...c.imageSizes].sort((a, b) => a - b)
      const deviceSizes = c.deviceSizes.sort((a, b) => a - b)
      return { ...c, allSizes, deviceSizes }
    }, [configContext])

    const sizesOrig =
      layout === 'fixed' && width && !sizesincoming ? (`${width}px` as SizesString) : sizesincoming

    const sizes = generateSizesString(sizesOrig) || generateSizesString(DEFAULT_SIZES)

    useEffect(() => {
      if (process.env.NODE_ENV === 'production') return () => {}
      if (!ref.current || unoptimized || dontReportWronglySizedImages) return () => {}

      // function getContainedSize(img: HTMLImageElement) {
      //   let ratio = img.naturalWidth / img.naturalHeight
      //   let w = img.height * ratio
      //   let h = img.height
      //   if (w > img.width) {
      //     w = img.width
      //     h = img.width / ratio
      //   }
      //   return [w, h]
      // }

      function reportSizes(img: HTMLImageElement) {
        let ratio: number

        const reportedSize = img.clientWidth

        if (reportedSize === 0) return

        let msg = ''
        const sizesEntr = sizesOrig ? sizesEntries(sizesOrig) : sizesEntries(DEFAULT_SIZES)
        const matched = sizesEntr.find(([s]) =>
          s === 0 ? true : window.matchMedia(`(min-width: ${s}px)`).matches,
        )

        const breakpoint = matched?.[0] ?? 0
        const size = matched?.[1]

        const el = document.createElement('div')
        el.setAttribute('style', `width: ${size}`)
        document.body.appendChild(el)
        const measuredWidth = el.getBoundingClientRect().width
        el.remove()
        ratio = measuredWidth ** 2 / reportedSize ** 2
        msg += `Image's "sizes" value '${
          breakpoint > 0 ? `min-width(${breakpoint}px) ` : ''
        }${size}' is incorrect.`

        const isSmall = measuredWidth < 50 && reportedSize < 50

        const round = (nr: number) => Math.round(nr * 100) / 100
        if (!isSmall && ratio > 2) {
          console.warn(
            `[@graphcommerce/image]: ${msg} Currently downloading an image that has ${round(
              ratio,
            )}x too many pixels`,
            img,
          )
        } else if (!isSmall && 1 / ratio > 2) {
          console.warn(
            `[@graphcommerce/image]: ${msg} Currently downloading an image that has ${round(
              1 / ratio,
            )}x too few pixels`,
            img,
          )
        }
      }

      // Warn the user when he isn't providing sizes and how to proceed
      const ro = new ResizeObserver(([entry]) => {
        const img = entry.target as HTMLImageElement
        if (img.naturalWidth) reportSizes(img)
        img.onload = () => reportSizes(img)
      })
      ro.observe(ref.current)

      return () => ro.disconnect()
    }, [layout, ref, unoptimized, sizesOrig, src, width, dontReportWronglySizedImages])

    let staticSrc = ''
    if (isStaticImport(src)) {
      const staticImageData = isStaticRequire(src) ? src.default : src
      if (!staticImageData.src) {
        throw new Error(
          `[@graphcommerce/image]: An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(
            staticImageData,
          )}`,
        )
      }
      blurDataURL = blurDataURL || staticImageData.blurDataURL
      staticSrc = staticImageData.src
      if (!layout || layout !== 'fill') {
        height = height || staticImageData.height
        width = width || staticImageData.width
        if (!staticImageData.height || !staticImageData.width) {
          throw new Error(
            `[@graphcommerce/image]: An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(
              staticImageData,
            )}`,
          )
        }
      }
    }
    src = typeof src === 'string' ? src : staticSrc

    if (process.env.NODE_ENV !== 'production') {
      if (!src) {
        throw new Error(
          `[@graphcommerce/image]: Image is missing required "src" property. Make sure you pass "src" in props to the \`@graphcommerce/image\` component. Received: ${JSON.stringify(
            { width, height, quality },
          )}`,
        )
      }
      if (!VALID_LAYOUT_VALUES.includes(layout)) {
        throw new Error(
          `[@graphcommerce/image]: Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(
            String,
          ).join(',')}.`,
        )
      }
      if (
        (typeof width !== 'undefined' && Number.isNaN(width)) ||
        (typeof height !== 'undefined' && Number.isNaN(height))
      ) {
        throw new Error(
          `[@graphcommerce/image]: Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`,
        )
      }
      if (!VALID_LOADING_VALUES.includes(loading)) {
        throw new Error(
          `[@graphcommerce/image]: Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(
            String,
          ).join(',')}.`,
        )
      }
      if (placeholder === 'blur') {
        if (layout !== 'fill' && (width || 0) * (height || 0) < 1600) {
          console.warn(
            `[@graphcommerce/image]: Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`,
          )
        }
        if (!blurDataURL) {
          const VALID_BLUR_EXT = ['jpeg', 'png', 'webp'] // should match next-image-loader

          throw new Error(
            `[@graphcommerce/image]: Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(
              ',',
            )}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`,
          )
        }
      }
    }

    if (typeof width === 'undefined' && typeof height === 'undefined') {
      if (layout === 'fill') {
        // handle fill
      } else if (process.env.NODE_ENV !== 'production') {
        // <Image src="i.png" />
        throw new Error(
          `[@graphcommerce/image]: Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`,
        )
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    if (src?.startsWith('data:') || src?.startsWith('blob:')) unoptimized = true

    const srcSet3x = generateSrcSet({
      config,
      src,
      layout,
      loader,
      quality,
      sizes,
      width,
      scale: 1.5,
    })
    const srcSet2x = generateSrcSet({
      config,
      src,
      layout,
      loader,
      quality,
      sizes,
      width,
      scale: 1,
    })
    const srcSet1x = generateSrcSet({
      config,
      src,
      layout,
      loader,
      quality,
      sizes,
      width,
      scale: 0.667,
    })

    if (layout !== 'fixed' && !style) style = {}
    if (layout === 'responsive') style = { ...style, width: '100%', height: 'auto' }
    if (layout === 'intrinsic') style = { ...style, width: '100%', height: 'auto', maxWidth: width }
    if (layout === 'fill') style = { ...style, width: '100%', height: '100%' }

    return (
      <>
        {unoptimized ? (
          <Img
            ref={combinedRef}
            {...imgProps}
            loading={loading ?? 'lazy'}
            src={src}
            width={width}
            height={height}
            data-nimg
            sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
          />
        ) : (
          <Picture {...pictureProps}>
            <source media='(-webkit-min-device-pixel-ratio: 2.5)' srcSet={srcSet3x} sizes={sizes} />
            <source media='(-webkit-min-device-pixel-ratio: 1.5)' srcSet={srcSet2x} sizes={sizes} />
            <source
              media='(-webkit-max-device-pixel-ratio: 1.49)'
              srcSet={srcSet1x}
              sizes={sizes}
            />
            <Img
              ref={combinedRef}
              {...imgProps}
              src={src}
              loading={loading ?? 'lazy'}
              width={width}
              height={height}
              sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
              sizes={sizes}
              data-nimg
              decoding='async'
            />
          </Picture>
        )}
        {loading === 'eager' && (
          <Head>
            {unoptimized ? (
              <link key={`__nimg-unoptimized-${src}`} rel='preload' as='image' href={src} />
            ) : (
              <>
                <link
                  key={`img-${srcSet3x}${sizes}`}
                  rel='preload'
                  as='image'
                  media='(-webkit-min-device-pixel-ratio: 2.5)'
                  imageSrcSet={srcSet3x}
                  imageSizes={sizes}
                />
                <link
                  key={`img-${srcSet2x}${sizes}`}
                  rel='preload'
                  as='image'
                  media='(-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49)'
                  imageSrcSet={srcSet2x}
                  imageSizes={sizes}
                />
                <link
                  key={`img-${srcSet1x}${sizes}`}
                  rel='preload'
                  as='image'
                  media='(-webkit-max-device-pixel-ratio: 1.49)'
                  imageSrcSet={srcSet1x}
                  imageSizes={sizes}
                />
              </>
            )}
          </Head>
        )}
      </>
    )
  },
)
Image.displayName = 'Image'

export { Image }
