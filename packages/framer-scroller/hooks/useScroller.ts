import { useConstant, useMotionValueValue } from '@graphcommerce/framer-utils'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { SxProps, Theme } from '@mui/material'
import {
  HTMLMotionProps,
  motionValue,
  MotionValue,
  PanHandlers,
  PanInfo,
  useDomEvent,
  useTransform,
} from 'framer-motion'
import React, { MouseEventHandler, ReactHTML, useEffect, useState } from 'react'
import { isHTMLMousePointerEvent } from '../utils/isHTMLMousePointerEvent'
import { scrollSnapTypeDirection, SnapTypeDirection } from '../utils/scrollSnapTypeDirection'
import { useScrollerContext } from './useScrollerContext'
import { useVelocitySnapTo } from './useVelocitySnapTo'

export type ScrollableProps<TagName extends keyof ReactHTML = 'div'> = Omit<
  HTMLMotionProps<TagName>,
  'children'
> & {
  hideScrollbar?: boolean
  grid?: boolean
  children: React.ReactNode
}

type OwnerProps = {
  smSnapDir: false | SnapTypeDirection
  smGridDir: false | SnapTypeDirection
  mdSnapDir: false | SnapTypeDirection
  mdGridDir: false | SnapTypeDirection
  isSnap: boolean
  isPanning: boolean
  hideScrollbar: boolean
  canGrab: boolean
  grid: boolean
}
const name = 'Scroller' as const
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

/** Make any HTML */
export function useScroller<
  TagName extends keyof ReactHTML = 'div',
  E extends HTMLElement = HTMLElement,
>(props: ScrollableProps<TagName>, forwardedRef: React.ForwardedRef<E>) {
  const { hideScrollbar = false, children, grid = false, ...divProps } = props

  const { scrollSnap, scrollerRef, enableSnap, disableSnap, snap, registerChildren, scroll } =
    useScrollerContext()

  useEffect(() => {
    registerChildren(children)
  }, [children, registerChildren])

  const canGrab = useMotionValueValue(
    useTransform(
      [scroll.xMax, scroll.yMax] as MotionValue<string | number>[],
      ([xMax, yMax]: number[]) => xMax || yMax,
    ),
    (v) => !!v,
  )

  const isSnap = useMotionValueValue(snap, (v) => v)

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

    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return
    if (event.target.closest('.Scroller-root') !== scrollerRef.current) return

    if (
      event.target !== scrollerRef.current &&
      event.target.querySelector(':scope > input, :scope > textarea')
    ) {
      return
    }

    scrollStart.x.set(scroll.x.get())
    scrollStart.y.set(scroll.y.get())
    disableSnap()
    setPanning(true)
  }

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => event.preventDefault()

  const onPan: PanHandlers['onPan'] = (event, info: PanInfo) => {
    if (!scrollerRef.current) return

    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return
    if (!isPanning) return

    scroll.x.set(Math.min(Math.max(0, scrollStart.x.get() - info.offset.x), scroll.xMax.get()))
    scroll.y.set(Math.min(Math.max(0, scrollStart.y.get() - info.offset.y), scroll.yMax.get()))
    scrollerRef.current.scrollLeft = scroll.x.get()
    scrollerRef.current.scrollTop = scroll.y.get()
  }

  const onPanEnd: PanHandlers['onPanEnd'] = (event, info) => {
    // If we're not dealing with the mouse we don't need to do anything
    if (!isHTMLMousePointerEvent(event)) return
    if (!isPanning) return

    setPanning(false)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    snapToVelocity(info)
  }

  const ref: React.RefCallback<E> = (el) => {
    // @ts-expect-error current is assignable
    scrollerRef.current = el ?? undefined
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) forwardedRef.current = el
  }

  const smSnapDir = scrollSnapTypeDirection(scrollSnap.scrollSnapTypeSm)
  const mdSnapDir = scrollSnapTypeDirection(scrollSnap.scrollSnapTypeMd)

  const classes = withState({
    grid,
    smSnapDir,
    smGridDir: grid && smSnapDir,
    mdSnapDir,
    mdGridDir: grid && mdSnapDir,
    isSnap,
    isPanning,
    hideScrollbar,
    canGrab,
  })

  const sx: SxProps<Theme> = (theme) => ({
    '&.grid *': {
      userSelect: 'none',
      userDrag: 'none',
      WebkitUserDrag: 'none',
    },

    // sm Snap Direction
    '&.smSnapDirNone': {
      [theme.breakpoints.down('md')]: {
        overflow: 'hidden',
        overscrollBehavior: 'auto',
      },
    },
    '&.smSnapDirBlock': {
      [theme.breakpoints.down('md')]: {
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehaviorBlock: 'contain',
      },
    },
    '&.smSnapDirInline': {
      [theme.breakpoints.down('md')]: {
        overflowX: 'auto',
        overflowY: 'hidden',
        overscrollBehaviorInline: 'contain',
      },
    },
    '&.smSnapDirBoth': {
      [theme.breakpoints.down('md')]: {
        overflow: 'auto',
        overscrollBehavior: 'contain',
      },
    },

    // md Snap Direction
    '&.mdSnapDirNone': {
      [theme.breakpoints.up('md')]: {
        overflow: 'hidden',
        overscrollBehavior: 'auto',
      },
    },
    '&.mdSnapDirBlock': {
      [theme.breakpoints.up('md')]: {
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehaviorBlock: 'contain',
      },
    },
    '&.mdSnapDirInline': {
      [theme.breakpoints.up('md')]: {
        overflowX: 'auto',
        overflowY: 'hidden',
        overscrollBehaviorInline: 'contain',
      },
    },
    '&.mdSnapDirBoth': {
      [theme.breakpoints.up('md')]: {
        overflow: 'auto',
        overscrollBehavior: 'contain',
      },
    },

    '&.smGridDirBlock': {
      [theme.breakpoints.down('md')]: {
        display: 'grid',
        gridAutoFlow: 'row',
        gridAutoColumns: `40%`,
        '& > *': {
          scrollSnapAlign: scrollSnap.scrollSnapAlign,
          scrollSnapStop: scrollSnap.scrollSnapStop,
        },
      },
    },
    '&.smGridDirInline': {
      [theme.breakpoints.down('md')]: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoRows: `40%`,
        gridTemplateRows: 'auto',
        '& > *': {
          scrollSnapAlign: scrollSnap.scrollSnapAlign,
          scrollSnapStop: scrollSnap.scrollSnapStop,
        },
      },
    },

    '&.mdGridDirBlock': {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridAutoFlow: 'row',
        gridAutoColumns: `40%`,
        '& > *': {
          scrollSnapAlign: scrollSnap.scrollSnapAlign,
          scrollSnapStop: scrollSnap.scrollSnapStop,
        },
      },
    },
    '&.mdGridDirInline': {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoRows: `40%`,
        gridTemplateRows: 'auto',
        '& > *': {
          scrollSnapAlign: scrollSnap.scrollSnapAlign,
          scrollSnapStop: scrollSnap.scrollSnapStop,
        },
      },
    },
    '&.canGrab': { cursor: 'grab' },
    '&.isSnap': {
      [theme.breakpoints.down('md')]: {
        scrollSnapType: scrollSnap.scrollSnapTypeSm,
      },
      [theme.breakpoints.up('md')]: {
        scrollSnapType: scrollSnap.scrollSnapTypeMd,
      },
    },
    '&:not(.isSnap)': {
      willChange: 'scroll-position',
    },
    '&.isPanning': {
      cursor: 'grabbing !important',
      '& > *': {
        pointerEvents: 'none',
      },
    },
    '&.hideScrollbar': {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })

  return {
    ...divProps,
    ref,
    onPanStart,
    onPan,
    onPanEnd,
    onMouseDown,
    children,
    className: `${classes.root} ${props.className}`,
    sx,
  }
}
