import { sxx } from '@graphcommerce/next-ui'
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
      onMouseDown={(e) => {
        // Prevent ripple on parent
        e.stopPropagation()
      }}
      onClick={() => {
        /* ripple only gets added when an onClick is set */
      }}
      href={`/${url}`}
      component={NextLink}
      label={title}
      sx={sxx({ marginRight: 3, borderRadius: 2, cursor: 'pointer' }, sx)}
    />
  )
}
