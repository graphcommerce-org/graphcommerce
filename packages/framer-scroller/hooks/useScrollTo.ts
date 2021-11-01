import { useElementScroll } from '@graphcommerce/framer-utils'
import { Point } from 'framer-motion'
import { animate } from 'popmotion'
import { useScrollerContext } from './useScrollerContext'

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return (to: Point) => {
    if (!scrollerRef.current) return

    // const notCompletelyVisible = items.filter((item) => item.visibility.get() < 0.9)
    // todo get the target element and move one right, keep the current velocity

    disableSnap()
    register(
      animate({
        from: scrollerRef.current.scrollLeft,
        to: to.x,
        velocity: scroll.x.getVelocity(),
        onUpdate: (v) => {
          if (!scrollerRef.current) return
          scrollerRef.current.scrollLeft = v
        },
        onComplete: enableSnap,
        bounce: 50,
      }),
    )
    register(
      animate({
        from: scrollerRef.current.scrollTop,
        to: to.y,
        velocity: scroll.y.getVelocity(),
        onUpdate: (v) => {
          if (!scrollerRef.current) return
          scrollerRef.current.scrollTop = v
        },
        onComplete: enableSnap,
        bounce: 50,
      }),
    )
  }
}
