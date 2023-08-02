import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { styled, SxProps, Theme } from '@mui/material'
import { m, PanInfo, useMotionValue } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ImageGallaryContext, ImageGallaryContextValues } from './ImageGalleryContext'
import { useResizeObserver } from '../hooks/useResizeObserver'

const MotionBox = styled(m.div)({})

type ThumbnailContainerProps = {
  children: (items: ImageGallaryContextValues['items']) => React.ReactNode
  sx?: SxProps<Theme>
}

export function ThumbnailContainer(props: ThumbnailContainerProps) {
  const { children, sx } = props
  const { getScrollSnapPositions, items } = useScrollerContext()
  const itemsArr = useMotionValueValue(items, (i) => i)
  const motionBoxRef = useRef<HTMLDivElement>(null)
  const panValues = useMotionValue({ x: 0, y: 0 })
  const animationActive = useMotionValue(false)
  const animationMode = useMotionValue<'scroll' | 'drag'>('scroll')
  const snapPositions = getScrollSnapPositions()

  const scrollTo = useScrollTo()

  const objectDimensions = useResizeObserver(motionBoxRef)

  const elementWidth = objectDimensions?.contentRect.width ?? 0

  const memoizedContextValues = useMemo<ImageGallaryContextValues>(
    () => ({
      container: {
        width: elementWidth,
        pan: { coordinates: panValues },
      },
      items: itemsArr,
      animation: { active: animationActive, mode: animationMode },
    }),
    [elementWidth, panValues, itemsArr, animationActive, animationMode],
  )

  if (itemsArr.length <= 1) return null

  const onPanStart = () => {
    animationActive.set(true)
    animationMode.set('drag')
  }

  const onPan = (_event: PointerEvent, info: PanInfo) => {
    panValues.set({ x: info.point.x, y: info.point.y })
  }

  const onPanEnd = (_event: PointerEvent, info: PanInfo) => {
    animationActive.set(false)
    const raw = info.point.x / (elementWidth / itemsArr.length)
    const idx = Math.max(0, Math.min(Math.round(raw), itemsArr.length - 1))

    const x = snapPositions.x[idx]
    const y = snapPositions.y[idx] ?? 0
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    scrollTo({ x, y })
    animationMode.set('scroll')
  }

  return (
    <ImageGallaryContext.Provider value={memoizedContextValues}>
      <MotionBox
        ref={motionBoxRef}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        sx={[
          {
            display: 'flex',
            flexDirection: 'row',
            touchAction: 'none',
            maxWidth: '100%',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children(itemsArr)}
      </MotionBox>
    </ImageGallaryContext.Provider>
  )
}
