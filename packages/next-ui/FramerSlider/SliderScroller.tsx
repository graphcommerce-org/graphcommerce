import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, PanInfo } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'
import SliderItem from './SliderItem'
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
   * If a ref is provided the slider will render without any wrapping component
   */
  containerRef: React.RefObject<HTMLElement>

  /**
   * Array of items that will be provided
   */
  children: React.ReactNode

  /**
   * Scope used
   */
  scope: string

  /**
   * default: true
   * Should the slider snap to an item
   */
  snap?: boolean

  /**
   * Snap to a the position of an element
   *
   * default: center
   */
  snapAlign?: 'start' | 'center' | 'end'

  /**
   * Pass a className to override styles of the scroller
   */
  className?: string

  /**
   * Pass a className to override styles of an item
   */
  itemClassName?: string
}

export default function SliderScroller(props: SliderScrollerProps) {
  const {
    children,
    containerRef,
    scope,
    snap = true,
    snapAlign = 'center',
    className,
    itemClassName,
  } = props
  const extendedClasses = useStyles(props)
  const [state, dispatch] = useSliderContext(scope)
  const [layout, setLayout] = useState(true)

  const { width: containerWidth = 0 } = useResizeObserver<HTMLElement>({
    ref: containerRef.current,
  })
  const ref = useRef<HTMLDivElement>(null)
  const { width: scrollerWidth = 0 } = useResizeObserver<HTMLDivElement>({ ref: ref.current })

  let left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1

  if (state.count === React.Children.count(children) && state.lastItem) {
    left = (state.lastItem.left + state.lastItem.width - containerWidth) * -1
  }

  const handleDragEnd = (_: unknown, { velocity, point }: PanInfo) => {
    window.requestAnimationFrame(() => {
      const bbRect = ref.current?.getBoundingClientRect()
      const parentRect = ref.current?.parentElement?.getBoundingClientRect()

      if (!ref.current || !bbRect || !parentRect || !snap) return
      const rect = rectRelative(bbRect, parentRect)

      // todo: clamp velocity to only 100% of the scroller width else we can shoot on very small drags
      // const targetX = rect.x + velocity.x
      const targetX = Math.min(0, Math.max(left, rect.x + velocity.x))

      let x = targetX

      if (snapAlign === 'start') {
        const snapTargets = Object.entries(state.items).map(([, item]) => item.left * -1)

        snapTargets.push(left)
        x = snapTargets.reduce((prev, curr) =>
          Math.abs(curr - targetX) < Math.abs(prev - targetX) ? curr : prev,
        )
      }

      if (snapAlign === 'center') {
        const center = containerWidth / 2
        const snapTargets = Object.entries(state.items).map(
          ([, item]) => item.left * -1 - item.width / 2 + center,
        )
        snapTargets.push(0)
        snapTargets.push(left)
        x = snapTargets.reduce((prev, curr) =>
          Math.abs(curr - targetX) < Math.abs(prev - targetX) ? curr : prev,
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      state.controls.start({ x, transition: { velocity: velocity.x, ...state.transition } })
    })
  }

  return (
    <m.div
      ref={ref}
      drag='x'
      dragConstraints={{ left, right: 0 }}
      className={clsx(extendedClasses.scroller, className)}
      onDragEnd={handleDragEnd}
      animate={state.controls}
      /**
       * To be able to scale the scroller we need to have the layout property,
       * we however run into an issue that the layout is counteranimating the scroll
       *
       * We disable the layout property when we start scrolling
       * We enable the layout propery when all animations are done
       */
      layout={layout}
      onDragStart={() => setLayout(false)}
      onAnimationComplete={() => setLayout(true)}
    >
      {/**
       * We wrap each item in a separate SliderItem because then we can easily setup the intersection observer.
       *
       * todo: Can we hoist the intersection observer functionality to this component?
       */}
      {React.Children.map(children, (child, idx) => (
        <SliderItem
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          idx={idx}
          scope={scope}
          className={itemClassName}
        >
          {child}
        </SliderItem>
      ))}
    </m.div>
  )
}
