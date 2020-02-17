import { useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { useViewportScale } from './useViewportScale'

type Size = [number, number]
export type ISources = Array<['image/webp' | 'image/jpeg', string]>
type Props = Omit<JSX.IntrinsicElements['img'], 'src'> & {
  srcSets?: { [index: string]: string }
}

function isInViewport(elem: HTMLImageElement): boolean {
  const { top, right, bottom, left } = elem.getBoundingClientRect()
  return bottom >= 0 && right >= 0 && top <= window.innerHeight && left <= window.innerWidth
}

function requestUpgrade(img: HTMLImageElement) {
  return new Promise(resolve => {
    // An outside-viewport image will have it's space reserved, but it will show a white background.
    // If the image is outside the viewport, we can directly start upgrading the image.

    // If an image is not upgraded yet it will download the initial image which is ok.

    const inViewport = isInViewport(img)

    if (inViewport && !img.complete) {
      // Wait for the in-viewport image to be loaded before start upgrading the image.
      // Because if the initial image hasn't loaded it will cancel the download and restart a new
      // download..
      img.onload = () => {
        resolve()
      }
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
            .filter(entry => entry.isIntersecting === undefined || entry.isIntersecting)
            .forEach(_ => {
              intersectionObserver.unobserve(img)
              resolve()
            })
        },
        { rootMargin: '3000px' },
      )
      intersectionObserver.observe(img)
    } else if (!inViewport) {
      // Browsers that don't support loading="lazy" or the IntersectionObserver will download
      // everything.
      resolve()
    }
  })
}

// TODO This looks rather brittle, maybe we should add some tests here an there.
function effectiveImgSize(
  img: HTMLImageElement,
  renderSize: { width: number; height: number },
): Size {
  const contains = img.style.objectFit === 'contain'
  console.log(img.style.objectFit)

  const intrinsicRatio = img.width / img.height
  const imgRatio = renderSize.width / renderSize.height

  if (contains ? intrinsicRatio > imgRatio : intrinsicRatio < imgRatio) {
    return [renderSize.width, renderSize.width / intrinsicRatio]
  }
  const useHeight = renderSize.height * intrinsicRatio < renderSize.width
  return useHeight
    ? [renderSize.height * intrinsicRatio, renderSize.height]
    : [renderSize.width, renderSize.width / intrinsicRatio]
}

export const PictureResponsive: React.FC<Props> = ({ srcSets = {}, ...imgProps }) => {
  const ref = useRef<HTMLImageElement>(null)
  const scale = useViewportScale()
  const renderSize = useResizeObserver<HTMLImageElement>({ ref })

  const [upgraded, setUpgraded] = useState<boolean>(false)

  // console.log(intersection)
  const size = upgraded === false || renderSize.width === undefined ? 1 : renderSize.width

  useEffect(() => {
    // Excuted on the client, when the image is rendered we can upgrade the image to high resolution.
    const img = ref.current
    if (!img || !renderSize.width || !renderSize.height) return

    // const effectiveSize = effectiveImgSize(img, renderSize as { width: number; height: number })
    // console.log(effectiveSize)
    requestUpgrade(img).then(() => setUpgraded(true))
  }, [ref.current, scale, renderSize])

  return (
    <>
      <picture>
        {Object.keys(srcSets).map(type => {
          return <source key={type} type={type} srcSet={srcSets[type]} sizes={`${size}px`} />
        })}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img ref={ref} {...imgProps} loading='lazy' />
      </picture>
    </>
  )
}
