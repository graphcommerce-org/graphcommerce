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
   * Scope used
   */
  scope: string

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
  const { children, scope, className, animating } = props
  const extendedClasses = useStyles(props)
  const [{ containerRef, controls }, dispatch] = useSliderContext(scope)

  const ref = useRef<HTMLDivElement>(null)

  // Measure the intersection of the elements
  useEffect(() => {
    if (!ref.current || !containerRef.current || animating) return () => {}

    const elements = Array.from(ref.current.children) as HTMLElement[]

    dispatch({ type: 'UPDATE_CHILDREN', elements })

    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const intersecting = entry.intersectionRatio > 0.5
          dispatch({ type: 'ITEM_VISIBLE', el, visible: intersecting })
        })
      },
      { threshold: [0.4, 0.6], root: containerRef.current },
    )

    elements.forEach((e) => ro.observe(e))
    return () => ro.disconnect()
  }, [animating, containerRef, dispatch, ref.current?.children])

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const bbRect = ref.current?.getBoundingClientRect()
    const parentRect = ref.current?.parentElement?.getBoundingClientRect()

    if (!ref.current || !bbRect || !parentRect) return
    dispatch({ type: 'SCROLL', x: rectRelative(bbRect, parentRect).x + panInfo.velocity.x })
  }

  return (
    <m.div
      ref={ref}
      drag='x'
      className={clsx(extendedClasses.scroller, className)}
      onDragEnd={handleDragEnd}
      animate={controls}
      layout={animating}
    >
      {children}
    </m.div>
  )
}
