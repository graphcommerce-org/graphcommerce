import { Chip, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'

type BlogTagsProps = {
  url: string
  title: string
  sx?: SxProps<Theme>
}

export function BlogTag(props: BlogTagsProps) {
  const { url, title, sx = [] } = props
  return (
    <Chip
      component={PageLink}
      href={`/${url}`}
      label={title}
      sx={[
        {
          marginRight: 3,
          borderRadius: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
