import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'

export type CategorySearchResultsProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function CategorySearchResults(props: CategorySearchResultsProps) {
  const { children, sx = [] } = props
  return <Box sx={sx}>{children}</Box>
}
