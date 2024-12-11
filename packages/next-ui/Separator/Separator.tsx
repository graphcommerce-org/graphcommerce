import type { TypographyProps } from '@mui/material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles'

export type DividedLinksProps = {
  icon?: React.ReactNode
} & Pick<TypographyProps, 'color' | 'sx'>

const name = 'Separator'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function Separator(props: DividedLinksProps) {
  const { color, icon, sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'inline',
          padding: `0 ${theme.spacings.xxs} 0 ${theme.spacings.xxs}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon ?? (
        <Typography component='span' variant='body1' color={color}>
          |
        </Typography>
      )}
    </Box>
  )
}
