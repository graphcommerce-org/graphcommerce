import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { m } from 'framer-motion'
import React, { useState } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useWatchItems } from '../hooks/useWatchItems'

const MotionDiv = styled(m.div)({})

export type SliderPageCounterProps = {
  sx?: SxProps<Theme>
}

export const ScrollerPageCounter = React.forwardRef<HTMLDivElement, SliderPageCounterProps>(
  ({ sx = [] }, ref) => {
    const { items } = useScrollerContext()

    const [current, setCurrent] = useState(1)

    const count = useMotionValueValue(items, (itemsArr) => itemsArr.length)
    useWatchItems((_, itemArr) => {
      const visibleItems = itemArr
        .map((i, idx) => [idx + 1, i.visibility.get()])
        .filter((i) => i[1] > 0)
        .sort((a, b) => b[1] - a[1])

      setCurrent(visibleItems[0]?.[0] ?? 1)
    })

    return (
      <MotionDiv ref={ref} sx={[{ typography: 'h4' }, ...(Array.isArray(sx) ? sx : [sx])]}>
        <span>{String(current).padStart(2, '0')}</span> — {String(count).padStart(2, '0')}
      </MotionDiv>
    )
  },
)
