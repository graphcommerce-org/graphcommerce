import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import type { PanHandlers } from 'framer-motion'
import { m } from 'framer-motion'
import React, { useRef } from 'react'

const MotionBox = styled(m.div)({})

type ThumbnailContainerProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  layoutDependency: boolean
}

export function ThumbnailContainer(props: ThumbnailContainerProps) {
  const { children, sx, layoutDependency } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const onPan: PanHandlers['onPan'] = (_, info) => {
    containerRef.current?.scrollBy({ left: -info.delta.x })
  }

  return (
    <MotionBox
      ref={containerRef}
      onPan={onPan}
      layoutDependency={layoutDependency}
      sx={[
        {
          padding: '4px',
          userSelect: 'none',
          cursor: 'grab',
          overflow: 'none',
          overflowX: 'auto',
          display: 'flex',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MotionBox>
  )
}
