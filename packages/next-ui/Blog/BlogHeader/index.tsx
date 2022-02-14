import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

export type BlogHeaderProps = {
  sx?: SxProps<Theme>
  asset?: React.ReactNode
}

const name = 'BlogHeader' as const
const parts = ['header', 'asset'] as const
const { classes } = extendableComponent(name, parts)

export function BlogHeader(props: BlogHeaderProps) {
  const { asset, sx = [] } = props

  return (
    <Box
      className={classes.header}
      sx={[
        (theme) => ({
          maxWidth: 800,
          margin: `0 auto`,
          marginBottom: theme.spacings.md,
          '& img': {
            borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {asset}
    </Box>
  )
}
