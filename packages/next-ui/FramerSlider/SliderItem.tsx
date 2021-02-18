import React, { PropsWithChildren, useEffect, useRef } from 'react'
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
  const entry = useIntersectionObserver({ ref, threshold: [0.4, 0.6] })
  const [, dispatch] = useSliderContext(scope)

  useEffect(() => {
    const parentRect = entry?.target.parentElement?.getBoundingClientRect()
    if (!entry || !parentRect) return

    const rect = entry.boundingClientRect

    dispatch({
      type: 'UPDATE_ITEM',
      idx,
      left: Math.abs(Math.round(rect.left - parentRect.left)),
      top: Math.abs(Math.round(rect.top - parentRect.top)),
      width: rect.width,
      height: rect.height,
      active: entry.intersectionRatio > 0.5,
    })
  }, [dispatch, entry, idx])

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
