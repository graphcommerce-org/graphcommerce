import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import React from 'react'
import { extendableComponent } from '../Styles'

export type DividedLinksProps = {
  icon?: React.ReactNode
} & Pick<TypographyProps, 'color' | 'sx'>

const name = 'Separator' as const
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
