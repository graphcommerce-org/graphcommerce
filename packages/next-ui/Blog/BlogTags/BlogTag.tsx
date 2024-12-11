import type { SxProps, Theme } from '@mui/material'
import { Chip } from '@mui/material'
import { NextLink } from '../../Theme'

export type BlogTagsProps = {
  url: string
  title: string
  sx?: SxProps<Theme>
}

export function BlogTag(props: BlogTagsProps) {
  const { url, title, sx = [] } = props
  return (
    <Chip
      href={`/${url}`}
      component={NextLink}
      label={title}
      sx={[
        { marginRight: 3, borderRadius: 2, cursor: 'pointer' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
