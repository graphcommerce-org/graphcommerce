import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, PanInfo } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'
import { rectRelative } from './sliderReducer'

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
  /**
   * Array of items that will be provided
   */
  children: React.ReactNode

  /**
   * Pass a className to override styles of the scroller
   */
  className?: string

  /**
   * Enable the layout property temporarily. Must be disabled to handle sliding properly
   */
  animating?: boolean
}

export default function SliderScroller(props: SliderScrollerProps) {
  const { children, className, animating } = props
  const extendedClasses = useStyles(props)
  const [{ containerRef, controls }, dispatch] = useSliderContext()

  const scrollerRef = useRef<HTMLDivElement>(null)
  const { width: containerWidth = 0 } = useResizeObserver<HTMLElement>({
    ref: containerRef.current,
  })
  const { width: scrollerWidth = 0 } = useResizeObserver<HTMLDivElement>({
    ref: scrollerRef.current,
  })
  const left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1

  // Measure the intersection of the elements
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
  }, [animating, containerRef, dispatch, scrollerRef.current?.children])

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const scrollerRect = scrollerRef.current?.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()

    if (!scrollerRef.current || !scrollerRect || !containerRect) return

    const rect = rectRelative(scrollerRect, containerRect)

    // todo: for some reason the x position of the rect is 0
    if (rect.x === 0) {
      console.warn('[FramerSlider] Can not determine the x-position of the scrollerRef')
      return
    }

    const velocityX = panInfo.velocity.x
    const clamp = panInfo.offset.x * 3

    const velocity = velocityX < 0 ? Math.max(velocityX, clamp) : Math.min(velocityX, clamp)
    dispatch({ type: 'SCROLL', x: rect.x + velocity })
  }

  return (
    <m.div
      ref={scrollerRef}
      drag='x'
      dragConstraints={{ left, right: 0 }}
      className={clsx(extendedClasses.scroller, className)}
      onDrag={(_, info) => {}}
      onDragEnd={handleDragEnd}
      animate={controls}
      layout={animating}
    >
      {children}
    </m.div>
  )
}
