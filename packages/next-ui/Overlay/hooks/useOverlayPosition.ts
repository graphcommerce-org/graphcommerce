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
    closed: {
      x: motionValue(0),
      y: motionValue(0),
    },
  }))

  const scroll = useElementScroll(scrollerRef)

  useIsomorphicLayoutEffect(() => {
    if (!scrollerRef.current) return () => {}

    const measure = () => {
      const positions = getScrollSnapPositions()
      if (state.open.x.get() !== positions.x[1]) state.open.x.set(positions.x[1] ?? 0)
      if (state.open.y.get() !== positions.y[1]) state.open.y.set(positions.y[1] ?? 0)
      if (state.closed.x.get() !== positions.x[0]) state.closed.x.set(positions.x[0])
      if (state.closed.y.get() !== positions.y[0]) state.closed.y.set(positions.y[0])
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(scrollerRef.current)
    ;[...scrollerRef.current.children].forEach((child) => ro.observe(child))

    return () => ro.disconnect()
  }, [getScrollSnapPositions, scrollerRef, state])

  // sets a float between 0 and 1 for the visibility of the overlay
  useEffect(() => {
    const calc = () => {
      const x = scrollerRef.current?.scrollLeft ?? scroll.x.get()
      const y = scrollerRef.current?.scrollTop ?? scroll.y.get()

      const positions = getScrollSnapPositions()

      const yC = positions.y[0]
      const yO = positions.y[1] ?? 0
      const visY = yC === yO ? 1 : Math.max(0, Math.min(1, (y - yC) / (yO - yC)))

      const xC = positions.x[0]
      const xO = positions.x[1] ?? 0

      const visX = xO === xC ? 1 : Math.max(0, Math.min(1, (x - xC) / (xO - xC)))

      let vis = Math.round(visY * visX * 100) / 100

      if (xC === 0 && xO === 0 && yC === 0 && yO === 0) vis = 0

      // todo: visibility sometimes flickers
      state.open.visible.set(vis)
    }

    const cancelY = scroll.y.onChange(calc)
    const cancelX = scroll.x.onChange(calc)
    calc()

    return () => {
      cancelY()
      cancelX()
    }
  }, [getScrollSnapPositions, scroll.x, scroll.y, scrollerRef, state.open.visible])

  return state
}
