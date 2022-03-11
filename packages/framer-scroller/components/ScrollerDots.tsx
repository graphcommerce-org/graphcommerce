import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { Fab, FabProps, styled, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import React from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'

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

    const { items, getScrollSnapPositions } = useScrollerContext()
    const itemsArr = useMotionValueValue(items, (v) => v)
    const scrollTo = useScrollTo()

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
          <Fab
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            color='inherit'
            size='small'
            {...fabProps}
            onClick={() => {
              const positions = getScrollSnapPositions()
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
            }}
            className={classes.dot}
            aria-label={`img-${idx}`}
            sx={{
              boxShadow: 'none',
              background: 'transparent',
            }}
          >
            <MotionBox
              className={classes.circle}
              sx={(theme) => ({
                borderRadius: '99em',
                width: 10,
                height: 10,
                background: theme.palette.text.primary,
              })}
              style={{ opacity: item.opacity }}
            />
          </Fab>
        ))}
      </MotionBox>
    )
  }),
)
ScrollerDots.displayName = componentName
