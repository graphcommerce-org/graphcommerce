import { makeStyles } from '@material-ui/core'
import { useConstant, useElementScroll, useMotionValueValue } from '@reachdigital/framer-utils'
import clsx from 'clsx'
import { HTMLMotionProps, PanInfo, motionValue, useDomEvent, PanHandlers, m } from 'framer-motion'
import React, { forwardRef, useState } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useVelocitySnapTo } from '../hooks/useVelocitySnapTo'
import { ScrollSnapProps } from '../types'
import { isHTMLMousePointerEvent } from '../utils/isHTMLMousePointerEvent'

const useStyles = makeStyles(
  {
    root: ({ scrollSnapAlign, scrollSnapStop }: ScrollSnapProps) => ({
      display: `grid`,
      gridAutoFlow: `column`,
      // gap: 10,
      margin: 0,
      cursor: 'grab',

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
    panning: {
      cursor: 'grabbing !important',
      '& > *': {
        pointerEvents: 'none',
      },
    },
  },
  { name: 'Scrollable' },
)

export type ScrollableProps = HTMLMotionProps<'div'>

const Scroller = forwardRef<HTMLDivElement, ScrollableProps>((props, forwardedRef) => {
  const { scrollSnap, scrollerRef, enableSnap, disableSnap, snap, registerChildren } =
    useScrollerContext()

  registerChildren(props.children)

  const isSnap = useMotionValueValue(snap, (v) => v)

  const classes = useStyles(scrollSnap)

  const scroll = useElementScroll(scrollerRef)

  const animatePan = useVelocitySnapTo(scrollerRef)
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
    if (!isSnap && !isPanning && e instanceof WheelEvent) {
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
    <m.div
      ref={(el) => {
        // @ts-expect-error current is assignable
        scrollerRef.current = el ?? undefined
        if (typeof forwardedRef === 'function') forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      }}
      onPanStart={startPan}
      onPanEnd={endPan}
      onPan={handlePan}
      {...props}
      className={clsx(
        classes.root,
        isSnap && classes.snap,
        isPanning && classes.panning,
        props.className,
      )}
    />
  )
})
Scroller.displayName = 'Scroller'

export default Scroller
