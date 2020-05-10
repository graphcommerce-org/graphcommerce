import React, { useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import useConnectionType from './useConnectionType'

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

export type PictureResponsiveProps = Omit<JSX.IntrinsicElements['img'], 'src' | 'loading'> & {
  alt: string
  srcSets: Partial<Record<ImageMimeTypes, string>>
  width: number
  height: number
}

/**
 * Checks whether an image is currently in the viewport
 */
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
      img.onload = () => resolve()
    } else if (inViewport) {
      // Image in the viewport is loaded, we can directly start upgrading it to enhance the experience
      // as soon as possible.
      resolve()
    } else if (!inViewport && 'loading' in HTMLImageElement.prototype === true) {
      // Native support for lazy loading.
      // Since the image isn't in the viewport, it's ok for the current download to be cancelled
      resolve()
    } else if (!inViewport && 'IntersectionObserver' in window) {
      // Fallback when loading="lazy" is not supported but IntersectionObserver is supported
      const intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries
            .filter((entry) => entry.isIntersecting === undefined || entry.isIntersecting)
            .forEach(() => {
              intersectionObserver.unobserve(img)
              resolve()
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
      resolve()
    }
  })
}

const PictureResponsive: React.FC<PictureResponsiveProps> = ({ srcSets, alt, ...imgProps }) => {
  const ref = useRef<HTMLImageElement>(null)
  const { width } = useResizeObserver({ ref })

  // We get the network type and set it to 4g safari
  const connectionType = useConnectionType()

  // By default (on the server) we scale down the image for the lighthouse test for the Nexus 5X
  const [size, setSize] = useState<number>(Math.round(imgProps.width / 2.6))

  useEffect(() => {
    // Excuted on the client, when the image is rendered we can upgrade the image to high resolution.
    if (!ref.current || !width) return
    requestUpgrade(ref.current).then(() => {
      // If the connection is slow, request a lower quality image
      setSize(Math.round(width / (connectionType === '4g' ? 1 : window.devicePixelRatio)))
    })
  }, [width, connectionType])

  return (
    <picture>
      {Object.entries(srcSets).map(([type, srcSet]) => (
        <source key={type} type={type} srcSet={srcSet} sizes={`${size}px`} />
      ))}
      <img ref={ref} alt={alt} {...imgProps} loading='lazy' />
    </picture>
  )
}

export default PictureResponsive
