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

const setProgress = (offset: number, maxOffset: number, value: MotionValue) => {
  value.set(!offset || !maxOffset ? 0 : offset / maxOffset)
}

export function useElementScroll(ref?: RefObject<HTMLElement | undefined>): ScrollMotionValues {
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

    const updater = () => {
      if (!element) return

      sync.read(() => {
        values.x.set(element.scrollLeft)
        values.y.set(element.scrollTop)
        values.xMax.set(element.scrollWidth - element.offsetWidth)
        values.yMax.set(element.scrollHeight - element.offsetHeight)

        // Set 0-1 progress
        setProgress(element.scrollLeft, element.scrollWidth - element.offsetWidth, values.xProgress)
        setProgress(
          element.scrollTop,
          element.scrollHeight - element.offsetHeight,
          values.yProgress,
        )
      })
    }

    element.addEventListener('scroll', updater, { passive: true })

    const ro = new ResizeObserver(updater)
    ro.observe(element)

    return () => {
      element.removeEventListener('scroll', updater)
      ro.disconnect()
    }
  }, [ref, values.x, values.xMax, values.xProgress, values.y, values.yMax, values.yProgress])

  return values
}
