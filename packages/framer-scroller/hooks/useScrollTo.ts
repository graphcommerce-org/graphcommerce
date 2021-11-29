import { useElementScroll } from '@graphcommerce/framer-utils'
import { Point2D } from 'framer-motion'
import { animate } from 'popmotion'
import { useScrollerContext } from './useScrollerContext'
export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return async (to: Point2D) => {
    const ref = scrollerRef.current
    if (!ref) return Promise.resolve()

    const xDone = new Promise<void>((onComplete) => {
      if (ref.scrollLeft !== to.x) {
        disableSnap()
        register(
          animate({
            from: ref.scrollLeft,
            to: to.x,
            velocity: scroll.x.getVelocity(),
            onUpdate: (v) => (ref.scrollLeft = v),
            onComplete,
            bounce: 50,
          }),
        )
      } else {
        onComplete()
      }
    })

    const yDone = new Promise<void>((onComplete) => {
      if (ref.scrollTop !== to.y) {
        disableSnap()
        register(
          animate({
            from: ref.scrollTop,
            to: to.y,
            velocity: scroll.y.getVelocity(),
            onUpdate: (v) => (ref.scrollTop = v),
            onComplete: onComplete,
            bounce: 50,
          }),
        )
      } else {
        onComplete()
      }
    })

    await xDone
    await yDone
    enableSnap()
    return
  }
}
