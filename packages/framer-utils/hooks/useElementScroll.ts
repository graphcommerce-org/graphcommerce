import { motionValue, MotionValue } from 'framer-motion'
import sync from 'framesync'
import { RefObject } from 'react'
import { useConstant } from './useConstant'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

interface ScrollMotionValues {
  x: MotionValue<number>
  y: MotionValue<number>
  xProgress: MotionValue<number>
  yProgress: MotionValue<number>
  xMax: MotionValue<number>
  yMax: MotionValue<number>
}

export function useElementScroll(
  ref?: RefObject<HTMLElement | undefined>,
  noScroll = 0,
): ScrollMotionValues {
  const values = useConstant<ScrollMotionValues>(() => ({
    x: motionValue(0),
    y: motionValue(0),
    xProgress: motionValue(0),
    yProgress: motionValue(0),
    xMax: motionValue(0),
    yMax: motionValue(0),
  }))

  useIsomorphicLayoutEffect(() => {
    const element = ref?.current
    if (!element) return () => {}

    const setProgress = (offset: number, maxOffset: number, value: MotionValue) => {
      value.set(!offset && !maxOffset ? noScroll : offset / maxOffset)
    }

    const updater = () => {
      sync.read(() => {
        const { scrollLeft, scrollTop, scrollWidth, scrollHeight, offsetWidth, offsetHeight } =
          element

        const xMax = Math.min(0, scrollWidth - offsetWidth)
        const yMax = Math.min(0, scrollHeight - offsetHeight)

        values.x.set(scrollLeft)
        values.y.set(scrollTop)
        values.xMax.set(xMax)
        values.yMax.set(yMax)

        // Set 0-1 progress
        setProgress(scrollLeft, xMax, values.xProgress)
        setProgress(scrollTop, yMax, values.yProgress)
      })
    }

    element.addEventListener('scroll', updater, { passive: true })

    const ro = new ResizeObserver(updater)
    ro.observe(element)

    return () => {
      element.removeEventListener('scroll', updater)
      ro.disconnect()
    }
  }, [noScroll, ref, values])

  return values
}
