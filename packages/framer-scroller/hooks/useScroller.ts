import { useConstant, useElementScroll, useMotionValueValue } from '@graphcommerce/framer-utils'
import { UseStyles, classesPicker } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
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
import { scrollSnapTypeDirection } from '../utils/scrollSnapTypeDirection'
import { useScrollerContext } from './useScrollerContext'
import { useVelocitySnapTo } from './useVelocitySnapTo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& *': {
        userSelect: 'none',
        userDrag: 'none',
      },
    },
    rootSmSnapDirNone: {
      [theme.breakpoints.down('sm')]: {
        overflow: 'hidden',
        overscrollBehavior: 'auto',
      },
    },
    rootMdSnapDirNone: {
      [theme.breakpoints.up('md')]: {
        overflow: 'hidden',
        overscrollBehavior: 'auto',
      },
    },
    rootSmSnapDirBlock: {
      [theme.breakpoints.down('sm')]: {
        overflowY: 'auto',
        overscrollBehaviorBlock: 'contain',
      },
    },
    rootMdSnapDirBlock: {
      [theme.breakpoints.up('md')]: {
        overflowY: 'auto',
        overscrollBehaviorBlock: 'contain',
      },
    },
    rootSmSnapDirInline: {
      [theme.breakpoints.down('sm')]: {
        overflowX: 'auto',
        overscrollBehaviorInline: 'contain',
      },
    },
    rootMdSnapDirInline: {
      [theme.breakpoints.up('md')]: {
        overflowX: 'auto',
        overscrollBehaviorInline: 'contain',
      },
    },
    rootSmSnapDirBoth: {
      [theme.breakpoints.down('sm')]: {
        overflow: 'auto',
        overscrollBehavior: 'contain',
      },
    },
    rootMdSnapDirBoth: {
      [theme.breakpoints.up('md')]: {
        overflow: 'auto',
        overscrollBehavior: 'contain',
      },
    },

    rootSmGridDirBlock: ({ scrollSnapAlign, scrollSnapStop }) => ({
      display: 'grid',
      gridAutoFlow: 'row',
      gridAutoColumns: `40%`,
      '& > *': {
        scrollSnapAlign,
        scrollSnapStop,
      },
    }),
    rootSmGridDirInline: ({ scrollSnapAlign, scrollSnapStop }) => ({
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoRows: `40%`,
      gridTemplateRows: 'auto',
      '& > *': {
        scrollSnapAlign,
        scrollSnapStop,
      },
    }),
    rootCanGrab: {
      cursor: 'grab',
    },
    rootIsSnap: ({ scrollSnapTypeSm, scrollSnapTypeMd }: ScrollSnapProps) => ({
      [theme.breakpoints.down('sm')]: {
        scrollSnapType: scrollSnapTypeSm,
      },
      [theme.breakpoints.up('md')]: {
        scrollSnapType: scrollSnapTypeMd,
      },
    }),
    rootNoSnap: {
      willChange: 'scroll-position',
    },
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
  }),
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    snapToVelocity(info)
  }

  const ref: React.RefCallback<HTMLElement> = (el) => {
    // @ts-expect-error current is assignable
    scrollerRef.current = el ?? undefined
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) forwardedRef.current = el
  }

  const smSnapDir = scrollSnapTypeDirection(scrollSnap.scrollSnapTypeSm)
  const mdSnapDir = scrollSnapTypeDirection(scrollSnap.scrollSnapTypeMd)

  const smGridDir = grid && smSnapDir
  const mdGridDir = grid && mdSnapDir

  const className = classesPicker(classes, {
    smSnapDir,
    smGridDir,
    mdSnapDir,
    mdGridDir,
    isSnap,
    noSnap: !isSnap,
    isPanning,
    hideScrollbar,
    canGrab,
  })('root', props.className)

  return { ...divProps, ref, onPanStart, onPan, onPanEnd, children, ...className }
}
