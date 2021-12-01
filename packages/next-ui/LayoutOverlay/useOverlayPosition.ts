import { useScrollerContext } from '@graphcommerce/framer-scroller'
import {
  useConstant,
  useElementScroll,
  useIsomorphicLayoutEffect,
} from '@graphcommerce/framer-utils'
import { motionValue } from 'framer-motion'
import { useEffect } from 'react'

export function useOverlayPosition() {
  const { getScrollSnapPositions, scrollerRef } = useScrollerContext()

  const state = useConstant(() => ({
    open: {
      x: motionValue(0),
      y: motionValue(0),
      visible: motionValue(0),
    },
    closed: { x: motionValue(0), y: motionValue(0) },
  }))

  const scroll = useElementScroll(scrollerRef)

  useIsomorphicLayoutEffect(() => {
    if (!scrollerRef.current) return

    const measure = () => {
      const positions = getScrollSnapPositions()
      state.open.x.set(positions.x[1])
      state.closed.x.set(positions.x[0])
      state.open.y.set(positions.y[1])
      state.closed.y.set(positions.y[0])
    }
    const ro = new ResizeObserver(measure)
    measure()

    ro.observe(scrollerRef.current)
    return () => ro.disconnect()
  })

  // sets a float between 0 and 1 for the visibility of the overlay
  useEffect(() => {
    const calc = () => {
      const x = scroll.x.get()
      const y = scroll.y.get()

      const yC = state.closed.y.get()
      const yO = state.open.y.get()
      const visY = yC === yO ? 1 : Math.max(0, Math.min(1, (y - yC) / (yO - yC)))

      const xC = state.closed.x.get()
      const xO = state.open.x.get()
      const visX = xO === xC ? 1 : Math.max(0, Math.min(1, (x - xC) / (xO - xC)))

      state.open.visible.set(visY * visX)
    }

    const cancelY = scroll.y.onChange(calc)
    const cancelX = scroll.x.onChange(calc)
    calc()

    return () => {
      cancelY()
      cancelX()
    }
  }, [state, scroll])

  return state
}
