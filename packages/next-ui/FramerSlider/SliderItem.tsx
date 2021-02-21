import { m } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import useIntersectionObserver from '../useIntersectionObserver'
import { useSliderContext } from './SliderContext'

export type SliderItemProps = PropsWithChildren<{
  idx: number
  scope: string
  className?: string
}>

export default function SliderItem(props: SliderItemProps) {
  const { children, scope, idx, className } = props
  const ref = useRef<HTMLDivElement>(null)
  const resize = useResizeObserver({ ref: ref.current })
  const entry = useIntersectionObserver({ ref, threshold: [0.4, 0.6] })
  const [state, dispatch] = useSliderContext(scope)
  const item = state.items?.[idx]

  useEffect(() => {
    if (!ref.current || !entry) return
    dispatch({ type: 'UPDATE_ITEM', idx, ref, active: entry.intersectionRatio > 0.5 })
  }, [entry, resize.width, resize.height, dispatch, idx, item])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
