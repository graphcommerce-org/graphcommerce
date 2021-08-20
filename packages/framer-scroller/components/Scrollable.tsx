import { makeStyles } from '@material-ui/core'
import { useConstant, useElementScroll } from '@reachdigital/framer-utils'
import clsx from 'clsx'
import {
  HTMLMotionProps,
  PanInfo,
  motionValue,
  useDomEvent,
  PanHandlers,
  useVelocity,
  m,
} from 'framer-motion'
import { inertia, InertiaOptions, animate } from 'popmotion'
import React, { forwardRef, useState, useEffect } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ScrollSnapProps } from '../types'

const useStyles = makeStyles({
  root: ({ scrollSnapAlign, scrollSnapStop }: ScrollSnapProps) => ({
    display: `grid`,
    gridAutoFlow: `column`,
    // gap: 10,
    margin: 0,

    overflowX: `auto`,
    overscrollBehaviorInline: `contain`,
    '& > *': {
      scrollSnapAlign,
      scrollSnapStop,
    },
  }),
  snap: ({ scrollSnapType }: ScrollSnapProps) => ({
    scrollSnapType,
  }),
})

const clamp = ({ velocity, offset }: PanInfo, axis: 'x' | 'y') =>
  velocity[axis] < 0
    ? Math.max(velocity[axis], -Math.abs(offset[axis] * 3))
    : Math.min(velocity[axis], Math.abs(offset[axis] * 3))

const closest = (counts: number[], target: number) =>
  counts.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev))

const useSnapTo = (
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement | undefined>,
) => {
  const { scrollSnap, disableSnap, register, getSnapPosition, getScrollSnapPositions } =
    useScrollerContext()

  const inertiaOptions: InertiaOptions = {
    power: 1,
    bounceDamping: 50,
    // bounceStiffness: 200,
    // timeConstant: 750,
    // restDelta: 0.5,
    // restSpeed: 1,
  }

  const animatePan = (info: PanInfo, onComplete?: () => void) => {
    const el = ref.current
    if (!el) throw Error(`Can't find html element`)

    const { scrollLeft, scrollTop } = el
    disableSnap()

    const targetX = clamp(info, 'x') * -1 + scrollLeft
    const closestX = closest(getScrollSnapPositions().x, targetX) - scrollLeft
    const cancelX = inertia({
      velocity: info.velocity.x * -1,
      max: closestX,
      min: closestX,
      ...inertiaOptions,
      onUpdate: (v: number) => {
        el.scrollLeft = Math.round(v + scrollLeft)
      },
      onComplete,
    })
    register(cancelX)

    const targetY = clamp(info, 'y') * -1 + scrollTop
    const closestY = closest(getScrollSnapPositions().y, targetY) - scrollTop
    const cancelY = inertia({
      velocity: info.velocity.y * -1,
      max: closestY,
      min: closestY,
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

function isHTMLMousePointerEvent(
  event: MouseEvent | TouchEvent | PointerEvent,
): event is PointerEvent {
  return (
    event instanceof PointerEvent &&
    event.pointerType === 'mouse' &&
    event.target instanceof HTMLElement
  )
}

export type ScrollableProps = HTMLMotionProps<'div'>

const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>((props, forwardedRef) => {
  const {
    scrollSnap,
    scrollerRef,
    enableSnap,
    disableSnap,
    register,
    snap,
    items,
    getSnapPosition,
  } = useScrollerContext()

  const { ...divProps } = props

  const classes = useStyles(scrollSnap)

  const scroll = useElementScroll(scrollerRef)
  const vel = useVelocity(scroll.x)

  useEffect(
    () =>
      vel.onChange((v) => {
        // console.log(v, scroll.x.getVelocity())
      }),
    [scroll.x, vel],
  )

  const animatePan = useSnapTo(scrollerRef)
  const [isPanning, setPanning] = useState(false)

  const scrollStart = useConstant(() => ({ x: motionValue(0), y: motionValue(0) }))
  const startPan: PanHandlers['onPanStart'] = () => {
    scrollStart.x.set(scroll.x.get())
    scrollStart.y.set(scroll.y.get())
    disableSnap()
    setPanning(true)
  }

  useDomEvent(scrollerRef, 'wheel', (e) => {
    /**
     * Todo: this is actually incorrect because when enabling the snap points, the area jumps to the
     * nearest point a snap.
     *
     * What we *should* do is wait for the scroll position to be set exactly like a snappoint and
     * then enable it. However, to lazy to do that then we need to know the position of all elements
     * at all time, we now are lazy :)
     */
    if (!snap && !isPanning && e instanceof WheelEvent) {
      enableSnap()
    }
  })

  const handlePan: PanHandlers['onPan'] = (event, info: PanInfo) => {
    if (!scrollerRef.current) return

    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return

    scrollerRef.current.scrollLeft = scrollStart.x.get() - info.offset.x
    scrollerRef.current.scrollTop = scrollStart.y.get() - info.offset.y
  }

  const endPan: PanHandlers['onPanEnd'] = (event, info) => {
    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return
    setPanning(false)
    animatePan(info, enableSnap)
  }

  return (
    <>
      <button
        type='button'
        onClick={() => {
          const el = scrollerRef.current
          if (!el) return
          disableSnap()
          const pos = getSnapPosition('left')
          register(
            animate({
              from: el.scrollLeft,
              to: pos.x,
              velocity: scroll.x.getVelocity(),
              onUpdate: (v) => {
                el.scrollLeft = v
              },
              onComplete: enableSnap,
            }),
          )
        }}
      >
        prev
      </button>
      <button
        type='button'
        onClick={() => {
          const el = scrollerRef.current
          if (!el) return
          const pos = getSnapPosition('right')

          const visible = items.filter((item) => item.visibility.get() < 0.9)

          disableSnap()
          register(
            animate({
              from: el.scrollLeft,
              to: pos.x,
              velocity: scroll.x.getVelocity(),
              onUpdate: (v) => {
                el.scrollLeft = v
              },
              onComplete: enableSnap,
            }),
          )
        }}
      >
        next
      </button>
      <m.div
        ref={(el) => {
          scrollerRef.current = el ?? undefined
          if (typeof forwardedRef === 'function') forwardedRef(el)
          else if (forwardedRef) forwardedRef.current = el
        }}
        onPanStart={startPan}
        onPanEnd={endPan}
        onPan={handlePan}
        {...divProps}
        className={clsx(classes.root, snap && classes.snap, divProps.className)}
      />
    </>
  )
})

export default Scrollable
