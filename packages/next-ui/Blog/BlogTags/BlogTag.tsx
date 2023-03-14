import Chip from '@mui/material/Chip'
import { SxProps, Theme } from '@mui/material/styles'
import { NextLink } from '../../Theme'

type BlogTagsProps = {
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
      sx={[{ marginRight: 3, borderRadius: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
