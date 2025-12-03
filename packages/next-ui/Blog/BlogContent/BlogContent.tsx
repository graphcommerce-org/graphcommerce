import { sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'

export type BlogContentProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function BlogContent(props: BlogContentProps) {
  const { children, sx = [] } = props

  return (
    <Box
      sx={sxx(
        {
          maxWidth: 'md',
        },
        (theme) => ({
          margin: '0 auto',
          marginBottom: theme.spacings.sm,
        }),
        sx,
      )}
    >
      {children}
    </Box>
  )
}
