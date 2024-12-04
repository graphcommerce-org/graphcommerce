import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { m } from 'framer-motion'
import { forwardRef } from 'react'
import type { ScrollableProps } from '../hooks/useScroller'
import { useScroller } from '../hooks/useScroller'

const ScrollerDiv = styled(m.div)({})

export const Scroller = forwardRef<HTMLDivElement, ScrollableProps & { sx?: SxProps<Theme> }>(
  (props, forwardedRef) => {
    const { sx = [], ...scrollerProps } = props
    const scroller = useScroller<'div', HTMLDivElement>(
      { grid: true, ...scrollerProps },
      forwardedRef,
    )

    return <ScrollerDiv {...scroller} sx={[scroller.sx, ...(Array.isArray(sx) ? sx : [sx])]} />
  },
)
Scroller.displayName = 'Scroller'
