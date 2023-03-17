import { MotionConfigContext, Point, Tween } from 'framer-motion'
import { animate } from 'popmotion'
import { useCallback, useContext } from 'react'
import { distanceAnimationDuration } from '../utils/distanceAnimationDuration'
import { useScrollerContext } from './useScrollerContext'

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap, scroll } = useScrollerContext()

  const duration = (useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0

  const scrollTo = useCallback(
    async (to: Point) => {
      const ref = scrollerRef.current
      if (!ref) return

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
              duration: duration * 1000 || distanceAnimationDuration(ref.scrollLeft, to.x),
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
              duration: duration * 1000 || distanceAnimationDuration(ref.scrollTop, to.y),
            }),
          )
        } else {
          onComplete()
        }
      })

      await xDone
      await yDone

      enableSnap()
    },
    [disableSnap, enableSnap, register, scroll, scrollerRef, duration],
  )

  return scrollTo
}
