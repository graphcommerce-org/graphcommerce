import { MotionValue } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import { Point2D } from 'popmotion/lib/types'
import React from 'react'

export type ItemState = {
  el: HTMLElement
  visibility: MotionValue<number>
  opacity: MotionValue<number>
}

export type ScrollSnapProps = {
  scrollSnapType: ScrollSnapType
  scrollSnapAlign: ScrollSnapAlign
  scrollSnapStop: ScrollSnapStop
}

export type SnapPositionDirection = 'left' | 'right' | 'up' | 'down'

export type ScrollerContext = {
  scrollSnap: ScrollSnapProps
  scrollerRef: React.RefObject<HTMLDivElement>
  items: ItemState[]
  snap: MotionValue<boolean>

  register(controls: PlaybackControls): void
  stop(): void
  enableSnap(): void
  disableSnap(): void
  getSnapPosition(direction: SnapPositionDirection): Point2D
  getScrollSnapPositions(): Record<Axis, number[]>
}

export type ScrollSnapType =
  | 'none'
  | 'block'
  | 'inline'
  | 'x'
  | 'y'
  | 'both'
  | `${'block' | 'inline' | 'x' | 'y' | 'both'} ${'mandatory' | 'proximity'}`
export type ScrollSnapAlignAxis = 'none' | 'center' | 'end' | 'start'

export type ScrollSnapAlign = ScrollSnapAlignAxis | `${ScrollSnapAlignAxis} ${ScrollSnapAlignAxis}`

export type ScrollSnapStop = 'always' | 'normal'

export type Axis = 'x' | 'y'
export type SnapPositionList = Record<Exclude<ScrollSnapAlignAxis, 'none'>, number[]>
