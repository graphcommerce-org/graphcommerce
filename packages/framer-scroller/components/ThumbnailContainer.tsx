import { styled, SxProps, Theme } from '@mui/material'
import { m, PanHandlers, useMotionValue, useMotionValueEvent } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ImageGallaryContextValues, useImageGalleryContext } from './ImageGalleryContext'

const MotionBox = styled(m.div)({})

type ThumbnailContainerProps = {
  children: (items: ImageGallaryContextValues['items']) => React.ReactNode
  sx?: SxProps<Theme>
}

export function ThumbnailContainer(props: ThumbnailContainerProps) {
  const { children, sx } = props
  const { items, container } = useImageGalleryContext()

  if (items.length <= 1) return null

  const onPanStart = () => container.pan.active.set(true)
  const onPanEnd = () => container.pan.active.set(false)

  const onPan: PanHandlers['onPan'] = (_, info) => {
    container.ref.current?.scrollBy({ left: -info.delta.x })
  }

  return (
    <MotionBox
      ref={container.ref}
      onPanStart={onPanStart}
      onPanEnd={onPanEnd}
      onPan={onPan}
      sx={[
        {
          userSelect: 'none',
          cursor: 'grab',
          overflow: 'none',
          overflowX: 'auto',
          display: 'block',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <MotionBox sx={{ display: 'flex', height: '140px', alignItems: 'center' }}>
        {children(items)}
      </MotionBox>
    </MotionBox>
  )
}
