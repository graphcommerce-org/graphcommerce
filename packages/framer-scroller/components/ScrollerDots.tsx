import { m } from 'framer-motion'
import React from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'

export type DotsProps = Record<string, never>

export default function ScrollerDots(props: DotsProps) {
  const { items } = useScrollerContext()

  return (
    <div>
      {items.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <m.div key={idx} style={{ opacity: item.visibility }}>
          DOT
        </m.div>
      ))}
    </div>
  )
}
