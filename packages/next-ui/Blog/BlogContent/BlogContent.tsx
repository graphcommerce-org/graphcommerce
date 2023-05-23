'use client'

import { Box, SxProps, Theme } from '@mui/material'

type BlogContentProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function BlogContent(props: BlogContentProps) {
  const { children, sx = [] } = props

  return (
    <Box
      maxWidth='md'
      sx={[
        (theme) => ({
          margin: '0 auto',
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
