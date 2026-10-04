import type { MotionValue } from 'framer-motion'
import { frame, useMotionValue, useTransform } from 'framer-motion'
import type { RefObject } from 'react'
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

export function useElementScroll(ref?: RefObject<HTMLElement | null>): ScrollMotionValues {
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
    // Measure in framer-motion's read step instead of synchronously in this layout effect: reading
    // scrollWidth here forces a style recalc and layout of the whole page during the (hydration)
    // commit. The ResizeObserver below also delivers an initial observation.
    const updaterTimed = () => frame.read(updater)
    updaterTimed()
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
