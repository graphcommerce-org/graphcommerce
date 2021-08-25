import { useElementScroll } from '@reachdigital/framer-utils'
import { Point2D } from 'framer-motion'
import { animate } from 'popmotion'
import { SnapPositionDirection } from '../types'
import { useScrollerContext } from './useScrollerContext'

export type UseScrollerButton = SnapPositionDirection

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return (to: Point2D) => {
    const el = scrollerRef.current
    if (!el) return

    // const notCompletelyVisible = items.filter((item) => item.visibility.get() < 0.9)
    // todo get the target element and move one right, keep the current velocity

    disableSnap()
    register(
      animate({
        from: el.scrollLeft,
        to: to.x,
        velocity: scroll.x.getVelocity(),
        onUpdate: (v) => {
          el.scrollLeft = v
        },
        onComplete: enableSnap,
        bounce: 50,
      }),
    )
    register(
      animate({
        from: el.scrollLeft,
        to: to.y,
        velocity: scroll.y.getVelocity(),
        onUpdate: (v) => {
          el.scrollTop = v
        },
        onComplete: enableSnap,
        bounce: 50,
      }),
    )
  }
}
