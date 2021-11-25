import { useElementScroll } from '@graphcommerce/framer-utils'
import { Point2D } from 'framer-motion'
import { animate } from 'popmotion'
import { useScrollerContext } from './useScrollerContext'
export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return (to: Point2D) => {
    const ref = scrollerRef.current
    if (!ref) return Promise.resolve()

    // const notCompletelyVisible = items.filter((item) => item.visibility.get() < 0.9)
    // todo get the target element and move one right, keep the current velocity

    disableSnap()

    const xDone = new Promise<void>((onComplete) => {
      register(
        animate({
          from: ref.scrollLeft,
          to: to.x,
          velocity: scroll.x.getVelocity(),
          onUpdate: (v) => (ref.scrollLeft = v),
          onComplete: () => {
            enableSnap()
            onComplete()
          },
          bounce: 50,
        }),
      )
    })

    const yDone = new Promise<void>((onComplete) => {
      register(
        animate({
          from: ref.scrollTop,
          to: to.y,
          velocity: scroll.y.getVelocity(),
          onUpdate: (v) => (ref.scrollTop = v),
          onComplete: () => {
            enableSnap()
            onComplete()
          },
          bounce: 50,
        }),
      )
    })
    return Promise.all<void>([xDone, yDone])
  }
}
