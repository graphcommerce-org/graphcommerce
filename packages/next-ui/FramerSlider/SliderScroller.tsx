import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, PanInfo, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  {
    scroller: {
      width: 'fit-content',
      display: 'grid',
      gridAutoFlow: 'column',
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
    },
  },
  { name: 'SliderScroller' },
)

export type SliderScrollerStyles = UseStyles<typeof useStyles>

export type SliderScrollerProps = {
  /** Array of items that will be provided */
  children: React.ReactNode
  /** Enable the layout property temporarily. Must be disabled to handle sliding properly */
  layout?: boolean
} & UseStyles<typeof useStyles>

/**
 * Todo(paales): When the scroller resizes it will not counter scale the x offset. How can we
 * counter animate this?
 */
export default function SliderScroller(props: SliderScrollerProps) {
  const { children, layout } = props
  const classes = useStyles(props)
  const [state, dispatch] = useSliderContext()
  const { containerRef, containerSize, scrollerRef, scrollerSize, controls } = state
  const x = useMotionValue<number>(0)

  const containerWidth = containerSize.width ?? 0
  const scrollerWidth = scrollerSize.width ?? 0

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
   * - Calculate the new x-position with the velocity taken in account.
   * - We clamp the position for small gestures.
   *
   * Todo(paales): Drag accuracy: It does not actually calculate the x-position after drag completes
   * super accurately. If we let the drag handle it we get a small difference in the resulting x-position..
   */
  const handleDragSnap = (_: unknown, { velocity, offset }: PanInfo) => {
    const velocityClamp =
      velocity.x < 0 ? Math.max(velocity.x, offset.x * 2) : Math.min(velocity.x, offset.x * 2)
    dispatch({ type: 'SCROLL', x: x.get() + velocityClamp, velocity: velocity.x })
  }

  /** Calculate the max scroll constraint */
  const left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1

  return (
    <m.div
      ref={scrollerRef}
      drag='x'
      dragConstraints={{ left, right: 0 }}
      className={clsx(classes.scroller)}
      onDragEnd={handleDragSnap}
      animate={controls}
      layout={layout}
      style={{ x }}
    >
      {children}
    </m.div>
  )
}
