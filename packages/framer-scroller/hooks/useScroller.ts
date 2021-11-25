import { useConstant, useElementScroll, useMotionValueValue } from '@graphcommerce/framer-utils'
import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles } from '@material-ui/core'
import { classesPicker } from '@graphcommerce/next-ui'
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
    root: {
      '& *': {
        userSelect: 'none',
        userDrag: 'none',
      },
    },
    rootSnapDirNone: {
      overflow: 'hidden',
      overscrollBehavior: 'auto',
    },
    rootSnapDirBlock: {
      overflowY: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehaviorBlock: 'contain',
    },
    rootSnapDirInline: {
      overflowX: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehaviorInline: 'contain',
    },
    rootSnapDirBoth: {
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehavior: 'contain',
    },
    rootGridDirBlock: ({ scrollSnapAlign, scrollSnapStop }) => ({
      display: 'grid',
      gridAutoFlow: 'row',
      gridAutoColumns: `40%`,
      '& > *': {
        scrollSnapAlign,
        scrollSnapStop,
      },
    }),
    rootGridDirInline: ({ scrollSnapAlign, scrollSnapStop }) => ({
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoRows: `40%`,
      '& > *': {
        scrollSnapAlign,
        scrollSnapStop,
      },
    }),
    rootCanGrab: {
      cursor: 'grab',
    },
    rootIsSnap: ({ scrollSnapType }: ScrollSnapProps) => ({
      scrollSnapType,
    }),
    rootIsPanning: {
      cursor: 'grabbing !important',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    rootHideScrollbar: {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  { name: 'Scroller' },
)

export type ScrollableProps<TagName extends keyof ReactHTML = 'div'> = UseStyles<typeof useStyles> &
  HTMLMotionProps<TagName> & { hideScrollbar?: boolean; grid?: boolean }

/** Make any HTML */
export function useScroller<TagName extends keyof ReactHTML = 'div'>(
  props: ScrollableProps<TagName>,
  forwardedRef: React.ForwardedRef<any>,
) {
  const { hideScrollbar = false, children, grid = false, ...divProps } = props

  const { scrollSnap, scrollerRef, enableSnap, disableSnap, snap, registerChildren } =
    useScrollerContext()

  registerChildren(children)

  const scroll = useElementScroll(scrollerRef)

  const canGrab = useMotionValueValue(
    useTransform(
      [scroll.xMax, scroll.yMax] as MotionValue<string | number>[],
      ([xMax, yMax]: number[]) => xMax || yMax,
    ),
    (v) => !!v,
  )

  const isSnap = useMotionValueValue(snap, (v) => v)

  const classes = useStyles(scrollSnap)

  const snapToVelocity = useVelocitySnapTo(scrollerRef)

  const [isPanning, setPanning] = useState(false)

  /** If the scroller doesn't have snap enabled and the user is not panning, enable snap */
  useDomEvent(scrollerRef as React.RefObject<EventTarget>, 'wheel', (e) => {
    /**
     * Todo: this is actually incorrect because when enabling the snap points, the area jumps to the
     * nearest point a snap.
     *
     * What we SHOULD do is wait for the scroll position to be set exactly on a snappoint and then
     * enable it. However, to do that then we need to know the position of all elements at all time,
     * we now are lazy :)
     */
    if (!snap.get() && !isPanning && e instanceof WheelEvent) enableSnap()
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
    snapToVelocity(info).then(enableSnap)
  }

  const ref: React.RefCallback<HTMLElement> = (el) => {
    // @ts-expect-error current is assignable
    scrollerRef.current = el ?? undefined
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) forwardedRef.current = el
  }

  let snapDir = scrollSnap.scrollSnapType.split(' ')[0]
  snapDir = snapDir.replace('y', 'block')
  snapDir = snapDir.replace('x', 'inline') as 'block' | 'inline' | 'both' | 'inline'

  const gridDir = grid && snapDir

  const className = classesPicker(classes, {
    snapDir,
    gridDir,
    isSnap,
    isPanning,
    hideScrollbar,
    canGrab,
  })('root', props.className)

  return { ...divProps, ref, onPanStart, onPan, onPanEnd, children, ...className }
}
