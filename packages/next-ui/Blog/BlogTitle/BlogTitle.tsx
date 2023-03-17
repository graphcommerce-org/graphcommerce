import { Box } from '@mui/material'
import React from 'react'
import { LayoutTitle } from '../../Layout'

export type BlogTitleProps = Pick<React.ComponentProps<typeof Box>, 'sx' | 'children'>

export function BlogTitle(props: BlogTitleProps) {
  const { sx = [], children } = props

  return (
    <Box
      sx={[
        (theme) => ({ maxWidth: theme.breakpoints.values.md, margin: '0 auto' }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <LayoutTitle variant='h1'>{children}</LayoutTitle>
    </Box>
  )
}
