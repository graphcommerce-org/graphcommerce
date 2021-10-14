import { useConstant, useElementScroll, useMotionValueValue } from '@graphcommerce/framer-utils'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import {
  HTMLMotionProps,
  motionValue,
  MotionValue,
  PanHandlers,
  PanInfo,
  useDomEvent,
  useTransform,
} from 'framer-motion'
import React, { ReactHTML, useState } from 'react'
import { ScrollSnapProps } from '../types'
import { isHTMLMousePointerEvent } from '../utils/isHTMLMousePointerEvent'
import { useScrollerContext } from './useScrollerContext'
import { useVelocitySnapTo } from './useVelocitySnapTo'

const useStyles = makeStyles(
  {
    root: ({ scrollSnapAlign, scrollSnapStop }: ScrollSnapProps) => ({
      overflow: `auto`,
      overscrollBehaviorInline: `contain`,
      '& > *': {
        scrollSnapAlign,
        scrollSnapStop,
      },
      '& *': {
        userSelect: 'none',
        userDrag: 'none',
      },
    }),
    canGrab: {
      cursor: 'grab',
    },
    snap: ({ scrollSnapType }: ScrollSnapProps) => ({
      scrollSnapType,
    }),
    panning: {
      cursor: 'grabbing !important',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    hideScrollbar: {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  { name: 'Scrollable' },
)

export type ScrollableProps<TagName extends keyof ReactHTML = 'div'> = HTMLMotionProps<TagName> & {
  hideScrollbar?: boolean
}

/** Make any HTML */
export function useScroller<TagName extends keyof ReactHTML = 'div'>(
  props: ScrollableProps<TagName>,
  forwardedRef: React.ForwardedRef<any>,
) {
  const { scrollSnap, scrollerRef, enableSnap, disableSnap, snap, registerChildren } =
    useScrollerContext()

  const { hideScrollbar, children, ...divProps } = props
  registerChildren(children)

  const scroll = useElementScroll(scrollerRef)

  const canGrab = useMotionValueValue(
    useTransform(
      [scroll.xMax, scroll.yMax] as MotionValue[],
      ([xMax, yMax]: number[]) => xMax || yMax,
    ),
    (v) => v,
  )

  const isSnap = useMotionValueValue(snap, (v) => v)

  const classes = useStyles(scrollSnap)

  const animatePan = useVelocitySnapTo(scrollerRef)
  const [isPanning, setPanning] = useState(false)

  useDomEvent(scrollerRef as React.RefObject<EventTarget>, 'wheel', (e) => {
    /**
     * Todo: this is actually incorrect because when enabling the snap points, the area jumps to the
     * nearest point a snap.
     *
     * What we *should* do is wait for the scroll position to be set exactly like a snappoint and
     * then enable it. However, to lazy to do that then we need to know the position of all elements
     * at all time, we now are lazy :)
     */
    if (!snap.get() && !isPanning && e instanceof WheelEvent) {
      enableSnap()
    }
  })

  const scrollStart = useConstant(() => ({ x: motionValue(0), y: motionValue(0) }))
  const onPanStart: PanHandlers['onPanStart'] = (event) => {
    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return

    scrollStart.x.set(scroll.x.get())
    scrollStart.y.set(scroll.y.get())
    disableSnap()
    setPanning(true)
  }

  const onPan: PanHandlers['onPan'] = (event, info: PanInfo) => {
    if (!scrollerRef.current) return

    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return

    scrollerRef.current.scrollLeft = scrollStart.x.get() - info.offset.x
    scrollerRef.current.scrollTop = scrollStart.y.get() - info.offset.y
  }

  const onPanEnd: PanHandlers['onPanEnd'] = (event, info) => {
    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return

    setPanning(false)
    animatePan(info, enableSnap)
  }

  const ref: React.RefCallback<HTMLElement> = (el) => {
    // @ts-expect-error current is assignable
    scrollerRef.current = el ?? undefined
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) forwardedRef.current = el
  }

  const className = clsx(
    classes.root,
    isSnap && classes.snap,
    isPanning && classes.panning,
    hideScrollbar && classes.hideScrollbar,
    canGrab && classes.canGrab,
    props.className,
  )

  return { ...divProps, ref, onPanStart, onPan, onPanEnd, className, children }
}
