import { sxx } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import React from 'react'
import { LayoutTitle } from '../../Layout'

export type BlogTitleProps = Pick<React.ComponentProps<typeof Box>, 'sx' | 'children'>

export function BlogTitle(props: BlogTitleProps) {
  const { sx = [], children } = props

  return (
    <Box sx={sxx((theme) => ({ maxWidth: theme.breakpoints.values.md, margin: '0 auto' }), sx)}>
      <LayoutTitle variant='h1'>{children}</LayoutTitle>
    </Box>
  )
}
