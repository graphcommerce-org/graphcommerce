import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles'
import { ActionCardProps } from './ActionCard'

export type ActionCardLayoutProps = {
  children?: React.ReactNode
} & Pick<ActionCardProps, 'layout'> &
  BoxProps

const parts = ['root'] as const
const name = 'ActionCardLayout'
const { withState } = extendableComponent<
  Pick<ActionCardProps, 'layout'>,
  typeof name,
  typeof parts
>(name, parts)

export const ActionCardLayout = React.forwardRef<HTMLDivElement, ActionCardLayoutProps>(
  (props, ref) => {
    const { layout = 'list' } = props

    const classes = withState({ layout })

    return (
      <Box
        ref={ref}
        {...props}
        className={classes.root}
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
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
      />
    )
  },
)
