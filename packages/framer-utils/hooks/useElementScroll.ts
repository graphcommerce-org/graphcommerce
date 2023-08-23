import { MotionValue, useMotionValue, useTransform } from 'framer-motion'
import sync from 'framesync'
import { RefObject } from 'react'
import { useConstant } from './useConstant'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export interface ScrollMotionValues {
  animating: MotionValue<boolean>
  x: MotionValue<number>
  y: MotionValue<number>
  xProgress: MotionValue<number>
  yProgress: MotionValue<number>
  xMax: MotionValue<number>
  yMax: MotionValue<number>
}

export function useElementScroll(ref?: RefObject<HTMLElement | undefined>): ScrollMotionValues {
  const animating = useMotionValue(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xMax = useMotionValue(0)
  const yMax = useMotionValue(0)
  const xProgress = useTransform([x, xMax], (v: number[]) => (!v[0] && !v[1] ? 0 : v[0] / v[1]))
  const yProgress = useTransform([y, yMax], (v: number[]) => (!v[0] && !v[1] ? 0 : v[0] / v[1]))

  const scroll = useConstant<ScrollMotionValues>(() => ({
    animating,
    x,
    y,
    xProgress,
    yProgress,
    xMax,
    yMax,
  }))

  useIsomorphicLayoutEffect(() => {
    const element = ref?.current
    if (!element) return () => {}

    const updater = () => {
      xMax.set(Math.max(0, element.scrollWidth - element.offsetWidth))
      yMax.set(Math.max(0, element.scrollHeight - element.offsetHeight))

      if (!animating.get()) y.set(element.scrollTop)
      if (!animating.get()) x.set(element.scrollLeft)
    }
    updater()

    const updaterTimed = () => sync.read(updater)
    element.addEventListener('scroll', updaterTimed, { passive: true })
    const ro = new ResizeObserver(updaterTimed)
    ro.observe(element)
    ;[...element.children].forEach((child) => ro.observe(child))

    return () => {
      element.removeEventListener('scroll', updaterTimed)
      ro.disconnect()
    }
  }, [animating, ref, x, xMax, y, yMax])

  return scroll
}
