import React, { useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import useNetworkStatus from './useNetworkStatus'

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

export type PictureResonsiveProps = Omit<JSX.IntrinsicElements['img'], 'src' | 'loading'> & {
  alt: string
  srcSets: Partial<Record<ImageMimeTypes, string>>
  width: number
  height: number
}

// todo(paales) Height is not properly set on initial page load?

function isInViewport(elem: HTMLImageElement): boolean {
  const { top, right, bottom, left } = elem.getBoundingClientRect()
  return bottom >= 0 && right >= 0 && top <= window.innerHeight && left <= window.innerWidth
}

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
            .forEach((_) => {
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

const PictureResponsive: React.FC<PictureResonsiveProps> = ({ srcSets, ...imgProps }) => {
  const ref = useRef<HTMLImageElement>(null)
  const { width } = useResizeObserver<HTMLImageElement>({ ref })
  const { effectiveConnectionType } = useNetworkStatus('4g')
  const scaleDown = effectiveConnectionType === '4g' ? 1 : window.devicePixelRatio

  const [upgraded, setUpgraded] = useState<boolean>(false)

  const size =
    upgraded === false || width === undefined ? imgProps.width / scaleDown : width / scaleDown

  useEffect(() => {
    // Excuted on the client, when the image is rendered we can upgrade the image to high resolution.
    const img = ref.current
    if (!img || !width) return
    requestUpgrade(img).then(() => setUpgraded(true))
  }, [ref.current, width])

  return (
    <>
      <picture>
        {Object.entries(srcSets).map(([type, srcSet]) => (
          <source key={type} type={type} srcSet={srcSet} sizes={`${size}px`} />
        ))}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img ref={ref} {...imgProps} loading='lazy' />
      </picture>
    </>
  )
}

export default PictureResponsive
