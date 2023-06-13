import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { ImageProps } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { Box, ButtonProps, styled, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import React from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { Scroller } from './Scroller'
import { ScrollerProvider } from './ScrollerProvider'
import { ScrollerThumbnail } from './ScrollerThumbnail'

const MotionBox = styled(m.div)({})

export type ThumbnailsProps = {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  sx?: SxProps<Theme>
  images: Pick<ImageProps, 'src' | 'height' | 'width'>[]
}

const componentName = 'ScrollerThumbnails'
const { classes } = extendableComponent(componentName, ['root'] as const)

export const ScrollerThumbnails = m(
  React.forwardRef<HTMLDivElement, ThumbnailsProps>((props, ref) => {
    const { buttonProps, images, sx = [], ...containerProps } = props

    const { items } = useScrollerContext()
    const itemsArr = useMotionValueValue(items, (v) => v)

    if (itemsArr.length <= 1) return null

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {itemsArr.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScrollerThumbnail key={idx} {...item} idx={idx} image={images[idx]} />
        ))}
      </Box>
    )
  }),
)
ScrollerThumbnails.displayName = componentName
