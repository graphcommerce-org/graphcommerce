import { styled, SxProps, Theme } from '@mui/material'
import { m, PanHandlers } from 'framer-motion'
import React, { useRef } from 'react'

const MotionBox = styled(m.div)({})

type ThumbnailContainerProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function ThumbnailContainer(props: ThumbnailContainerProps) {
  const { children, sx } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const onPan: PanHandlers['onPan'] = (_, info) => {
    containerRef.current?.scrollBy({ left: -info.delta.x })
  }

  return (
    <MotionBox
      ref={containerRef}
      onPan={onPan}
      layout
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
