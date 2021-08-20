import { useElementScroll } from '@reachdigital/framer-utils'
import { animate } from 'popmotion'
import { SnapPositionDirection } from '../types'
import { useScrollerContext } from './useScrollerContext'

export type UseScrollerButton = SnapPositionDirection

export function useScrollerButtonClick(direction: UseScrollerButton): () => void {
  const { scrollerRef, items, register, disableSnap, enableSnap, getSnapPosition } =
    useScrollerContext()
  const scroll = useElementScroll(scrollerRef)

  return () => {
    const el = scrollerRef.current
    if (!el) return

    // const notCompletelyVisible = items.filter((item) => item.visibility.get() < 0.9)
    // todo get the target element and move one right, keep the current velocity

    disableSnap()
    register(
      animate({
        from: el.scrollLeft,
        to: getSnapPosition(direction).x,
        velocity: scroll.x.getVelocity(),
        onUpdate: (v) => {
          el.scrollLeft = v
        },
        onComplete: enableSnap,
      }),
    )
  }
}
