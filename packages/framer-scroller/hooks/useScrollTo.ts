import { MotionConfigContext, Point, Tween } from 'framer-motion'
import { animate } from 'popmotion'
import { useCallback, useContext } from 'react'
import { distanceAnimationDuration } from '../utils/distanceAnimationDuration'
import { useScrollerContext } from './useScrollerContext'

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap, scroll, getScrollSnapPositions } =
    useScrollerContext()

  const duration = (useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0

  const scrollTo = useCallback(
    async (incoming: Point | [number, number]) => {
      const ref = scrollerRef.current
      if (!ref) return

      let to: Point
      if (Array.isArray(incoming)) {
        const currentPositions = getScrollSnapPositions()
        // eslint-disable-next-line no-param-reassign
        to = { x: currentPositions.x[incoming[0]] ?? 0, y: currentPositions.y[incoming[1]] ?? 0 }
      } else {
        to = incoming
      }

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
                scroll.x.set(v)
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
                // console.log(v)
                scroll.y.set(v)
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

      if (Array.isArray(incoming)) {
        const checkPositions = getScrollSnapPositions()
        if (checkPositions.x[incoming[0]] !== to.x || checkPositions.y[incoming[1]] !== to.y)
          await scrollTo(incoming)
      }
      enableSnap()
    },
    [scrollerRef, enableSnap, getScrollSnapPositions, disableSnap, register, scroll, duration],
  )

  return scrollTo
}
