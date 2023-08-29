// eslint-disable-next-line import/no-extraneous-dependencies
import { useMatchMedia } from '@graphcommerce/next-ui/hooks/useMatchMedia'
import { PanInfo } from 'framer-motion'
import { inertia, InertiaOptions } from 'popmotion'
import { scrollSnapTypeDirection } from '../utils/scrollSnapTypeDirection'
import { useScrollerContext } from './useScrollerContext'

type LimitedPanInfo = Pick<PanInfo, 'velocity' | 'offset'>

const clamp = ({ velocity, offset }: LimitedPanInfo, axis: 'x' | 'y') =>
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
  const { disableSnap, enableSnap, register, getScrollSnapPositions, scrollSnap, scroll } =
    useScrollerContext()

  const matchMedia = useMatchMedia()

  const direction = () =>
    matchMedia.down('md')
      ? scrollSnapTypeDirection(scrollSnap.scrollSnapTypeSm)
      : scrollSnapTypeDirection(scrollSnap.scrollSnapTypeMd)

  const inertiaOptions: InertiaOptions = {
    power: 1,
    bounceDamping: 50,
    // bounceStiffness: 200,
    // timeConstant: 200,
    // restDelta: 0.5,
    // restSpeed: 1,
  }

  const animatePan = async (info: LimitedPanInfo) => {
    const el = ref.current
    if (!el) throw Error(`Can't find html element`)

    const { scrollLeft, scrollTop } = el

    const xDone = new Promise<void>((onComplete) => {
      const targetX = clamp(info, 'x') * -1 + scrollLeft
      const closestX =
        direction() !== 'block' ? closest(getScrollSnapPositions().x, targetX) : undefined

      if ((closestX ?? 0) !== scrollLeft) {
        disableSnap()
        register(
          inertia({
            velocity: info.velocity.x * -1,
            max: typeof closestX !== 'undefined' ? closestX - scrollLeft : undefined,
            min: typeof closestX !== 'undefined' ? closestX - scrollLeft : undefined,
            ...inertiaOptions,
            onUpdate: (v: number) => {
              const x = Math.round(v + scrollLeft)
              el.scrollLeft = x
              scroll.x.set(x)
            },
            onComplete,
          }),
        )
      } else {
        onComplete()
      }
    })

    const yDone = new Promise<void>((onComplete) => {
      const targetY = clamp(info, 'y') * -1 + scrollTop
      const closestY =
        direction() !== 'inline' ? closest(getScrollSnapPositions().y, targetY) : undefined

      if ((closestY ?? 0) !== scrollTop) {
        disableSnap()
        register(
          inertia({
            velocity: info.velocity.y * -1,
            max: typeof closestY !== 'undefined' ? closestY - scrollTop : undefined,
            min: typeof closestY !== 'undefined' ? closestY - scrollTop : undefined,
            ...inertiaOptions,
            onUpdate: (v: number) => {
              const y = Math.round(v + scrollTop)
              el.scrollTop = y
              scroll.y.set(y)
            },
            onComplete,
          }),
        )
      } else {
        onComplete()
      }
    })

    await xDone
    await yDone
    enableSnap()
  }

  return animatePan
}
