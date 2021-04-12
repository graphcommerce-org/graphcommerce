import { motionValue, MotionValue } from 'framer-motion'
import { RefObject } from 'react'
import useConstant from './useConstant'
import { useIsomorphicLayoutEffect } from '.'

interface ScrollMotionValues {
  x: MotionValue<number>
  y: MotionValue<number>
  xProgress: MotionValue<number>
  yProgress: MotionValue<number>
  xMax: MotionValue<number>
  yMax: MotionValue<number>
}

function setProgress(offset: number, maxOffset: number, value: MotionValue) {
  value.set(!offset || !maxOffset ? 0 : offset / maxOffset)
}

export default function useElementScroll(ref: RefObject<HTMLElement>): ScrollMotionValues {
  const values = useConstant<ScrollMotionValues>(() => ({
    x: motionValue(0),
    y: motionValue(0),
    xProgress: motionValue(0),
    yProgress: motionValue(0),
    xMax: motionValue(0),
    yMax: motionValue(0),
  }))

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return () => {}

    const updater = () => {
      if (!element) return
      const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight,
        offsetWidth,
        offsetHeight,
      } = element

      values.x.set(scrollLeft)
      values.y.set(scrollTop)
      values.xMax.set(scrollWidth - offsetWidth)
      values.yMax.set(scrollHeight - offsetHeight)
      // Set 0-1 progress
      setProgress(scrollLeft, scrollWidth - offsetWidth, values.xProgress)
      setProgress(scrollTop, scrollHeight - offsetHeight, values.yProgress)
    }

    element.addEventListener('scroll', updater, { passive: true })

    const ro = new ResizeObserver(updater)
    ro.observe(element)

    return () => {
      element.removeEventListener('scroll', updater)
      ro.disconnect()
    }
  }, [])

  return values
}
