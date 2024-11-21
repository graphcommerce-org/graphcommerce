import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles'
import type { ActionCardProps } from './ActionCard'

export type ActionCardLayoutProps = {
  children?: React.ReactNode
} & Pick<ActionCardProps, 'layout'> &
  Pick<BoxProps, 'sx' | 'className' | 'tabIndex'>

const parts = ['root'] as const
const name = 'ActionCardLayout'
const { withState } = extendableComponent<
  Pick<ActionCardProps, 'layout'>,
  typeof name,
  typeof parts
>(name, parts)

export const ActionCardLayout = React.forwardRef<HTMLDivElement, ActionCardLayoutProps>(
  (props, ref) => {
    const { layout = 'list', sx, className = '', ...boxProps } = props

    const classes = withState({ layout })

    return (
      <Box
        ref={ref}
        {...boxProps}
        className={`${classes.root} ${className}`}
        sx={[
          (theme) => ({
            '&.layoutStack': {
              display: 'grid',
              height: 'min-content',
              gap: theme.spacings.xxs,
            },
            '&.layoutList': {
              display: 'grid',
              height: 'min-content',
              pt: '1px',
            },
            '&.layoutGrid': {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacings.xxs,
            },
            '&.layoutInline': {
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacings.xxs,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    )
  },
)
