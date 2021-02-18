import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m, PanInfo, useAnimation } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'
import SliderItem, { SliderItemProps, SliderItemStyles } from './SliderItem'

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
  const [state] = useSliderContext(scope)

  const { width: containerWidth = 0 } = useResizeObserver<HTMLElement>({ ref: containerRef })
  const ref = useRef<HTMLDivElement>(null)
  const { width: scrollerWidth = 0 } = useResizeObserver<HTMLDivElement>({ ref })

  let left = scrollerWidth <= containerWidth ? 0 : (scrollerWidth - containerWidth) * -1

  if (state.count === React.Children.count(children) && state.lastItem) {
    left = (state.lastItem.left + state.lastItem.width - containerWidth) * -1
  }

  const count = React.Children.count(children)
  useEffect(() => {}, [count])

  const handleDragEnd = (_: unknown, { velocity }: PanInfo) => {
    window.requestAnimationFrame(() => {
      const bbRect = ref.current?.getBoundingClientRect()
      if (!ref.current || !bbRect || !snap) return

      // todo: clamp velocity to only 100% of the scroller width else we can shoot on very small drags
      const targetX = Math.min(0, Math.max(left, bbRect.x + velocity.x))

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
      state.controls.start({
        x,
        transition: {
          type: 'spring',
          velocity: velocity.x,
          stiffness: 200,
          mass: 1,
          damping: 20,
        },
      })
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
    >
      {React.Children.map(children, (child, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <SliderItem key={idx} idx={idx} scope={scope} className={itemClassName}>
          {child}
        </SliderItem>
      ))}
    </m.div>
  )
}
