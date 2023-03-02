import { useScrollerContext } from '@graphcommerce/framer-scroller'
import { useConstant, useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { motionValue } from 'framer-motion'
import framesync from 'framesync'
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
      const x = positions.x[positions.x.length - 1]
      const y = positions.y[positions.y.length - 1]

      const scrollX = scrollerRef.current?.scrollLeft ?? scroll.x.get()
      const scrolly = scrollerRef.current?.scrollTop ?? scroll.y.get()

      if (variant() === 'left') {
        state.closed.x.set(x)
        state.open.x.set(0)

        const closedX = positions.x[1] ?? 0
        state.open.visible.set(closedX === 0 ? 0 : clampRound((scrollX - closedX) / -closedX))
      }
      if (variant() === 'right') {
        state.open.x.set(x)
        state.closed.x.set(0)

        const openedX = positions.x[1] ?? 0
        state.open.visible.set(openedX === 0 ? 0 : clampRound(scrollX / openedX))
      }
      if (variant() === 'bottom') {
        state.open.y.set(y)
        state.closed.y.set(0)

        const openedY = positions.y[1] ?? 0
        state.open.visible.set(openedY === 0 ? 0 : clampRound(scrolly / openedY))
      }
    }

    const measureTimed = () => framesync.read(measure)
    measure()

    const cancelX = scroll.x.onChange(measure)
    const cancelY = scroll.y.onChange(measure)

    const ro = new ResizeObserver(measureTimed)
    ro.observe(scrollerRef.current)
    ;[...scrollerRef.current.children].forEach((child) => ro.observe(child))

    window.addEventListener('resize', measureTimed)
    return () => {
      window.removeEventListener('resize', measureTimed)
      ro.disconnect()
      cancelX()
      cancelY()
    }
  }, [getScrollSnapPositions, scroll.x, scroll.y, scrollerRef, state, variant])

  return state
}
