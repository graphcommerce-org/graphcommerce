import { useElementScroll } from '@graphcommerce/framer-utils'
import { Point } from 'framer-motion'
import { animate, easeOut } from 'popmotion'
import { useScrollerContext } from './useScrollerContext'

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return async (to: Point) => {
    const ref = scrollerRef.current
    if (!ref) return

    // In the future we want to move to browser native scrolling behavior, but since it is too slow we're not moving to that yet.
    // if ('scrollBehavior' in document.documentElement.style) {
    //   scrollerRef.current.scrollTo({ left: to.x, top: to.y, behavior: 'smooth' })
    // }

    const xDone = new Promise<void>((onComplete) => {
      if (ref.scrollLeft !== to.x) {
        disableSnap()
        register(
          animate({
            from: ref.scrollLeft,
            to: to.x,
            velocity: scroll.x.getVelocity(),
            onUpdate: (v) => {
              ref.scrollLeft = v
            },
            onComplete,
            onStop: onComplete,
          }),
        )
      } else onComplete()
    })

    const yDone = new Promise<void>((onComplete) => {
      if (ref.scrollTop !== to.y) {
        disableSnap()
        register(
          animate({
            from: ref.scrollTop,
            to: to.y,
            velocity: scroll.y.getVelocity(),
            onUpdate: (v) => {
              ref.scrollTop = v
            },
            onComplete,
            onStop: onComplete,
            duration: 500,
          }),
        )
      } else onComplete()
    })

    await xDone
    await yDone
    enableSnap()
  }
}
