import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import Box from '@mui/material/Box'
import { FabProps } from '@mui/material/Fab'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { m } from 'framer-motion'
import React from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ScrollerDot } from './ScrollerDot'

const MotionBox = styled(m.div)({})

export type DotsProps = {
  fabProps?: Omit<FabProps, 'onClick' | 'children'>
  sx?: SxProps<Theme>
}

const componentName = 'ScrollerDots'
const { classes } = extendableComponent(componentName, ['root', 'dot', 'circle'] as const)

export const ScrollerDots = m(
  React.forwardRef<HTMLDivElement, DotsProps>((props, ref) => {
    const { fabProps, sx = [], ...containerProps } = props

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
            width: 'fit-content',
            maxWidth: '100%',
            mx: 4,
            py: 0,
            px: 1,
            borderRadius: 8,
            background: 'transparent',
            display: 'flex',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {itemsArr.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScrollerDot key={idx} {...item} idx={idx} />
        ))}
      </Box>
    )
  }),
)
ScrollerDots.displayName = componentName
