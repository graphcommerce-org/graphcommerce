import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'

export type BlogHeaderProps = {
  sx?: SxProps<Theme>
  asset?: React.ReactNode
}

const name = 'BlogHeader'
const parts = ['header', 'asset'] as const
const { classes } = extendableComponent(name, parts)

export function BlogHeader(props: BlogHeaderProps) {
  const { asset, sx = [] } = props

  return (
    <Box
      className={classes.header}
      maxWidth='md'
      sx={[
        (theme) => ({
          margin: '0 auto',
          marginBottom: theme.spacings.md,
          '& img': {
            objectFit: 'cover',
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {asset}
    </Box>
  )
}
