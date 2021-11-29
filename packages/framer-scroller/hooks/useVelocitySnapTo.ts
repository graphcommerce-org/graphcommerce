import { PanInfo } from 'framer-motion'
import { inertia, InertiaOptions } from 'popmotion'
import { useScrollTo } from './useScrollTo'
import { useScrollerContext } from './useScrollerContext'

const clamp = ({ velocity, offset }: PanInfo, axis: 'x' | 'y') =>
  velocity[axis] < 0
    ? Math.max(velocity[axis], -Math.abs(offset[axis] * 3))
    : Math.min(velocity[axis], Math.abs(offset[axis] * 3))

const closest = (counts: number[], target: number) =>
  counts.length
    ? counts.reduce((prev, curr) =>
        Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev,
      )
    : undefined

export const useVelocitySnapTo = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement | undefined>,
) => {
  const { disableSnap, enableSnap, register, getScrollSnapPositions } = useScrollerContext()

  const inertiaOptions: InertiaOptions = {
    power: 1,
    bounceDamping: 50,
    // bounceStiffness: 200,
    // timeConstant: 200,
    // restDelta: 0.5,
    // restSpeed: 1,
  }

  const animatePan = (info: PanInfo) => {
    const el = ref.current
    if (!el) throw Error(`Can't find html element`)

    const { scrollLeft, scrollTop } = el
    disableSnap()

    const targetX = clamp(info, 'x') * -1 + scrollLeft
    const closestX = closest(getScrollSnapPositions().x, targetX)

    const xDone = new Promise<void>((onComplete) => {
      if (closestX !== scrollLeft) {
        const cancelX = inertia({
          velocity: info.velocity.x * -1,
          max: typeof closestX !== 'undefined' ? closestX - scrollLeft : undefined,
          min: typeof closestX !== 'undefined' ? closestX - scrollLeft : undefined,
          ...inertiaOptions,
          onUpdate: (v: number) => {
            el.scrollLeft = Math.round(v + scrollLeft)
          },
          onComplete: () => {
            onComplete()
            enableSnap()
          },
        })
        register(cancelX)
      } else {
        onComplete()
        enableSnap()
      }
    })

    const targetY = clamp(info, 'y') * -1 + scrollTop
    const closestY = closest(getScrollSnapPositions().y, targetY)

    const yDone = new Promise<void>((onComplete) => {
      if (closestY !== scrollTop) {
        const cancelY = inertia({
          velocity: info.velocity.y * -1,
          max: typeof closestY !== 'undefined' ? closestY - scrollTop : undefined,
          min: typeof closestY !== 'undefined' ? closestY - scrollTop : undefined,
          ...inertiaOptions,
          onUpdate: (v: number) => {
            el.scrollTop = Math.round(v + scrollTop)
          },
          onComplete: () => {
            onComplete()
            enableSnap()
          },
        })
        register(cancelY)
      } else {
        onComplete()
        enableSnap()
      }
    })

    return Promise.all<void>([xDone, yDone])
  }

  return animatePan
}
