import { useScrollerContext } from '@graphcommerce/framer-scroller'
import {
  useConstant,
  useElementScroll,
  useIsomorphicLayoutEffect,
} from '@graphcommerce/framer-utils'
import { motionValue } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import { useMatchMedia } from '../../hooks'

const clampRound = (value: number) => Math.round(Math.max(0, Math.min(1, value)) * 100) / 100

export function useOverlayPosition(
  variantSm: 'left' | 'bottom' | 'right',
  variantMd: 'left' | 'bottom' | 'right',
) {
  const match = useMatchMedia()
  const { getScrollSnapPositions, scrollerRef, scroll } = useScrollerContext()
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

  const variant = useCallback(
    () => (match.up('md') ? variantMd : variantSm),
    [match, variantMd, variantSm],
  )

  useIsomorphicLayoutEffect(() => {
    if (!scrollerRef.current) return () => {}

    const measure = () => {
      const positions = getScrollSnapPositions()

      if (variant() === 'left') {
        state.open.x.set(0)
        state.closed.x.set(positions.x[positions.x.length - 1] ?? 0)
      }
      if (variant() === 'right') {
        state.open.x.set(positions.x[positions.x.length - 1] ?? 0)
        state.closed.x.set(0)
      }
      if (variant() === 'bottom') {
        state.open.y.set(positions.y[positions.y.length - 1] ?? 0)
        state.closed.y.set(0)
      }
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(scrollerRef.current)
    ;[...scrollerRef.current.children].forEach((child) => ro.observe(child))

    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [getScrollSnapPositions, scrollerRef, state, variant])

  // sets a float between 0 and 1 for the visibility of the overlay
  useEffect(() => {
    if (!scrollerRef.current) return () => {}
    const calc = () => {
      const x = scrollerRef.current?.scrollLeft ?? scroll.x.get()
      const y = scrollerRef.current?.scrollTop ?? scroll.y.get()

      const positions = getScrollSnapPositions()

      if (variant() === 'left') {
        const closedX = positions.x[1] ?? 0
        state.open.visible.set(closedX === 0 ? 0 : clampRound((x - closedX) / -closedX))
      }
      if (variant() === 'right') {
        const openedX = positions.x[1] ?? 0
        state.open.visible.set(openedX === 0 ? 0 : clampRound(x / openedX))
      }
      if (variant() === 'bottom') {
        const openedY = positions.y[1] ?? 0
        state.open.visible.set(openedY === 0 ? 0 : clampRound(y / openedY))
      }
    }

    const cancelY = scroll.y.onChange(calc)
    const cancelX = scroll.x.onChange(calc)
    calc()

    const ro = new ResizeObserver(calc)
    ro.observe(scrollerRef.current)
    ;[...scrollerRef.current.children].forEach((child) => ro.observe(child))

    return () => {
      cancelY()
      cancelX()
      ro.disconnect()
    }
  }, [getScrollSnapPositions, scroll, scrollerRef, state, variant])

  return state
}
