import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, PanInfo, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import useResizeObserver from 'use-resize-observer'
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
  animating?: boolean
} & UseStyles<typeof useStyles>

export default function SliderScroller(props: SliderScrollerProps) {
  const { children, animating } = props
  const classes = useStyles(props)
  const [{ containerRef, scrollerRef, controls }, dispatch] = useSliderContext()
  const x = useMotionValue<number>(0)

  const { width: containerWidth = 0 } = useResizeObserver<HTMLElement>({
    ref: containerRef.current,
  })
  const { width: scrollerWidth = 0 } = useResizeObserver<HTMLDivElement>({
    ref: scrollerRef.current,
  })
  const left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1

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
    if (!scrollerRef.current || !containerRef.current || animating) return () => {}

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
  }, [animating, containerRef, dispatch, scrollerRef, scrollerRef.current?.children])

  /**
   * After dragging completes
   * - Calculate the new x-position with the velocity taken in account.
   * - We clamp the position for small gestures.
   *
   * Todo(paales): It does not actually calculate the x-position super accurately. If we let the
   * drag handle it we get a different resulting x-position..
   */
  const handleDragEnd = (_: unknown, { velocity, offset }: PanInfo) => {
    const velocityClamp =
      velocity.x < 0 ? Math.max(velocity.x, offset.x * 2) : Math.min(velocity.x, offset.x * 2)
    dispatch({ type: 'SCROLL', x: x.get() + velocityClamp, velocity: velocity.x })
  }

  return (
    <m.div
      ref={scrollerRef}
      drag='x'
      dragConstraints={{ left, right: 0 }}
      className={clsx(classes.scroller)}
      onDragEnd={handleDragEnd}
      animate={controls}
      layout={animating}
      style={{ x }}
    >
      {children}
    </m.div>
  )
}
