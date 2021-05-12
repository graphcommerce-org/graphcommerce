/* eslint-disable jsx-a11y/alt-text */
import useForwardedRef from '@bedrock-layout/use-forwarded-ref'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import useConnectionType from './useConnectionType'

export const imageMimeTypes: ImageMimeTypes[] = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
]

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
export type ImageMimeTypes =
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/x-icon'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp'

export type PictureResponsiveProps = Omit<JSX.IntrinsicElements['img'], 'ref' | 'src'> & {
  alt: string
  srcSets: Partial<Record<ImageMimeTypes, string>>
  width: number
  height: number
}

/** Checks whether an image is currently in the viewport */
function isInViewport(elem: HTMLImageElement): boolean {
  const { top, right, bottom, left } = elem.getBoundingClientRect()
  return bottom >= 0 && right >= 0 && top <= window.innerHeight && left <= window.innerWidth
}

/**
 * 1. Images in viewport will be downloaded and then upgraded.
 * 2. Image not in viewport + loading=lazy support: upgrade directly
 * 3. Image not in viewport + intersection observer: upgrade when almost in viewport
 * 4. Image not in viewport + fallback: upgrade directly
 */
function requestUpgrade(img: HTMLImageElement) {
  return new Promise((resolve) => {
    const inViewport = isInViewport(img)

    if (inViewport && !img.complete) {
      // Wait for the in-viewport image to be loaded before start upgrading the image.
      // Because if the initial image hasn't loaded it will cancel the download and restart a new
      // download causing a FOUC
      img.onload = () => resolve(true)
    } else if (inViewport) {
      // Image in the viewport is loaded, we can directly start upgrading it to enhance the experience
      // as soon as possible.
      resolve(true)
    } else if (!inViewport && 'loading' in HTMLImageElement.prototype === true) {
      // Native support for lazy loading.
      // Since the image isn't in the viewport, it's ok for the current download to be cancelled
      resolve(true)
    } else if (!inViewport && 'IntersectionObserver' in window) {
      // Fallback when loading="lazy" is not supported but IntersectionObserver is supported
      const intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries
            .filter((entry) => entry.isIntersecting === undefined || entry.isIntersecting)
            .forEach(() => {
              intersectionObserver.unobserve(img)
              resolve(true)
            })
        },
        { rootMargin: '3000px' },
        // Uses the lowest value used in Chrome natively:
        // https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/frame/settings.json5?l=971-1003&rcl=e8f3cf0bbe085fee0d1b468e84395aad3ebb2cad
      )
      intersectionObserver.observe(img)
    } else if (!inViewport) {
      // Browsers that don't support loading="lazy" or the IntersectionObserver will download
      // everything.
      resolve(true)
    }
  })
}

const PictureResponsive = React.forwardRef<HTMLImageElement, PictureResponsiveProps>(
  (props, forwardedRef) => {
    const { srcSets, ...imgProps } = props
    imgProps.loading ??= 'lazy'

    const ref = useForwardedRef(forwardedRef)

    const { width } = useResizeObserver<HTMLImageElement>({ ref: ref.current })

    // We get the network type and set it to 4g safari
    const connectionType = useConnectionType()

    // By default (on the server) we scale down the image for the lighthouse test for the Nexus 5X
    const [size, setSize] = useState<number>(Math.ceil(imgProps.width / 3))

    useEffect(() => {
      // Excuted on the client, when the image is rendered we can upgrade the image to high resolution.
      if (!ref.current || !width) return

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      requestUpgrade(ref.current).then(() => {
        // If the connection is slow, request a lower quality image
        setSize(Math.ceil(width / (connectionType === '4g' ? 1 : window.devicePixelRatio)))
      })
    }, [width, connectionType, ref])

    const types = Object.keys(srcSets)
    const firstSet = srcSets[types[0]] as string

    let variant = 'picture'
    if (types.length === 1) variant = 'srcSet'
    if (firstSet.split(' ').length === 1) variant = 'src'

    return (
      <>
        {variant === 'src' && <img ref={ref} {...imgProps} src={firstSet} />}
        {variant === 'srcSet' && <img ref={ref} {...imgProps} srcSet={firstSet} />}
        {variant === 'picture' && (
          <picture>
            {Object.entries(srcSets).map(([type, srcSet]) => (
              <source key={type} type={type} srcSet={srcSet} sizes={`${size}px`} />
            ))}
            <img ref={ref} {...imgProps} />
          </picture>
        )}
        {props.loading === 'eager' && (
          <Head>
            {variant === 'src' ? (
              <link rel='preload' as='image' href={firstSet} />
            ) : (
              // @ts-expect-error: imagesrcset is not yet in the link element type
              <link rel='preload' as='image' imagesrcset={firstSet} imagesizes={`${size}px`} />
            )}
          </Head>
        )}
      </>
    )
  },
)
PictureResponsive.displayName = 'PictureResponsive'

export default PictureResponsive
