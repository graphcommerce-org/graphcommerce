import { MotionValue } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import React from 'react'

export type ItemState = { el: HTMLElement; visibility: MotionValue<number> }

export type ScrollSnapProps = {
  scrollSnapType: ScrollSnapType
  scrollSnapAlign: ScrollSnapAlign
  scrollSnapStop: ScrollSnapStop
}

export type ScrollerContext = {
  scrollSnap: ScrollSnapProps
  scrollerRef: React.RefObject<HTMLDivElement>
  register: (controls: PlaybackControls) => void
  stop: () => void
  items: ItemState[]
  snap: boolean
}

export type ComponentBaseProps = {
  scrollerRef: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDialogElement>
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
