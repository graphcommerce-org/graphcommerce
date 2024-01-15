import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { unstable_usePreventScroll as usePreventScroll } from '@graphcommerce/framer-scroller'
import { useTheme } from '@mui/material'
import { useDomEvent, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

type UseGalleryZoomProps = {
  disableZoom?: boolean
  routeHash: string
  width: number
  height: number
}

export function useGalleryZoom(props: UseGalleryZoomProps) {
  const { disableZoom, routeHash, width, height } = props
  const router = useRouter()
  const prevRoute = usePrevPageRouter()
  // const classes = useMergedClasses(useStyles({ clientHeight, aspectRatio }).classes, props.classes)

  const route = `#${routeHash}`
  // We're using the URL to manage the state of the gallery.
  const zoomed = router.asPath.endsWith(route)
  usePreventScroll(zoomed)

  // cleanup if someone enters the page with #gallery
  useEffect(() => {
    if (!prevRoute?.pathname && zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(router.asPath.replace(route, ''))
    }
  }, [prevRoute?.pathname, route, router, zoomed])

  const toggle = () => {
    if (disableZoom) {
      return
    }
    if (!zoomed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(route, undefined, { shallow: true })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.back()
    }
  }

  const theme = useTheme()
  const windowRef = useRef(typeof window !== 'undefined' ? window : null)

  const handleEscapeKey = (e: KeyboardEvent | Event) => {
    if (zoomed && (e as KeyboardEvent)?.key === 'Escape') toggle()
  }

  const dragStart = useMotionValue<number>(0)
  const onMouseDownScroller: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragStart.get() === e.clientX) return
    dragStart.set(e.clientX)
  }
  const onMouseUpScroller: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const currentDragLoc = e.clientX
    if (Math.abs(currentDragLoc - dragStart.get()) < 8) toggle()
  }

  useDomEvent(windowRef, 'keyup', handleEscapeKey, { passive: true })

  const headerHeight = `${theme.appShell.headerHeightSm} - ${theme.spacings.sm} * 2`
  const galleryMargin = theme.spacings.lg

  const maxHeight = `calc(100vh - ${headerHeight} - ${galleryMargin})`
  const ratio = `calc(${height} / ${width} * 100%)`

  return {
    maxHeight,
    ratio,
    onMouseDownScroller,
    onMouseUpScroller,
    zoomed,
    toggle,
  }
}
