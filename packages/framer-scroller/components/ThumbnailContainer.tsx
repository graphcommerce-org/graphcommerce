import { styled, SxProps, Theme } from '@mui/material'
import { m, useMotionValue, useMotionValueEvent } from 'framer-motion'
import React, { useCallback, useState } from 'react'
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
  const [width, setWidth] = useState(0)

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setWidth(node.scrollWidth - node.offsetWidth)
    }
  }, [])

  const scrollTo = useScrollTo()

  useMotionValueEvent(scrollIndex, 'change', (v) =>
    // Scrolls when different index is selected in ThumbnailContainer
    scrollTo({ x: snapPositions.x[v], y: snapPositions.y[v] }),
  )

  if (items.length <= 1) return null

  const onPanStart = () => container.pan.active.set(true)
  const onPanEnd = () => container.pan.active.set(false)

  return (
    <MotionBox
      sx={{
        cursor: 'grab',
        overflow: 'hidden',
      }}
    >
      <MotionBox
        ref={measuredRef}
        drag='x'
        dragConstraints={{ right: 0, left: -width }}
        onPanStart={onPanStart}
        onPanEnd={onPanEnd}
        sx={{ display: 'flex', height: '140px', alignItems: 'center' }}
      >
        {children(items)}
      </MotionBox>
    </MotionBox>
  )
}
