import { ScrollMotionValues } from '@graphcommerce/framer-utils'
import { MotionValue, Point } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import React from 'react'

export type ItemState = {
  el?: HTMLElement
  visibility: MotionValue<number>
  opacity: MotionValue<number>
}

export type ScrollSnapProps = {
  scrollSnapTypeSm: ScrollSnapType
  scrollSnapTypeMd: ScrollSnapType
  scrollSnapAlign: ScrollSnapAlign
  scrollSnapStop: ScrollSnapStop
}

export type ReactHtmlRefObject = React.MutableRefObject<HTMLElement | undefined>

export type SnapPositionDirection = 'left' | 'right' | 'up' | 'down'

export type ScrollerContext = {
  scrollSnap: ScrollSnapProps
  scrollerRef: ReactHtmlRefObject
  items: MotionValue<ItemState[]>
  snap: MotionValue<boolean>
  scroll: ScrollMotionValues

  /** @private */
  enableSnap: () => void
  /** @private */
  disableSnap: (stopAnimationOnScroll?: boolean) => void
  /** @private */
  register: (controls: PlaybackControls) => void
  /** @private */
  stop: () => void
  /** @private */
  getSnapPosition: (direction: SnapPositionDirection) => Point
  /** @private */
  getScrollSnapPositions: () => Record<Axis, number[]>
  /** @private */
  registerChildren: (children: React.ReactNode) => void
}

export type ScrollSnapTypeSingle = 'none' | 'block' | 'inline' | 'x' | 'y' | 'both'

export type ScrollSnapType =
  | ScrollSnapTypeSingle
  | `${ScrollSnapTypeSingle} ${'mandatory' | 'proximity'}`

export type ScrollSnapAlignAxis = 'none' | 'center' | 'end' | 'start'

export type ScrollSnapAlign = ScrollSnapAlignAxis | `${ScrollSnapAlignAxis} ${ScrollSnapAlignAxis}`

export type ScrollSnapStop = 'always' | 'normal'

export type Axis = 'x' | 'y'
export type SnapPositionList = Record<Exclude<ScrollSnapAlignAxis, 'none'>, number[]>
