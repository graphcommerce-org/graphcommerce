import { styled, SxProps, Theme } from '@mui/material'
import { m, PanInfo, useMotionValue, useMotionValueEvent } from 'framer-motion'
import React, { useCallback } from 'react'
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
  const { getScrollSnapPositions } = useScrollerContext()
  const { items, container } = useImageGalleryContext()
  const scrollIndex = useMotionValue(0)
  const snapPositions = getScrollSnapPositions()
  const dimensions = useMotionValue({ width: 0, height: 0 })

  const measuredRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        console.log(node.getBoundingClientRect())
        dimensions.set(node.getBoundingClientRect())
      }
    },
    [dimensions],
  )

  const scrollTo = useScrollTo()

  useMotionValueEvent(scrollIndex, 'change', (v) =>
    scrollTo({ x: snapPositions.x[v], y: snapPositions.y[v] }),
  )

  if (items.length <= 1) return null

  const onPanStart = () => container.pan.active.set(true)

  const onPan = (_event: PointerEvent, info: PanInfo) => {
    const raw = info.point.x / (dimensions.get().width / (items.length - 1)) - 0.5
    const idx = Math.max(0, Math.min(Math.round(raw), items.length))
    scrollIndex.set(idx)
  }

  const onPanEnd = () => container.pan.active.set(false)

  return (
    <MotionBox
      ref={measuredRef}
      onPanStart={onPanStart}
      onPan={onPan}
      onPanEnd={onPanEnd}
      sx={[
        {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          touchAction: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children(items)}
    </MotionBox>
  )
}
