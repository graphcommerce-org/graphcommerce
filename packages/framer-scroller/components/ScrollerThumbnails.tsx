import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { ImageProps } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { ButtonProps, styled, SxProps, Theme } from '@mui/material'
import { m, motionValue, PanInfo, useMotionValueEvent } from 'framer-motion'
import React, { use, useRef } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useScrollTo } from '../hooks/useScrollTo'
import { ItemState } from '../types'
import { ScrollerThumbnail } from './ScrollerThumbnail'

const MotionBox = styled(m.div)({})

export type ThumbnailsProps = {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  sx?: SxProps<Theme>
  images: Pick<ImageProps, 'src' | 'height' | 'width'>[]
}

const componentName = 'ScrollerThumbnails'

export const ScrollerThumbnails = m((props: ThumbnailsProps) => {
  const { images, sx = [] } = props
  const motionBoxRef = useRef<HTMLDivElement>(null)
  const scrollTo = useScrollTo()
  const { items, getScrollSnapPositions } = useScrollerContext()
  const itemsArr = useMotionValueValue(items, (i) => i)
  const snapPositions = getScrollSnapPositions()
  const offsetWidth = motionBoxRef.current?.offsetWidth ?? 0

  useMotionValueEvent(items, 'change', (i) => {
    console.log(i)
  })

  if (itemsArr.length <= 1) return null

  const onPan = (_event: PointerEvent, info: PanInfo) => {
    const raw = info.point.x / (offsetWidth / itemsArr.length)
    const idx = Math.max(0, Math.min(Math.round(raw), itemsArr.length - 1))
    // This should be the code that triggers the scroll
    const progressRight = raw - idx // -0.5 to 0.5
    const progressLeft = 1 - progressRight // 1.5 to 0.5

    if (progressLeft > -0.5 && progressLeft < 0.5) {
      console.log('in left', (progressLeft / 100) * -20)
      items.set(
        itemsArr.map<ItemState>((item, i) => {
          if (idx === i) {
            return {
              ...item,
              visibility: motionValue((progressLeft / 100) * -20),
            }
          }
          return item
        }),
      )
    }

    if (progressRight > 0.5 && progressRight < 1.5) {
      console.log('in right', (progressLeft / 100) * -20)

      items.set(
        itemsArr.map<ItemState>((item, i) => {
          if (idx === i) {
            return {
              ...item,
              visibility: motionValue((progressRight / 100) * -20),
            }
          }
          return item
        }),
      )
    }

    // // This line will only be triggered when the user stops paning the thumbnails
    // const x = snapPositions.x[idx]
    // const y = snapPositions.y[idx] ?? 0
    // // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // scrollTo({ x, y })
  }

  return (
    <MotionBox
      ref={motionBoxRef}
      sx={[{ display: 'flex', flexDirection: 'row' }, ...(Array.isArray(sx) ? sx : [sx])]}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onPan={onPan}
    >
      {itemsArr.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ScrollerThumbnail key={idx} {...item} idx={idx} image={images[idx]} />
      ))}
    </MotionBox>
  )
})

ScrollerThumbnails.displayName = componentName
