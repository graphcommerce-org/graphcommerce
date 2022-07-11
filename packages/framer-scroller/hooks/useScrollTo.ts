import { useElementScroll } from '@graphcommerce/framer-utils'
import { MotionConfigContext, Point, Tween } from 'framer-motion'
import { animate } from 'popmotion'
import { useCallback, useContext } from 'react'
import { useScrollerContext } from './useScrollerContext'

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  const duration =
    ((useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0.375) * 1000

  const scrollTo = useCallback(
    async (to: Point) => {
      const ref = scrollerRef.current
      if (!ref) return

      // In the future we want to move to browser native scrolling behavior, but since the animation timing isn't configurable we can't use it.
      // if ('scrollBehavior' in document.documentElement.style) {
      //   scrollerRef.current.scrollTo({ left: to.x, top: to.y, behavior: 'smooth' })
      //   await new Promise((onComplete) => {
      //     setTimeout(onComplete, 2000)
      //   })
      //   return
      // }

      // @ts-expect-error private api, but we're updating the animation value here manually instead of relying on the event listener.
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scroll.scroll.start(() => () => {})

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
                scroll.scroll.set({ ...scroll.scroll.get(), x: v })
              },
              onComplete,
              onStop: onComplete,
              duration,
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
              onUpdate: (v: number) => {
                ref.scrollTop = v
                scroll.scroll.set({ ...scroll.scroll.get(), y: v })
              },
              onComplete,
              onStop: onComplete,
              duration,
            }),
          )
        } else {
          onComplete()
        }
      })

      await xDone
      await yDone
      scroll.scroll.stop()
      enableSnap()
    },
    [disableSnap, enableSnap, register, scroll, scrollerRef, duration],
  )

  return scrollTo
}
