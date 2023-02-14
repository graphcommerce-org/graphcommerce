import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { Box, ButtonProps, styled, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import React from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ScrollerThumbnail } from './ScrollerThumbnail'

const MotionBox = styled(m.div)({})

export type DotsProps = {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  images: any
  sx?: SxProps<Theme>
}

const componentName = 'ScrollerThumbnails'
const { classes } = extendableComponent(componentName, ['root', 'dot', 'circle'] as const)

export const ScrollerThumbnails = m(
  React.forwardRef<HTMLDivElement, DotsProps>((props, ref) => {
    const { buttonProps, images, sx = [], ...containerProps } = props

    const { items } = useScrollerContext()
    const itemsArr = useMotionValueValue(items, (v) => v)

    if (itemsArr.length <= 1) return null

    return (
      <Box
        {...containerProps}
        className={classes.root}
        ref={ref}
        sx={[
          {
            height: { xs: 60 },
            maxWidth: '100%',
            py: 0,
            display: 'flex',
            gap: { xs: '5px', sm: '10px', md: '15px' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {itemsArr.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScrollerThumbnail key={idx} {...item} idx={idx} image={images[idx]} />
        ))}
      </Box>
    )
  }),
)
ScrollerThumbnails.displayName = componentName
