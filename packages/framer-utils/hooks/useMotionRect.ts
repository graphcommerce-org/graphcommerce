import { useMotionValue } from 'framer-motion'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

const emptyRect = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
}

export type Rect = typeof emptyRect

export type UseMotionRectOptions = {
  pause?: boolean
  windowResize?: boolean
  resizeObserver?: boolean
}

export function useMotionRect<E extends HTMLElement>(
  ref: React.RefObject<E>,
  options?: UseMotionRectOptions,
) {
  const { pause = false, windowResize = true, resizeObserver = false } = options ?? {}

  const motionRect = useMotionValue<Rect>(emptyRect)

  useIsomorphicLayoutEffect(() => {
    if (!ref?.current || pause) return () => {}

    const onResize = () => {
      if (ref.current) {
        const { bottom, right, top, left, height, width } = ref.current.getBoundingClientRect()
        const { clientHeight, clientWidth } = document.documentElement
        motionRect.set({
          top,
          bottom,
          left,
          right,
          height,
          width,
          marginRight: clientWidth - right,
          marginBottom: clientHeight - bottom,
          marginTop: top,
          marginLeft: left,
        })
      }
    }
    onResize()

    let ro: ResizeObserver | undefined
    if (resizeObserver) {
      ro = new ResizeObserver(onResize)
      ro.observe(ref.current)
    }

    if (windowResize) {
      window.addEventListener('resize', onResize)
    }

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [motionRect, pause, ref, windowResize, resizeObserver])

  return motionRect
}
