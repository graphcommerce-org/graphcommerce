import { MotionValue, motionValue } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'
import { ComponentBaseProps } from '../types'

type DotsProps = ComponentBaseProps & { count: number }

export default function Dots(props: DotsProps) {
  const { scrollerRef, count } = props

  const pagination = useMemo(() => {
    if (!scrollerRef.current) return () => {}
    const map = new Map<HTMLElement, MotionValue<number>>()
    ;[...scrollerRef.current.children].forEach((child) => {
      map.set(child as HTMLElement, motionValue(0))
    })
    return map
  }, [scrollerRef])

  // useEffect(() => {
  //   if (!scrollerRef.current) return () => {}
  //   const mo = new MutationObserver(([record]) => {})

  //   mo.observe(scrollerRef.current)

  //   return () => mo.disconnect()
  // })

  useEffect(() => {
    if (!scrollerRef.current) return () => {}

    const map = new Map<HTMLElement, MotionValue<number>>()
    ;[...scrollerRef.current.children].forEach((child) => {
      map.set(child as HTMLElement, motionValue(0))
    })

    const io = new IntersectionObserver(
      (entries) => {
        console.log(entries.map((entry) => entry.intersectionRatio > 0.5))
      },
      { threshold: [0.4, 0.6], root: scrollerRef.current },
    )

    // ;[...scrollerRef.current.children].forEach((child) => io.observe(child))
    return () => io.disconnect()
  }, [count, scrollerRef])

  return (
    <div>
      {Object.keys(pagination).map((page) => (
        <div key={page}>{pagination[page] ? 'true' : 'false'}</div>
      ))}
    </div>
  )
}
