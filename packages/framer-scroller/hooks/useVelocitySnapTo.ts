import { PanInfo } from 'framer-motion'
import { inertia, InertiaOptions } from 'popmotion'
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
  const { disableSnap, register, getScrollSnapPositions, scrollSnap } = useScrollerContext()

  const inertiaOptions: InertiaOptions = {
    power: 1,
    bounceDamping: 50,
    // bounceStiffness: 200,
    timeConstant: 200,
    // restDelta: 0.5,
    // restSpeed: 1,
  }

  const animatePan = (info: PanInfo, onComplete?: () => void) => {
    const el = ref.current
    if (!el) throw Error(`Can't find html element`)

    const { scrollLeft, scrollTop } = el
    disableSnap()

    const targetX = clamp(info, 'x') * -1 + scrollLeft
    const closestX = closest(getScrollSnapPositions().x, targetX)
    const cancelX = inertia({
      velocity: info.velocity.x * -1,
      max: closestX ? closestX - scrollLeft : undefined,
      min: closestX ? closestX - scrollLeft : undefined,
      ...inertiaOptions,
      onUpdate: (v: number) => {
        el.scrollLeft = Math.round(v + scrollLeft)
      },
      onComplete,
    })
    register(cancelX)

    const targetY = clamp(info, 'y') * -1 + scrollTop
    const closestY = closest(getScrollSnapPositions().y, targetY)
    const cancelY = inertia({
      velocity: info.velocity.y * -1,
      max: closestY ? closestY - scrollTop : undefined,
      min: closestY ? closestY - scrollTop : undefined,
      ...inertiaOptions,
      onUpdate: (v: number) => {
        el.scrollTop = v + scrollTop
      },
    })
    register(cancelY)

    return () => {}
  }
  return animatePan
}
