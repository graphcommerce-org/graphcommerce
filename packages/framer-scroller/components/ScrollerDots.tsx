import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { FabProps, styled, SxProps, Theme } from '@mui/material'
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
      <MotionBox
        {...containerProps}
        className={classes.root}
        ref={ref}
        sx={[
          {
            width: 'fit-content',
            display: 'grid',
            gridAutoFlow: 'column',
            padding: `0 6px`,
            borderRadius: '99em',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {itemsArr.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScrollerDot key={idx} {...item} idx={idx} />
        ))}
      </MotionBox>
    )
  }),
)
ScrollerDots.displayName = componentName
