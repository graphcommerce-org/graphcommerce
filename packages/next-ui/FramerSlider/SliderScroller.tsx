import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionProps, PanInfo, useMotionValue } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  {
    scroller: {
      width: 'fit-content',
      display: 'grid',
      gridAutoFlow: 'column',
      '& *': {
        'user-drag': 'none',
      },
    },
    scrollerEnabled: {
      cursor: 'grab',
    },
    scrollerDragging: {
      cursor: 'grabbing',
      '& > *': {
        pointerEvents: 'none',
      },
    },
  },
  { name: 'SliderScroller' },
)

export type SliderScrollerStyles = UseStyles<typeof useStyles>

export type SliderScrollerProps = {
  /** Array of items that will be provided */
  children: React.ReactNode

  childrenRef?: React.Ref<HTMLElement>
} & MotionProps &
  UseStyles<typeof useStyles>

/**
 * Handles the actual scrollable area
 *
 * **Todo**:
 *
 * - When the scroller resizes it will not counter scale the x offset. How can we counter animate this?
 * - Drag accuracy: It does not actually calculate the x-position after drag completes super
 *   accurately. If we let the drag handle it we get a small difference in the resulting `x`-position..
 * - Disable any `onClick` while dragging
 */
export default function SliderScroller(props: SliderScrollerProps) {
  const { children, layout, ...motionProps } = props
  const { scroller, scrollerDragging, scrollerEnabled } = useStyles(props)
  const [state, dispatch] = useSliderContext()
  const { containerRef, containerSize, scrollerRef, scrollerSize, controls } = state
  const x = useMotionValue<number>(0)
  const [dragging, setDragging] = useState(false)

  const containerWidth = containerSize?.width ?? 0
  const scrollerWidth = scrollerSize?.inlineSize ?? 0

  /**
   * Measure visible items
   *
   * We're using the IntersectionObserver to measure if children (the actual slides) of the
   * SliderScroller are visible.
   *
   * We are only measuring the intersection when the SliderScroller is not animating else we run in
   * to repaints which causes jank.
   */
  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current || layout) return () => {}

    const elements = Array.from(scrollerRef.current.children) as HTMLElement[]

    dispatch({ type: 'REGISTER_CHILDREN', elements })
    const ro = new IntersectionObserver(
      (entries) =>
        dispatch({
          type: 'VISIBILITY_CHILDREN',
          items: entries.map((entry) => ({
            el: entry.target as HTMLElement,
            visible: entry.intersectionRatio > 0.5,
          })),
        }),
      { threshold: [0.4, 0.6], root: containerRef.current },
    )

    elements.forEach((e) => ro.observe(e))
    return () => ro.disconnect()
  }, [layout, containerRef, dispatch, scrollerRef, scrollerRef.current?.children])

  /**
   * After dragging completes
   *
   * - Calculate the new x-position with the velocity taken in account.
   * - We clamp the position for small gestures.
   */
  const handleDragSnap = (e: PointerEvent, { velocity, offset }: PanInfo) => {
    setDragging(false)
    const velocityClamp =
      velocity.x < 0 ? Math.max(velocity.x, offset.x * 2) : Math.min(velocity.x, offset.x * 2)
    dispatch({ type: 'SCROLL', x: x.get() + velocityClamp, velocity: velocity.x })
  }

  /** Calculate the max scroll constraint */
  const left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1
  const canDrag = left < 0

  return (
    <m.div
      ref={scrollerRef}
      drag={canDrag && 'x'}
      dragConstraints={{ left, right: 0 }}
      className={clsx(scroller, canDrag && scrollerEnabled, dragging && scrollerDragging)}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragSnap}
      animate={controls}
      layout={layout}
      style={{ ...motionProps.style, x }}
      {...motionProps}
    >
      {children}
    </m.div>
  )
}
