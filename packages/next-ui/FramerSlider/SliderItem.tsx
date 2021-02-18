import React, { PropsWithChildren, useEffect, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import useIntersectionObserver from '../useIntersectionObserver'
import { useSliderContext } from './SliderContext'

export type SliderItemProps = PropsWithChildren<{
  idx: number
  scope: string
  className?: string
}>

type UseSliderItem = { scope: string; idx: number }
export function useSliderItemMeasure<T extends HTMLElement>({ scope, idx }: UseSliderItem) {
  const ref = useRef<T>(null)
  const resize = useResizeObserver({ ref })
  const entry = useIntersectionObserver({ ref, threshold: [0.4, 0.6] })
  const [state, dispatch] = useSliderContext(scope)
  const item = state.items?.[idx]

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    const parentRect = ref.current?.parentElement?.getBoundingClientRect()
    if (!rect || !parentRect || !entry) return
    const active = entry.intersectionRatio > 0.5
    dispatch({ type: 'UPDATE_ITEM', idx, ...item, rect, parentRect, active })
  }, [entry, resize.width, resize.height, dispatch, idx, item])

  return ref
}

export default function SliderItem(props: SliderItemProps) {
  const { children, scope, idx, className } = props
  const ref = useSliderItemMeasure<HTMLDivElement>({ scope, idx })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
