import type { Point, Tween } from 'framer-motion'
import { MotionConfigContext } from 'framer-motion'
import { animate } from 'popmotion'
import { useCallback, useContext } from 'react'
import { distanceAnimationDuration } from '../utils/distanceAnimationDuration'
import { useScrollerContext } from './useScrollerContext'

type Options = {
  stopAnimationOnScroll?: boolean
}

export function useScrollTo() {
  const { scrollerRef, register, disableSnap, enableSnap, scroll, getScrollSnapPositions } =
    useScrollerContext()

  const duration = (useContext(MotionConfigContext).transition as Tween | undefined)?.duration ?? 0

  const scrollTo = useCallback(
    async (
      incoming: Point | [number, number],
      options: Options = { stopAnimationOnScroll: true },
      __retrigger = 0,
    ) => {
      const ref = scrollerRef.current
      const { stopAnimationOnScroll } = options
      if (!ref) return

      let to: Point
      if (Array.isArray(incoming)) {
        const { x, y } = getScrollSnapPositions()
        // eslint-disable-next-line no-param-reassign
        to = { x: x[incoming[0]] ?? 0, y: y[incoming[1]] ?? 0 }
      } else {
        to = incoming
      }

      if (
        process.env.NODE_ENV === 'development' &&
        scroll.animating.get() &&
        __retrigger === 0 &&
        (Math.round(ref.scrollLeft) !== to.x || Math.round(ref.scrollTop) !== to.y)
      ) {
        console.warn(
          'scrollTo triggered while another animation is in progress. This cancels the current animation and creates a new one.',
        )
      }

      if (process.env.NODE_ENV === 'development' && __retrigger > 5) {
        console.error(
          'scrollTo triggered more than 5 times, is the element resizing constantly? Bailing out.',
        )
        return
      }

      if (process.env.NODE_ENV === 'development' && __retrigger > 0) {
        console.warn(
          'scrollTo re-animating to because the final location changed during animation.',
        )
      }

      const stop: { stop: () => void }[] = []

      const xDone = new Promise<void>((onComplete) => {
        if (Math.round(ref.scrollLeft) !== to.x) {
          disableSnap(stopAnimationOnScroll)
          if (!stopAnimationOnScroll) ref.style.overflow = 'hidden'

          stop.push(
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
        if (Math.round(ref.scrollTop) !== to.y) {
          disableSnap(stopAnimationOnScroll)
          if (!stopAnimationOnScroll) ref.style.overflow = 'hidden'

          stop.push(
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

      register({ stop: () => stop.forEach((s) => s.stop()) })
      await Promise.all([xDone, yDone])

      if (!stopAnimationOnScroll) ref.style.removeProperty('overflow')

      if (Array.isArray(incoming)) {
        const checkPositions = getScrollSnapPositions()
        // We check if the value is close enough, since firefox does not round in whole pixels. Values in in`to` could be > 0 but < 1
        const closeEnoughX = checkPositions.x.some((x) => Math.abs(x - to.x) <= 1)
        const closeEnoughY = checkPositions.y.some((y) => Math.abs(y - to.y) <= 1)

        if (!closeEnoughX || !closeEnoughY) await scrollTo(incoming, options, __retrigger + 1)
      }

      enableSnap()
    },
    [scrollerRef, enableSnap, getScrollSnapPositions, disableSnap, register, scroll, duration],
  )

  return scrollTo
}
